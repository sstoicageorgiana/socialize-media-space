import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from '../src/components/layout/Navbar';
import Landing from '../src/components/layout/Landing';

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import setAuthToken from './utils/setAuthToken';
import { userLoaded } from './actions/auth';

import store from './store';

import { Provider } from 'react-redux';
import { useEffect } from 'react';




if (localStorage.token) {
	setAuthToken(localStorage.token);
}


const App = () => {
	// put the second parameter [arr of states] to run only once when component did mount
	useEffect(() => {
		store.dispatch(userLoaded());
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<div className="App">
					<Navbar />
					<Route exact path="/" component={Landing} />
					<Alert />
					<Switch>
						<Route exact path="/register" component={Register} />
						<Route exact path="/login" component={Login} />
					</Switch>
				</div>
			</Router>
		</Provider>
	);
};


export default App;

/**
 * Locul in care avem starile aplicatiile 
 * exista anumite comp care daca imbraca tot ofera niste facilitati => ex router => 
 * ofera fct de rutare, la fel facem si ptr redux, sau ErrorBoundery
 * 
 * 
 */