export default function Header() {
  return (
    <header className="w-full bg-green-700 text-white flex items-center justify-between px-6 py-3 shadow">
      <div className="flex items-center gap-3">
        <span className="font-semibold text-lg">FPO Shakti</span>
        <span className="text-sm opacity-80">Companies Act Registration</span>
      </div>
      <div className="flex items-center gap-4">
        <input
          type="search"
          placeholder="Search for"
          className="rounded-full px-4 py-1 text-sm text-gray-800 focus:outline-none"
        />
        <div className="w-8 h-8 rounded-full bg-white/20" />
      </div>
    </header>
  );
}
