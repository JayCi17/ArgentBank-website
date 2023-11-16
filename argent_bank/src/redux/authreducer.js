// definition de l'état initial du reducer
const initialState = {
    token:''
};// l'état initial comporte un champ token vide
// definition du reducer
const authReducer = (state = initialState, action) => {//il prend de argument l'étatc actuel et l'action declenchée
    switch (action.type){
        case 'LOGIN':
            //en cas d'action Login
            return{
                ...state,
                token : action.payload.token// met à jour le champ token pour l'identification
            };
        case 'LOGOUT':
            //en cas de Logout
            return initialState;// on revient à l'état initial avec un champ vide pour le token
            default :
            return state;
    }
};

export default authReducer;