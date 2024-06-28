import css from "./ContactList.module.css";
import Contact from "../Contact/Contact";
import { useSelector } from "react-redux";
import { selectError, selectIsLoading } from "../../redux/contacts/selectors";
import { selectFilteredContacts } from "../../redux/contacts/slice";
import ModalDelete from "../ModalDelete/ModalDelete";
import ModalEdit from "../ModalEdit/ModalEdit";
import { useState } from "react";

const ContactList = () => {
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState(null);

  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const contacts = useSelector(selectFilteredContacts);

  const openModalDelete = (id) => {
    setSelectedContactId(id);
    setModalDeleteOpen(true);
  };

  const closeModalDelete = () => {
    setSelectedContactId(null);
    setModalDeleteOpen(false);
  };

  const openModalEdit = (id) => {
    setSelectedContactId(id);
    setModalEditOpen(true);
  };

  const closeModalEdit = () => {
    setSelectedContactId(null);
    setModalEditOpen(false);
  };

  return (
    <ul className={css.contactList}>
      {isLoading && !error && <p>Loading, please wait!</p>}
      {contacts.map((contact) => {
        return (
          <li key={contact.id} className={css.contactItem}>
            <Contact
              contact={contact}
              modalOpenDelete={openModalDelete}
              modalOpenEdit={openModalEdit}
            />
          </li>
        );
      })}
      <ModalDelete
        open={modalDeleteOpen}
        close={closeModalDelete}
        id={selectedContactId}
      />
      <ModalEdit
        open={modalEditOpen}
        close={closeModalEdit}
        id={selectedContactId}
      />
    </ul>
  );
};
export default ContactList;
