export default function InputField({ label, type, name, error }) {
  return (
    <div className="flex flex-col">
      <span className="ml-1">{label}</span>
      <input
        type={type}
        name={name}
        className="rounded-xl border px-4 py-2"
        required
      />
      <span className="ml-1 text-red-500 text-sm">{error}</span>
    </div>
  );
}
