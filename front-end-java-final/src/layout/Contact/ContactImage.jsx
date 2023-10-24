import contactImage from '../../assets/img/contact.jpeg';

function ContactImage() {
  return (
    <div>
      <img
        src={contactImage}
        alt="Contact"
        className="object-contain mx-auto"
      />
    </div>
  );
}

export default ContactImage;
