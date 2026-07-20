export default function WhatsappFloat({
  phone = '59897154271',
  message = 'Hola José, vi tu web y quisiera consultarte algo',
}) {
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  return (
    <a
      href={href}
      className="whatsapp-float"
      title="Escribime por WhatsApp"
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg viewBox="0 0 24 24" width="56%" height="56%" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 5.5h16v10.5H9.5L5.5 19v-3H4Z" fill="#fff" stroke="none" />
        <path d="M8.3 9.2a3.6 3.6 0 0 0 3.9 3.9l1-1.4-2-.7-.5.6a2.4 2.4 0 0 1-1.9-1.9l.6-.5-.7-2Z" fill="#25D366" stroke="none" />
      </svg>
    </a>
  );
}
