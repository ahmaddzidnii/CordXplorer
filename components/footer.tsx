import { Separator } from "./ui/separator";

export const Footer = () => {
  return (
    <footer className="container">
      <Separator className="mt-5" />
      <p className="my-5 text-end text-sm text-muted-foreground">
        Desain Web Portofolio ini sepenuhnya terinpirasi dari{" "}
        <a className="font-semibold underline" href="https://quuple.com">
          quuple.com
        </a>
      </p>
    </footer>
  );
};
