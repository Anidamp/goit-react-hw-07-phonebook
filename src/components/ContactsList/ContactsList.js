import s from './ContactsList.module.css';
import { useSelector } from 'react-redux';
import { useDeleteContactMutation, useGetContactsQuery } from '../../serviceApi/Api';

export default function ContactList() {
  const [delContact] = useDeleteContactMutation();
  const filter = useSelector(state => state.filter);
  const { data } = useGetContactsQuery();
  console.log(filter)
  return (
  <>
    {data && (
    <ul className={s.list}>
      {data.filter(contact =>
              contact.name.toLocaleLowerCase().includes(filter.toLowerCase()),
            ).map(({id, name, phone}) =>
        <li key={id} className={s.item}>
          <p>{name}</p>
          <p>{phone}</p>
          <button  className={s.btn} type='button' onClick={() => delContact(id)}>X</button>
        </li>)}
        </ul>)}
      </>
      )
};