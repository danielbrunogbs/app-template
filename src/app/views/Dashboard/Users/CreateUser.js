import React, { useState, useEffect } from 'react'
import Api from '../../../Services/Api'

import Load from '../Components/Load'
import ButtonLoad from '../Components/ButtonLoad'

export default function CreateUser(props)
{
	const { user, history } = props;

	const [profiles, setProfiles] = useState([]);

	const [name, setName] = useState(null);
	const [document, setDocument] = useState(null);
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const [passwordConfirm, setPasswordConfirm] = useState(null);
	const [birth, setBirth] = useState(null);
	const [profile, setProfile] = useState(null);
	
	//Loading's
	const [loading, setLoading] = useState(false);
	const [btnLoading, setBtnLoading] = useState(false);

	const handleName = (event) => setName(event.target.value);
	const handleDocument = (event) => setDocument(event.target.value);
	const handleEmail = (event) => setEmail(event.target.value);
	const handlePassword = (event) => setPassword(event.target.value);
	const handlePasswordConfirm = (event) => setPasswordConfirm(event.target.value);
	const handleBirth = (event) => setBirth(event.target.value);
	const handleProfile = (event) => setProfile(event.target.value);

	const handleSend = async () =>
	{
		try
		{
			if(!name || !document || !email || !password || !passwordConfirm || !birth || !profile)
				return window.notify({
							title: 'Ops!',
							message: 'É necessário preencher todos os campos!'
						}, 'warning');

			setBtnLoading(true);

			let response = await Api.post('/user', {
				header: ['Authorization', user.token],
				fields: {
					name,
					document,
					email,
					password,
					password_confirm: passwordConfirm,
					birth,
					profile
				}
			});

			setBtnLoading(false);

			if(response.statusCode !== 200)
				return window.notify({
							title: 'Ops!',
							message: response.body.message
						}, 'warning');

			window.notify({
				title: 'Uhull!',
				message: response.body.message
			});

			return history.push('/users');
		}
		catch(e)
		{
			return window.notify({
				title: 'Eita!',
				message: e.message
			}, 'danger');
		}
	}

	useEffect(() => {

		async function run()
		{
			try
			{
				setLoading(true);

				let response = await Api.get('/profiles', { header: ['Authorization', user.token] });

				setLoading(false);

				if(response.statusCode !== 200)
					return window.md.showNotification({
						title: 'Ops!',
						message: response.body.message,
						color: 'warning'
					});

				setProfiles(response.body);
			}
			catch(error)
			{
				setProfiles([]);

				return window.md.showNotification({
					title: 'Eita!',
					message: error.message,
					color: 'danger'
				});
			}
		}

		run();

		return;

	}, [])

	return(

		<div className="row">

			<div className="col-md-12">

				<div className="card">

					<div className="card-header card-header-warning">
						<h4 className="card-title">Cadastrar Usuário</h4>
					</div>

					<div className="card-body">

						<Load load={ loading }>

							<div className="row">

								<div className="col-md-6">

									<div className="form-group">
										<label>Nome</label>
										<input type="text" className="form-control" onChange={ handleName } />
									</div>

									<div className="form-group">
										<label>E-mail</label>
										<input type="text" className="form-control" onChange={ handleEmail } />
									</div>

									<div className="form-group">
										<label className="">Data de Nascimento</label>
										<input type="date" className="form-control" onChange={ handleBirth } />
									</div>

									<div className="form-group">
										
										<label>Perfil</label>
										
										<select className="form-control" onChange={ handleProfile }>

											<option value>- Selecione -</option>
										
											{
												profiles.map(register => <option key={ register._id } value={ register._id }>{ register.description }</option>)
											}

										</select>
									
									</div>

								</div>

								<div className="col-md-6">

									<div className="form-group">
										<label>CPF/CNPJ</label>
										<input type="text" className="form-control" onChange={ handleDocument } />
									</div>

									<div className="form-group ">
										<label>Senha</label>
										<input type="password" className="form-control" onChange={ handlePassword } />
									</div>

									<div className="form-group">
										<label>Confirmar Senha</label>
										<input type="password" className="form-control" onChange={ handlePasswordConfirm } />
									</div>



								</div>

							</div>

							<ButtonLoad load={ btnLoading } className="btn btn-success btn-sm pull-right" onClick={ handleSend }>Cadastrar</ButtonLoad>

						</Load>

					</div>

				</div>

			</div>

		</div>

	);
}