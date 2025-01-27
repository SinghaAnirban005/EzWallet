import Button from '../components/Button';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [err, setErr] = useState('')
  const navigate = useNavigate()

  const handleSignup = async(data: Object) => {
    try {
      const res = await axios.post('https://ezwallet-server.onrender.com/api/v1/user/signup', data)

      if(res){
        alert('Registration successfull')
        navigate('/')
      }
    } catch (error) {
      console.error(error)
      //@ts-ignore
      setErr(error?.message)
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <main className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
        {err && <p className='text-red-500 text-sm mt-1'>Error :: {err}</p>}
        <form className="flex flex-col gap-4 w-1/3" onSubmit={handleSubmit(handleSignup)}>
          <div>
            <input type="text" placeholder="Full Name" {...register('fullName', { required: 'Full Name is required' })} className="p-3 border rounded w-full" />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message as string}</p>}
          </div>
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
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors?.email?.message as string}</p>}
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
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message as string}</p>}
          </div>
          <div>
            <input
              type="text"
              placeholder="Username"
              {...register('username', {
                required: 'Please set a username',
              })}
              className="p-3 border rounded w-full"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.username?.message as string}</p>}
          </div>
          <Button type='submit' label="Register" />
        </form>
      </main>
    </div>
  );
};

export default Signup;