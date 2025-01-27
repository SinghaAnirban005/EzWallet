import { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Calendar,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronDown,
  Download
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import {addUserTransaction} from "../store/Slice"
import { RootState } from '../store/store';
import axios from 'axios';

type trns = {
  status: 'success' | 'failed' | 'pending',
  createdAt: Date
  amount: number,
  sender:{
    owner: {
      username: string
    }
  },
  receiver:{
    owner: {
      username: string
    }
  }
}

interface Status {
  status: 'success' | 'failed' | 'pending'
}

type trnsRef = trns[]

const Transactions = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  //@ts-ignore
  const accId = useSelector((state: RootState) => state.userData?.account?._id)
  const transactionsRef = useRef<trnsRef>(null)
  const transactionsData = useSelector((state: RootState) => state.userTransactions)
  const [err, setError] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    const res = async() => {
      try {
        const userTransactions = await axios.get('https://ezwallet-server.onrender.com/api/v1/tsc/transactions', {
          params: {
            currentUserAccId: accId
          },
          withCredentials: true
        })

        if(!userTransactions) {
            setError('Could not get user data')
            return;
        }
        //@ts-ignore
        dispatch(addUserTransaction(userTransactions?.data?.transactions))
        
    } catch (error) {
        console.error(error)
        //@ts-ignore
        setError(error?.message)
        alert(err)
        return;
    }
  }
    res()
}, [])
  //@ts-ignore
  transactionsRef.current = transactionsData

  const StatusBadge = ({status}: Status) => {
    const statusConfig = {
      success: { color: 'bg-green-100 text-green-700', icon: <CheckCircle2 className="w-4 h-4" /> },
      failed: { color: 'bg-red-100 text-red-700', icon: <XCircle className="w-4 h-4" /> },
      pending: { color: 'bg-yellow-100 text-yellow-700', icon: <Clock className="w-4 h-4" /> }
    };

    return (
      <span className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${statusConfig[status].color}`}>
        {statusConfig[status].icon}
        <span className="capitalize">{status}</span>
      </span>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
              <p className="text-gray-600">View and manage your transaction history</p>
            </div>
            <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex space-x-2">
                <div className="relative">
                  <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <span>Date Range</span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>
                </div>

                <div className="relative">
                  <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
                    <Filter className="w-5 h-5 text-gray-500" />
                    <span>Filters</span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex space-x-2 mt-4">
              {['all', 'success', 'pending', 'failed'].map((status) => (
                <button
                  key={status}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterStatus === status
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => setFilterStatus(status)}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">From</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">To</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {transactionsRef.current.map((tx, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(tx.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(tx.createdAt).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {tx.sender?.owner?.username || 'Unknown'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {tx.receiver?.owner?.username || 'Unknown'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          ₹{tx.amount.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={tx.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {transactionsRef.current.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No transactions found</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Transactions;