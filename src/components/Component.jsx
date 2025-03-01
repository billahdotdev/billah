import '../styles/Component.css';
import masum from '../assets/masum.jpg';

const Component = () => {
  return (
    <div className="profile-container">
      <div className="profile-photo">
        <img src={masum} alt="Masum" />
      </div>
      <div className="profile-intro">
        <h1>I'll build modern website for you.</h1>
        <button className="profile-button">Let's work together!</button>
      </div>
    </div>
  );
};

export default Component;
