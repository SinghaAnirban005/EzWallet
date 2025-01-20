import Button from './Button';
import { User, Mail, Camera } from 'lucide-react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/Slice';

const Profile = () => {

  const userDataRef = useRef(null)
  const userData = useSelector((state: RootState) => state.userData)
  const dispatch = useDispatch()
  //@ts-ignore
  userDataRef.current = userData
  const navigate = useNavigate()

  const handleLogout = async() => {
    try {
      const res = await axios.post('http://localhost:3000/api/v1/user/logout',{}, {withCredentials: true})
      
      if(res){
        dispatch(logout())
        navigate('/')
      }

      return;
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow p-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600">Manage your personal information</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-32 relative">
              <button className="absolute bottom-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors">
                <Camera className="w-5 h-5" />
              </button>
            </div>

            <div className="relative px-6">
              <div className="absolute -top-12">
                <div className="relative">
                  <div className="w-24 h-24 bg-white rounded-full p-1">
                    <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-3xl font-bold text-white">
                        {userDataRef.current.fullName?.charAt(0) || userDataRef.current.username?.charAt(0) || '?'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 pt-16 pb-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <User className="w-5 h-5 text-blue-500" />
                    <div className="flex-grow">
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium text-gray-900">{userDataRef.current.fullName}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <User className="w-5 h-5 text-purple-500" />
                    <div className="flex-grow">
                      <p className="text-sm text-gray-500">Username</p>
                      <p className="font-medium text-gray-900">@{userDataRef.current.username}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <Mail className="w-5 h-5 text-indigo-500" />
                    <div className="flex-grow">
                      <p className="text-sm text-gray-500">Email Address</p>
                      <p className="font-medium text-gray-900">{userDataRef.current.email}</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <Button 
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
                    label={'Edit Profile'}
                  />
                </div>
                <div className="flex space-x-4">
                  <Button 
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
                    onClick={handleLogout}
                    label={'Logout'}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Account Status</h2>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                Active
              </span>
            </div>
            <p className="text-gray-600">
              Your account is in good standing. You have access to all features.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;