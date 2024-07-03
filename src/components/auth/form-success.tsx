import { CheckCircle2 } from "lucide-react";

function FormSuccess({ message }: { message?: string }): JSX.Element | null {
  if (!message) return null;

  return (
    <div className="my-4 flex items-center gap-2 rounded-md bg-teal-400/25 p-3 text-xs font-medium text-secondary-foreground">
      <CheckCircle2 className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
}

export default FormSuccess;
