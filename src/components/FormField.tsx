interface FormFieldProps {
  name: string;
  label: string;
  type?: "text" | "email" | "textarea" | "select";
  required?: boolean;
  error?: string;
  rows?: number;
  placeholder?: string;
  children?: React.ReactNode; // for select options
  value?: string;
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
}

export default function FormField({
  name,
  label,
  type = "text",
  required,
  error,
  rows = 5,
  placeholder,
  children,
  value,
  onChange,
}: FormFieldProps) {
  const id = `field-${name}`;
  const errorId = `${id}-error`;

  const baseClasses =
    "block w-full rounded-lg border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50";
  const borderClass = error ? "border-error" : "border-border";
  const className = `${baseClasses} ${borderClass}`;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
        {required && <span className="ml-1 text-error">*</span>}
      </label>

      <div className="mt-1.5">
        {type === "textarea" ? (
          <textarea
            id={id}
            name={name}
            rows={rows}
            required={required}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={`${className} resize-y`}
          />
        ) : type === "select" ? (
          <select
            id={id}
            name={name}
            required={required}
            value={value}
            onChange={onChange}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={className}
          >
            {children}
          </select>
        ) : (
          <input
            id={id}
            name={name}
            type={type}
            required={required}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={className}
          />
        )}
      </div>

      {error && (
        <p id={errorId} className="mt-1.5 text-sm text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
