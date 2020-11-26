import React, { useState } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'

import Account from './Components/Nav/Account'
import Notification from './Components/Nav/Notification'
import Menu from './Components/Nav/Menu'

//Home
import Home from './Home/Home'

//Propostas
import Proposals from './Proposals/Proposals'
import CreateProposal from './Proposals/CreateProposal'
import ProposalDetail from './Proposals/ProposalDetail'

//Loja
import Stores from './Stores/Stores'
import StoreDetail from './Stores/StoreDetail'
import StoreCreate from './Stores/StoreCreate'

//Usuários
import Users from './Users/Users'
import CreateUser from './Users/CreateUser'
import Profiles from './Profiles/Profiles'

//Clientes
import Client from './Client/Client'

export default function Dashboard(props)
{
	const { history } = props;

	const user = JSON.parse(localStorage.getItem('user'));

	const [pages] = useState([

		//Home
		{
			path: '/',
			component: Home,
			exact: '/'
		},

		//Propostas
		{
			path: '/proposals',
			component: Proposals,
			slug: 'get/proposals'
		},
		{
			path: '/proposal/create',
			component: CreateProposal,
			slug: 'post/proposal'
		},
		{
			path: '/proposal/detail',
			component: ProposalDetail,
			slug: 'get/proposals'
		},

		//Lojas
		{
			path: '/stores',
			component: Stores,
			slug: 'get/stores'
		},
		{
			path: '/store/detail',
			component: StoreDetail,
			slug: 'get/stores'
		},
		{
			path: '/store/create',
			component: StoreCreate,
			slug: 'post/store'
		},

		//Usuários
		{
			path: '/users',
			component: Users,
			slug: 'get/users'
		},
		{
			path: '/user/create',
			component: CreateUser,
			slug: 'post/user'
		},
		{
			path: '/profiles',
			component: Profiles,
			slug: 'get/profiles'
		},

		//Clientes
		{
			path: '/clients',
			component: Client,
			slug: 'get/client/:document'
		}

	]);

	const Auth = (rest) =>
	{
		let query = new URLSearchParams(useLocation().search);

		if(!rest.slug || user.permissions.find(register => register.slug === rest.slug))
			return <rest.component { ...rest } user={ user } params={ query } />;
		else
			return <h3>Desculpe, você não tem permissão para isso!</h3>;
	}

	const RouteAuth = ({ component, ...rest }) => <Route { ...rest } render={ renderProps => <Auth { ...renderProps } { ...rest } component={ component } /> } />;

	return(

		<div className="wrapper sidebar_minimize">

			<div className="main-header">

				<div className="logo-header" data-background-color="orange">

					<button className="navbar-toggler sidenav-toggler ml-auto" type="button" data-toggle="collapse" data-target="collapse" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon">
							<i className="icon-menu"></i>
						</span>
					</button>

					<button className="topbar-toggler more"><i className="icon-options-vertical"></i></button>

					<div className="nav-toggle">
						<button className="btn btn-toggle toggle-sidebar">
							<i className="icon-menu"></i>
						</button>
					</div>

				</div>

				<nav className="navbar navbar-header navbar-expand-lg" data-background-color="orange2">
					
					<div className="container-fluid">

						<ul className="navbar-nav topbar-nav ml-md-auto align-items-center">

							<Notification />

							<Account user={ user } history={ history } />

						</ul>

					</div>

				</nav>

			</div>

			<div className="sidebar sidebar-style-2">

				<div className="sidebar-wrapper scrollbar scrollbar-inner">

					<div className="sidebar-content">

						<Menu user={ user } history={ history } />

					</div>

				</div>

			</div>

			<div className="main-panel">

				<div className="content">

					<div className="panel-header bg-warning-gradient">

						<div className="page-inner py-4">

							<div className="d-flex align-items-left align-items-md-center flex-column flex-md-row">

							</div>

						</div>

					</div>

					<div className="page-inner mt--5">

						<Switch>

							{
								pages.map((item, index) => {

									return <RouteAuth key={ index } { ...item } />
								
								})
							}

						</Switch>

					</div>

				</div>

				<footer className="footer">

					<div className="container-fluid">

						<div className="copyright ml-auto">

							{ new Date().getFullYear() }

							&copy;
							
							<a href="https://www.gingaginanceira.com.br"> Ginga Financeira</a>
						
						</div>		

					</div>

				</footer>

			</div>

		</div>

	);
}