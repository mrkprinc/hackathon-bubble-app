import Link from "next/link";
import { Navbar, NavbarToggler, Collapse, Nav } from "reactstrap";
import { useState } from "react";

const MainNav: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  return (
    <Navbar expand="md" light fixed="top">
      <Link href="/" as="/">
        <a>My Bubble</a>
      </Link>
      <Nav navbar>Add to my Bubble</Nav>
      <NavbarToggler onClick={toggleNav} />
      <Collapse navbar isOpen={isNavOpen}>
        <Nav navbar>Linkkk</Nav>
      </Collapse>
    </Navbar>
  );
};

export default MainNav;
