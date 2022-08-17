import { REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/constants';
// import { setAlert } from '../actions/alert';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	loading: true,
	user: null,
};

export default function (state = initialState, action) {
    //type = the type of action ( REGISTER_FAIL or  REGISTER_SUCCESS ) ; payload = what backend sends back
	const { type, payload } = action;
	switch (type) {
		case REGISTER_SUCCESS:
             //put the token in local storage, to remember and use it for resources and to know who i am
			localStorage.setItem('token', payload.token);
            //old state, payload(token), autenficiarea (it was done), loading:false(the moment of reg is done)
            alert("Registration was successfully");
            // setAlert('Registration was successfully', 'success',3000);
			return { ...state, ...payload, isAuthenticated: true, loading: false };
		case REGISTER_FAIL:
			localStorage.removeItem('token');
            //remove token from localstorage just to be sure 
			return { ...state, token: null, isAuthenticated: false, loading: false };
		default:
			return state;
	}
}
