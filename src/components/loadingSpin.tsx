export default function Loader() {
  return (
    <div className="relative w-[100px] h-[100px] rounded-full border-[24px] border-white animate-spin">
      <span className="absolute left-[75px] top-1/2 -translate-y-1/2 w-[15px] h-[15px] bg-white rounded-full animate-ping"></span>
      <span className="absolute left-[75px] top-1/2 -translate-y-1/2 w-[15px] h-[15px] bg-white rounded-full animate-ping delay-1000"></span>
    </div>
  );
}