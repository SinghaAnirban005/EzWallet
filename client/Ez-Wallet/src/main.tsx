import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.tsx'
import store from './store/store.ts'
import Home from './pages/Home.tsx'
import Login from './pages/Login.tsx'
import Signup from './pages/Signup.tsx'
import Profile from './components/Profile.tsx'
import Transactions from './pages/Transactions.tsx'
import Wallet from './pages/Wallet.tsx'
import SendMoneyPortal from './pages/SendMoney.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children:[
      {
        path: '/',
        element: <Home /> 
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/transactions',
        element: <Transactions />
      },
      {
        path: '/account',
        element: <Wallet />
      },
      {
        path: '/sendMoney',
        element: <SendMoneyPortal />
      }
    ]
  },
])

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
