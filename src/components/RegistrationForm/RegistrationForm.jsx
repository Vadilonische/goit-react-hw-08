import { ErrorMessage, Field, Form, Formik } from "formik";
import { useId } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { register } from "../../redux/auth/operations";
import toast from "react-hot-toast";

const RegistrationForm = () => {
  const dispatch = useDispatch();

  const nameFieldId = useId();
  const mailFieldId = useId();
  const passwordFieldId = useId();

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const ContactSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Мінімум 3 символи!")
      .max(14, "Максимум 14 символів!")
      .required("Це обовʼязкове поле!"),
    email: Yup.string()
      .email("Введіть вірну адресу")
      .required("Це обовʼязкове поле!"),
    password: Yup.string()
      .min(8, "Мінімум 8 символів!")
      .required("Це обовʼязкове поле!"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ContactSchema}
      onSubmit={(values, actions) => {
        const newUser = {
          name: values.name,
          email: values.email,
          password: values.password,
        };
        dispatch(register(newUser))
          .unwrap()
          .then(() => {
            toast.success("Успішно!", { position: "top-center" });
          })
          .catch(() => {
            toast.error("Не коректно введені данні!", {
              position: "top-center",
            });
          });
        actions.resetForm();
      }}
    >
      <Form>
        <label htmlFor={nameFieldId}>Name</label>
        <div>
          <Field type="text" name="name" id={nameFieldId} />
          <ErrorMessage name="name" component="span" />
        </div>
        <label htmlFor={mailFieldId}>Email</label>
        <div>
          <Field type="email" name="email" id={mailFieldId} />
          <ErrorMessage name="email" component="span" />
        </div>
        <label htmlFor={passwordFieldId}>Password</label>
        <div>
          <Field type="password" name="password" id={passwordFieldId} />
          <ErrorMessage name="password" component="span" />
        </div>
        <button type="submit">Регістрація</button>
      </Form>
    </Formik>
  );
};

export default RegistrationForm;
