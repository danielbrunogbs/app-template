import React from 'react'

export default function Notification(props)
{
	return(

		<li className="nav-item dropdown">
		
			<a className="nav-link" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				<i className="material-icons">notifications</i>
				<span className="notification">5</span>
					<p className="d-lg-none d-md-block">
					Some Actions
				</p>
			</a>
			
			<div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
				<a className="dropdown-item" href="/#">Mike John responded to your email</a>
				<a className="dropdown-item" href="/#">You have 5 new tasks</a>
				<a className="dropdown-item" href="/#">You're now friend with Andrew</a>
				<a className="dropdown-item" href="/#">Another Notification</a>
				<a className="dropdown-item" href="/#">Another One</a>
			</div>

		</li>

	);
}