import css from "./ContactList.module.css";
import Contact from "../Contact/Contact";
import { useSelector } from "react-redux";
import { filteredContacts } from "../../redux/contactsOps";
import { selectError, selectIsLoading } from "../../redux/selectors";

const ContactList = () => {
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const contacts = useSelector(filteredContacts);

  return (
    <ul className={css.contactList}>
      {isLoading && !error && <p>Loading, please wait!</p>}
      {contacts.map((contact) => {
        return (
          <li key={contact.id} className={css.contactItem}>
            <Contact
              name={contact.name}
              number={contact.number}
              id={contact.id}
            />
          </li>
        );
      })}
    </ul>
  );
};
export default ContactList;
