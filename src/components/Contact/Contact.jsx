import { useDispatch } from "react-redux";
import css from "./Contact.module.css";

import { deleteContact } from "../../redux/contactsOps";

export default function Contact({ name, number, id }) {
  const dispatch = useDispatch();
  const handleDelete = () => dispatch(deleteContact(id));

  return (
    <div className={css.contactList}>
      <div>
        <p>{name}</p>
        <p>{number}</p>
      </div>

      <button type="button" className={css.btnDell} onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}
