import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { VscClose } from 'react-icons/vsc';
import { useEffect } from 'react';
import { Loader } from '../../ui/Loader';
import { useDeleteContactMutation } from '../../../services/contactsApi';
import { Button, Item, Text } from './ContactsItem.styled';

export const ContactsItem = ({ id, name, number }) => {
  const [deleteContact, { isLoading, isError }] = useDeleteContactMutation();

  useEffect(() => {
    if (isError) toast('Something went wrong. Please reload the page');
  }, [isError]);

  return (
    <Item>
      <Text>{name}</Text>
      <Text>{number}</Text>
      <Button
        type="button"
        disabled={isLoading || isError}
        onClick={() => deleteContact(id)}
      >
        {isLoading ? <Loader size={15} /> : <VscClose size={20} />}
      </Button>
    </Item>
  );
};

ContactsItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
