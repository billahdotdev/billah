import '../styles/Component.css';
import masum from '../assets/masum.jpg';

const Component = () => {
  return (
    <div className="profile-container">
      <div className="profile-photo">
        <img src={masum} alt="Masum" />
      </div>
      <div className="profile-intro">
        <h1>I'm a Web developer from the future!</h1>
      </div>
    </div>
  );
};

export default Component;
