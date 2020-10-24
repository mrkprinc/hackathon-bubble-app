import MainNav from "src/components/nav";
import { Container } from "reactstrap";

type BaseLayoutProps = {};

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => (
  <>
    <MainNav />
    <div>
      <Container>{children}</Container>
    </div>
  </>
);

BaseLayout.defaultProps = {};

export default BaseLayout;
