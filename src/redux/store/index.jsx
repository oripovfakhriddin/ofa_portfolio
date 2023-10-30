import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import PropTypes from "prop-types";

import authReducer, { authName } from "../slice/auth";
import skillReducer, { skillName } from "../slice/skill";
import educationReducer, { educationName } from "../slice/education";
import portfolioQuery, {
  portfolioName,
  portfolioReducer,
} from "../queries/portfolios";
import usersQuery, { usersName, usersReducer } from "../queries/users";

const reducer = {
  [authName]: authReducer,
  [skillName]: skillReducer,
  [educationName]: educationReducer,
  [portfolioName]: portfolioReducer,
  [usersName]: usersReducer,
};

const store = configureStore({
  reducer,
  middleware: (getetDefaultMiddleware) =>
    getetDefaultMiddleware().concat([
      usersQuery.middleware,
      portfolioQuery.middleware,
    ]),
});

const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

StoreProvider.propTypes = {
  children: PropTypes.node,
};

export default StoreProvider;
