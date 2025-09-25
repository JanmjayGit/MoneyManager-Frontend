import React from 'react'
import { useState } from 'react';
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import { validateEmail } from '../util/Validation';
import axiosConfig from '../util/axiosConfig';
import  API_ENDPOINTS  from '../util/apiEndpoints';
import { toast } from 'react-hot-toast';
import { LoaderCircle } from 'lucide-react';
import ProfilePhotoSelector from '../components/ProfilePhotoSelector';
import  uploadProfileImage  from '../util/uploadProfileImage'; 

const Signup = () => {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null); // State for profile photo

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault(); // Prevent default form submission behavior
    let profileImageUrl = "";
    setIsLoading(true); // Set loading state
    
    if(!fullName.trim()){
      setError("Please enter your Full name");
      setIsLoading(false);
      return;
    }
    if(!validateEmail(email)){ // utility function to validate email is required
      setError("Please enter your valid email");
      setIsLoading(false); 
      return;
    }
    if(!password.trim()){ // utility function to validate password is required 
      setError("Please enter your password");
      setIsLoading(false); 
      return;
    }
    setError(""); // Reset error state

    // sign up Api call
    try{
      if(profilePhoto){
        // If a profile photo is selected, upload it to Cloudinary
        const imageUrl = await uploadProfileImage(profilePhoto);
        profileImageUrl = imageUrl || ""; // Get the URL of the uploaded image
      }
      const response = await axiosConfig.post(API_ENDPOINTS.REGISTER,{
        fullName,
        email,
        password,
        profileImageUrl
      })
      if(response.status === 201){
        toast.success("Account created successfully!");
        navigate("/login");
      }
    }catch(err){
      console.error("Something went wrong", err);
      setError(err.message);
    }finally{
      setIsLoading(false); // Reset loading state
    }
  }
  return (
    <div className='h-screen w-full relative flex items-center justify-center overflow-hidden'>
       {/* Background image  */}
       {/* <img src={assets.login_bg} alt="Background" className='absolute inset-0 w-full h-full object-cover'/> */}
       <div className='relative z-10 w-full max-w-lg px-6'>
          <div className='bg-white bg-opacity-95 backdrop-blur-sm p-8 rounded-lg shadow-2xl max-h-[90vh] overflow-y-auto border-2 border-indigo-500'>
            <h3 className='text-2xl font-semibold text-slate-950 text-center mb-2'>Create Your Account</h3>
            <p className='text-md text-slate-950 text-center mb-8'>
              Start managing your finances with ease. Sign up now!
            </p>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='flex justify-center mb-6'>
                <ProfilePhotoSelector image={profilePhoto} setImage={setProfilePhoto} />
              </div>
              <div className='grid grid-cols-2 md:grid-cols-2 gap-4'>
                <div className="col-span-2">
                  <Input
                  value={fullName}
                  onChange={(target) => setFullName(target.value)}
                  label="Full Name"
                  placeholder="Enter your full name"
                  type="text"
                  />
                </div>

                <div className="col-span-2">
                  <Input
                  value={email}
                  onChange={(target) => setEmail(target.value)}
                  label="Email Address"
                  placeholder="yourname@example.com"
                  type="text"
                  />
                </div>

                <div className='col-span-2'>
                  <Input
                  value={password}
                  onChange={(target) => setPassword(target.value)}
                  label="Password"
                  placeholder="********"
                  type="password"
                  />
                </div>
              </div>

              {error && (
                <p className='text-red-500 text-sm text-center mt-2'>{error}</p>
              )}

              <button
                disabled={isLoading}
                type='submit'
                className={`w-full px-6 py-3 flex justify-center items-center gap-2 
                bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg 
                shadow-md transition-all duration-300
                    ${isLoading ? 'opacity-50 cursor-not-allowed' : ''} `}
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

              <p className='text-sm text-slate-950 text-center mt-4'>
                Already have an account?
                <Link to="/login" className='text-indigo-500 hover:underline ml-1'>Login</Link>
              </p>
            </form>
          </div>
       </div>
    </div>
  )
}

export default Signup;