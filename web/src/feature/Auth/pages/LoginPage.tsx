import React, { useState } from 'react';
import { Mail, Eye, EyeOff, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLoginUser } from '../hooks/useAuth';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {mutate,isPending,error} = useLoginUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempted with:', { email, password });
    mutate({ email, password },{
      onSuccess:()=>{
        navigate('/')
      }
    })
    
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center sm:p-4">
      <div className="bg-white rounded-xl shadow-md w-full sm:max-w-xl p-6 sm:p-10 flex flex-col justify-center min-h-screen sm:min-h-[70vh]">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 rounded-full p-3 sm:p-4">
              <FileText className="size-14 sm:size-16 text-[#2196F3]" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Archive Digital</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-base sm:text-lg font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 text-base sm:text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
              />
              <Mail className="w-5 h-5 text-gray-400 absolute right-4 top-3" />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-base sm:text-lg font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 text-base sm:text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-2.5 text-gray-400"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-2 bg-[#2196F3] text-white py-3.5 px-4 rounded-lg text-base sm:text-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isPending? 'Processing...':'Login'}
          </button>
          {error?"error ocuured":''}
        </form>
      </div>
    </div>
  );
};

export default Login;
