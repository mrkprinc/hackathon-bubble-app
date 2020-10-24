import {
  Navbar,
  NavbarBrand,
  NavLink,
  NavbarToggler,
  Collapse,
  Nav,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import authService from "src/services/auth.service";

import AddToBubble from "src/components/addToBubble";
import styles from "./mainNav.module.scss";

const MainNav: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const toggleNav = () => setIsNavOpen(!isNavOpen);
  const toggleAdd = () => setIsAddOpen(!isAddOpen);

  return (
    <Navbar expand="md" light fixed="top" className={styles.navBar}>
      <Nav onClick={toggleNav}>
        <FontAwesomeIcon icon={faBars} />
      </Nav>
      <NavbarBrand className={styles.navBrand} href="/">
        MY BUBBLE
      </NavbarBrand>

      <Nav onClick={toggleAdd}>
        <FontAwesomeIcon icon={faPlusCircle} />
      </Nav>

      <Collapse navbar isOpen={isNavOpen}>
        <NavLink onClick={authService.signOut} role="button">
          Logout
        </NavLink>
      </Collapse>

      <Collapse navbar isOpen={isAddOpen}>
        <AddToBubble />
      </Collapse>
    </Navbar>
  );
};

export default MainNav;
