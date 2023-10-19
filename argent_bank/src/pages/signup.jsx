import { useState, useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";

function SignUp(){
    //states//
    const token = useSelector((state)=>state.auth.token);
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [firstName, setFirstName]=useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [error, setError] = useState('');
    //hooks//
    const navigate = useNavigate();
    //fonction de changements de valeurs des formulaires//
    const handleEmailChange = (event) =>{
        setEmail(event.target.value);
    };
    const handlePasswordChange= (event) =>{
        setPassword(event.target.value);
    };
    const handleFirstNameChange = (event) =>{
        setFirstName(event.target.value);
    };
    const handleLastNameChange = (event) =>{
        setLastName(event.target.value);
    };
    const handleUsernameChange = (event)=>{
        setUserName(event.target.value);
    };
    //fonction de la gestion de la soumission du formulaire//
    const handleSignUp = (event) =>{
        event.preventDefault();
        const userData = {
            email:email,
            password:password,
            firstName:firstName,
            lastName:lastName,
            userName:userName
        };
        fetch('http://localhost:3001/api/v1/user/signup',{
            method:'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response =>response.json())
        .then(data =>{
            console.log(data);
            if(data.status !== 200){//gestion des erreurs//
                setError(true);
                return;
            }else{
                alert('Your account has been created !');
                navigate("/signin");
            }
        })
        .catch(error=>{
            console.error(error);
        });
    };
    //si l'utilisateur est deja connecté on le redirige vers la page user//
    useEffect(()=>{
        if(token){
            navigate("/user");
        }
    },[token, navigate]);
    return(
        <main className="darkMode">
            <section className="signUp signIn">
                <i className="fa fa-user-circle signUp-icon signIn-icon"></i>
                <form onSubmit={handleSignUp}>
                    <div className="signUp-cont">
                        <div className="inputWrapper">
                            <label htmlFor="email">Email</label>
                            <input autoComplete="email" className={error ? 'sign-up__error-border' : ''} type="email" id="email" value={email} onChange={handleEmailChange} required/>
                        </div>
                        <div className="inputWrapper">
                            <label htmlFor="password">Password</label>
                            <input autoComplete="current-password" className={error ? 'sign-up__error-border' : ''} type="password" id="password" value={password} onChange={handlePasswordChange} required/>
                        </div>
                        <div className="inputWrapper">
                            <label htmlFor="firstName">First Name</label>
                            <input className={error ? 'sign-up__error-border' : ''} type="text" id="firstName" value={firstName} onChange={handleFirstNameChange} required/>
                        </div>
                        <div className="inputWrapper">
                            <label htmlFor="lastName">Last Name</label>
                            <input className={error ? "sign-up__error-border" : ""} type="text" id="lastName" value={lastName} onChange={handleLastNameChange} required/>
                        </div>
                        <div className="inputWrapper">
                            <label htmlFor="userName">User Name</label>
                            <input  autoComplete="text" className={error ? 'sign-up__error-border': ''} type="text" id="userName" value={userName} onChange={handleUsernameChange} required/>
                        </div>
                        {error && <p className="sing-up__error-message">An error has occured</p>}
                        <button className="sign-up__button signInButton" type="submit">Sign Up</button>
                    </div>
                </form>
            </section>
        </main>
    );
}

export default SignUp