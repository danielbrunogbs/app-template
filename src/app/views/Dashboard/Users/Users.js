import React, { useState, useEffect } from 'react'
import Api from '../../../Services/Api'

export default function Users(props)
{
	const [users, setUsers] = useState([]);

	useEffect(() =>
	{
		Api.get('/users', {
			header: ['Authorization', props.item.user.token]
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

	const handleDelete = (event) =>
	{
		console.log(event);
		alert();
	}

	return(

		<div className="row">

			<div className="col-md-12">

				<div className="card">

					<div className="card-header card-header-warning">

						<h4 className="card-title">Usuários</h4>

					</div>

					<div className="card-body">

						<div className="table-responsive">

							<table className="table table-hover">

								<thead className="text-dark">

									<tr>

										<th>Nome</th>
										<th>E-mail</th>
										<th>Tipo</th>
										<th>CNPJ/CPF</th>
										<th></th>

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
													<td>
														<div className="material-icons text-danger">delete_outline</div>
													</td>

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