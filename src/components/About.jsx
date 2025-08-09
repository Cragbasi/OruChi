import "../blocks/About.css";
import avatar from "../assets/Avatar.png";

function About() {
  return (
    <div className="about">
      <img className="about__avatar" src={avatar} alt="Avatar image"></img>
      <div className="about__text-container">
        <h2 className="about__title">About the author</h2>
        <p className="about__description">
          This block describes the project author. Here you should indicate your
          name, what you do, and which development technologies you know.
        </p>
        <p className="about__description">
          You can also talk about your experience with TripleTen, what you
          learned there, and how you can help potential customers.
        </p>
      </div>
    </div>
  );
}
export default About;
