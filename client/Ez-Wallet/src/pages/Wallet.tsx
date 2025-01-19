import React from 'react';
import Navbar from "../components/Navbar"
import Card from '../components/Card';
import Footer from '../components/Footer';

const Wallet = () => {
  return (
    <div className="flex flex-col h-screen">
      <main className="flex-grow p-6">
        <h1 className="text-2xl font-bold mb-4">Wallet</h1>
        <Card title="Balance" description="₹5000" />
      </main>
    </div>
  );
};

export default Wallet;