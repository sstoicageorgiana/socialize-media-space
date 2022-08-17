import { SET_ALERT, REMOVE_ALERT } from "../actions/constants";

const initialState=[];

//redux => state mgmt => state-ul de alerte este un array
//action care va fi rezolvat vine automat din mecanisul de redux
export default function alert(state = initialState, action){
    const {type, payload} = action;
    console.log(`test =>  type : ${type} `);
    
    switch(type){
        case SET_ALERT:
            console.log(`case SET_ALERT`);
            //return [...state, payload]; //lasa-mi starea veche si mai adauga payload(msg, alertype, id), se,poate sterge ...state sa nu apara de mai multe ori
            return [payload];
            case REMOVE_ALERT:
            return state.filter((alert) => alert.id != payload.id)
        default:
            return state;
    }
}

