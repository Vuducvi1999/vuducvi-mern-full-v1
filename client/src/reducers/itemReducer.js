// Bước 1.1 khi sử dụng REDUX, khởi tạo reducer
import { GET_ITEMS, ADD_ITEM, LOAD_ITEMS } from "../actions/actionTypes";
import { DELETE_ITEM } from "./../actions/actionTypes";

const initialState = {
  items: [],
  loading: false,
};

function itemReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ITEMS:
      return { ...state, loading: true };
    case GET_ITEMS:
      return { ...state, loading: false, items: action.payload };
    case ADD_ITEM:
      return { ...state, items: [action.payload, ...state.items] };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload),
      };
    default:
      return state;
  }
}

export default itemReducer;
