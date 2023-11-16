//definition du champs initial
const initialState = {
    userName:'',
    firstName :'',
    lastName : ''
};

const nameReducer = (state=initialState, action)=>{
    switch(action.type){
        case 'SET_USER':
            // en cas d'action de type SET_USER
            return{
                ...state,//crée une copie de l'état actuel
                userName: action.payload.userName,
                firstName : action.payload.firstName,// mise a jour des champs
                lastName : action.payload.lastName,
            };
        case 'LOGOUT':
            //en cas de LOGOUT
            return initialState;
            default:
                return state;
    }//retour au stade initial vide
}

export default nameReducer;