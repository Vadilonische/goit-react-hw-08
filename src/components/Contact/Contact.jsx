import { useDispatch } from "react-redux";
import css from "./Contact.module.css";

// import { deleteContact } from "../../redux/contacts/operations";
import { setActiveContact } from "../../redux/contacts/slice";

export default function Contact({ contact, modalOpenDelete }) {
  const dispatch = useDispatch();

  const { name, number, id } = contact;

  const handleEdit = () => {
    dispatch(setActiveContact({ name, number, id }));
  };

  const handleDelete = () => {
    modalOpenDelete(id);
  };

  return (
    <div className={css.contactList}>
      <div>
        <p>{name}</p>
        <p>{number}</p>
      </div>
      <button type="button" className={css.btnEdit} onClick={handleEdit}>
        Edit
      </button>

      <button type="button" className={css.btnDell} onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}
