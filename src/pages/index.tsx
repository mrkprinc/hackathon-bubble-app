import Head from "next/head";
import { useEffect } from "react";
import Alert from "src/components/alert/alert";
import BaseLayout from "src/layouts/base-layout";
import BubbleVisual from "src/components/bubbleVisual/bubbleVisual";
import Login from "src/components/login/login";
import BubbleSummary from "src/components/bubble-summary/bubbleSummary";
import ConnectionCard from "src/components/connectionCard/connectionCard";
import { useUser } from "src/context/userContext";
import { useBubble } from "src/context/bubbleContext";
import { ForceGraph } from "src/components/force-graph";
import notificationService from 'src/services/notifications.service'

export default function Home() {
  // Our custom hook to get context values
  const { loadingUser, user } = useUser();
  const bubbleData = useBubble();

  return (
    <>
      {user ? (
        <BaseLayout>
          {user.notifications?.map((notification, idx) => (
            <Alert
              key={idx}
              notification={notification}
              dismiss={() => notificationService.dismissNotification(user, notification)}
            />
          ))}

            <ConnectionCard name={user.displayName} mutualConnections={bubbleData.nodes.length} totalConnections={Object.keys(bubbleData.usersData).length} isWorkSchool={true} imageUrl={user.photoURL} />
          <BubbleVisual>
            <ForceGraph
              linksData={bubbleData.edges}
              nodesData={bubbleData.nodes}
            />
          </BubbleVisual>
          <BubbleSummary title="Total of pepple in your close bubble" count={Object.keys(bubbleData.usersData).length} max={10}/>
          <BubbleSummary title="Total of people in your bubble" count={bubbleData.nodes.length} max={10}/>

          <div>
            <button
              onClick={() => notificationService.sendNotificationToUsers(
                Array.from(bubbleData.uniqueIds),
                { type: 'Possible Exposure Warning' },
              )}
            >
              I was possibly exposed to Covid-19.
            </button>

            <button
              onClick={() => notificationService.sendNotificationToUsers(
                Array.from(bubbleData.uniqueIds),
                { type: 'Possible Exposure Warning' }
              )}
            >
              I have tested positive for Covid-19.
            </button>
          </div>
        </BaseLayout>
      ) : (
        <Login />
      )}
    </>
  );
}
