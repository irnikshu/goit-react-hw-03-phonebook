import { Component } from 'react';
import shortid from 'shortid';
import styles from '../app.module.scss';

class Form extends Component {
  state = {
    name: '',
    number: '',
  };
  nameInputId = shortid.generate();
  numberInputId = shortid.generate();

  handleChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({
      [name]: value,
    });
  };
  handleSubmit = event => {
    event.preventDefault();

    this.props.onSubmit(this.state);
    this.reset();
  };
  reset = () => {
    this.setState({ name: '', number: '' });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit} className={styles.block}>
        <label htmlFor={this.nameInputId}>
          <h3 className={styles.blockTitle}>Name</h3>

          <input
            value={this.state.name}
            onChange={this.handleChange}
            className={styles.inp}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            id={this.nameInputId}
          />
        </label>
        <label htmlFor={this.numberInputId}>
          <h3 className={styles.blockTitle}>Number</h3>
          <input
            value={this.state.number}
            onChange={this.handleChange}
            className={styles.inp}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            id={this.numberInputId}
          />
        </label>
        <button type="submit" className={styles.btn}>
          Add Contact
        </button>
      </form>
    );
  }
}
export default Form;
