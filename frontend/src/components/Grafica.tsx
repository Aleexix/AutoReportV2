import React, { useContext, useState } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { ThemeContext } from '../context/Themecontext';

interface CardProps {
  title: string;
  m1: number;
  m2: number;
  m3: number;
  lastWeekValues: {
    m1: number;
    m2: number;
    m3: number;
  };
}


const Card: React.FC<CardProps> = ({ title, m1, m2, m3, lastWeekValues }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<'m1' | 'm2' | 'm3'>('m1');
  const { darkMode } = useContext(ThemeContext)!;

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const selectMonth = (month: 'm1' | 'm2' | 'm3') => {
    setSelectedMonth(month);
    setShowDropdown(false);
  };

  // Obtiene los valores actual y de la semana pasada según el mes seleccionado
  const currentValue = selectedMonth === 'm1' ? m1 : selectedMonth === 'm2' ? m2 : m3;
  const lastWeekValue = selectedMonth === 'm1' ? lastWeekValues.m1 : 
                       selectedMonth === 'm2' ? lastWeekValues.m2 : 
                       lastWeekValues.m3;

  // Cálculo de diferencias
  const monthlyDiff = m3 - m1;
  const isMonthlyUp = m3 >= m1;
  const w2wDiff = currentValue - lastWeekValue;
  const isW2WUp = w2wDiff >= 0;

  return (
    <div className={`border border-black rounded-md p-4 w-full sm:w-72 h-52 relative flex flex-col justify-between shadow-md transition-colors duration-300 ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
      }`}>
      <div className="absolute top-2 right-2">
        <button onClick={toggleDropdown} className="flex items-center border-2 border-black px-2 py-1 text-xs font-semibold">
          {selectedMonth.toUpperCase()} <ArrowDown className="w-4 h-4 ml-1" />
        </button>
        {showDropdown && (
          <ul className={`absolute right-0 mt-1 w-24 border border-black rounded shadow z-10 text-sm ${
              darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'
            }`}>
            {['m1', 'm2', 'm3'].map((month) => (
              <li
                key={month}
                onClick={() => selectMonth(month as 'm1' | 'm2' | 'm3')}
                className="cursor-pointer px-2 py-1 hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                {month.toUpperCase()}
              </li>
            ))}
          </ul>
        )}
      </div>
      <h2 className="text-blueI text-lg font-bold">{title}</h2>
      <div className="text-sm space-y-2 mb-14">
        <p>USD ACTUAL: {currentValue.toFixed(2)}</p>
        <p className="flex items-center">
          USD W2W: {w2wDiff.toFixed(2)}
          {isW2WUp ? (
            <ArrowUp className="text-green-500 w-4 h-4 ml-1" />
          ) : (
            <ArrowDown className="text-red-500 w-4 h-4 ml-1" />
          )}
        </p>
      </div>
     
    </div>
  );
};

export default Card;