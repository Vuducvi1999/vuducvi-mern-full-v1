// Bước 1.3 khi sử dụng REDUX, combineReducers
import itemReducer from "./itemReducer";

const { combineReducers } = require("redux");

const rootReducer = combineReducers({
  item: itemReducer,
});

export default rootReducer;
