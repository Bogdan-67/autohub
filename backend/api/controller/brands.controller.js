const BrandService = require('../service/brands-service');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const sharp = require('sharp');

class BrandsController {
  async getBrands(req, res, next) {
    try {
      const brands = await BrandService.getBrands(req.query);
      res.status(200).json(brands);
    } catch (e) {
      next(e);
    }
  }
  async createBrand(req, res, next) {
    try {
      const { logo } = req.files;
      const { name, description } = req.body;
      if (!logo) {
        throw ApiError.BadRequest('Не загружено изображение!');
      }
      const maxSize = 10 * 1024 * 1024; // Максимальный размер файла в байтах (10 МБ)
      let fileName = uuid.v4() + '.jpg';

      const directoryPath = path.resolve(__dirname, '..', 'static/brands');

      if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
      }

      const filePath = path.resolve(__dirname, '..', 'static/brands', fileName);

      if (logo.size > maxSize) {
        // Изображение превышает максимальный размер, необходимо сжатие
        sharp(logo.data)
          .resize({ width: 800, height: 600 }) // Установите необходимые размеры
          .toFile(filePath, (err, info) => {
            if (err) {
              console.error('Ошибка при сжатии изображения:', err);
              return res.status(500).json({ message: 'Ошибка при сжатии изображения.' });
            }
            console.log('Изображение успешно сжато:', info);
          });
      } else {
        // Изображение не превышает максимальный размер, сохраняем его без изменений
        logo.mv(filePath, (err) => {
          if (err) {
            console.error('Ошибка при сохранении изображения:', err);
            return res.status(500).json({ message: 'Ошибка при сохранении изображения.' });
          }
          console.log('Изображение успешно сохранено');
        });
      }
      const brand = await BrandService.createBrand(name, description, fileName);
      res.status(200).json(brand);
    } catch (e) {
      next(e);
    }
  }
  async getOneBrand(req, res, next) {
    try {
      const brands = await BrandService.getBrands(req.query);
      res.status(200).json(brands);
    } catch (e) {
      next(e);
    }
  }
  async editBrand(req, res, next) {
    try {
      const brands = await BrandService.getBrands(req.query);
      res.status(200).json(brands);
    } catch (e) {
      next(e);
    }
  }
  async deleteBrand(req, res, next) {
    try {
      const brands = await BrandService.getBrands(req.query);
      res.status(200).json(brands);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new BrandsController();
