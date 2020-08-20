// Bước 1.3 khi sử dụng REDUX, combineReducers
import itemReducer from "./itemReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

const { combineReducers } = require("redux");

const rootReducer = combineReducers({
  item: itemReducer,
  auth: authReducer,
  error: errorReducer,
});

export default rootReducer;
