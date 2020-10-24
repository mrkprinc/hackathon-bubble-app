import Head from "next/head";
import MainNav from "src/components/nav/mainNav";
import { Container } from "reactstrap";
import styles from "./base-layout.module.scss";

type BaseLayoutProps = {};

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => (
  <>
    <Head>
      <title>Who's in my bubble?</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <MainNav />

    <div className={styles.container}>{children}</div>
  </>
);

BaseLayout.defaultProps = {};

export default BaseLayout;
