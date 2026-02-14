import { Loader2 } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Loader2 className="animate-spin h-10 w-10 text-blue-600" />
    </div>
  );
}