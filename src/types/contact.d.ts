export type Contact = {
    $id: string;
    ownerId: string;
    contactId: string;
  };
  
  export type User = {
    $id: string;
    userId: string;
    email: string;
    name?: string;
    avatar?: string;
  };
  
  export type ContactStore = {
    contacts: Contact[];
    contactUsers: User[];
    setContacts: (contacts: Contact[]) => void;
    setContactUsers: (users: User[]) => void;
    addContact: (contact: Contact, user: User) => void;
    resetContacts: () => void;
  };
  