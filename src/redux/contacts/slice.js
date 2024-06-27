import { createSelector, createSlice } from "@reduxjs/toolkit";
import {
  addContact,
  deleteContact,
  editContact,
  fetchContacts,
} from "./operations";
import { selectContacts } from "./selectors";
import { selectFilter } from "../filters/selectors";
import { logOut } from "../auth/operations";

export const handlePending = (state) => {
  state.isLoading = true;
};

export const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    isModalOpen: false,
    activeContact: null,
  },
  reducers: {
    setActiveContact(state, action) {
      state.activeContact = action.payload;
      state.isModalOpen = true;
    },
    clearActiveContact(state) {
      state.activeContact = null;
      state.isModalOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(addContact.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
          (task) => task.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(editContact.rejected, handleRejected)
      .addCase(editContact.pending, handlePending)
      .addCase(editContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
          (task) => task.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.items = [];
        state.error = null;
        state.isLoading = false;
      });
  },
});

export const { setActiveContact, clearActiveContact, toggleModal } =
  contactsSlice.actions;

export const contactReducer = contactsSlice.reducer;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(filter.toLowerCase()) ||
        contact.number.includes(filter)
    );
  }
);
