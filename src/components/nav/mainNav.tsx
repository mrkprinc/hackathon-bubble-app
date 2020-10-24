import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavItem,
  NavbarToggler,
  Collapse,
  Nav,
} from "reactstrap";
import { useState } from "react";
import styles from "./mainNav.module.scss";

const MainNav: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  return (
    <Navbar expand="md" light fixed="top" className={styles.navBar}>
      <NavbarToggler onClick={toggleNav} />
      <NavbarBrand href="/">My Bubble</NavbarBrand>
      <Nav>Add to my Bubble</Nav>

      <Collapse navbar isOpen={isNavOpen}>
        <Nav navbar>Logout</Nav>
      </Collapse>
    </Navbar>
  );
};

export default MainNav;
