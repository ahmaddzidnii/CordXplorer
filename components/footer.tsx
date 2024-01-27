import { Separator } from "./ui/separator";

export const Footer = () => {
  return (
    <footer className="container">
      <Separator className="mt-5" />
      <p className="text-sm text-muted-foreground text-end my-5">
        Copyright &copy; {new Date().getFullYear()}. All rights reserved.
      </p>
    </footer>
  );
};
