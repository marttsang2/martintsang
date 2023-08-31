// components/ThemeToggle.js
import { toggleTheme } from "@/utils/themeToggle";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

function ThemeToggle() {
  return (
    <label className="relative p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md inline-flex items-center cursor-pointer">
      <input  onClick={toggleTheme} type="checkbox" value="" className="sr-only peer" />
      <div className="relative">
        <IoSunnyOutline size={20} className='absolute top-0 visible dark:invisible' />
        <IoMoonOutline size={20} color='white' className='invisible dark:visible' />
      </div>
    </label>
  );
}

export default ThemeToggle;
