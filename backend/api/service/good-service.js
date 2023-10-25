const db = require('../db');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const sharp = require('sharp');
const ApiError = require('../exceptions/api-error');

class GoodService {
  async getGoods({ category_id, filters }) {
    // filters - объект { [key: string]: string[] }
    if (
      !filters ||
      Object.keys(filters).length === 0 ||
      Object.keys(filters).every((key) => filters[key].length === 0)
    ) {
      const sql = `
      WITH Photos AS (
        SELECT good_id, ARRAY_AGG(filename) AS photos
        FROM good_images
        GROUP BY good_id
      )
      SELECT DISTINCT ON (g.id_good) g.id_good, g.good_name, g.article, g.brand_id, g.price, g.storage, p.photos
      FROM goods g
      RIGHT JOIN good_categories gc ON gc.good_id = g.id_good
      LEFT JOIN brands ON brands.id_brand = g.brand_id
      INNER JOIN good_features gf ON g.id_good = gf.good_id
      LEFT JOIN Photos p ON p.good_id = g.id_good
      WHERE (
        $1::int IS NULL OR gc.category_id = $1::int
      );
    `;

      const goods = await db.query(sql, [category_id]);

      return goods.rows;
    } else {
      const filterParams = filters
        ? Object.entries(filters)
            .filter(([title, descriptions]) => descriptions.length > 0)
            .map(([title, descriptions]) => {
              return {
                title,
                descriptions,
              };
            })
        : [];

      const sql = `
      WITH Photos AS (
        SELECT good_id, ARRAY_AGG(filename) AS photos
        FROM good_images
        GROUP BY good_id
      ),
      filtered_goods AS (
        SELECT gf.good_id
        FROM good_features gf
        INNER JOIN unnest($1::text[]) f(title) ON gf.title = f.title
        INNER JOIN unnest($2::text[]) d(description) ON gf.description = d.description
        GROUP BY gf.good_id
        HAVING COUNT(DISTINCT gf.title) = $3
      )
      SELECT DISTINCT ON (g.id_good) g.id_good, g.good_name, g.article, g.brand_id, g.price, g.storage, p.photos
      FROM goods g
      RIGHT JOIN good_categories gc ON gc.good_id = g.id_good
      LEFT JOIN brands ON brands.id_brand = g.brand_id
      INNER JOIN good_features gf ON g.id_good = gf.good_id
      LEFT JOIN Photos p ON p.good_id = g.id_good
      WHERE (
        $4::int IS NULL OR gc.category_id = $4::int
      ) AND g.id_good IN (SELECT good_id FROM filtered_goods);
    `;

      const filterDescriptionsArray =
        filterParams.length > 0 ? filterParams.map((filter) => filter.descriptions).flat() : [];
      const filterTitlesArray =
        filterParams.length > 0 ? filterParams.map((filter) => filter.title) : [];
      const countFilters = filterTitlesArray.length;

      const goods = await db.query(sql, [
        filterTitlesArray,
        filterDescriptionsArray,
        countFilters,
        category_id,
      ]);
      return goods.rows;
    }
  }
  async getGoodsByCategory(category_id) {
    if (!category_id) {
      const goods = await db.query(`SELECT * FROM goods`);
      return goods.rows;
    } else {
      const goods = await db.query(
        `SELECT DISTINCT * FROM goods RIGHT JOIN good_categories ON good_categories.good_id=goods.id_good WHERE category_id = $1`,
        [category_id],
      );
      return goods.rows;
    }
  }
  async getFilters({ category_id }) {
    const goods = await this.getGoodsByCategory(category_id);
    const filters = new Object();
    for (let i in goods) {
      const good_id = goods[i].id_good;
      const features = await db.query(`SELECT * FROM good_features WHERE good_id = $1`, [good_id]); // Получаю характеристики товара

      for (let featureIndex in features.rows) {
        const feature = features.rows[featureIndex]; // Одна характеристика товара
        if (!filters[feature.title]) {
          filters[feature.title] = new Array();
          filters[feature.title].push(feature.description);
        } else {
          if (!filters[feature.title].includes(feature.description))
            filters[feature.title].push(feature.description);
        }
      }
    }
    console.log('filters', filters);
    return filters;
  }

  async getFeatures() {
    const features = await db.query(`SELECT DISTINCT title FROM good_features`);
    const titlesArr = features.rows.map((obj) => obj.title);
    return titlesArr;
  }

  async createGood(
    { good_name, article, price, storage, description, category_id },
    features,
    photos,
  ) {
    if (!good_name) {
      throw ApiError.BadRequest();
    }
    if (!article) {
      throw ApiError.BadRequest();
    }
    if (!price) {
      throw ApiError.BadRequest();
    }
    if (!storage) {
      throw ApiError.BadRequest();
    }
    if (!category_id) {
      throw ApiError.BadRequest();
    }

    await db.query('BEGIN');
    const good = await db.query(
      `INSERT INTO goods(good_name, article, price, storage, description) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [good_name, article, price, storage, description],
    );

    const goodFromDb = await db.query(`SELECT * FROM goods WHERE id_good = $1`, [
      good.rows[0].id_good,
    ]);

    let res = good.rows[0];

    const good_id = good.rows[0].id_good;

    const getCategoryWithParents = async (id) => {
      const category = await db.query(`SELECT * FROM categories WHERE id_category = $1`, [id]);

      if (category.rows.length > 0) {
        const parent = category.rows[0].parent;
        if (parent) {
          const parentCategories = await getCategoryWithParents(parent);
          return [category.rows[0].id_category, ...parentCategories];
        } else {
          return [category.rows[0].id_category];
        }
      } else {
        return [];
      }
    };

    const categories = await getCategoryWithParents(category_id);

    if (categories.length === 0) {
      throw ApiError.BadRequest('Категория не найдена');
    }

    res.categories = categories;

    for (const id of categories) {
      const category = await db.query(
        `INSERT INTO good_categories(category_id, good_id) VALUES ($1, $2) RETURNING *`,
        [id, good_id],
      );
    }

    res.features = [];

    for (const data of features) {
      const featureEncoded = JSON.parse(data);
      console.log('feature', featureEncoded);
      const feature = await db.query(
        `INSERT INTO good_features(title, description, good_id) VALUES ($1, $2, $3) RETURNING *`,
        [featureEncoded.title, featureEncoded.description, good_id],
      );
      res.features.push(feature.rows[0]);
    }

    if (photos && photos.length > 0) {
      res.photos = [];
      const maxSize = 10 * 1024 * 1024; // Максимальный размер файла в байтах (10 МБ)
      for (const photo of photos) {
        let fileName = uuid.v4() + '.jpg';
        const directoryPath = path.resolve(__dirname, '..', 'static/good-photos', String(good_id));

        if (!fs.existsSync(directoryPath)) {
          fs.mkdirSync(directoryPath, { recursive: true });
        }

        const filePath = path.resolve(__dirname, '..', `static/good-photos/${good_id}`, fileName);

        if (photo.size > maxSize) {
          // Изображение превышает максимальный размер, необходимо сжатие
          sharp(photo.data)
            .resize({ width: 800, height: 600 }) // Установите необходимые размеры
            .toFile(filePath, (err, info) => {
              if (err) {
                console.error('Ошибка при сжатии изображения:', err);
                throw ApiError.ServerError('Ошибка при сжатии изображения.');
              }
              console.log('Изображение успешно сжато:', info);
            });
        } else {
          // Изображение не превышает максимальный размер, сохраняем его без изменений
          photo.mv(filePath, (err) => {
            if (err) {
              console.error('Ошибка при сохранении изображения:', err);
              throw ApiError.ServerError('Ошибка при сохранении изображения.');
            }
            console.log('Изображение успешно сохранено');
          });
        }

        const photoDb = await db.query(
          `INSERT INTO good_images(filename, good_id) VALUES ($1, $2) RETURNING *`,
          [fileName, good_id],
        );
        res.photos.push(photoDb.rows[0]);
      }
    }

    await db.query('COMMIT');
    return res;
  }
  async getOneGood({ id }) {
    const sql = `
      WITH Photos AS (
        SELECT good_id, ARRAY_AGG(filename) AS photos
        FROM good_images
        WHERE good_id = $1
        GROUP BY good_id
      ),
      Features AS (
        SELECT good_id, json_agg(json_build_object('title', title, 'description', description)) AS features
        FROM good_features
        WHERE good_id = $1
        GROUP BY good_id
      ),
      Categories AS (
        SELECT good_id, json_agg(json_build_object('id_category', c.id_category,'name', name, 'parent', parent)) AS categories
        FROM good_categories gc
        LEFT JOIN categories c ON c.id_category=gc.category_id
        WHERE good_id = $1
        GROUP BY good_id
      )
      SELECT g.id_good, g.good_name, g.article, g.brand_id, b.name AS brand_name, g.price, g.storage, p.photos, g.description, f.features, c.categories
      FROM goods g
      LEFT JOIN brands b ON b.id_brand = g.brand_id
      LEFT JOIN Features f ON g.id_good = f.good_id
      LEFT JOIN Photos p ON p.good_id = g.id_good
      LEFT JOIN Categories c ON c.good_id = g.id_good
      WHERE g.id_good = $1;
    `;

    const good = await db.query(sql, [id]);

    return good.rows[0];
  }
  async editGood() {
    return 0;
  }
  async deleteGood() {
    return 0;
  }
}

module.exports = new GoodService();
