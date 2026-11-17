export default function Eyebrow({ children, light = false }) {
  return (
    <div
      className={`inline-flex items-center gap-2 text-label-sm uppercase ${
        light ? "text-gold-400" : "text-forest-600"
      }`}
    >
      <span
        className={`w-8 h-[2px] ${light ? "bg-gold-400" : "bg-gold-500"}`}
      />
      <span>{children}</span>
    </div>
  );
}
