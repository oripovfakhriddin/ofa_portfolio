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
import experiencesQuery, {
  experiencesName,
  experiencesReducer,
} from "../queries/experiences";
import accountQuery, { accountName, accountReducer } from "../queries/account";

const reducer = {
  [authName]: authReducer,
  [skillName]: skillReducer,
  [educationName]: educationReducer,
  [portfolioName]: portfolioReducer,
  [usersName]: usersReducer,
  [experiencesName]: experiencesReducer,
  [accountName]: accountReducer,
};

const store = configureStore({
  reducer,
  middleware: (getetDefaultMiddleware) =>
    getetDefaultMiddleware().concat([
      usersQuery.middleware,
      portfolioQuery.middleware,
      experiencesQuery.middleware,
      accountQuery.middleware,
    ]),
});

const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

StoreProvider.propTypes = {
  children: PropTypes.node,
};

export default StoreProvider;
