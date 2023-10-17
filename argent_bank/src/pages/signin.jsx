import { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";



function SignIn(){
    //initialisation de la fonction dispatch pour envoter des actions a redux //
    const dispatch= useDispatch();
    //récuperation du token de l'utilisateur //
    const token = useSelector((state)=> state.auth.token);
    //definition des 2 états locaux pour stocker le nom de l'utilisateur et le mot de passe//
    const [userName, setUserName]= useState('');
    const [password, setPassword] = useState('');
    //état pour gérer les erreurs lors de la connexion//
    const [error, setError]= useState('');
    //hook pour gérer la navigation vers d'autres pages//
    const navigation = useNavigate();
    //Fonction de gestion des changements de valeurs des champs du formulaire//
    const handleUsernameChange = (event) => {
        setUserName(event.target.value);
    }
    const handlePasswordChange = (event) =>{
        setPassword(event.target.value);
    }
    //fonction de gestion de la soumission du formulaire//
    const handleSignIn = (event) =>{
        event.preventDefault();
        const userData={
            email:userName,
            password:password
        };
        fetch('http://localhost:3001/api/v1/user/login', {
            method: 'POST',
            Headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data =>{
            console.log(data);
            if(data.status !== 200){//gestion des erreurs//
                setError(true);
                return;
            }
            else{
                dispatch({//enregistrement du token dans le store redux
                    type : 'LOGIN',
                    payload : {
                        token : data.body.token,
                    }
                });
                navigation("/user");//rediriger vers la page de l'utilisateur aprés une connexion réussie //
            }
        })
        .catch (error=>{
            console.error(error);
        });
    };
    //si l'utilisateur est déja connecté on le redirige vers la page utilisateur//
    useEffect(()=>{
        if(token){
            navigation("/user");
        }
    }, [token , navigation]);
    return(
        <main className="darkMode">
            <section className="signIn">
                <i className="fa fa-user-circle signIn-icon"></i>
                <form onSubmit={handleSignIn}>
                    <div className="inputWrapper">
                        <label htmlFor="username">Email</label>
                        <input autoComplete="email" className={error ? 'sign-in__error-border' : ''}type="email" id="username" value={userName} onChange={handleUsernameChange} required/>
                    </div>
                    <div className="inputWrapper">
                        <label htmlFor="password">Password</label>
                        <input className={error ? 'sign-in__error-border' : ''}type="password" id="password" value={password} onChange={handlePasswordChange} required/>
                    </div>
                    { error && <p className="signIn-errorMessage">Username or Password incorrect</p>}
                    <div className="inputRemember">
                        <input type="checkbox" id="rememberMe"/>
                        <label htmlFor="rememberMe">Remember me</label>
                    </div>
                    <button className="signInButton" type="submit">Sign In</button>
                </form>
            </section>
        </main>
    );
}

export default SignIn;