import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { validate } from './features/user/userSlice';
import Home from './pages/Home';
import Login from './pages/Login';
import MyTeams from './pages/MyTeams';
import DragAndDrop from './pages/DragAndDrop';
import DragAndDrop2 from './pages/DragAndDrop2';
import Team from './pages/Team';
import SignUp from './pages/Signup';

function App() {
  
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(validate()); 
  },[]);

  const img = useSelector(state => state.team.data.img)

  return (   
      <BrowserRouter>
        <Navbar/>
          <div 
          className="h-screen bg-no-repeat bg-cover bg-top"
          style={{backgroundImage:`url('${img}')`}}
          >
          <Routes>
            {/* <Route path="*" element={<NotFound/>}/> */}
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/my_teams" element={<MyTeams/>}/>
            <Route path="/my_teams/:idTeam" element={<Team/>}/>
            <Route path="/drag_and_drop" element={<DragAndDrop/>}/>
            <Route path="/drag_and_drop2" element={<DragAndDrop2/>}/>
          </Routes>
        </div>
      </BrowserRouter> 
  );
}

export default App;
