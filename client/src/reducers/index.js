//index.js=> deobicei avem config general
import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';

export default combineReducers({
    alert,
    auth
});

//toate acele metode(reducere) vor fi fisiere si vor face toate lucruile ptr toate aplicatiile