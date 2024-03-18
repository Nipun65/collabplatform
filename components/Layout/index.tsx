import Content from "../Content";
import FormWrapper from "../Form";
import Header from "../ui/header";

interface WrapperProps {
  children: React.ReactNode;
}
const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div className="relative h-full">
      <Header />
      {children}
      <Content />
      <FormWrapper />
    </div>
  );
};
export default Wrapper;
