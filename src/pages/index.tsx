import Head from "next/head";
import { useEffect } from "react";
import BaseLayout from "src/layouts/base-layout";
import BubbleVisual from "src/components/bubbleVisual";
import { useUser } from "src/context/userContext";
import { useBubble } from "src/context/bubbleContext";

import data from "../data/data.json";
import { ForceGraph } from "src/components/force-graph";

export default function Home() {
  // Our custom hook to get context values
  const { loadingUser, user } = useUser();
  const bubbleData = useBubble();

  useEffect(() => {
    if (!loadingUser) {
      // You know that the user is loaded: either logged in or out!
      console.log(user);
    }
    if (bubbleData) {
      // You know that the user is loaded: either logged in or out!
      console.log("bubbleData", bubbleData);
    }
  }, [loadingUser, user, bubbleData]);

  const hasArrayData = (d: Array<any>) => d && d.length > 0;

  return (
    <BaseLayout>
      <BubbleVisual>
        hello
        {hasArrayData(bubbleData.links) && hasArrayData(bubbleData.nodes) && (
          <ForceGraph
            linksData={bubbleData.links as any}
            nodesData={bubbleData.nodes as any}
          />
        )}
      </BubbleVisual>
    </BaseLayout>
  );
}
