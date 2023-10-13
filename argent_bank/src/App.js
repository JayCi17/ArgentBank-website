import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import SignIn from "./pages/signin";
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
      </Routes>
      <Footer/>
    </div>
  );
}
export default App;
