// components/ThemeToggle.js
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { useTheme } from 'next-themes'
import { useEffect, useState } from "react";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => setHasMounted(true), []);
  
  // this line is the key to avoid the error.
  if (!hasMounted) return null;

  return (
    <button type='button' className="relative p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md inline-flex items-center" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'light' && <IoSunnyOutline size={20} />}
      {theme ==='dark' && <IoMoonOutline size={20} color='white'/>}
    </button>
  );
}

export default ThemeToggle;
