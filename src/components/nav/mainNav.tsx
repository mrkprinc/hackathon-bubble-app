import Link from "next/link";
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
      <Nav onClick={toggleNav} className="mr-3">
        <FontAwesomeIcon icon={faBars} />
      </Nav>

      <Link passHref href="/">
        <NavbarBrand className={styles.navBrand}>MYBUBBLE</NavbarBrand>
      </Link>

      <Nav onClick={toggleAdd}>
        <FontAwesomeIcon icon={faPlusCircle} />
      </Nav>

      <Collapse navbar isOpen={navStatus.isNavOpen}>
        <Link passHref href="/">
          <NavLink active>My Bubble</NavLink>
        </Link>
        <Link passHref href="/profile">
          <NavLink active>Profile</NavLink>
        </Link>
        <NavLink onClick={authService.signOut}>Logout</NavLink>
      </Collapse>

      <Collapse navbar isOpen={navStatus.isAddOpen}>
        <AddToBubble />
      </Collapse>
    </Navbar>
  );
};

export default MainNav;
