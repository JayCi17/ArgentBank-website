import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Header from "./layouts/header";
import Footer from "./layouts/footer";
import "./styles/main.scss"

function App() {
  return (
    <div className="container">
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}
export default App;
