import React, { useState } from 'react'

import ButtonLoad from '../../Components/ButtonLoad'
import Api from '../../../../Services/Api'

export default function StoreUsers(props)
{
	const { user, setState, state, title, otherState } = props;

	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);

	const handleEmail = (event) => setEmail(event.target.value);

	const handleSearch = async (event) =>
	{
		try
		{
			event.preventDefault();

			setLoading(true);

			let response = await Api.get('/users?email=' + email, {
				header: ['Authorization', user.token]
			});

			setLoading(false);

			if(response.statusCode !== 200)
				return window.notify({
					title: 'Ops!',
					message: response.body.message
				}, 'warning');

			state.map(people => {

				let check = response.body.find(register => register._id === people._id);

				if(check)
					return window.notify({
						title: 'Ops!',
						message: 'Esse usuário já foi adicionado!'
					}, 'warning');

				response.body.push(people);

			});

			setState(response.body);
			setEmail('');
		}
		catch(e)
		{
			return window.notify({
				title: 'Eita!',
				message: e.message
			}, 'danger');
		}
	}

	const handleDelete = (id) =>
	{
		setState(state.filter(register => register._id !== id));
	}

	const Register = () =>
	{
		if(!state.length)
			return (
				<tr>
					<td colSpan={ 3 } align="center">Não encontramos nada =/</td>
				</tr>
			);

		return state.map(register => {

			return(

				<tr key={ register._id }>
					<td>{ register.name }</td>
					<td>{ register.email }</td>
					<td>
						<button className="btn btn-sm btn-danger" type="button" onClick={ () => handleDelete(register._id) }>
							<i className="fas fa-trash"></i>
						</button>
					</td>
				</tr>

			);

		});
	}

	return(

		<div className="card">

			<div className="card-header">

				<div className="card-title">{ title }</div>

			</div>

			<div className="card-body">

				<div className="form-group">

					<label>E-mail do Usuário</label>

					<div className="input-group">
						
						<input type="text" className="form-control" value={ email } onChange={ handleEmail } />
					
						<div className="input-group-prepend">
							
							<ButtonLoad load={ loading } onClick={ handleSearch } className="btn btn-info btn-sm" type="button">
								<i className="fas fa-search"></i>
							</ButtonLoad>

						</div>

					</div>

				</div>

				<table className="table table-hover">

					<thead>

						<tr>
							<th>Nome</th>
							<th>E-mail</th>
							<th width="1" align="center">Excluir</th>
						</tr>

					</thead>

					<tbody>

						<Register />

					</tbody>

				</table>

			</div>

		</div>

	);
}