import { useDispatch, useSelector } from "react-redux";
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
import * as Yup from "yup";

const ModalEdit = ({ open, close, id }) => {
  const dispatch = useDispatch();

  const activeContact = useSelector((state) =>
    state.contacts.items.find((contact) => contact.id === id)
  );

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
        id: activeContact.id,
        name: values.name,
        number: values.number,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Дані успішно оновлено!", { position: "top-center" });
        close();
      })
      .catch(() => {
        toast.error("Йой, помилка! Введіть правильні дані!", {
          position: "top-center",
        });
      });
    actions.resetForm();
    dispatch(clearActiveContact());
  };

  const initialValues = {
    name: activeContact?.name || "",
    number: activeContact?.number || "",
  };

  return (
    <Dialog open={open} onClose={close}>
      <DialogContent>
        <DialogContentText>Виправити контакт!</DialogContentText>
      </DialogContent>
      <Formik
        initialValues={initialValues}
        validationSchema={ContactSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => (
          <Form>
            <Box>
              <label htmlFor={`name`}>Name</label>
              <div>
                <Field type="text" name="name" id={`name`} />
                <ErrorMessage name="name" component="div" />
              </div>
              <label htmlFor={`phone`}>Phone</label>
              <div>
                <Field type="text" name="number" id={`phone`} />
                <ErrorMessage name="number" component="div" />
              </div>
              <DialogActions>
                <Button onClick={close} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary" autoFocus>
                  Save
                </Button>
              </DialogActions>
            </Box>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default ModalEdit;
