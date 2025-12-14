import { ABOUT_RESPONSITE } from '../../constants/content';
import '../../styles/resident/auth.css';

const AboutCard = () => {
  return (
    <>
      <h2 className="about-title">{ABOUT_RESPONSITE.title}</h2>
      <div className="description-card">
        <p>{ABOUT_RESPONSITE.text}</p>
      </div>
    </>
  );
};

export default AboutCard;
