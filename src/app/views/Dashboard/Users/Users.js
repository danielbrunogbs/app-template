import React, { useState, useEffect } from 'react'
import Api from '../../../Services/Api'

import Load from '../Components/Load'

export default function Users(props)
{
	const { history, user } = props;

	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() =>
	{
		async function users()
		{
			try
			{
				setLoading(true);

				let response = await Api.get('/users', { header: ['Authorization', user.token] });

				setLoading(false);

				if(response.statusCode !== 200)
					return window.notify({
						title: 'Opa!',
						message: response.body.message
					}, 'warning');

				setUsers(response.body);
			}
			catch(error)
			{
				return window.notify({
					title: 'Eita!',
					message: error.message
				}, 'danger');
			}
		}

		users();

		return;

	}, [])

	return(

		<div className="row">

			<div className="col-md-12">

				<div className="card full-height">

					<div className="card-header card-header-warning">

						<div className="card-title">
						
							Usuários

							<div className="pull-right">
							
								<button className="btn btn-success btn-sm" onClick={ () => history.push('/user/create') }>
									<i className="fas fa-plus-circle"></i> Adicionar
								</button>

							</div>

						</div>

					</div>

					<div className="card-body">

						<div className="table-responsive">

							<Load load={ loading }>

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

							</Load>

						</div>

					</div>

				</div>

			</div>

		</div>

	);
}