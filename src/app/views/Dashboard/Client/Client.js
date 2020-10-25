import React, { useState } from 'react'
import Api from '../../../Services/Api'
import Load from '../Components/Load'

export default function Client(props)
{
	const { user } = props;

	const [clients, setClients] = useState([]);
	const [input, setInput] = useState('');
	const [loading, setLoading] = useState(false);

	const cpf = (event) => setInput(event.target.value);

	const search = async () =>
	{
		try
		{
			if(input.length < 1)
				return window.notify({
					title: 'Ops!',
					message: 'Preencha o campo CPF!'
				}, 'warning');

			setClients([]);

			setLoading(true);

			let response = await Api.get(`/client/${ input }`, {
				header: ['Authorization', user.token]
			});

			setLoading(false);

			if(!response)
				return window.notify({
					title: 'Eita!',
					message: 'Algo de errado aconteceu!'
				}, 'danger');

			if(response.statusCode !== 200)
				return window.notify({
					title: 'Ops!',
					message: response.body.message
				}, 'warning');

			setClients(response.body);
		}
		catch(e)
		{
			return window.notify({
				title: 'Eita!',
				message: e.message
			}, 'danger');
		}
	}

	return (

		<div>

			<div className="row">
				
				<div className="col-md-12">

					<div className="card full-height">

						<div className="card-header card-header-warning">

							<div className="card-title">
							
								Consultar Cliente

							</div>

						</div>

						<div className="card-body">

							<div className="form-group">

								<label>CPF</label>

								<input id="cpf" type="text" className="form-control" onChange={ cpf } />

							</div>

						</div>

						<div className="card-footer">

							<button className="btn btn-info btn-sm pull-right" type="button" onClick={ search }>

								Buscar

							</button>

						</div>

					</div>

				</div>

			</div>

			<Load load={ loading } >

				{
					clients.map(register => {

						return (

							<div className="row" key={ register._id }>
					
								<div className="col-md-12">

									<div className="card full-height">

										<div className="card-body">

											{ register.name }

										</div>

									</div>

								</div>

							</div>

						);
					})
				}

			</Load>

		</div>

	);
}