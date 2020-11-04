import React, { useState } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'

import Account from './Components/Nav/Account'
import Notification from './Components/Nav/Notification'
import Menu from './Components/Nav/Menu'

//Propostas
import Proposals from './Proposals/Proposals'

//Usuários
import Users from './Users/Users'
import CreateUser from './Users/CreateUser'

//Clientes
import Client from './Client/Client'

export default function Dashboard(props)
{
	const { history } = props;

	const user = JSON.parse(localStorage.getItem('user'));

	const [pages] = useState([

		//Propostas
		{
			path: '/proposals',
			page: Proposals,
			slug: 'users.view'
		},

		//Usuários
		{
			path: '/users',
			page: Users,
			slug: 'users.view'
		},
		{
			path: '/user/create',
			page: CreateUser,
			slug: 'users.view'
		},

		//Clientes
		{
			path: '/clients',
			page: Client,
			slug: 'users.view'
		}

	]);

	const Auth = (rest) =>
	{
		let query = new URLSearchParams(useLocation().search);

		if(!rest.item.slug || user.permissions.find(register => register.slug === rest.item.slug))
			return <rest.item.page { ...rest } user={ user } params={ query } />;
		else
			return <h3>Desculpe, você não tem permissão para isso!</h3>;
	}

	const RouteAuth = ({ component: Component, ...rest }) =>
	{
		return <Route { ...rest } render={ renderProps => <Auth { ...renderProps } { ...rest } /> } />;
	}

	const logout = (event) =>
	{
		event.preventDefault();
		localStorage.removeItem('user');
		history.push('/login');
	}

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

							<li className="nav-item dropdown hidden-caret">
								<a className="nav-link dropdown-toggle" href="/" id="messageDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									<i className="fa fa-envelope"></i>
								</a>
								<ul className="dropdown-menu messages-notif-box animated fadeIn" aria-labelledby="messageDropdown">
									<li>
										<div className="dropdown-title d-flex justify-content-between align-items-center">
											Messages 									
											<a href="/" className="small">Mark all as read</a>
										</div>
									</li>
									<li>
										<div className="message-notif-scroll scrollbar-outer">
											<div className="notif-center">
												<a href="/">
													<div className="notif-img"> 
														<img src="../assets/img/jm_denis.jpg" alt="Img Profile" />
													</div>
													<div className="notif-content">
														<span className="subject">Jimmy Denis</span>
														<span className="block">
															How are you ?
														</span>
														<span className="time">5 minutes ago</span> 
													</div>
												</a>
												<a href="/">
													<div className="notif-img"> 
														<img src="../assets/img/chadengle.jpg" alt="Img Profile" />
													</div>
													<div className="notif-content">
														<span className="subject">Chad</span>
														<span className="block">
															Ok, Thanks !
														</span>
														<span className="time">12 minutes ago</span> 
													</div>
												</a>
												<a href="/">
													<div className="notif-img"> 
														<img src="../assets/img/mlane.jpg" alt="Img Profile" />
													</div>
													<div className="notif-content">
														<span className="subject">Jhon Doe</span>
														<span className="block">
															Ready for the meeting today...
														</span>
														<span className="time">12 minutes ago</span> 
													</div>
												</a>
												<a href="/">
													<div className="notif-img"> 
														<img src="../assets/img/talha.jpg" alt="Img Profile" />
													</div>
													<div className="notif-content">
														<span className="subject">Talha</span>
														<span className="block">
															Hi, Apa Kabar ?
														</span>
														<span className="time">17 minutes ago</span> 
													</div>
												</a>
											</div>
										</div>
									</li>
									<li>
										<a className="see-all" href="/">See all messages<i className="fa fa-angle-right"></i> </a>
									</li>
								</ul>
							</li>

							<li className="nav-item dropdown hidden-caret">
								<a className="nav-link dropdown-toggle" href="/" id="notifDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									<i className="fa fa-bell"></i>
									<span className="notification">4</span>
								</a>
								<ul className="dropdown-menu notif-box animated fadeIn" aria-labelledby="notifDropdown">
									<li>
										<div className="dropdown-title">You have 4 new notification</div>
									</li>
									<li>
										<div className="notif-scroll scrollbar-outer">
											<div className="notif-center">
												<a href="/">
													<div className="notif-icon notif-primary"> <i className="fa fa-user-plus"></i> </div>
													<div className="notif-content">
														<span className="block">
															New user registered
														</span>
														<span className="time">5 minutes ago</span> 
													</div>
												</a>
												<a href="/">
													<div className="notif-icon notif-success"> <i className="fa fa-comment"></i> </div>
													<div className="notif-content">
														<span className="block">
															Rahmad commented on Admin
														</span>
														<span className="time">12 minutes ago</span> 
													</div>
												</a>
												<a href="/">
													<div className="notif-img"> 
														<img src="../assets/img/profile2.jpg" alt="Img Profile" />
													</div>
													<div className="notif-content">
														<span className="block">
															Reza send messages to you
														</span>
														<span className="time">12 minutes ago</span> 
													</div>
												</a>
												<a href="/">
													<div className="notif-icon notif-danger"> <i className="fa fa-heart"></i> </div>
													<div className="notif-content">
														<span className="block">
															Farrah liked Admin
														</span>
														<span className="time">17 minutes ago</span> 
													</div>
												</a>
											</div>
										</div>
									</li>
									<li>
										<a className="see-all" href="/">See all notifications<i className="fa fa-angle-right"></i> </a>
									</li>
								</ul>
							</li>

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

									return <RouteAuth key={ index } item={ item } path={ item.path } component={ item.page } />
								
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