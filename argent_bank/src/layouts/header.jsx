import { Link } from "react-router-dom";
import Logo from "../assets/argentBankLogo.png";
import Account from "../components/account";

function Header(){
    return(
        <header>
            <nav className="navContainer">
                <Link to="/">
                    <img className="logoHeader" alt="logo" src={Logo}/>
                </Link>
                <Account/>
            </nav>
        </header>
    )
}

export default Header;