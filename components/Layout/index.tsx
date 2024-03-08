import Content from "../Content";
import Header from "../ui/header";

interface WrapperProps {
  children: React.ReactNode;
}
const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Content />
    </>
  );
};
export default Wrapper;
