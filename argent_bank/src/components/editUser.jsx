/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, useEffect} from "react";
import { useSelector} from "react-redux";
import { useDispatch } from "react-redux";

function EditUser(){
    const dispatch = useDispatch();//initialise la fonction dispatch pour envoyer des actions au store Redux//
    //utilisation de useSelector pour extraire des valeurs de l'état global de l'application//
    const token = useSelector((state)=>state.auth.token);//extrait le token d'authentifaication//
    const user = useSelector((state)=>state.auth.username);//extrait le nom d'utilisateur actuel//
    const firstName = useSelector((state)=> state.auth.firstname);//extrait le prénom//
    const lastName = useSelector((state)=>state.auth.lastname);//extrait le nom de famille//
    const[showForm, setShowForm] = useState(false);//initialise un état local showForm pour gérer l'affichage du formulaire//
    const [newUserName, setNewUserName] = useState("");//initialise un état local pour le nouveau nom d'utilisateur//
    const toogleForm = () => {
        setShowForm( !showForm);//une fonction pour basculer l'affichage du formaulaire en appuyant sur un bouton//
    };
    const handleInputChange = (event) =>{
        setNewUserName(event.target.value);//fonction pour mettre à jour newUserName lorsque l'utilisateur tape dans le champs//
    };
    const handleSubmit = async(event) => {
        event.preventDefault();//empeche la soumission par defaut du formulaire //
        try{
            //efectue une requete http PUT pour mettre à jour le nom d'utilisateur//
            const response = await fetch("http://localhost:3001/api/user/profile",{
                method: 'PUT',
                headers : {
                    'Content-type': 'application/json',
                    Authorization : `Bearer ${token}`,//utilise le token d'authentification dans les en-têtes//
                },
                body: JSON.stringify({username:newUserName}),//envpoie le nouveau nom d'utilisateur au format Json//
            });
            if(response.ok){//si la requête réussie//
                console.log(response);//affiche la reponse dans la console//
             //envoie une action Redux pour mettre à jour le nom de l'utilisateur//
                dispatch({
                    type:'SET_USER',
                    payload: {
                        username : newUserName,
                        firstname : firstName,
                        lastname : lastName,
                    },
                });
            } else {
                console.log("Erreur lors de l'envoi du nouveau nom d'utilisateur");
            }
        } catch (error){//en cas d'erreur de la requête//
            console.log("erreur lors de la requete :", error);//affiche un  message d'erreur//
        }
        setNewUserName('');// reinitialise l'etat newUserName//
        setShowForm(false);//masque le formulaire après soumission//
    };
    useEffect(()=>{
        setNewUserName(user);//utilsie useEffect pour mettre a jour newUserName lorsque user change//
    },[user]);
    return(
        <>
        <section className="accoutn-header">
            <h1>Welcome back {firstName} {lastName} !</h1>
            {!showForm && (
                <button className="transaction-button button" onClick={toogleForm}>Edit your name</button>
            )}
        </section>
        {showForm &&(
            <form className="account-form" onSubmit={handleSubmit}>
                <label>First Name:</label>
                <input type="text" value={firstName} disabled/>
                <label>Last Name</label>
                <input type="text" value={lastName} disabled />
                <label>New Username</label>
                <input type="text" value={newUserName} onChange={handleInputChange} required />
                <button type="submit" className="transaction-button button">Comfirm</button>
            </form>
        )}
        </>
    )

}

export default EditUser;