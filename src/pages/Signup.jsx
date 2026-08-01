import React from 'react'
import { useState } from 'react';
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import { validateEmail } from '../util/Validation';
import axiosConfig from '../util/axiosConfig';
import API_ENDPOINTS from '../util/apiEndpoints';
import { toast } from 'react-hot-toast';
import { LoaderCircle } from 'lucide-react';
import ProfilePhotoSelector from '../components/ProfilePhotoSelector';
import uploadProfileImage from '../util/uploadProfileImage';

const Signup = () => {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let profileImageUrl = "";
    setIsLoading(true);

    if (!fullName.trim()) {
      setError("Please enter your Full name");
      setIsLoading(false);
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter your valid email");
      setIsLoading(false);
      return;
    }
    if (!password.trim()) {
      setError("Please enter your password");
      setIsLoading(false);
      return;
    }
    setError("");

    try {
      if (profilePhoto) {
        const imageUrl = await uploadProfileImage(profilePhoto);
        profileImageUrl = imageUrl || "";
      }

      const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl
      });

      if (response.status === 201) {
        toast.success("Account created successfully!");
        navigate("/login");
      }
    } catch (err) {
      console.error("Something went wrong", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen w-full bg-gray-800 flex items-center justify-center px-6'>

      {/* Main Container */}
      <div className='w-full max-w-xl bg-gray-900 text-gray-200 rounded-3xl shadow-2xl overflow-hidden border border-gray-700'>

        <div className='grid grid-cols-1 min-h-[600px]'>

          {/* Form Section */}
          <div className='flex items-center justify-center p-8 lg:p-12'>
            <div className='w-full max-w-md'>

              <h3 className='text-3xl font-bold text-white mb-2 pl-17'>
                Create Your Account
              </h3>

              <p className='text-gray-300 mb-8 pl-7'>
                Start managing your finances with ease. Sign up now!
              </p>

              <form onSubmit={handleSubmit} className='space-y-6'>

                <div className='flex justify-center mb-6'>
                  <ProfilePhotoSelector
                    image={profilePhoto}
                    setImage={setProfilePhoto}
                  />
                </div>

                <div className='space-y-4'>
                  <Input
                    value={fullName}
                    onChange={(target) => setFullName(target.value)}
                    label="Full Name"
                    placeholder="Enter your full name"
                    type="text"
                  />

                  <Input
                    value={email}
                    onChange={(target) => setEmail(target.value)}
                    label="Email Address"
                    placeholder="yourname@example.com"
                    type="text"
                  />

                  <Input
                    value={password}
                    onChange={(target) => setPassword(target.value)}
                    label="Password"
                    placeholder="********"
                    type="password"
                  />
                </div>

                {error && (
                  <p className='text-red-500 text-sm text-center mt-2'>
                    {error}
                  </p>
                )}

                <button
                  disabled={isLoading}
                  type='submit'
                  className={`w-full px-6 py-3 flex justify-center items-center gap-2 
                  bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg 
                  shadow-md transition-all duration-300 hover:shadow-lg
                  ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'}`}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <LoaderCircle className='animate-spin h-5 w-5' size={20} />
                      Signing up...
                    </span>
                  ) : (
                    "Sign Up"
                  )}
                </button>

                <p className='text-sm text-gray-300 text-center mt-6'>
                  Already have an account?
                  <Link
                    to="/login"
                    className='text-emerald-500 hover:underline ml-1 font-medium'
                  >
                    Login
                  </Link>
                </p>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Signup;