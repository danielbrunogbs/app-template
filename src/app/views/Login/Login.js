import React, { useState, useEffect } from 'react'
import Api from '../../Services/Api'

import ButtonLoad from '../Dashboard/Components/ButtonLoad'

export default function Login(props)
{
	const { history } = props;

	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleEmail = (event) => setEmail(event.target.value);
	const handlePassword = (event) => setPassword(event.target.value);

	const handleLogin = async (event) =>
	{
		try
		{
			setLoading(true);

			let response = await Api.post('/login', {
				fields: { email, password },
				header: ['Content-Type', 'application/json']
			});

			setLoading(false);

			if(response.status !== 200)
				return window.notify({
					title: 'Ops!',
					message: response.body.message
				}, 'warning');

			localStorage.setItem('user', response.text);

			history.push('/');
		}
		catch(e)
		{
			return window.notify({
					title: 'Eita!',
					message: e.message
				}, 'danger');
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

				<div className="col-lg-4 col-md-6 col-sm-8 ml-auto mr-auto" style={ { marginTop: '100px' } }>

					<div className="card">
						
						<div className="card-header text-center">

							<div className="card-title">Entrar</div>

						</div>

						<div className="card-body">

							<p className="card-description text-center">Seja bem-vindo novamente!</p>

							<div className="form-group">

								<div className="input-group">

									<div className="input-group-prepend">

										<span className="input-group-text">

											<i className="fas fa-user"></i>

										</span>

									</div>

									<input type="email" className="form-control" onChange={ handleEmail } placeholder="E-mail" />

								</div>

							</div>

							<div className="form-group">

								<div className="input-group">

									<div className="input-group-prepend">

										<span className="input-group-text">

											<i className="fas fa-lock"></i>

										</span>

									</div>

									<input type="password" className="form-control" onChange={ handlePassword } placeholder="Senha" />

								</div>

							</div>

						</div>

						<div className="card-footer justify-content-center">

							<div className="pull-left">
								<a href="/">Esqueceu a senha?</a>
							</div>

							<ButtonLoad load={ loading } className="btn btn-info btn-sm pull-right" onClick={ handleLogin }>Entrar</ButtonLoad>

						</div>

					</div>

				</div>

			</div>

		</div>

	);
}