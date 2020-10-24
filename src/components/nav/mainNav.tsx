import { Navbar, NavbarBrand, NavLink, Collapse, Nav } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import authService from "src/services/auth.service";

import AddToBubble from "src/components/addToBubble/addToBubble";
import styles from "./mainNav.module.scss";

const MainNav: React.FC = () => {
  const [navStatus, setNavStatus] = useState({
    isNavOpen: false,
    isAddOpen: false,
  });

  const toggleNav = () =>
    setNavStatus({ isNavOpen: !navStatus.isNavOpen, isAddOpen: false });
  const toggleAdd = () =>
    setNavStatus({ isAddOpen: !navStatus.isAddOpen, isNavOpen: false });

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

      <Collapse navbar isOpen={navStatus.isNavOpen}>
        <NavLink onClick={authService.signOut} role="button">
          Logout
        </NavLink>
      </Collapse>

      <Collapse navbar isOpen={navStatus.isAddOpen}>
        <AddToBubble />
      </Collapse>
    </Navbar>
  );
};

export default MainNav;
