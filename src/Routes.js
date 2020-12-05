import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { isAuthenticate } from './Auth'

import Login from './app/views/Login/Login'
import Dashboard from './app/views/Dashboard/Dashboard'

export default function Routes()
{
	return(
		<BrowserRouter>

			<Switch>

				<Route exact path="/login" component={ Login } />

				<PrivateRoute path="/" component={ Dashboard } />

			</Switch>

		</BrowserRouter>
	);
}

const PrivateRoute = ({ component: Component, ...rest }) => 
{
	isAuthenticate();

	return(
		<Route { ...rest } render={ props =>

			!localStorage.getItem('user') ? (
				<Redirect to={{ pathname: '/login', state: { from: props.location } }} />
			) : (
				<Component { ...props } />
			)

		} />
	);
}