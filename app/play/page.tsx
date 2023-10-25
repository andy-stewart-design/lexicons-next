import ColorPicker from "@components/ColorPicker";

export default function Play() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="grow max-w-[320px] bg-blue-700">
        <ColorPicker />
      </div>
    </div>
  );
}
