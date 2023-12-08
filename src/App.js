import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import Login from './component/Login';
import Home from './component/Home';
import ProfilePage from './component/profilePage';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/DashBoard" element={<Home/>}/>
          <Route path="/profilePage" element={<ProfilePage/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
