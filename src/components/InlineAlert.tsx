import {
  Checkmark24Regular,
  ErrorCircle24Regular,
} from "@fluentui/react-icons";

interface InlineAlertProps {
  variant: "success" | "error";
  message: string;
}

export default function InlineAlert({ variant, message }: InlineAlertProps) {
  const isSuccess = variant === "success";

  return (
    <div
      role="alert"
      className={`flex items-start gap-3 rounded-lg border p-4 ${
        isSuccess
          ? "border-success/30 bg-success/5 text-success"
          : "border-error/30 bg-error/5 text-error"
      }`}
    >
      <span className="mt-0.5 flex-shrink-0">
        {isSuccess ? (
          <Checkmark24Regular aria-hidden="true" />
        ) : (
          <ErrorCircle24Regular aria-hidden="true" />
        )}
      </span>
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
