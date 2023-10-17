import React, {useEffect} from "react";
import { useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import EditUser from "../components/editUser";

function User(){
    //extraction du jeton d'authentification de l'état géré par redux//
    const token = useSelector((state)=>state.auth.token);
    //récupération de la fonction navigation du router//
    const navigate = useNavigate;
    //utilisation du Hook useEffect pour effectuer une action lorsque le jeton change//
    useEffect (()=>{
        //verification de la presence du jeton//
        if(!token){
            //redirection vers la page d'identification si l'utilisateur n'est connecté//
            navigate("/signin");
        }
    },[token, navigate]);
    //rendu de la page utilisateur//
    return(
        <main className="main">
            <EditUser/>
        </main>
    )
}

export default User;