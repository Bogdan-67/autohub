import * as Yup from 'yup';

const FeedbackSchema = Yup.object().shape({
  message: Yup.string().required('Обязательное поле'),
  contacts: Yup.string().required('Обязательное поле'),
});
export default FeedbackSchema;
