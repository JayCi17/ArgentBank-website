const initialState = {
    userName:'',
    firtsName :'',
    lastName : ''
};

const nameReducer = (state=initialState, action)=>{
    switch(action.type){
        case 'SET_USER':
            return{
                ...state,
                userName: action.payload.userName,
                firstName : action.payload.firstName,
                lastName : action.payload.lastName,
            };
        case 'LOGOUT':
            return initialState;
            default:
                return state;
    }
}

export default nameReducer;