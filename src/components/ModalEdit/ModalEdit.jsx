import { useDispatch, useSelector } from "react-redux";
import {
  selectActiveContact,
  selectIsOpen,
} from "../../redux/contacts/selectors";
import { useId } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { clearActiveContact } from "../../redux/contacts/slice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { toast } from "react-hot-toast";
import { editContact } from "../../redux/contacts/operations";

const ModalEdit = () => {
  const dispatch = useDispatch();

  const activeContact = useSelector(selectActiveContact);
  const isOpen = useSelector(selectIsOpen);
  const id = useId();

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

  const handleSubmit = (values, actions) => {
    dispatch(
      editContact({
        id: id,
        name: values.username,
        number: values.number,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Данні успішно оновлено!", { position: "top-center" });
      })
      .catch(() => {
        toast.error("Йой, помилка! Введіть правильні данні!", {
          position: "top-center",
        });
      });
    actions.resetForm();
  };
  const initialValues = {
    username: activeContact.name || "",
    number: activeContact.number || "",
  };

  return (
    <Dialog open={open} onClose={clearActiveContact}>
      <DialogContent>
        <DialogContentText>Виправити контакт!</DialogContentText>
      </DialogContent>
      <Formik
        initialValues={initialValues}
        validationSchema={ContactSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.formContainer}>
          <Box className={css.box}>
            <label htmlFor={`${id}+name`}>Name</label>
            <div>
              <Field type="text" name="name" id={`${id}+name`} />
              <ErrorMessage name="name" component="div" />
            </div>
            <label htmlFor={`${id}+phone`}>Phone</label>
            <div>
              <Field type="text" name="number" id={`${id}+phone`} />
              <ErrorMessage name="number" component="div" />
            </div>
            <DialogActions>
              <Button onClick={close} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSubmit} color="primary" autoFocus>
                Save
              </Button>
            </DialogActions>
          </Box>
        </Form>
      </Formik>
    </Dialog>
  );
};

export default ModalEdit;
