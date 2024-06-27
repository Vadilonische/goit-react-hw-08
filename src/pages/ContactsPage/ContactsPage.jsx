import { useDispatch, useSelector } from "react-redux";
import {
  selectContacts,
  //   selectError,
  //   selectIsLoading,
} from "../../redux/contacts/selectors";
import { useEffect } from "react";
import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";
import ContactList from "../../components/ContactList/ContactList";

export default function Contacts() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  //   const isLoading = useSelector(selectIsLoading);
  //   const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <title>Твої контакти</title>
      <ContactForm />
      <SearchBox />
      <ContactList contacts={contacts} />
    </div>
  );
}
