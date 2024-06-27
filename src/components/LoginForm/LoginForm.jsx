import { useId } from "react";
import { Form, ErrorMessage, Field, Formik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { logIn } from "../../redux/auth/operations";
import toast from "react-hot-toast";

const LoginForm = () => {
  const dispatch = useDispatch();
  const mailFieldId = useId();
  const passwordFieldId = useId();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Невірний формат email")
      .required("Це обов'язкове поле"),
    password: Yup.string()
      .min(6, "Мінімум 6 символів")
      .required("Це обов'язкове поле"),
  });

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        const userData = {
          email: values.email,
          password: values.password,
        };
        dispatch(logIn(userData))
          .unwrap()
          .then(() => {
            toast.success("Вірно!", { position: "top-center" });
          })
          .catch(() => {
            toast.error("Невірний формат email", {
              position: "top-center",
            });
          });
        actions.resetForm();
      }}
    >
      <Form>
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

        <button type="submit">Log In</button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
