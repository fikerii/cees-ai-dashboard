export default function Loading() {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center overflow-y-auto modal z-99999">
        <div className="fixed inset-0 h-full w-full bg-gray-400/50 backdrop-blur-[32px] flex items-center justify-center">
          <div className="w-12 h-12 border-2 border-t-[#3b82f6] rounded-full animate-spin"></div>
        </div>
      </div>
    </>
  );
}
