export default function Button({
  child,
  className = "",
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  ...prop
}) {
  return (
    <button
      className={`px-4 py-2 rounded-lg cursor-pointer ${bgColor} ${textColor} ${className}`}
      {...prop}
    >
      {child}
    </button>
  );
}
