import React, { useState, useEffect } from 'react'
import Api from '../../../Services/Api'

import Load from '../Components/Load'

export default function Proposals(props)
{
	const { user, history } = props;

	const [proposals, setProposals] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() =>
	{

		try
		{
			async function run()
			{
				setLoading(true);

				let response = await Api.get('/proposals', {
					header: ['Authorization', user.token]
				});

				setLoading(false);

				if(response.statusCode !== 200)
					return window.notify({
						title: 'Ops!',
						message: response.body.message
					}, 'warning');

				setProposals(response.body);
			}

			run();
		}
		catch(e)
		{
			return window.notify({
				title: 'Eita!',
				message: e.message
			}, 'danger');
		}

	}, []);

	return(
		
		<div className="row">

			<div className="col-md-12">

				<div className="card">

					<div className="card-header card-header-warning">

						<div className="card-title">
						
							Propostas
						
							<div className="pull-right">

								<button type="button" className="btn btn-success btn-sm" onClick={ () => history.push('/proposal/create') }>
									<i className="fas fa-plus-circle"></i> Adicionar
								</button>

							</div>

						</div>

					</div>

					<div className="card-body">

						<Load load={ loading }>

							<div className="table-responsive">

								<table className="table table-hover">

									<thead className="text-dark">

										<tr>

											<th width="1">Número</th>
											<th>Descrição</th>
											<th>Vendedor</th>
											<th width="1">Detalhes</th>

										</tr>

									</thead>

									<tbody>

										{
											proposals.map(register => {

												return(

													<tr key={ register._id }>
														<td>{ register.proposed_number }</td>
														<td>{ register.description }</td>
														<td>{ register.salesman.name }</td>
														<td align="center">
															<button className="btn btn-info btn-sm" onClick={ () => alert('Em desenvolvimento') }>
																<i className="fas fa-eye"></i>
															</button>
														</td>
													</tr>

												);

											})
										}

									</tbody>

								</table>

							</div>

						</Load>

					</div>

				</div>

			</div>

		</div>

	);
}