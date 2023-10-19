/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, useEffect} from "react";
import { useSelector} from "react-redux";
import { useDispatch } from "react-redux";

function EditUser(){
    const dispatch = useDispatch();//initialise la fonction dispatch pour envoyer des actions au store Redux//
    //utilisation de useSelector pour extraire des valeurs de l'état global de l'application//
    const token = useSelector((state)=>state.auth.token);//extrait le token d'authentifaication//
    const user = useSelector((state)=>state.name.userName);//extrait le nom d'utilisateur actuel//
    const firstName = useSelector((state)=> state.name.firstName);//extrait le prénom//
    const lastName = useSelector((state)=>state.name.lastName);//extrait le nom de famille//
    const[showForm, setShowForm] = useState(false);//initialise un état local showForm pour gérer l'affichage du formulaire//
    const [newUserName, setNewUserName] = useState('');//initialise un état local pour le nouveau nom d'utilisateur//
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
            const response = await fetch("http://localhost:3001/api/v1/user/profile",{
                method: 'PUT',
                headers : {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`,//utilise le token d'authentification dans les en-têtes//
                },
                body: JSON.stringify({userName:newUserName}),//envpoie le nouveau nom d'utilisateur au format Json//
            });
            if(response.ok){//si la requête réussie//
                console.log(response);//affiche la reponse dans la console//
             //envoie une action Redux pour mettre à jour le nom de l'utilisateur//
                dispatch({
                    type:'SET_USER',
                    payload: {
                        userName : newUserName,
                        firstName : firstName,
                        lastName : lastName,
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
        <section className="account-header">
            <h1>Welcome back, {firstName} {lastName} !</h1>
            {!showForm && (
                <button className="transaction-button edit-button" onClick={toogleForm}>Edit name</button>
            )}
        </section>
        {showForm &&(
            <form className="account-form inputWrapper" onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name:</label>
                <input id="firstName" type="text" value={firstName} disabled/>
                <label htmlFor="lastName">Last Name</label>
                <input id="lastName" type="text" value={lastName} disabled />
                <label htmlFor="newUserName">New Username</label>
                <input id="newUserName" type="text" value={newUserName} onChange={handleInputChange} required />
                <button type="submit" className="transaction-button button">Comfirm</button>
            </form>
        )}
        </>
    )

}

export default EditUser;