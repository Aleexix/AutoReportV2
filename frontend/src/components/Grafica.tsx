import React, { useContext, useState } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { ThemeContext } from '../context/Themecontext';
interface CardProps {
  title: string;
  usd: number;
  w2w: number;
  diff: number;
  direction: 'up' | 'down';
}
const Card: React.FC<CardProps> = ({ title, usd, w2w, diff, direction }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('Mes 1');
  const { darkMode } = useContext(ThemeContext)!;
  const isUp = direction === 'up';
  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const selectMonth = (month: string) => {
    setSelectedMonth(month);
    setShowDropdown(false);
  };
  return (
    <div
      className={`border border-black rounded-md p-4 w-full sm:w-72 h-52 relative flex flex-col justify-between shadow-md transition-colors duration-300 ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
      }`}
    >
      <div className="absolute top-2 right-2">
        <button
          onClick={toggleDropdown}
          className="flex items-center border-2 border-black px-2 py-1 text-xs font-semibold"
        >
          {selectedMonth} <ArrowDown className="w-4 h-4 ml-1" />
        </button>
        {showDropdown && (
          <ul
            className={`absolute right-0 mt-1 w-24 border border-black rounded shadow z-10 text-sm ${
              darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'
            }`}
          >
            {['Mes 1', 'Mes 2', 'Mes 3'].map((month) => (
              <li
                key={month}
                onClick={() => selectMonth(month)}
                className="cursor-pointer px-2 py-1 hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                {month}
              </li>
            ))}
          </ul>
        )}
      </div>
      <h2 className="text-green-500 text-lg font-bold">{title}</h2>
      <div className="text-sm">
        <p>USD ACTUAL: {usd.toFixed(2)}</p>
        <p>W2W: {w2w.toFixed(2)}</p>
      </div>
      <div className="flex justify-end items-center text-sm font-bold">
        <span className="mr-1">{Math.abs(diff).toFixed(2)}$</span>
        {isUp ? (
          <ArrowUp className="text-green-500 w-6 h-6" />
        ) : (
          <ArrowDown className="text-red-500 w-6 h-6" />
        )}
      </div>
    </div>
  );
};
export default Card;