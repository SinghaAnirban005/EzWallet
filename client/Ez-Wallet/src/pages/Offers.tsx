import Card from '../components/Card';

const Offers = () => {
  return (
    <div className="flex flex-col h-screen">
      <main className="flex-grow p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Offer 1" description="Get 10% cashback on payments" />
        <Card title="Offer 2" description="Flat ₹100 off on first recharge" />
        <Card title="Offer 3" description="Earn rewards on referrals" />
      </main>
    </div>
  );
};

export default Offers;
