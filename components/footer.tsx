import { Separator } from "./ui/separator";

export const Footer = () => {
  return (
    <footer className="container ">
      <Separator className="mt-5" />
      <p className="text-sm text-muted-foreground text-end my-5">
        Desain Web Portofolio ini sepenuhnya terinpirasi dari{" "}
        <a
          className="underline font-semibold"
          href="https://quuple.com"
        >
          quuple.com
        </a>
      </p>
    </footer>
  );
};
