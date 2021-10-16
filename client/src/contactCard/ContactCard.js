import './contactCard.css';

export const ContactCard = ({ onEditContact, onDeleteContact, contact }) => {
  return (
    <div className='contact_card'>
      <div className='contact_block'>
        <div className='contact_avatar'>{contact.name[0].toUpperCase()}</div>
        <div className='contact_info'>
          <div className='contact_name'>{`${contact.name} ${contact.surname}`}</div>
          <div className='contact_email'>{contact.email}</div>
        </div>
      </div>

      <div className='contact_action'>
        <div onClick={() => onEditContact(contact.id)}>
          <span
            className='iconify card_action_icon'
            data-icon='system-uicons:pen'
          ></span>
        </div>
        <div onClick={() => onDeleteContact(contact.id)}>
          <span
            className='iconify card_action_icon'
            data-icon='system-uicons:trash'
          ></span>
        </div>
      </div>
    </div>
  );
};
