import css from "./ContactForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { addContact } from "../../redux/contacts/operations";
import toast from "react-hot-toast";
import { useId } from "react";

export default function ContactForm() {
  const initialValues = {
    name: "",
    number: "",
  };

  const id = useId();

  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    const newContact = {
      name: values.name,
      number: values.number,
    };
    dispatch(addContact(newContact))
      .unwrap()
      .then(() => {
        toast.success("Успішно додано!", { position: "top-center" });
      })
      .catch(() => {
        toast.error("Не коректно введені данні! ", {
          position: "top-center",
        });
      });
    actions.resetForm();
  };

  const ContactSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Мінімум 3 символи!")
      .max(50, "Максимум 50 символів!")
      .required("Це обовʼязкове поле!"),
    number: Yup.string()
      .matches(
        /^(?:\d{10}|\d{3}-\d{3}-\d{2}-\d{2})$/,
        "Номер телефону у форматі xxx-xxx-xx-xx"
      )
      .required("Це обовʼязкове поле!"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ContactSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.formAddContact}>
        <div className={css.formInput}>
          <label htmlFor={`${id}+name`}>Name</label>
          <Field
            className={css.formInputAdd}
            type="text"
            name="name"
            id={`${id}+name`}
          />
          <ErrorMessage name="name" component="span" />
        </div>
        <div className={css.formInput}>
          <label htmlFor={`${id}+phone`}>Number</label>
          <Field
            className={css.formInputAdd}
            type="text"
            name="number"
            id={`${id}+phone`}
          />
          <ErrorMessage name="number" component="span" />
        </div>

        <button className={css.btnAdd} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
}
