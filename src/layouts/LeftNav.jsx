import { NavLink } from "react-router-dom";

const linkBase =
  "block px-4 py-2 rounded text-sm font-medium hover:bg-green-100";
const linkActive = "bg-green-200 text-green-900";

export default function LeftNav() {
  return (
    <aside className="w-56 border-r bg-white">
      <nav className="p-4 space-y-1">
        <NavLink
          to="/register"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : "text-gray-700"}`
          }
        >
          Registration
        </NavLink>
        {/* Extend with more nav links as needed */}
      </nav>
    </aside>
  );
}
