import React from 'react'

export default function Tenders(props)
{
	return(
		
		<div className="row">

			<div className="col-md-12">

				<div className="card">

					<div className="card-header card-header-warning">

						<h4 className="card-title">Propostas</h4>

					</div>

					<div className="card-body">

						<div className="table-responsive">

							<button className="btn btn-success btn-sm">
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

									

								</tbody>

							</table>

						</div>

					</div>

				</div>

			</div>

		</div>

	);
}