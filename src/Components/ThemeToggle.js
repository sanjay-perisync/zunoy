import { useState } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className={`w-14 h-7 flex items-center  rounded-full transition-all duration-300 ${
        isDark ? "bg-gray-400" : "bg-gray-400"
      }`}
    >
      <div
        className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 ${
          isDark ? "translate-x-7 bg-blue-900" : "translate-x-0 bg-slate-800 "
        }`}
      >
        {isDark ? <Moon size={16} className="text-white" /> : <Sun size={16} className="text-white " />}
      </div>
    </button>
  );
};

export default ThemeToggle;
