import { Outlet } from 'react-router-dom';
import bgimage from './images/imgbg.jpg';
import Login from './Component/Login';
import Signup from './Component/Signup';
import Footer from './Component/Footer';
import Header from './Component/Header';
function Layout() {
  return (
    <>
    <Header/>
    <Outlet/>
    {/* <Footer/> */}
    </>
  );
}

export default Layout;