import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../Appwrite/Auth';
import bgimage from '../images/imgbg.jpg';

function Signup() {
  const [Userid, setUserid] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate(); // Initialize navigate function

  async function OnclickHandler(e) {
    e.preventDefault(); // Prevent default form submission
  
    // Basic Validation
    if (!Userid || !email || !password) {
      setError('All fields are required.');
      setMessage('');
      return;
    }
  
    if (password.length <= 8) {
      setError('Password must be at least 9 characters long.');
      setMessage('');
      return;
    }
  
    try {
      const user = await AuthService.SignUp({ email, password, Userid });
      if (user) {
        // (user.data.$id)
        console.log(user);
        setMessage('User successfully registered!');
        setError('');
        setUserid('');
        setemail('');
        setpassword('');
        setTimeout(() => navigate('/'), 1000); // Redirect to login after 2 seconds
      }
    } catch (err) {
      setMessage('');
      setError('Error: User not registered. ' + err.message);
    }
  }
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-700 via-purple-500 to-purple-700 flex justify-center items-center">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        <div className="bg-white shadow-lg rounded-lg p-8 md:p-12 max-w-3xl mx-auto">
          {/* Logo */}
          <div className="flex justify-center">
            <img className="h-20 w-96 mb-6" src={bgimage} alt="Website Logo" />
          </div>
          {/* Welcome Message */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-purple-700 mb-4">
              Welcome to <span className="text-purple-800">The Blooming Pen</span>
            </h1>
            <p className="text-lg font-medium text-gray-700 mb-4">
              "Your Stories, Your Voice, Your World."
            </p>
            <p className="text-base text-gray-600 leading-relaxed mb-4">
              Explore, create, and share your ideas with a vibrant community of storytellers. Unleash your creativity and let your voice be heard!
            </p>
            <p className="text-base text-gray-600 leading-relaxed">
              At <span className="font-bold">The Blooming Pen</span>, we believe every story matters. Whether you're a seasoned writer or just starting your journey, our platform provides the perfect space for you to share your thoughts, ideas, and passions. Dive into a world of creativity where your voice takes center stage.
            </p>
          </div>
        </div>
        <div className="md:w-2/3 p-8 flex flex-col justify-center items-center bg-gray-50">
          <h2 className="text-3xl font-bold text-purple-700 mb-6">Sign Up</h2>
          <form onSubmit={OnclickHandler} className="w-full max-w-sm flex flex-col gap-4">
            {/* Username */}
            <div>
              <label className="block text-gray-600 mb-2 font-medium">Username</label>
              <input
                value={Userid}
                onChange={(e) => setUserid(e.target.value)}
                type="text"
                placeholder="Enter your username"
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            {/* Email */}
            <div>
              <label className="block text-gray-600 mb-2 font-medium">Email</label>
              <input
                value={email}
                onChange={(e) => setemail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            {/* Password */}          
{/* Password */}
<div>
  <label className="block text-gray-600 mb-2 font-medium">Password</label>
  <div className="relative">
    <input
      value={password}
      onChange={(e) => setpassword(e.target.value)}
      type={showPassword ? "text" : "password"} // Toggle type
      placeholder="Enter your password"
      className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
    <button
      type="button"
      onClick={() => setShowPassword((prev) => !prev)} // Toggle visibility
      className="absolute right-3 top-3 text-gray-600 hover:text-gray-800 focus:outline-none"
    >
      {showPassword ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.232 15.232a3.5 3.5 0 01-4.964-4.964m0 0L4.5 4.5m16.5 16.5l-7.5-7.5m2.121-2.121A3.5 3.5 0 0012 7.5a3.5 3.5 0 00-2.121 6.121m9.879 3.379A10.97 10.97 0 0012 21a10.97 10.97 0 01-7.879-3.379m15.758-15.758A10.97 10.97 0 0112 3c-2.962 0-5.675 1.191-7.879 3.379"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3c2.962 0 5.675 1.191 7.879 3.379m0 0a10.97 10.97 0 013.121 7.621 10.97 10.97 0 01-3.121 7.621M4.5 4.5l15 15m0 0a10.97 10.97 0 01-7.879 3.379c-2.962 0-5.675-1.191-7.879-3.379M3.379 7.879A10.97 10.97 0 0112 3c2.962 0 5.675 1.191 7.879 3.379"
          />
        </svg>
      )}
    </button>
  </div>
</div>


            {/* Signup Button */}
            <button
              onClick={OnclickHandler}
              className="w-full bg-purple-700 text-white py-3 rounded-md shadow-md font-semibold text-lg hover:bg-purple-600 transition duration-300"
            >
              Sign Up
            </button>
          </form>
          {message && <p className="text-green-600 mt-4">{message}</p>}
          {error && <p className="text-red-600 mt-4">{error}</p>}
          <p className="text-gray-600 mt-6 text-sm">
            Already have an account?{' '}
            <Link to="/" className="text-purple-700 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;


