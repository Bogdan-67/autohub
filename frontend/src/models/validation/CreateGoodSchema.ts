import * as Yup from 'yup';
export const numberRegExp = /^\d+$/;

const featureSchema = Yup.object().shape({
  title: Yup.string().required('Обязательное поле'),
  description: Yup.string().required('Обязательное поле'),
  id_feature: Yup.number().required('Обязательное поле'),
});

const CreateGoodSchema = Yup.object()
  .shape({
    good_name: Yup.string().required('Обязательное поле'),
    article: Yup.string().required('Обязательное поле'),
    price: Yup.number()
      .typeError('Должно быть целым числом')
      .integer('Должно быть целым числом')
      .required('Обязательное поле'),
    storage: Yup.number()
      .typeError('Должно быть целым числом')
      .integer('Должно быть целым числом')
      .required('Обязательное поле'),
    description: Yup.string(),
    category_id: Yup.number().required('Обязательное поле'),
    brand_id: Yup.number().required('Обязательное поле'),
    features: Yup.array().of(featureSchema),
    photos: Yup.array().test('is-files', 'Должны быть файлами', (value) => {
      if (!value || value.length === 0) {
        return true; // Нет файлов, проверка прошла успешно
      }
      return value.every((file) => file instanceof File);
    }),
  })
  .required();
export default CreateGoodSchema;
