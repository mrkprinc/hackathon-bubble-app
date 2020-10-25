import Alert from "src/components/alert/alert";
import BaseLayout from "src/layouts/base-layout";
import BubbleVisual from "src/components/bubbleVisual/bubbleVisual";
import Loading from "src/components/loading/loading";
import Login from "src/components/login/login";
import BubbleSummary from "src/components/bubble-summary/bubbleSummary";
import { useUser } from "src/context/userContext";
import { useBubble } from "src/context/bubbleContext";
import { ForceGraph } from "src/components/force-graph";
import notificationService from "src/services/notifications.service"
import { Progress } from 'reactstrap';

export default function Home() {
  // Our custom hook to get context values
  const { loadingUser, user } = useUser();
  const bubbleData = useBubble();

  return (
    <>
      {user && (
        <BaseLayout>
          {user.notifications?.map((notification, idx) => (
            <Alert
              key={idx}
              notification={notification}
              dismiss={() =>
                notificationService.dismissNotification(user, notification)
              }
            />
          ))}
          <BubbleVisual>
            <ForceGraph
              linksData={bubbleData.edges}
              nodesData={bubbleData.nodes}
            />
          </BubbleVisual>
          <BubbleSummary
            title="Immediate Bubble Size"
            count={Object.keys(bubbleData.usersData).length}
            max={10}
            extra={user.extraBubbleMembers}
          />
          <BubbleSummary
            title="Extended Bubble Size "
            count={bubbleData.nodes.length}
            max={10}
            extra={bubbleData.totalExtraBubbleMembers}
          />
          <div style={{ width: '100%', maxWidth: 400, margin: "0 auto"}}>
            <Progress multi>
              <Progress bar color="secondary" value={40}>MyBubble users</Progress>
              <Progress bar color="secondary" style={{opacity: 0.6}} value={30}>Extra Connections</Progress>
            </Progress>
          </div>
        </BaseLayout>
      )}
      {loadingUser && <Loading />}
      {!user && !loadingUser && <Login />}
    </>
  );
}
