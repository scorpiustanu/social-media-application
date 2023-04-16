import './App.css';

import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import Login from './components/Login';
import Home from './pages/Home';
import SignUp from './components/SignUp';
import SavedVideo from './pages/SavedVideo';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import Message from './pages/Message';
import  CreatePost from "./pages/Createpost";

function App() {

  const isLoggedIn = window.localStorage.getItem("loggedIn");

  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route exact path='/' element={ isLoggedIn == "true" ? <Home/> : <Login/> } />  
          <Route path='/sign-in' element={<Login/>} />
          <Route path='/sign-up' element={<SignUp/>} />
          <Route path='/home' element={<Home/>} />
          <Route path='/saved-video' element={<SavedVideo/>} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/message' element={<Message/>} />
          <Route path='/createpost' element={<CreatePost/>} />
        </Routes>  
      </div>  
    </Router>
  );
}

export default App;
