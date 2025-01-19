import { Wallet as WalletIcon, SendHorizontal, Download, History, TrendingUp, CreditCard, Plus } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Wallet = () => {

  const walletDetails = useSelector((state: RootState) => state.userData)

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Wallet</h1>
              <p className="text-gray-600">Manage your money</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Money</span>
            </button>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center space-x-2 mb-4">
              <WalletIcon className="w-6 h-6" />
              <span className="text-sm opacity-90">Available Balance</span>
            </div>
            <div className="text-4xl font-bold mb-4">{walletDetails?.account.balance || 0}</div>
            <div className="flex space-x-4">
              <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
                <SendHorizontal className="w-4 h-4" />
                <span>Send</span>
              </button>
              <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Receive</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <CreditCard className="w-6 h-6" />, title: 'Cards', desc: 'Manage cards' },
              { icon: <History className="w-6 h-6" />, title: 'History', desc: 'View transactions' },
              { icon: <TrendingUp className="w-6 h-6" />, title: 'Invest', desc: 'Grow money' },
              { icon: <Download className="w-6 h-6" />, title: 'Withdraw', desc: 'To bank' },
            ].map((action) => (
              <div key={action.title} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <div className="text-blue-600 mb-2">{action.icon}</div>
                <h3 className="font-semibold text-gray-900">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Wallet;