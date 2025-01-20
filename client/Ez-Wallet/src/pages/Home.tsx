import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Card from '../components/Card';
import { RootState } from '../store/store';
import { useDispatch } from 'react-redux';
import axios from "axios"
import { addUserData } from '../store/Slice';
import { Phone, Shield, Gift, Download, CreditCard, Users } from 'lucide-react';

const Home = () => {
  const isLoggedIn = useSelector((state: RootState) => state.status);
  const [error, setError] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    const res = async() => {
      try {
          const userData = await axios.get('http://localhost:3000/api/v1/user/user-data', {
            withCredentials: true
        })
        
        if(!userData) {
            setError('Could not get user data')
            return;
        }
        //@ts-ignore
        dispatch(addUserData(userData?.data?.data))
    } catch (error) {
        //@ts-ignore
        setError(error?.message)
        return;
    }}

    
    if(isLoggedIn){
      res()
    }
 }, [])

  const LoggedInView = () => (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Wallet" description="View and manage your wallet" />
        <Card title="Send Money" description="Transfer funds instantly" />
        <Card title="Offers" description="Discover exciting offers" />
      </main>
    </div>
  );

  const LandingView = () => (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Fade-in Animation */}
      <section className="bg-blue-50 py-16 animate-[fadeIn_1s_ease-in]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl font-bold text-blue-900 mb-4 animate-[slideUp_0.5s_ease-out]">
                Fast, Secure Digital Payments
              </h1>
              <p className="text-lg text-gray-600 mb-6 animate-[slideUp_0.5s_ease-out_0.2s]">
                Send money, pay bills, and manage your finances all in one place
              </p>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300 animate-[slideUp_0.5s_ease-out_0.4s]">
                Get Started
              </button>
            </div>
            <div className="md:w-1/2 animate-[slideIn_0.8s_ease-out_0.6s]">
              <img
                src="/api/placeholder/600/400"
                alt="Payment Illustration"
                className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Active Users', value: '10M+' },
              { label: 'Daily Transactions', value: '50M+' },
              { label: 'Partner Merchants', value: '100K+' },
              { label: 'App Downloads', value: '25M+' }
            ].map((stat, index) => (
              <div 
                key={stat.label} 
                className="text-center p-4 opacity-0"
                style={{
                  animation: `fadeIn 0.5s ease-out forwards ${index * 0.2}s`
                }}
              >
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with Hover Effects */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Phone className="w-8 h-8" />, title: 'UPI Payments', desc: 'Make instant transfers using UPI across all banks' },
              { icon: <Shield className="w-8 h-8" />, title: 'Secure Transactions', desc: 'Bank-grade security for all your transactions' },
              { icon: <Gift className="w-8 h-8" />, title: 'Cashback & Rewards', desc: 'Earn rewards on every transaction' }
            ].map((feature, index) => (
              <div 
                key={feature.title}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]"
                style={{ animationDelay: `${1.5 + index * 0.2}s` }}
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">Download Our App</h2>
              <p className="mb-6">Experience seamless payments on the go with our mobile app</p>
              <div className="flex space-x-4">
                <button className="bg-white text-blue-900 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors flex items-center">
                  <Download className="w-5 h-5 mr-2" />
                  App Store
                </button>
                <button className="bg-white text-blue-900 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors flex items-center">
                  <Download className="w-5 h-5 mr-2" />
                  Play Store
                </button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="/api/placeholder/300/600"
                alt="Mobile App"
                className="rounded-lg shadow-lg mx-auto hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Payment Methods Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Accepted Payment Methods</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <CreditCard className="w-8 h-8" />, label: 'Credit Cards' },
              { icon: <CreditCard className="w-8 h-8" />, label: 'Debit Cards' },
              { icon: <Phone className="w-8 h-8" />, label: 'UPI' },
              { icon: <Users className="w-8 h-8" />, label: 'Net Banking' }
            ].map((method, index) => (
              <div 
                key={method.label}
                className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300"
              >
                <div className="text-blue-600 mb-4">{method.icon}</div>
                <span className="text-gray-800 font-medium">{method.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner with Animation */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-white mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">Special Offer!</h3>
              <p>Get ₹100 cashback on your first transaction</p>
            </div>
            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 hover:scale-105 transition-all duration-300">
              Claim Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );

  return isLoggedIn ? <LoggedInView /> : <LandingView />;
};

export default Home;