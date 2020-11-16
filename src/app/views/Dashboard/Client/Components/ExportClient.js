import React, { useState } from 'react'

import ButtonLoad from '../../Components/ButtonLoad'
import Api from '../../../../Services/Api'
import moment from 'moment'

export default function ExportClient(props)
{
	const { user } = props;

	const [rangeInitial, setRangeInitial] = useState(0);
	const [rangeFinal, setRangeFinal] = useState(0);
	const [link, setLink] = useState();

	const [loading, setLoading] = useState(false);

	const handleRangeInitial = (event) => setRangeInitial(event.target.value);
	const handleRangeFinal = (event) => setRangeFinal(event.target.value);

	const handleExport = async (event) =>
	{
		try
		{
			setLoading(true);

			let response = await Api.get(`/clients/export?initial=${rangeInitial}&final=${rangeFinal}`, {
				header: ['Authorization', user.token]
			});

			setLoading(false);

			if(response.statusCode !== 200)
				return window.notify({
					title: 'Ops!',
					message: response.body.message
				}, 'warning');

			let blob = new Blob([response.text], { type: response.header['content-type'] });
			let url = URL.createObjectURL(blob);
			
			let filename = 'clientes_' + moment().format('YYYY_MM_DD_HH_mm_ss') + '.csv';

			setLink(<a href={ url } download={ filename } onClick={ () => setLink() } className="btn btn-sm btn-success text-white">Download</a>);
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

			<div className="modal fade" id="exportClient" tabIndex={ -1 } role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				
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

										<input type="number" onChange={ handleRangeInitial } className="form-control" min="1" />

									</div>

									<div className="form-group">

										<label>Range final</label>

										<input type="number" onChange={ handleRangeFinal } className="form-control" max="50000" />

									</div>

								</div>

							</div>

						</div>

						<div className="modal-footer">

							{ link }
							
							<ButtonLoad load={ loading } onClick={ handleExport } type="button" className="btn btn-sm btn-info">
								Exportar
							</ButtonLoad>
						
						</div>
					
					</div>

				</div>
			
			</div>

		</div>

	);
}