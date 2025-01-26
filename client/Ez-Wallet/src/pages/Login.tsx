import Button from '../components/Button';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/Slice';

const Login = () => {

  const [err, setErr] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const handleLogin = async(data: Object) => {
    try {
      const res = await axios.post('https://ezwallet-server.onrender.com/api/v1/user/signin', data, {
        withCredentials: true
      })

      if(res){
        dispatch(login())
        navigate('/')
      }
    } catch (error) {
      console.error(error)
      setErr(err?.message)
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <main className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-3xl font-bold mb-4">Login</h1>
        <form className="flex flex-col gap-4 w-1/3" onSubmit={handleSubmit(handleLogin)}>
        <div>
            <input
              type="email"
              placeholder="Email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email',
                },
              })}
              className="p-3 border rounded w-full"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors?.email?.message}</p>}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              className="p-3 border rounded w-full"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <Button label="Login" type='submit' />
        </form>
      </main>
    </div>
  );
};

export default Login;