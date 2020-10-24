import Head from "next/head";
import { useEffect } from "react";
import Alert from "src/components/alert/alert";
import BaseLayout from "src/layouts/base-layout";
import BubbleVisual from "src/components/bubbleVisual/bubbleVisual";
import Login from "src/components/login/login";
import { useUser } from "src/context/userContext";
import { useBubble } from "src/context/bubbleContext";
import { ForceGraph } from "src/components/force-graph";

export default function Home() {
  // Our custom hook to get context values
  const { loadingUser, user } = useUser();
  const bubbleData = useBubble();

  return (
    <>
      {user ? (
        <BaseLayout>
          <Alert>
            <>hello</>
          </Alert>
          <BubbleVisual>
            <ForceGraph
              linksData={bubbleData.edges}
              nodesData={bubbleData.nodes}
            />
          </BubbleVisual>
        </BaseLayout>
      ) : (
        <Login />
      )}
    </>
  );
}
