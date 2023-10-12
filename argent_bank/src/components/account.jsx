import { NavLink } from "react-router-dom";// importation du composant NavLink de react-router//
import {useSelector , useDispatch } from "react-redux";// importation des donctions useselector et useDispatch de Redux//
import React , {useEffect} from "react";

function Account(){
    const dispatch = useDispatch();// initialisation de la fonction dispatch//
    const token = useSelector((state)=> state.auth.token);//récuperation du token depuis le store Redux//
    const username = useSelector((state)=> state.name.userName);//récuperation du nom d'utilisateur depuis le store Redux//

    const handleLogOut = () => {
        dispatch({//action pour deconnecter l'untilisateur en utilisant le token//
            type: 'LOGOUT',
        });
    };
    useEffect(()=>{
        if(token){// verifie si un token est présent (utilisateur connecté)//
            const fetchData = async () => {
                try {
                    const response = await fetch ('http://localhost:3001/api/v1/user/profile',{
                        method : 'POST',
                        Headers : {
                            'content-type' : 'application/json',
                            'Authorization' : `Bearer ${token}`,
                        },
                    });
                    if (response.ok){// si la requête est réussie //
                        const data = await response.json();// récuperation des données de l'untilisateur depuis le serveur //
                        console.log(data);
                        dispatch({// action pour enregistrer les données de l'untilisateur dans le store Redux//
                            type : 'SET_USER',
                            payload : {
                                userName : data.body.userName,
                                firstName : data.body.firstName,
                                lastName : data.body.lastName,
                            },
                        });
                    }else{
                        console.log("erreur lors de la récuperation des données")
                    }
                }catch(error){
                    console.log("Erreur lors de la récuperation du profil de l'utilisateur")
                }
            };
            fetchData();//appel de la fonction fecthData pour recuperer les données du profil de l'utilisateur//
        }
    },[dispatch, token]);
    return(
        <>
        {username ? (// verifie sin un nom d'utilisateur est present (utilisateur connecté) //
            <div className="cont-user">
                <button className="userButton" onClick={handleLogOut}>Logout</button>
                <NavLink className="userButton" to="/user">
                    <i className="fas fa-user-circle"></i>
                    <p>{username}</p>
                </NavLink>
            </div>
        ) : (// si aucun utilisateur connecté //
            < div className="cont-user">
                <NavLink className="userButton" to="/signin">
                    <i className="fas fa-user-circle"></i>
                    <p>Sign In</p>
                </NavLink>
            </div>
        )}
        </>
    )
}

export default Account;