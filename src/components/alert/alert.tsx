import { ReactNode } from "react";
import { UncontrolledAlert } from "reactstrap";
import styles from "./alert.module.scss";

type AlertProps = {
  children: ReactNode;
};

const Alert: React.FC<AlertProps> = ({ children }) => (
  <UncontrolledAlert color="info" className="alert">
    This is an alert
  </UncontrolledAlert>
);

export default Alert;
