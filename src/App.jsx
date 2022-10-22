import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { AddContacts, Contacts } from 'components/common';
import {
  addLocalStorageData,
  getLocalStorage,
  setLocalStorage,
} from 'utils/helpers';

class App extends Component {
  constructor() {
    super();
    this.CONTACTS = 'contacts';
    this.state = {
      contacts: [],
      current: [],
    };
  }

  filterContacts({ target }) {
    const value = target.value;
    const newState = { ...this.state };
    const { current } = newState;
    const filteredContact = current.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    );
    this.setState({
      ...newState,
      contacts: filteredContact,
    });
  }

  deleteContact(idContact) {
    const newState = { ...this.state };
    const { current } = newState;
    const newContacts = current.filter(({ id }) => id !== idContact);
    this.setState({
      ...newState,
      contacts: newContacts,
      current: newContacts,
    });
    setLocalStorage(this.CONTACTS, newContacts);
  }

  getIsSameName(nameNewContact) {
    const { current } = { ...this.state };
    return current.some(({ name }) => name === nameNewContact);
  }

  onSubmit(event) {
    event.preventDefault();
    const { name, number } = [...event.target.elements]
      .filter(item => item.name)
      .reduce(
        (item, element) => ((item[element.name] = element.value), item),
        {}
      );
    const isSame = this.getIsSameName(name);
    if (!isSame) {
      const id = nanoid();
      const newState = { ...this.state };
      const { contacts } = newState;
      const newContacts = { name, number, id };
      contacts.push(newContacts);
      addLocalStorageData(this.CONTACTS, newContacts);
      this.setState({
        ...newState,
        contacts,
        current: contacts,
      });
      event.currentTarget.reset();
    } else {
      alert(`${name} is already in contacts.`);
    }
  }

  componentDidMount() {
    const contacts = getLocalStorage(this.CONTACTS);
    const newState = { ...this.state };
    this.setState({
      ...newState,
      contacts,
      current: contacts,
    });
  }

  render() {
    const { contacts } = this.state;
    return (
      <>
        <AddContacts onSubmit={this.onSubmit.bind(this)} />
        <Contacts
          contacts={contacts}
          filterContacts={this.filterContacts.bind(this)}
          deleteContact={this.deleteContact.bind(this)}
        />
      </>
    );
  }
}

export { App };
