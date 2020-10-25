import BaseLayout from "src/layouts/base-layout";
import Login from "src/components/login/login";
import { useUser } from "src/context/userContext";
import { useBubble } from "src/context/bubbleContext";
import { Button, CustomInput, Input, FormText } from "reactstrap";
import notificationService, { Notification } from "src/services/notifications.service";
import ConnectionCard from "src/components/connectionCard/connectionCard";
import styles from "./profile.module.scss";
import bubbleService from 'src/services/bubble.service';

export default function Profile() {
  const { loadingUser, user } = useUser();
  const bubbleData = useBubble();

  if (!user) return null

  const setExternalOrg = (checked: boolean) => {
    bubbleService.updateSetting(user, 'externalOrg', checked);
  }

  const setExtraBubbleMembers = (num: number) => {
    bubbleService.updateSetting(user, 'extraBubbleMembers', +num);
  }

  const notifyUsersInBubble = (notification: Notification) => {
    const ids = new Set(bubbleData.uniqueIds);
    ids.delete(user.id);
    notificationService.sendNotificationToUsers(Array.from(ids), notification)
  }

  return (
    <>
      <BaseLayout>
        <div className={styles.container}>
          <h4>Profile</h4>

          <div className={styles.section}>
            <h6>Extra Bubble Members</h6>
            <Input
              type="number"
              min={0}
              value={user.extraBubbleMembers || 0}
              onChange={(e) => setExtraBubbleMembers(e.target.value)}
              className="w-auto d-inline-block"
            />
            <FormText>How many people without an account are in your bubble?</FormText>
          </div>

          <div className={styles.section}>
            <h6>External Organizations</h6>
            <CustomInput
              type="switch"
              id="externalOrgSwitch"
              label="I am exposed to an external organization such as school or work."
              checked={!!user.externalOrg}
              onChange={(e) => setExternalOrg(e.target.checked)}
            />
          </div>
  
          <div className={styles.section}>
            <h6>Covid-19 Exposure </h6>
            <p>
              Anonymously notify those in your bubble of exposure to Covid-19.
            </p>
            <Button
              color="warning"
              onClick={() => notifyUsersInBubble({ type: "Possible Exposure Warning" })}
            >
              I was possibly exposed to Covid-19.
            </Button>
            <Button
              color="danger"
              onClick={() => notifyUsersInBubble({ type: 'Positive Test Warning' })}
            >
              I have tested positive for Covid-19.
            </Button>
          </div>
          <div className={styles.section}>
            <h6>My Connections</h6>
            {Object.entries(bubbleData.usersData).map(([_id, userData]) => {
              return userData.id !== user.id ? <ConnectionCard key={userData.id} connection={userData} /> : null
            })}
          </div>
        </div>
      </BaseLayout>
    </>
  );
}
