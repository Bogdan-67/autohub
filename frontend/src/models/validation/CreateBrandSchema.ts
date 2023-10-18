import * as Yup from 'yup';

const CreateBrandSchema = Yup.object()
  .shape({
    name: Yup.string().required('Обязательное поле'),
  })
  .required();
export default CreateBrandSchema;
