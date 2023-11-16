import { createStore } from "redux";
import {persistStore, persistReducer} from "redux-persist"
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers';
// configuration de reduxdevtools pour le debogage de redux
const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// configuration de la persistance
const persistConfig = {
   key: 'root', // Clé de persistance, peut être modifiée selon vos besoins
   storage,

 };
 // creation du persistReducer pour garantir que que l'état de l'application est stocké et restaurer automatiquement pour offir une experience plus fluide
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer, reduxDevtools);
const persistor = persistStore(store);
//exportation du magasin et du persistor//
export { store, persistor};