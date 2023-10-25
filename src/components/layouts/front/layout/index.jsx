import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import Header from "../header";
import Footer from "../footer";

import "./style.scss";

const FrontLayout = () => {
  return (
    <Fragment>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </Fragment>
  );
};

export default FrontLayout;
