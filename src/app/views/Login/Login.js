import React, { useState, useEffect } from 'react'
import Api from '../../Services/Api'

export default function Login(props)
{
	const { history } = props;

	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);

	const handleEmail = (event) => setEmail(event.target.value);
	const handlePassword = (event) => setPassword(event.target.value);

	const handleLogin = async (event) =>
	{
		try
		{
			let response = await Api.post('/login', {
				fields: { email, password },
				header: ['Content-Type', 'application/json']
			});

			if(response.status !== 200)
				return window.md.showNotification({
					title: 'Ops!',
					message: response.body.message,
					color: 'warning'
				});

			localStorage.setItem('user', response.text);

			history.push('/');
		}
		catch(e)
		{
			return window.md.showNotification({
					title: 'Eita!',
					message: e.message,
					color: 'danger'
				});
		}
	}

	useEffect(() =>
	{
		if(localStorage.getItem('user'))
			history.push('/');

		return;
	})

	return(

		<div className="container">

			<div className="row">

				<div className="col-lg-4 col-md-6 col-sm-8 ml-auto mr-auto">

					<div className="card card-login">
						
						<div className="card-header card-header-warning text-center">

							<h4 className="card-title">Entrar</h4>

							<div className="social-line">

								<a href="#pablo" className="btn btn-just-icon btn-link btn-white">
									<i className="fa fa-facebook-square"></i>
								</a>

								<a href="#pablo" className="btn btn-just-icon btn-link btn-white">
									<i className="fa fa-twitter"></i>
								</a>

								<a href="#pablo" className="btn btn-just-icon btn-link btn-white">
									<i className="fa fa-google-plus"></i>
								</a>

							</div>

						</div>

						<div className="card-body">

							<p className="card-description text-center">Seja bem-vindo novamente!</p>

							<div className="form-group">

								<div className="input-group">

									<div className="input-group-prepend">

										<span className="input-group-text">

											<i className="material-icons">email</i>

										</span>

									</div>

									<input type="email" className="form-control" onChange={ handleEmail } placeholder="E-mail" />

								</div>

							</div>

							<div className="form-group">

								<div className="input-group">

									<div className="input-group-prepend">

										<span className="input-group-text">

											<i className="material-icons">lock_outline</i>

										</span>

									</div>

									<input type="password" className="form-control" onChange={ handlePassword } placeholder="Senha" />

								</div>

							</div>

						</div>

						<div className="card-footer justify-content-center">

							<button className="btn btn-warning" type="button" onClick={ handleLogin }>Entrar</button>

						</div>

					</div>

				</div>

			</div>

		</div>

	);
}