import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { validate } from './features/user/userSlice';
import Home from './pages/Home';
import Login from './pages/Login';
import MyTeams from './pages/MyTeams';

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(validate())
  },[])

  return (   
      <BrowserRouter>
        <Navbar/>
        <div className='max-w-screen-xl mx-auto'>
          <Routes>
            {/* <Route path="*" element={<NotFound/>}/> */}
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/my_teams" element={<MyTeams/>}/>
          </Routes>
        </div>
      </BrowserRouter> 
  );
}

export default App;
