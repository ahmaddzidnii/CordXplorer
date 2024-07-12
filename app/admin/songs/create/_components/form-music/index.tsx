import { Separator } from "@/components/ui/separator";
import { AccountForm } from "./add-music-form";

export default function FormAddMusic() {
  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Update your account settings. Set your preferred language and timezone.
      </p>

      <Separator />
      <AccountForm />
    </div>
  );
}
