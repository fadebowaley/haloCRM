import { Toaster as HotToaster, toast } from "react-hot-toast";

type ToasterProps = React.ComponentProps<typeof HotToaster>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <HotToaster
      toastOptions={{
        className: "bg-background text-foreground border-border shadow-lg",
        success: {
          className: "bg-green-500 text-white",
        },
        error: {
          className: "bg-red-500 text-white",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };