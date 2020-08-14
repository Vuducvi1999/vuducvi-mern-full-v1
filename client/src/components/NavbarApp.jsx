import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  Container,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

const NavbarApp = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md" className="py-0">
        <Container>
          <NavbarBrand href="/">
            <img
              src="https://img.icons8.com/color/48/000000/us-airborne.png"
              alt=""
            />
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="#">Hiện Tượng Cảm Ứng Điện Từ</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Dòng Điện Xoay Chiều</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">
                  Hiệu Điện Thế SOLO Cường Độ Dòng Điện
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarApp;
