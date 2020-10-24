import Head from "next/head";
import { useEffect } from "react";
import BaseLayout from "src/layouts/base-layout";
import BubbleVisual from "src/components/bubbleVisual";
import { useUser } from "src/context/userContext";

export default function Home() {
  // Our custom hook to get context values
  const { loadingUser, user } = useUser();

  useEffect(() => {
    if (!loadingUser) {
      // You know that the user is loaded: either logged in or out!
      console.log(user);
    }
  }, [loadingUser, user]);

  return (
    <BaseLayout>
      <BubbleVisual />
    </BaseLayout>
  );
}
