import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getFilterValue } from '../../redux/contactsSelectors';
import { ContactsItem } from './ContactsItem';
import { Loader } from '../ui/Loader';
import { useGetContactsQuery } from '../../services/contactsApi';
import { List, Text } from './ContactsList.styled';

export const ContactsList = () => {
  const filterValue = useSelector(getFilterValue);
  const {
    data: contacts,
    error,
    // isFetching,
    isLoading,
  } = useGetContactsQuery();

  const filteredContacts = contacts?.filter(({ name }) => {
    return name.toLowerCase().includes(filterValue.toLowerCase());
  });

  useEffect(() => {
    if (error) toast('Something went wrong. Please reload the page');
  }, [error]);

  if (isLoading) return <Loader size={50} />;

  return (
    <div>
      {filteredContacts?.length ? (
        <List>
          {filteredContacts.map(({ id, name, phone }) => (
            <ContactsItem key={id} id={id} name={name} number={phone} />
          ))}
        </List>
      ) : (
        <Text>Nothing to show</Text>
      )}
    </div>
  );
};
