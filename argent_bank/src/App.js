import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import User from "./pages/user";
import Header from "./layouts/header";
import Footer from "./layouts/footer";
import "./styles/main.scss"

function App() {
  return (
    <div className="container">
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/user" element={<User/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}
export default App;
