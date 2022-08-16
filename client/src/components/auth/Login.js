import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import axios from 'axios';

const Login = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmationPassword: '',
	});

	const { email, password } = formData;
	const submitHandler = async (e) => {
		e.preventDefault();
		const credential = {
			email,
			password,
		};
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};
			const body = JSON.stringify(credential);

			const response = await axios.post('/api/auth', body, config);
			console.log(response.data);
		} catch (error) {
			console.log(error.response.data);
		}
	};

	return (
		<div className="container">
			<h1 className="large text-primary">Sign in</h1>
			<p className="lead">
				<FaUserAlt /> Sing Into your account
			</p>
			<form className="form" onSubmit={(e) => submitHandler(e)}>
				<div className="form-group">
					<input
						type="email"
						placeholder="Email Address"
						name="email"
						value={email}
						onChange={(e) =>
							setFormData({ ...formData, email: e.target.value })
						}
						required
						autocomplete="on"
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						placeholder="Password"
						name="password"
						value={password}
						onChange={(e) =>
							setFormData({ ...formData, password: e.target.value })
						}
						minLength="6"
					/>
				</div>
				<input type="submit" className="btn btn-primary" value="Login" />
			</form>
			<p className="my-1">
				Don't have an account? <Link to="/register">Sign Up</Link>
			</p>
		</div>
	);
};

export default Login;
