import { Alert as ReactstrapAlert } from "reactstrap";
import { Notification } from "src/services/notifications.service"
import styles from "./alert.module.scss";

type AlertProps = {
  notification: Notification
  dismiss: () => void
};

const Alert: React.FC<AlertProps> = ({ notification, dismiss }) => {
  let message: string;
  let color = 'info'

  switch (notification.type) {
    case 'New Connection':
      message = `New Connection! ${notification.fromName} has added you to their bubble.`;
      color = 'info';
      break;
  }

  if (!message) return null

  return (
    <ReactstrapAlert
      color={color}
      toggle={dismiss}
      className="alert"
    >
      {message}
    </ReactstrapAlert>
  );
}

export default Alert;
