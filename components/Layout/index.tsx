import Content from "@/components/Content";
import FormWrapper from "@/components/Form";
import Header from "@/components/ui/header";

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
