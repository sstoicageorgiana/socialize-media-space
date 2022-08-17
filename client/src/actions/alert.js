import { SET_ALERT, REMOVE_ALERT } from "./constants"; 
import { v4 as uuidv } from 'uuid';
//se prinde ca nu este default 


//cnd e ceva ce trebuie sa fie unic, folosesc uuidv
export const setAlert = (msg, alertType) => (dispatch) =>{
    const id = uuidv();
    console.log(`first step into setting Alert with Redux-SetAlert =>  id : ${id} `);
    dispatch({
        type:SET_ALERT,
        payload:{msg, alertType, id},
    })
    setTimeout(
        () => dispatch({
            type: REMOVE_ALERT, 
            payload: { msg, alertType, id},
        }),
        3000
        );
}

