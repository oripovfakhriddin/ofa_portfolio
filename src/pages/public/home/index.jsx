import { Fragment } from "react";
import "./style.scss";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigate = useNavigate();
  const loginNavigate = () => {
    navigate("/login")
  };
  const registerNavigate = () => {
    navigate("/register")
  };
  return (
    <Fragment>
      <section>
        <div className="container">
          <div className="home__container">
            <Button onClick={loginNavigate}>Login</Button>
            <Button onClick={registerNavigate}>Register</Button>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default HomePage;
