import BaseLayout from "src/layouts/base-layout";
import Login from "src/components/login/login";
import { useUser } from "src/context/userContext";
import { useBubble } from "src/context/bubbleContext";
import { Button, CustomInput } from "reactstrap";
import notificationService from "src/services/notifications.service";
import styles from "./profile.module.scss";

export default function Profile() {
  // Our custom hook to get context values
  //   const { loadingUser, user } = useUser();
  const bubbleData = useBubble();

  return (
    <>
      <BaseLayout>
        <div className={styles.container}>
          <h4>Profile</h4>

          <div className={styles.section}>
            <h6>External Organizations</h6>
            <CustomInput
              type="switch"
              id="externalOrgSwitch"
              label="I am exposed to an external organization such as school or work."
            />
          </div>
          <div className={styles.section}>
            <h6>Covid-19 Exposure </h6>
            <p>
              Anonymously notify those in your bubble of exposure to Covid-19.
            </p>
            <Button
              color="warning"
              onClick={() =>
                notificationService.sendNotificationToUsers(
                  Array.from(bubbleData.uniqueIds),
                  { type: "Possible Exposure Warning" }
                )
              }
            >
              I was possibly exposed to Covid-19.
            </Button>
            <Button
              color="danger"
              onClick={() =>
                notificationService.sendNotificationToUsers(
                  Array.from(bubbleData.uniqueIds),
                  { type: "Possible Exposure Warning" }
                )
              }
            >
              I have tested positive for Covid-19.
            </Button>
          </div>
        </div>
      </BaseLayout>
    </>
  );
}
