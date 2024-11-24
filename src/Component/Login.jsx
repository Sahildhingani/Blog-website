import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bgimage from '../images/imgbg.jpg';
import AuthService from '../Appwrite/Auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const checkAndLogout = async () => {
      try {
        const user = await AuthService.ActiveSession(); // Await the session response
        console.log("Active session:", user);
        if (user) {
          await AuthService.LogOut(); // Log out if session exists
          console.log("Logged out successfully");
        }
      } catch (error) {
        console.error("Error checking session or logging out:", error);
      }
    };

    checkAndLogout(); // Call the asynchronous function
  }, []);
  // Handle login
  async function handleLogin(e) {
    e.preventDefault();
    setError(''); // Clear previous errors
    setLoading(true); // Show loading indicator

    try {
      const response=await AuthService.Login({email, password}); // Replace with your actual AuthService logic
      console.log("Response : ",response)
      if(response.success!=false){
        localStorage.setItem('userid',response.data.userId);
        navigate('/home');
      }else{
        setError('Check input field')
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false); // Hide loading indicator
    }
  }

  // Redirect if already logged in
  useEffect(() => {
    async function checkAuth() {
      try {
        const user = await AuthService.getCurrentUser(); // Replace with your actual logic
        if (user) navigate('/home');
      } catch {
        // User is not logged in; no action needed
      }
    }
    checkAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-700 via-purple-500 to-purple-700 flex justify-center items-center">
      {/* Container */}
      <div className="max-w-5xl h-128 w-full bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col md:flex-row max-md:rounded-none ">
        {/* Left Section */}
        <div className="bg-white shadow-lg rounded-lg p-8 md:p-12 max-w-3xl mx-auto">
          <div className="flex justify-center">
            <img className="h-20 w-96 mb-6" src={bgimage} alt="Website Logo" />
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-purple-700 mb-4">
              Welcome back to <span className="text-purple-800">The Blooming Pen</span>
            </h1>
            <p className="text-lg font-medium text-gray-700 mb-4">
              "Your Stories, Your Voice, Your World."
            </p>
            <p className="text-base text-gray-600 leading-relaxed">
              Log in to continue sharing your stories and exploring the creativity of others!
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="md:w-2/3 p-8 flex flex-col justify-center items-center bg-gray-50">
          <h2 className="text-3xl font-bold text-purple-700 mb-6">Log In</h2>
          <form className="w-full max-w-sm flex flex-col gap-4" onSubmit={handleLogin}>
            {/* Email */}
            <div>
              <label className="block text-gray-600 mb-2 font-medium">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Enter your Email..."
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-gray-600 mb-2 font-medium">Password</label>
              <div className='flex '>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {/* Eye Icon for toggling */}
              <button
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }}
                className="absolute pt-8 right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? (
                  <i className="fas fa-eye"></i>
                ) : (
                  <i className="fas fa-eye-slash"></i>
                )}
              </button>
              </div>
              
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-600 text-sm text-center" aria-live="polite">
                {error}
              </p>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? 'bg-purple-400' : 'bg-purple-700 hover:bg-purple-600'
              } text-white py-3 rounded-md shadow-md font-semibold text-lg transition duration-300`}
            >
              {loading ? 'Logging In...' : 'Log In'}
            </button>
          </form>

          {/* Additional Links */}
          <div className="flex justify-between w-full mt-4">
            <p className="text-gray-600 text-sm">
              <Link to="/forgot-password" className="text-purple-700 font-semibold hover:underline">
                Forgot Password?
              </Link>
            </p>
            <p className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <Link to="/Signup" className="text-purple-700 font-semibold hover:underline">
                Signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

