import React, { useState, useEffect } from 'react'
import Load from '../Components/Load'
import Api from '../../../Services/Api'

export default function StoreDetail(props)
{
	const { user, params, history } = props;

	const [store, setStore] = useState({});
	const [address, setAddress] = useState({});
	const [managers, setManagers] = useState([]);
	const [salespeople, setSalespeople] = useState([]);

	const [loading, setLoading] = useState(false);

	useEffect(() => {

		async function run()
		{
			try
			{
				setLoading(true);

				let response = await Api.get('/stores?_id=' + params.get('id'), {
					header: ['Authorization', user.token]
				});

				setLoading(false);

				if(response.statusCode !== 200)
				{
					window.notify({
						title: 'Ops!',
						message: response.body.message
					}, 'warning');

					history.push('/stores');
				}

				if(response.body.length < 1)
				{
					window.notify({
						title: 'Ops!',
						message: 'Não encontramos nada =('
					}, 'warning');

					history.push('/stores');
				}

				setStore(response.body[0]);
				setAddress(response.body[0].address);
				setManagers(response.body[0].managers);
				setSalespeople(response.body[0].salespeople);

				window.loadMasks();
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

	}, []);

	const Salesman = () =>
	{
		if(salespeople.length < 1)
			return(
				<tr>
					<td colSpan={ 2 } align="center">Não achamos nada por aqui =/</td>
				</tr>
			);

		return salespeople.map(register => (

			<tr key={ register._id }>
				<td>{ register.name }</td>
				<td className="document">{ register.document }</td>
			</tr>

		));
	}

	const Managers = () =>
	{
		if(managers.length < 1)
			return(
				<tr>
					<td colSpan={ 2 } align="center">Não achamos nada por aqui =/</td>
				</tr>
			);

		return managers.map(register => (

			<tr key={ register._id }>
				<td>{ register.name }</td>
				<td className="document">{ register.document }</td>
			</tr>

		));
	}

	return(

		<div className="row">

			<div className="col-md-12">

				<div className="card">

					<div className="card-header">
						
						<Load load={ loading }>

							<div className="card-title">{ store.name }</div>
						
						</Load>

					</div>

				</div>

				<div className="card">

					<div className="card-header">
						
						<div className="card-title">Endereço</div>

					</div>

					<div className="card-body">

						<Load load={ loading }>

							<table className="table table-hover">

								<tbody>

									<tr>
										<th width="20">CEP</th>
										<td className="zip_code">{ address.zip_code }</td>
									</tr>

									<tr>
										<th>Logradouro</th>
										<td>{ `${address.street}, ${address.number} - ${address.neighborhood}, ${address.city} - ${address.state}` }</td>
									</tr>

									<tr>
										<th>Complemento</th>
										<td>{ address.complement }</td>
									</tr>

									<tr>
										<th>Descrição</th>
										<td>{ address.description }</td>
									</tr>

								</tbody>

							</table>

						</Load>

					</div>

				</div>

				<div className="card">

					<div className="card-header">
						
						<div className="card-title">Gerentes</div>

					</div>

					<div className="card-body">

						<Load load={ loading }>

							<table className="table table-hover">

								<thead>

									<tr>
										<th>Nome</th>
										<th>Documento</th>
									</tr>

								</thead>

								<tbody>

									<Managers />

								</tbody>

							</table>

						</Load>

					</div>

				</div>

				<div className="card">

					<div className="card-header">
						
						<div className="card-title">Vendedores</div>

					</div>

					<div className="card-body">

						<Load load={ loading }>

							<table className="table table-hover">

								<thead>

									<tr>
										<th>Nome</th>
										<th>Documento</th>
									</tr>

								</thead>

								<tbody>

									<Salesman />

								</tbody>

							</table>

						</Load>

					</div>

				</div>

			</div>

		</div>

	);
}