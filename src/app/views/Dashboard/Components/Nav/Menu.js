import React, { useState } from 'react'

export default function Menu(props)
{
	const { user, history } = props;

	const [menu] = useState([
		{
			title: 'Geral',
			path: '/',
			icon: 'dashboard'
		},
		{
			title: 'Usuários',
			icon: 'person',
			slug: 'users.view',
			submenu: [
				{
					title: 'Usuários',
					path: '/users',
					slug: 'users.view'
				}
			]
		}
	]);

	const goTo = (path, event) =>
	{
		event.preventDefault();
		history.push(path);
	}

	const populateMenu = (register, index) =>
	{
		if(register.slug)
		{
			let rule = user.permissions.find(permission => permission.slug === register.slug);

			if(!rule)
				return;
		}

		if(!register.submenu)
		{
			let content = (<li className="nav-item" key={ index }>

							<a className="nav-link" href="/" onClick={ (event) => goTo(register.path, event) }>

								{ register.icon ? <i className="material-icons">{register.icon}</i> : null }
								
								<p>{register.title}</p>

							</a>

						</li>);

			return content;
		}
		else
		{
			let content = (<li className="nav-item" key={ index } >

							<a className="nav-link" data-toggle="collapse" href={ `#${register.title + index}` } aria-expanded="false">

								<i className="material-icons">{register.icon}</i>
								<p> {register.title}
									<b className="caret"></b>
								</p>

							</a>

							<div className="collapse" id={register.title + index}>

								<ul className="nav">

									{ register.submenu.map((subRegister, subIndex) => populateMenu(subRegister, subIndex)) }

								</ul>

							</div>

						</li>);

			return content;
		}
	}

	return(

		<div>

			<ul className="nav">

				{
					menu.map((register, index) => populateMenu(register, index))
				}

			</ul>

		</div>

	);
}