import Icon, { icons } from './Icon';
import { waLink } from '../data/contacto';

export default function WhatsappFloat({ message }) {
  return (
    <a
      href={waLink(message)}
      className="whatsapp-float"
      aria-label="Escribime por WhatsApp"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon size="28">{icons.whatsapp}</Icon>
    </a>
  );
}
