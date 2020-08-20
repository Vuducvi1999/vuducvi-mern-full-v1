import { GET_ERRORS, CLEAR_ERRORS } from "../actions/actionTypes";

const initState = {
  msg: "",
  status: null,
  id: null,
};

export default function (state = initState, action) {
  switch (action.type) {
    case GET_ERRORS:
      const { msg, status, id } = action.payload;
      return { msg, status, id };
    case CLEAR_ERRORS:
      return initState;
    default:
      return state;
  }
}
