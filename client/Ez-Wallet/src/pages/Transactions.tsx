import React from 'react';
import Navbar from "../components/Navbar"
import Card from '../components/Card';
import Footer from '../components/Footer';

const Transactions = () => {
  return (
    <div className="flex flex-col h-screen">
      <main className="flex-grow p-6">
        <h1 className="text-2xl font-bold mb-4">Transactions</h1>
        <Card title="Transaction 1" description="₹1000 - Sent to John" />
        <Card title="Transaction 2" description="₹500 - Received from Alice" />
      </main>
    </div>
  );
};

export default Transactions;