import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import dashboardReducer from "./dashboard/dashboard.reducer";
import chefReducer from "./chef/chef.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"]
};

const rootReducer = combineReducers({
  user: userReducer,
  dashboard: dashboardReducer,
  chef: chefReducer
});

export default persistReducer(persistConfig, rootReducer);
