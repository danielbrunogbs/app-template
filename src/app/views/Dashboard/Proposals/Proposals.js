import React, { useState, useEffect } from 'react'
import Api from '../../../Services/Api'
import moment from 'moment'
import Load from '../Components/Load'
import ProposalFilter from './Components/ProposalFilter'

export default function Proposals(props)
{
	const { user, history } = props;

	const [proposals, setProposals] = useState([]);
	const [loading, setLoading] = useState(false);
	const [filters, setFilters] = useState([]);

	useEffect(() =>
	{
		async function run()
		{
			try
			{
				setLoading(true);

				let response = await Api.get('/proposals', {
					header: ['Authorization', user.token],
					queries: filters
				});

				setLoading(false);

				if(response.statusCode !== 200)
					return window.notify({
						title: 'Ops!',
						message: response.body.message
					}, 'warning');

				setProposals(response.body);
				
				window.$('.document').mask('000.000.000-00');
			}
			catch(e)
			{
				return window.notify({
					title: 'Eita!',
					message: e.message
				}, 'danger');
			}
		}

		run();

		return;

	}, [filters]);

	return(
		
		<div className="row">

			<div className="col-md-12">

				<div className="card">

					<div className="card-header card-header-warning">

						<div className="card-title">
						
							Propostas
						
							<div className="pull-right">

								<ProposalFilter setFilters={ setFilters } user={ user } />

								&ensp;

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

											<th>Data</th>
											<th>Promotor</th>
											<th>Loja</th>
											<th>Banco</th>
											<th>Operação</th>
											<th>Cliente</th>
											<th>CPF</th>
											<th>Liberado</th>
											<th>Status</th>
											<th width="1">Detalhes</th>

										</tr>

									</thead>

									<tbody>

										{
											proposals.map(register => {

												return(

													<tr key={ register._id }>
														<td align="left">{ moment(register.date).format('DD/MM/YYYY') }</td>
														<td>{ register.promoter.description }</td>
														<td>{ register.store.name }</td>
														<td>{ register.bank.long_name }</td>
														<td>{ register.operation.description }</td>
														<td>{ register.client.name }</td>
														<td><span className="document">{ register.client.document }</span></td>
														<td>{ register.amount_released.toFixed(2).replace('.',',') }</td>
														<td>{ register.proposed_situation.description }</td>
														
														<td align="center">
															<button className="btn btn-info btn-sm" onClick={ () => history.push('/proposal/detail?id=' + register._id) }>
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