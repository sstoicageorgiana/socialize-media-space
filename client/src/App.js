import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from '../src/components/layout/Navbar';
import Landing from '../src/components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { Provider } from 'react-redux';
import store from './store';

const App = () => (
	<Provider store={store}>
		<Router>
			<div className="App">
				<Navbar />
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
