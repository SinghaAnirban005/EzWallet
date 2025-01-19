import Button from '../components/Button';

const SendMoney = () => {
  return (
    <div className="flex flex-col h-screen">
      <main className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-2xl font-bold mb-4">Send Money</h1>
        <form className="flex flex-col gap-4 w-1/3">
          <input type="text" placeholder="Recipient" className="p-3 border rounded" />
          <input type="number" placeholder="Amount" className="p-3 border rounded" />
          <Button label="Send" />
        </form>
      </main>
    </div>
  );
};

export default SendMoney;