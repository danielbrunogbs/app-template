import React, { useState } from 'react'

import ButtonLoad from '../../Components/ButtonLoad'
import Api from '../../../../Services/Api'

export default function ExportClient(props)
{
	const { user } = props;

	const [registers, setRegisters] = useState(0);

	const [loading, setLoading] = useState(false);

	const handleRegisters = (event) => setRegisters(event.target.value);

	const handleExport = async () =>
	{
		try
		{
			setLoading(true);

			let response = await Api.get('/clients/export', {
				header: ['Authorization', user.token]
			});

			setLoading(false);

			if(response.statusCode !== 200)
				return window.notify({
					title: 'Ops!',
					message: response.body.message
				}, 'warning');

			return response.body;
		}
		catch(e)
		{
			return window.notify({
				title: 'Eita!',
				message: e.message
			}, 'danger');
		}
	}

	return(

		<div>

			<button type="button" className="btn btn-info btn-sm" data-toggle="modal" data-target="#exportClient">
				Exportar
			</button>

			<div className="modal fade" id="exportClient" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				
				<div className="modal-dialog" role="document">
				
					<div className="modal-content">
					
						<div className="modal-header">
							
							<h5 className="modal-title" id="exampleModalLabel">Exportar Clientes</h5>
							
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						
						</div>
						
						<div className="modal-body">
							
							<div className="row">

								<div className="col-md-12">

									<div className="form-group">

										<label>Range inicial</label>

										<input type="number" className="form-control" min="1" />

									</div>

								</div>

							</div>

						</div>

						<div className="modal-footer">
							
							<ButtonLoad load={ loading } type="button" className="btn btn-sm btn-success">
								Exportar
							</ButtonLoad>
						
						</div>
					
					</div>

				</div>
			
			</div>

		</div>

	);
}