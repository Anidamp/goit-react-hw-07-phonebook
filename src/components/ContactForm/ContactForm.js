import { useState } from 'react';
import s from './ContactForm.module.css';
import { v4 as uuidv4 } from 'uuid';
import { useAddContactMutation, useGetContactsQuery } from '../../serviceApi/Api';

export default function ContactForm () {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [addNewContact] = useAddContactMutation()
  const {data: contacts} = useGetContactsQuery();

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case'name' :
       setName(value);
       break;
      case 'phone':
        setPhone(value);
        break;
      default: 
      return;
    }
  };

/*  console.log(useGetContactsQuery()) */
  const handleSubmit = (e) => {
    e.preventDefault();
    const newContact = {
      name,
      phone,
      id: uuidv4(),
    };
    if (contacts!==undefined&&contacts.find(
        (contact) => name.toLowerCase() === contact.name.toLowerCase())){
            alert('Contact is already added !!!');
            reset();
            return;
        }
    addNewContact(newContact);
    reset();
  };

  const reset = () => {
    setName('');
    setPhone('')
  };

  return (
        <form className={s.form} onSubmit={handleSubmit}>
          <label>
            Name
            <input
              className={s.input}
              onChange={handleChange}
              type="text"
              name="name"
              value={name}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
              required
            />
          </label>
          <label>
            phone
            <input
              className={s.input}
              onChange={handleChange}
              type="tel"
              name="phone"
              value={phone}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
              required
            />
          </label>
          <button type="submit" className={s.button}>
            Add contact
          </button>
        </form>
    );
}