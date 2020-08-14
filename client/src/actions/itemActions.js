// Bước 1.2 khi sử dụng REDUX, tạo action cho reducer
// với cách thức mới liệu có còn coi thường action creator nữa không
import { GET_ITEMS, ADD_ITEM, LOAD_ITEMS } from "./actionTypes";
import { DELETE_ITEM } from "./actionTypes";

export const loadItems = () => {
  return { type: LOAD_ITEMS };
};

export const getItems = () => (dispatch) => {
  dispatch(loadItems());
  fetch("/api/items")
    .then((res) => res.json())
    .then((payload) => dispatch({ type: GET_ITEMS, payload }));
};

// Lối đi cũ: phải thông qua mapDispatchToProps để dispatch thủ công
// export const setItem = (payload) => {
//   return { type: ADD_ITEM, payload };
// };
// export const delItem = (payload) => {
//   return { type: DELETE_ITEM, payload };
// };

// Lối đi mới: khi gọi đến action là sẽ tự động dispatch luôn mà không cần mapDispatchToProps
export const setItem = (payload) => (dispatch) => {
  fetch("/api/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: payload }),
  })
    .then((res) => res.json())
    .then((payload) => dispatch({ type: ADD_ITEM, payload }));
};

export const delItem = (payload) => (dispatch) => {
  fetch("api/items/" + payload, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({ type: DELETE_ITEM, payload });
    });
};
