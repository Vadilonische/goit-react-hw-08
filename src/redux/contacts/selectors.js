export const selectContacts = (state) => state.contacts.items;

export const selectIsLoading = (state) => state.contacts.isLoading;

export const selectError = (state) => state.contacts.error;

export const selectIsOpen = (state) => state.contacts.isModalOpen;

export const selectActiveContact = (state) => state.contacts.activeContact;
