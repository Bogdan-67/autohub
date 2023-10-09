const UserService = require('../service/user-service.js');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');
const uuid = require('uuid');
const path = require('path');
const sharp = require('sharp');
const SliderService = require('../service/slider.service.js');

class SliderController {
  async createSliderItem(req, res, next) {
    try {
      const { title, description } = req.body;
      const { img } = req.files;
      if (!img) {
        throw ApiError.BadRequest('Не загружено изображение!');
      }
      const maxSize = 10 * 1024 * 1024; // Максимальный размер файла в байтах (10 МБ)
      let fileName = uuid.v4() + '.jpg';
      const filePath = path.resolve(__dirname, '..', 'static', fileName);

      if (img.size > maxSize) {
        // Изображение превышает максимальный размер, необходимо сжатие
        sharp(img.data)
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
        img.mv(filePath, (err) => {
          if (err) {
            console.error('Ошибка при сохранении изображения:', err);
            return res.status(500).json({ message: 'Ошибка при сохранении изображения.' });
          }
          console.log('Изображение успешно сохранено');
        });
      }
      const createdSliderItem = await SliderService.createSliderItem(fileName, title, description);
      res.status(200).json(createdSliderItem);
    } catch (e) {
      next(e);
    }
  }
  async getSliderItems(req, res, next) {
    try {
      const sliderItems = await SliderService.getSliderItems(req.body);
      res.status(200).json(sliderItems);
    } catch (e) {
      next(e);
    }
  }
  async getOneSliderItem(req, res, next) {
    try {
    } catch (e) {
      next(e);
    }
  }
  async editSliderItem(req, res, next) {
    try {
    } catch (e) {
      next(e);
    }
  }
  async deleteSliderItem(req, res, next) {
    try {
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new SliderController();
