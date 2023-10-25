import { configureStore } from "@reduxjs/toolkit";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import authReducer, { authName } from "../slice/auth";
import skillReducer, { skillName } from "../slice/skill";

const reducer = {
  [authName]: authReducer,
  [skillName]: skillReducer,
};
const store = configureStore({ reducer });

const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

StoreProvider.propTypes = {
  children: PropTypes.node,
};

export default StoreProvider;
