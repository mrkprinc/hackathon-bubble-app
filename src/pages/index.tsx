import Head from "next/head";
import { useEffect } from "react";
import BaseLayout from "src/layouts/base-layout";
import BubbleVisual from "src/components/bubbleVisual";
import { useUser } from "src/context/userContext";
import { useBubble } from "src/context/bubbleContext";
import { ForceGraph } from "src/components/force-graph";

export default function Home() {
  // Our custom hook to get context values
  const { loadingUser, user } = useUser();
  const bubbleData = useBubble();

  // useEffect(() => {
  //   if (!loadingUser) {
  //     // You know that the user is loaded: either logged in or out!
  //     console.log(user);
  //   }
  //   if (bubbleData) {
  //     console.log('bubbleData', bubbleData);
  //   }
  // }, [loadingUser, user, bubbleData]);

  return (
    <BaseLayout>
      <BubbleVisual>
        <ForceGraph linksData={bubbleData.edges} nodesData={bubbleData.nodes} />
      </BubbleVisual>
    </BaseLayout>
  );
}
