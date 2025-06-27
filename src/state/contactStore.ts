import { create } from 'zustand';
import { Contact,User,ContactStore } from '../types/contact';

export const useContactStore = create<ContactStore>((set) => ({
  contacts: [],
  contactUsers: [],

  setContacts: (contacts: Contact[]) => set({ contacts }),

  setContactUsers: (users: User[]) => set({ contactUsers: users }),

  addContact: (contact: Contact, user: User) =>
    set((state) => {
      const exists = state.contacts.some((c) => c.contactId === contact.contactId);
      if (exists) return state;
      return {
        contacts: [...state.contacts, contact],
        contactUsers: [...state.contactUsers, user],
      };
    }),

  resetContacts: () => set({ contacts: [], contactUsers: [] }),
}));

