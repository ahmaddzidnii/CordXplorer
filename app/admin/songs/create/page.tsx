import { notFound } from "next/navigation";

import { isValidStep } from "@/lib/validation/validation-step";
import { StepOne } from "@/components/admin/songs/create/step-1";
import { StepTwo } from "@/components/admin/songs/create/step-2";
import { StepThree } from "@/components/admin/songs/create/step-3";

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
    return <StepOne />;
  } else if (step === "2") {
    return <StepTwo />;
  } else if (step === "3") {
    return <StepThree />;
  }
}
