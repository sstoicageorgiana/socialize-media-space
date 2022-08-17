import axios from 'axios';
import { setAlert } from './alert';
import { REGISTER_SUCCESS, REGISTER_FAIL } from './constants';

// register user
export const register =
	({ name, email, password }) =>
	async (dispatch) => {
		const config = {
			headers: { 'Content-Type': 'application/json' },
		};

		const body = JSON.stringify({ name, email, password });

		try {
			const response = await axios.post('/api/users', body, config);
			dispatch({
				type: REGISTER_SUCCESS,
				payload: response.data,
			});
		
		} catch (error) {
			const errors = error.response.data.errors;

			if (errors) {
				errors.forEach((error) => {
					dispatch(setAlert(error.msg, 'danger', 3000));
				});
			}
			dispatch({
				type: REGISTER_FAIL,
			});
		}
	};