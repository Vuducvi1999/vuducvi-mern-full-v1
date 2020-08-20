import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";
import { register, login, logout } from "../actions/authActions";

function AuthModal(props) {
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const toggle = () => setModal(!modal);
  const toggle1 = () => setModal1(!modal1);
  const onSubmit = (e) => {
    e.preventDefault();
    props.register(name, email, pass);
    setName("");
    setEmail("");
    setPass("");
  };
  const onSubmit1 = (e) => {
    e.preventDefault();
    props.login(email, pass);
    setName("");
    setEmail("");
    setPass("");
  };
  const logOut = () => {
    props.logout();
  };
  return (
    <div className="mb-3">
      <Button color="primary" onClick={toggle} className="mr-3">
        Đăng ký
      </Button>
      <Button color="success" onClick={toggle1} className="mr-3">
        Đăng nhập
      </Button>
      {props.auth.token ? (
        <Button color="success" onClick={logOut}>
          Đăng xuất
        </Button>
      ) : (
        ""
      )}
      {props.error.msg ? (
        <Alert color="danger" className="mt-1">
          {props.error.msg}
        </Alert>
      ) : (
        ""
      )}
      {/* modal đăng nhập */}
      <Modal isOpen={modal1}>
        <ModalHeader toggle={toggle1}>Login</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit1}>
            <FormGroup>
              <Label for="email1">Email</Label>
              <Input
                type="email"
                name="email"
                id="email1"
                placeholder="Require"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword1">Password</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword1"
                placeholder="Require"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </FormGroup>
            <Button
              type="submit"
              color="secondary"
              onClick={toggle1}
              className="btn-block"
            >
              Submit
            </Button>
          </Form>
        </ModalBody>
      </Modal>
      {/* modal đăng ký */}
      <Modal isOpen={modal}>
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Require"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Require"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="Require"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </FormGroup>
            <Button
              type="submit"
              color="secondary"
              onClick={toggle}
              className="btn-block"
            >
              Submit
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

const mapState = (state) => {
  return {
    error: state.error,
    auth: state.auth,
  };
};

export default connect(mapState, { register, login, logout })(AuthModal);
