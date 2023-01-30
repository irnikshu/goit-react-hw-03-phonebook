import { Component } from 'react';
import PropTypes from 'prop-types';
import Form from './Form/Form';
import ContactsList from './Contacts/Contacts';
import { nanoid } from 'nanoid';
import Filter from './Filter/Filter';

import styles from './app.module.scss';
import '../shared/Styles/styles.scss';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = data => {
    const newContact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };
    const checkName = newContact.name.toLowerCase();
    this.state.contacts.find(
      contact => contact.name.toLowerCase() === checkName
    )
      ? alert(data.name + ' is already in contacts')
      : this.setState(({ contacts }) => ({
          contacts: [newContact, ...contacts],
        }));
  };
  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };
  getVisibleContact = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };
  render() {
    const { filter } = this.state;
    const visibleContact = this.getVisibleContact();

    return (
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Phonebook</h2>
        <Form onSubmit={this.addContact} />
        <h2 className={styles.title}>Contacts</h2>
        <Filter value={filter} changeFilter={this.changeFilter} />
        <ContactsList
          contact={visibleContact}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
export default App;
App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  filter: PropTypes.string,
  addContact: PropTypes.func,
  deleteContact: PropTypes.func,
  changeFilter: PropTypes.func,
  getVisibleContact: PropTypes.func,
};
