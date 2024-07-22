import { MediaPlayerAdmin } from "./_components/media-player";
import FormAddMusic from "./_components/form-music";
import { FormSection } from "./_components/form-section/form-section";
import { isValidStep } from "./track-step";
import { notFound } from "next/navigation";
import { Step2Component } from "../_components/step-2";

export const metadata = {
  title: "Add Music",
};

export default function SongsAdminCreatePage({
  searchParams,
}: {
  searchParams: {
    step: string;
    [key: string]: string;
  };
}) {
  const { step } = searchParams;

  if (!isValidStep(step)) {
    return notFound();
  }

  if (step === "1" || step === undefined || step === "" || step === null) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="pb-5 ">
          <h3 className="text-2xl font-bold tracking-tight">Add Information About Song</h3>
          <p className="text-muted-foreground"> Please enter the information about the song.</p>
        </div>
        <FormAddMusic />
        {/* <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <div className="space-y-5">
            <MediaPlayerAdmin />
          </div>
          <div className="space-y-5 order-first">
            <FormAddMusic />
          </div>
        </div> */}
      </div>
    );
  } else if (step === "2") {
    return <Step2Component />;
  }
}
