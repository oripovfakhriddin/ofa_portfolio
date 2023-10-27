import { Fragment } from "react";
import "./style.scss";
const HomePage = () => {
  return (
    <Fragment>
      <section id="home">
        <div className="container">
          <div className="hero__container">
            <h1 className="hero__title">I am <span>WEB DEVELOPER</span></h1>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default HomePage;
