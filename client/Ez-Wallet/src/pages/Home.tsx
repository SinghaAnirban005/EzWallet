import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useDispatch } from 'react-redux';
import axios from "axios"
import { addUserData, addUserTransaction } from '../store/Slice';
import { Wallet, Send, Gift, Zap, CreditCard, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type UserData = {
  fullName?: string,
  account?: {
    balance?: number
  },
  username: string
}

type UserDataReq = {
  data: {
    data: {
      account: {
        _id: string
      }
    }
  }
}

type trns = {
  amount?: number,
  receiver?: {
    owner?: {
      username: string
    }
  },
  sender?: {
    owner: {
      username: string
    }
  }
}

type Transaction = trns[]


const Home = () => {
  const isLoggedIn = useSelector((state: RootState) => state.status);
  const userData = useSelector((state: RootState) => state.userData) as UserData

  const navigate = useNavigate()
  const [error, setError] = useState<string | unknown>(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUserData = async() => {
      try {
        const userData = await axios.get('https://ezwallet-server.onrender.com/api/v1/user/user-data', {
          withCredentials: true
        }) as UserDataReq

        if(!userData) {
          setError('Could not get user data')
          return;
        }

        const userTransactions = await axios.get('https://ezwallet-server.onrender.com/api/v1/tsc/transactions', {
          params: {
            currentUserAccId: userData?.data?.data?.account._id
          },
          withCredentials: true
        })

        if(!userTransactions) {
            setError('Could not get user data')
            return;
        }

        //@ts-ignore
        dispatch(addUserTransaction(userTransactions?.data?.transactions))
        dispatch(addUserData(userData?.data?.data))
      } catch (error) {
        setError(error)
        return;
      }
    }
    
    if(isLoggedIn){
      fetchUserData()
    }
  }, [])

  const transactions = useSelector((state: RootState) => state.userTransactions) as Transaction

  const LoggedInView = () => (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-800">Welcome, {userData?.fullName}</h1>
          <div className="flex space-x-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition" onClick={() => navigate('/sendMoney')}>
              Quick Transfer
            </button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <div className="flex items-center mb-4">
              <Wallet className="text-blue-600 mr-3" />
              <h2 className="text-xl font-semibold">Wallet Balance</h2>
            </div>
            <div className="text-3xl font-bold text-blue-800">₹ {userData?.account?.balance}</div>
            <button className="mt-4 w-full bg-blue-50 text-blue-700 py-2 rounded-md hover:bg-blue-100 transition" onClick={() => navigate('/account')}>
              View Details
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <div className="flex items-center mb-4">
              <Send className="text-green-600 mr-3" />
              <h2 className="text-xl font-semibold">Send Money</h2>
            </div>
            <p className="text-gray-600 mb-4">Quick and secure money transfers</p>
            <button className="w-full bg-green-50 text-green-700 py-2 rounded-md hover:bg-green-100 transition" onClick={() => navigate('/sendMoney')}>
              Transfer Now
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <div className="flex items-center mb-4">
              <Gift className="text-purple-600 mr-3" />
              <h2 className="text-xl font-semibold">Rewards</h2>
            </div>
            <div className="text-2xl font-bold text-purple-800">1,250 Points</div>
            <button className="mt-4 w-full bg-purple-50 text-purple-700 py-2 rounded-md hover:bg-purple-100 transition">
              Redeem
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Zap className="text-yellow-600 mr-3" />
              <h2 className="text-xl font-semibold">Quick Actions</h2>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <button className="bg-gray-50 p-3 rounded-md hover:bg-gray-100 transition flex flex-col items-center">
                <CreditCard className="mb-2" />
                <span className="text-sm">Pay Bill</span>
              </button>
              <button className="bg-gray-50 p-3 rounded-md hover:bg-gray-100 transition flex flex-col items-center">
                <Users className="mb-2" />
                <span className="text-sm">Split Bill</span>
              </button>
              <button className="bg-gray-50 p-3 rounded-md hover:bg-gray-100 transition flex flex-col items-center">
                <Zap className="mb-2" />
                <span className="text-sm">Recharge</span>
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Users className="text-indigo-600 mr-3" />
              <h2 className="text-xl font-semibold">Recent Transactions</h2>
            </div>
            <div className="space-y-3">
              {transactions?.map((transaction, index) => (
                (index < 3 && <div key={index} className="flex justify-between items-center border-b pb-2 last:border-b-0">
                  <div>
                    <div className="font-medium">{transaction?.receiver?.owner?.username === userData.username ? transaction?.sender?.owner?.username : transaction?.receiver?.owner?.username}</div>
                    <div className="text-sm text-gray-500">{transaction?.receiver?.owner?.username === userData.username ? "Received" : "Sent"}</div>
                  </div>
                  <div className="font-semibold text-blue-700">{transaction.amount}</div>
                </div>)
              )).reverse()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );

  const LandingView = () => (
    <div className="flex flex-col min-h-screen">
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl font-bold text-blue-900 mb-4">
                Fast, Secure Digital Payments
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Send money, pay bills, and manage your finances all in one place
              </p>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700" onClick={() => navigate('/signup')}>
                Get Started
              </button>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://img.freepik.com/free-vector/marketing-promo-clipart-illustrated_52683-74351.jpg"
                alt="Payment Illustration"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Active Users', value: '10M+' },
              { label: 'Daily Transactions', value: '50M+' },
              { label: 'Partner Merchants', value: '100K+' },
              { label: 'App Downloads', value: '25M+' }
            ].map((stat) => (
              <div key={stat.label} className="text-center p-4">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );

  return isLoggedIn ? <LoggedInView /> : <LandingView />
};

export default Home;