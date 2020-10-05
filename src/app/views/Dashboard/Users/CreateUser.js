import React, { useState, useEffect } from 'react'
import Api from '../../../Services/Api'

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

	const handleName = (event) => setName(event.target.value);
	const handleDocument = (event) => setDocument(event.target.value);
	const handleEmail = (event) => setEmail(event.target.value);
	const handlePassword = (event) => setPassword(event.target.value);
	const handlePasswordConfirm = (event) => setPasswordConfirm(event.target.value);
	const handleBirth = (event) => setBirth(event.target.value);
	const handleProfile = (event) => setProfile(event.target.value);

	const handleSend = async () =>
	{
		if(!name || !document || !email || !password || !passwordConfirm || !birth || !profile)
			return window.md.showNotification({
						title: 'Ops!',
						message: 'É necessário preencher todos os campos!',
						color: 'warning'
					});

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

		if(response.statusCode !== 200)
			return window.md.showNotification({
						title: 'Ops!',
						message: response.body.message,
						color: 'warning'
					});

		window.md.showNotification({
			title: 'Uhull!',
			message: response.body.message,
			color: 'success'
		});

		return history.push('/users');
	}

	useEffect(() => {

		async function run()
		{
			try
			{
				let response = await Api.get('/profiles', { header: ['Authorization', user.token] });

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

						<div className="row">

							<div className="col-md-6">

								<div className="form-group bmd-form-group">
									<label className="bmd-label-floating">Nome</label>
									<input type="text" className="form-control" onChange={ handleName } />
								</div>

								<div className="form-group bmd-form-group">
									<label className="bmd-label-floating">E-mail</label>
									<input type="text" className="form-control" onChange={ handleEmail } />
								</div>

								<div className="form-group bmd-form-group">
									<label className="">Data de Nascimento</label>
									<input type="date" className="form-control" onChange={ handleBirth } />
								</div>

								<select className="form-control" onChange={ handleProfile }>

									<option className="bs-title-option" value="">- Perfil -</option>

									{
										profiles.map(item => <option key={ item._id } value={ item._id }>{ item.description }</option>)
									}
									
								</select>

							</div>

							<div className="col-md-6">

								<div className="form-group bmd-form-group">
									<label className="bmd-label-floating">CPF/CNPJ</label>
									<input type="text" className="form-control" onChange={ handleDocument } />
								</div>

								<div className="form-group bmd-form-group">
									<label className="bmd-label-floating">Senha</label>
									<input type="password" className="form-control" onChange={ handlePassword } />
								</div>

								<div className="form-group bmd-form-group">
									<label className="bmd-label-floating">Confirmar Senha</label>
									<input type="password" className="form-control" onChange={ handlePasswordConfirm } />
								</div>



							</div>

						</div>

						<button type="button" className="btn btn-success pull-right" onClick={ handleSend }>Cadastrar</button>
						<div className="clearfix"></div>

					</div>

				</div>

			</div>

		</div>

	);
}