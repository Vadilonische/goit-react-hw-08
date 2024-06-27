import css from "./ContactList.module.css";
import Contact from "../Contact/Contact";
import { useSelector } from "react-redux";
import { selectError, selectIsLoading } from "../../redux/contacts/selectors";
import { selectFilteredContacts } from "../../redux/contacts/slice";
import ModalDelete from "../ModalDelete/ModalDelete";
import { useState } from "react";

const ContactList = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState(null);

  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const contacts = useSelector(selectFilteredContacts);

  const openModalDelete = (id) => {
    setSelectedContactId(id);
    setModalOpen(true);
  };

  const closeModalDelete = () => {
    setSelectedContactId(null);
    setModalOpen(false);
  };

  return (
    <ul className={css.contactList}>
      {isLoading && !error && <p>Loading, please wait!</p>}
      {contacts.map((contact) => {
        return (
          <li key={contact.id} className={css.contactItem}>
            <Contact contact={contact} modalOpenDelete={openModalDelete} />
          </li>
        );
      })}
      <ModalDelete
        open={modalOpen}
        close={closeModalDelete}
        id={selectedContactId}
      />
    </ul>
  );
};
export default ContactList;
