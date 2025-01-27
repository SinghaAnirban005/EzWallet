import React, { useState } from 'react';
import { Send, Search, User } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { updateUserTransaction } from '../store/Slice';

import Button from '../components/Button';
import Card from '../components/Card';
import { RootState } from '../store/store';

type UserData = {
  account: {
    _id: string,
  }
}

type sUserTps = {
  account: number,
  username: string,
  email: string
}

type Users = {
  username: string,
  email: string
}

type UsersArray = Users[]

const SendMoneyPortal: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<UsersArray>([]);
  const [selectedUser, setSelectedUser] = useState<sUserTps | null>(null);
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch()

  const userData = useSelector((state: RootState) => state.userData) as UserData;

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://ezwallet-server.onrender.com/api/v1/account/search?query=${searchQuery}`, {withCredentials: true});
      //@ts-ignore
      setUsers(response?.data?.user)
    } catch (error) {
      setMessage('Failed to fetch users');
    }
  };

  const handleSendMoney = async () => {
    if (!selectedUser || !amount) {
      setMessage('Please select a user and enter amount');
      return;
    }

    try {
      await axios.post('https://ezwallet-server.onrender.com/api/v1/account/sendMoney', {
        senderId: userData?.account?._id,
        receiverId: selectedUser?.account,
        amount: Number(amount)
      }, {withCredentials: true});
      dispatch(updateUserTransaction(amount))
      setMessage('Transfer successful');
      setSelectedUser(null);
      setAmount('');
    } catch (error) {
      setMessage('Transfer failed');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow p-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Send Money</h1>
            <p className="text-gray-600">Transfer funds to another user</p>
          </div>

          <Card 
            title="Money Transfer" 
            description="Select a recipient and enter amount"
          >
            <div className="space-y-4">
              <div className="flex space-x-2">
                <div className="flex-grow">
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search users by name or email"
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <Button 
                  label="Search" 
                  onClick={handleSearch}
                  className="flex items-center space-x-2"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>

              {users.length > 0 && (
                <div className="border rounded-lg max-h-40 overflow-y-auto">
                  {users.map((user) => (
                    <div 
                      key={user.username}
                      onClick={() => setSelectedUser(user as sUserTps)}
                      className={`p-3 hover:bg-gray-100 cursor-pointer flex items-center ${
                        selectedUser?.username === user.username ? 'bg-blue-50' : ''
                      }`}
                    >
                      <User className="mr-3 text-blue-500" />
                      <div>
                        <p className="font-medium">{user.username}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {selectedUser && (
                <div className="space-y-4">
                  <div className="bg-green-50 p-3 rounded-lg flex items-center">
                    <User className="mr-3 text-green-600" />
                    <div>
                      <p className="font-semibold">{selectedUser.username}</p>
                      <p className="text-sm text-gray-600">{selectedUser.email}</p>
                    </div>
                  </div>

                  <input 
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter transfer amount"
                    className="w-full px-3 py-2 border rounded-lg"
                  />

                  <Button 
                    label="Send Money" 
                    onClick={handleSendMoney}
                    className="w-full flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Transfer</span>
                  </Button>
                </div>
              )}

              {message && (
                <div className={`
                  p-3 rounded-lg text-center 
                  ${message.includes('successful') 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'}
                `}>
                  {message}
                </div>
              )}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SendMoneyPortal;