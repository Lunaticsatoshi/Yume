import { ReactNode } from 'react';

interface IActionButton {
  children: ReactNode;
}
export const ActionButton = ({ children }: IActionButton) => {
  return (
    <div className="px-1 py-1 mr-1 text-xs text-gray-400 rounded cursor-pointer hover:bg-gray-200">
      {children}
    </div>
  );
};
