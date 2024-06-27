import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const ModalDelete = ({ open, close, id }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    close();
    dispatch(deleteContact(id))
      .unwrap()
      .then(() => {
        toast.success("Контакт видалений!", { position: "top-center" });
      })
      .catch(() => {
        toast.error("Йой, спробуй знову!", { position: "top-center" });
      });
  };
  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>{"Підтвердити видалення"}</DialogTitle>
      <DialogContent>
        <DialogContentText>Точно хочете видалити?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="primary" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ModalDelete;
