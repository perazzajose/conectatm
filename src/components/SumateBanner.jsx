import { useNavigate } from 'react-router-dom';

export default function SumateBanner({ title, text, buttonLabel }) {
  const navigate = useNavigate();
  return (
    <div className="sumate-banner">
      <h3>{title}</h3>
      <p>{text}</p>
      <button className="sumate-btn" onClick={() => navigate('/#contacto')}>{buttonLabel} →</button>
    </div>
  );
}
