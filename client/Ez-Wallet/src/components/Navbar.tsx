import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Navbar: React.FC = () => {

  const isLoggedIn = useSelector((state: RootState) => state.status)

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <Link to="/" className="text-lg font-bold">
        Ez Wallet
      </Link>
      {
        !isLoggedIn ? (
          <div className="space-x-4">
        <Link to="/login" className="hover:underline">
          Login
        </Link>
        <Link to="/signup" className="hover:underline">
          Sign Up
        </Link>
          </div>
        ) : (
          <div className="space-x-4">
            <Link to="/account" className="hover:underline">
          Wallet
        </Link>
        <Link to="/transactions" className="hover:underline">
          Transactions
        </Link>
        <Link to="/profile" className="hover:underline">
          Profile
        </Link>
      </div>
        )
      }
    </nav>
  );
};

export default Navbar;