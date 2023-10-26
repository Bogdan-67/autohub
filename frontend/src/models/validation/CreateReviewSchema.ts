import * as Yup from 'yup';

const CreateReviewSchema = Yup.object()
  .shape({
    text: Yup.string().required('Оставьте комментарий'),
    rate: Yup.number().required('Оцените товар'),
  })
  .required();
export default CreateReviewSchema;
