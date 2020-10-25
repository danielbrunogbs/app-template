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

			<li className="nav-item dropdown hidden-caret">

				<a className="dropdown-toggle profile-pic" data-toggle="dropdown" href="/" aria-expanded="false">
					<div className="avatar-sm">
						<img src="../assets/img/profile.jpg" alt="..." className="avatar-img rounded-circle" />
					</div>
				</a>

				<ul className="dropdown-menu dropdown-user animated fadeIn">

					<div className="dropdown-user-scroll scrollbar-outer">

						<li>
						
							<div className="user-box">

								<div className="avatar-lg"><img src="../assets/img/profile.jpg" alt="image profile" className="avatar-img rounded" /></div>

								<div className="u-text">
									<h4>{ user.name }</h4>
									<p className="text-muted">{ user.email }</p>
								</div>

							</div>

						</li>

						<li>

							<div className="dropdown-divider"></div>
						
							<a className="dropdown-item" href="/">Perfil</a>
							
							<div className="dropdown-divider"></div>
							
							<a className="dropdown-item" onClick={ logout } href="/">Sair</a>
						
						</li>

					</div>

				</ul>

			</li>

		</div>

	);
}