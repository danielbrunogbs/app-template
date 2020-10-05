import React, { useState, useEffect } from 'react'
import Api from '../../../Services/Api'

export default function Users(props)
{
	const { history, user } = props;

	const [users, setUsers] = useState([]);

	useEffect(() =>
	{
		Api.get('/users', {
			header: ['Authorization', user.token]
		}).then(data => {

			if(data.statusCode === 200)
				setUsers(data.body);
			else
				return window.md.showNotification({
					title: 'Ops!',
					message: data.body.message,
					color: 'warning'
				});

		})
		.catch(error => {

			setUsers([]);

			return window.md.showNotification({
				title: 'Eita!',
				message: error.message,
				color: 'danger'
			});

		});

		return;
	}, [])

	return(

		<div className="row">

			<div className="col-md-12">

				<div className="card">

					<div className="card-header card-header-warning">

						<h4 className="card-title">Usuários</h4>

					</div>

					<div className="card-body">

						<div className="table-responsive">

							<button className="btn btn-success btn-sm" onClick={ () => history.push('/user/create') }>
								Adicionar
							</button>

							<table className="table table-hover">

								<thead className="text-dark">

									<tr>

										<th>Nome</th>
										<th>E-mail</th>
										<th>Tipo</th>
										<th>CNPJ/CPF</th>

									</tr>

								</thead>

								<tbody>

									{
										users.map(register => {

											return(

												<tr key={ register._id }>

													<td>{ register.name }</td>
													<td>{ register.email }</td>
													<td>{ register.profile.description }</td>
													<td>{ register.document }</td>

												</tr>

											);

										})
									}

								</tbody>

							</table>

						</div>

					</div>

				</div>

			</div>

		</div>

	);
}