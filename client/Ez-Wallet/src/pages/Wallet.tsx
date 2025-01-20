import { useState } from 'react';
import { Wallet as WalletIcon, SendHorizontal, Download, History, TrendingUp, CreditCard, Plus } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import Modal from '../components/Modal';
import axios from 'axios';
import {updateUserBalance} from "../store/Slice"

const Wallet = () => {

  const walletDetails = useSelector((state: RootState) => state.userData)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch()
  const accId = useSelector((state: RootState) => state.userData?.account?._id)

  const handleAddMoney = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await axios.post('http://localhost:3000/api/v1/account/top-up', {
        amount: amount,
        accountId: accId
      }, {withCredentials: true})

      if(!res){
        console.error('Failed to top-up')
        return;
      }

      dispatch(updateUserBalance(amount))
      setAmount(0);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding money:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Wallet</h1>
              <p className="text-gray-600">Manage your money</p>
            </div>
            <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Money</span>
            </button>
          </div>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Add Money to Wallet"
          >
            <form onSubmit={handleAddMoney} className="space-y-4">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter Amount (₹)
                </label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="Enter amount"
                  min="1"
                  required
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading || !amount}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Processing...' : 'Add Money'}
                </button>
              </div>
            </form>
          </Modal>

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