import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from '../src/components/layout/Navbar';
import Landing from '../src/components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { Provider } from 'react-redux';
import store from './store';
import Alert from './components/layout/Alert';

const App = () => (
	<Provider store={store}>
		<Router>
			<div className="App">
				<Navbar />
				<Alert/> {/* Third step into setting Alert with Redux-SetAlert */}
				<Route exact path="/" component={Landing} />
				<Switch>
					<Route exact path="/register" component={Register} />
					<Route exact path="/login" component={Login} />
				</Switch>
			</div>
		</Router>
	</Provider>
);

export default App;

/**
 * Locul in care avem starile aplicatiile 
 * exista anumite comp care daca imbraca tot ofera niste facilitati => ex router => 
 * ofera fct de rutare, la fel facem si ptr redux, sau ErrorBoundery
 * 
 * 
 */