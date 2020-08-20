// Bước 4 khi sử dụng REDUX, connect React-Redux
import React, { useEffect } from "react";
import { Container, ListGroup, Button, ListGroupItem } from "reactstrap";
import { connect } from "react-redux";
import { getItems, setItem, delItem } from "./../actions/itemActions";
import { loadUser } from "./../actions/authActions";
import AuthModal from "./AuthModal";

function ShoppingList(props) {
  useEffect(() => {
    props.loadUser();
    props.getItems();
  }, [props.auth.token]);

  const items = props.item.items;
  console.log("items", items);
  return (
    <Container className="mt-3">
      <AuthModal />
      {props.auth.isAuth ? (
        <>
          <Button
            color="info"
            onClick={() => {
              const nameItem = prompt("Tạo mới item:");
              if (nameItem) props.setItem(nameItem);
            }}
          >
            Create new item
          </Button>
          <ListGroup className="mt-3">
            {items.map((item) => {
              return (
                <ListGroupItem key={item._id}>
                  <Button
                    color="danger mr-3"
                    size="sm"
                    style={{ boxShadow: "none" }}
                    onClick={() => {
                      props.delItem(item._id);
                    }}
                  >
                    &times;
                  </Button>
                  {item.name}
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </>
      ) : (
        ""
      )}
    </Container>
  );
}

const state2Props = (state) => {
  return {
    item: state.item,
    auth: state.auth,
  };
};
// Lối đi cũ
// const dispatch2Props = (dispatch) => {
//   return {
//     getItems: () => dispatch(getItems()),
//     setItem: (payload) => dispatch(setItem(payload)),
//     delItem: (payload) => dispatch(delItem(payload)),
//   };
// };

// Lối đi mới
export default connect(state2Props, { loadUser, getItems, setItem, delItem })(
  ShoppingList
);
