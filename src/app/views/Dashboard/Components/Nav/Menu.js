import React, { useState } from 'react'

export default function Menu(props)
{
	const { user, history } = props;

	const [menu] = useState([
		
		//Geral
		{
			title: 'Geral',
			path: '/',
			icon: 'fas fa-home',
			active: true
		},

		//Propostas
		{
			title: 'Propostas',
			path: '/proposals',
			icon: 'fas fa-book',
			slug: 'get/proposals'
		},

		//Loja
		{
			title: 'Lojas',
			path: '/stores',
			icon: 'fas fa-store',
			slug: 'get/stores'
		},

		//Usuários
		{
			title: 'Usuários',
			icon: 'fas fa-users',
			submenu: [
				{
					title: 'Usuários',
					path: '/users',
					slug: 'get/users'
				},
				{
					title: 'Perfis',
					path: '/profiles',
					slug: 'get/profiles'
				}
			]
		},

		//Clientes
		{
			title: 'Clientes',
			icon: 'fas fa-user',
			path: '/clients',
			slug: 'get/client/:document'
		}
	]);

	const goTo = (path, event) =>
	{
		event.preventDefault();
		history.push(path);
	}

	const populateMenu = (register, index, submenu = false) =>
	{
		if(register.slug)
		{
			let rule = user.permissions.find(permission => permission.slug === register.slug);

			if(!rule)
				return;
		}

		if(!register.submenu)
		{
			let content = (<li className={ !submenu ? register.active ? "nav-item active" : "nav-item" : "" } key={ index }>

							<a href="/" onClick={ (event) => goTo(register.path, event) }>

								{ register.icon ? <i className={ register.icon }></i> : null }
								
								{ !submenu ? <p>{register.title}</p> : <span className="sub-item">{register.title}</span> }

							</a>

						</li>);

			return content;
		}
		else
		{
			let content = (<li className={ !submenu ? "nav-item" : null } key={ index } >

							<a data-toggle="collapse" href={ `#${register.title + index}` }>

								{ !submenu ? <i className={ register.icon }></i> : null }
								<span className="sub-item">{register.title}</span>
								<span className="caret"></span>

							</a>

							<div className="collapse" id={register.title + index}>

								<ul className="nav nav-collapse">

									{ register.submenu.map((subRegister, subIndex) => populateMenu(subRegister, subIndex, true)) }

								</ul>

							</div>

						</li>);

			return content;
		}
	}

	return(

		<div>

			<ul className="nav nav-warning">

				{
					menu.map((register, index) => populateMenu(register, index))
				}

			</ul>

		</div>

	);
}