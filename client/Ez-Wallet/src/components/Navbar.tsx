import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <Link to="/" className="text-lg font-bold">
        Paytm Clone
      </Link>
      <div className="space-x-4">
        <Link to="/wallet" className="hover:underline">
          Wallet
        </Link>
        <Link to="/transactions" className="hover:underline">
          Transactions
        </Link>
        <Link to="/profile" className="hover:underline">
          Profile
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;