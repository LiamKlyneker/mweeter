import Typography from "../atoms/typography";

type FormFieldProps = {
  label: string;
  children: React.ReactNode;
  error?: string;
};

export default function FormField(props: FormFieldProps) {
  const { children, label, error } = props;

  return (
    <div className="flex flex-col">
      <label className="mb-1 text-sm font-semibold text-gray-700">
        {label}
      </label>
      {children}
      {error && (
        <Typography className="text-red-600 text-sm font-normal mt-2">
          *{error}
        </Typography>
      )}
    </div>
  );
}
