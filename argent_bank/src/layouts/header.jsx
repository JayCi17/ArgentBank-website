import { Link } from "react-router-dom";
import Logo from "../assets/argentBankLogo.png";

function Header(){
    return(
        <header>
            <nav className="navContainer">
                <Link to="/">
                    <img className="logoHeader" alt="logo" src={Logo}/>
                </Link>
            </nav>
        </header>
    )
}

export default Header;