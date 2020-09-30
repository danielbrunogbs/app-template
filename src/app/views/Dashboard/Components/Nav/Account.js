import React from 'react'

export default function Account(props)
{
	const { user, history } = props;

	const logout = (event) =>
	{
		event.preventDefault();

		localStorage.removeItem('user');

		history.push('/login');
	}

	return(

		<div>

			<li className="nav-item dropdown">
								
				<a className="nav-link" href="/#" id="navbarDropdownProfile" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					<i className="material-icons">person</i>
					<p className="d-lg-none d-md-block">
						Account
					</p>
					{ user.name }
				</a>

				<div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownProfile">
					<a className="dropdown-item" href="/">Perfil</a>
					<a className="dropdown-item" href="/" onClick={ event => logout(event) }>Sair</a>
				</div>
			
			</li>

		</div>

	);
}