import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'

import Account from './Components/Nav/Account'
import Notification from './Components/Nav/Notification'
import Menu from './Components/Nav/Menu'

//Pages
import Users from './Users/Users'

export default function Dashboard(props)
{
	const { history } = props;

	const user = JSON.parse(localStorage.getItem('user'));

	const [pages] = useState([
		{
			path: '/users',
			page: Users,
			slug: 'users.view',
			user
		}
	]);

	const Auth = (rest) =>
	{
		if(!rest.item.slug || user.permissions.find(register => register.slug === rest.item.slug))
			return <rest.item.page { ...rest } />;
		else
			return <h3>Desculpe, você não tem permissão para isso!</h3>;
	}

	const RouteAuth = ({ component: Component, ...rest }) =>
	{
		return <Route { ...rest } render={ renderProps => <Auth { ...renderProps } { ...rest } /> } />;
	}

	return(
		
		<div className="wrapper">

			<div className="sidebar" data-color="orange" data-background-color="white">
			
				<div className="logo">

					<a href="/#" className="simple-text logo-normal">
						PAINEL
					</a>
				
				</div>

				<div className="sidebar-wrapper">

					<Menu user={ user } history={ history } />

				</div>

			</div>

			<div className="main-panel">

				<nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top">

					<div className="container-fluid">

						<div className="navbar-wrapper">

							<a className="navbar-brand" href="/#">Geral</a>

						</div>

						<button className="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">

							<span className="sr-only">Toggle navigation</span>
							<span className="navbar-toggler-icon icon-bar"></span>
							<span className="navbar-toggler-icon icon-bar"></span>
							<span className="navbar-toggler-icon icon-bar"></span>
						
						</button>

						<div className="collapse navbar-collapse justify-content-end">

							<ul className="navbar-nav">

								<Notification user={ user } history={ history } />

								<Account user={ user } history={ history } />

							</ul>

						</div>

					</div>

				</nav>

				<div className="content">

					<div className="container-fluid">

						<Switch>

							{
								pages.map((item, index) => {

									return <RouteAuth key={ index } item={ item } path={ item.path } component={ item.page } />
								
								})
							}

						</Switch>

					</div>

				</div>

				<footer className="footer">

					<div className="container-fluid">
				
						<div className="copyright float-right">
							&copy;
							{ new Date().getFullYear() }, made with <i className="material-icons">favorite</i> by
							<a href="https://www.creative-tim.com" target="_blank" rel="noopener noreferrer"> Creative Tim</a> for a better web.
						</div>
				
					</div>

				</footer>

			</div>
		
		</div>

	);
}