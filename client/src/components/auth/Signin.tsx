import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { api } from '../../api/index.api';
import axios from 'axios';
import { useCurrentUserStore } from '../../store/currentUserSlice';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const setToken = useCurrentUserStore((state) => state.setToken);
  const nav = useNavigate();

  // states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve('hey');
        }, 2000);
      });
      const data = await api.post('/user/signin', {
        email,
        password,
      });

      setEmail('');
      setPassword('');

      setToken(data?.data);
      nav('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data.message);
      }
    } finally {
      setPassword('');
      setLoading(false);
    }
  };

  const canSave = [email, password].every(Boolean);

  return (
    <div className="flex justify-center my-24">
      <div className="w-3/4 md:w-1/3 xl:w-1/4 border shadow-md py-4 px-2 space-y-4">
        <div className="flex justify-center w-full">
          <img src="/logo.png" alt="" className="w-40" />
        </div>
        <div className="flex justify-center">
          <p className="font-body text-sm text-gray-400 ">
            Sign in to your account
          </p>
        </div>
        <div className="space-y-4 p-4">
          <div className="relative">
            <input
              type="email"
              className="border p-1 rounded w-full pl-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className="border p-1 rounded w-full pl-2"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute inset-y-0 right-0 flex items-center px-3 "
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <FaRegEyeSlash className="hover:text-blue-600 cursor-pointer" />
              ) : (
                <FaRegEye className="hover:text-blue-600 cursor-pointer" />
              )}
            </div>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm font-head">{errorMessage}</p>
          )}
          <div>
            <button
              onClick={handleSubmit}
              disabled={!canSave || loading}
              className="py-2 text-white font-body bg-blue-500 hover:bg-blue-600 rounded w-full disabled:opacity-50 disabled:hover:bg-blue-500 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
