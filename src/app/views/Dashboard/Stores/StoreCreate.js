import React, { useState, useEffect } from 'react'

import StoreUsers from './Components/StoreUsers'
import ButtonLoad from '../Components/ButtonLoad'
import superagent from 'superagent'
import Api from '../../../Services/Api'
import Validate from '../../../Validators/Validate'
import Load from '../Components/Load'

export default function StoreCreate(props)
{
	const { user, history } = props;

	const [name, setName] = useState('');
	const [zipCode, setZipCode] = useState('');
	const [street, setStreet] = useState('');
	const [neighborhood, setNeighborhood] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [number, setNumber] = useState('');
	const [complement, setComplement] = useState('');
	const [description, setDescription] = useState('');
	const [salespeople, setSalespeople] = useState([]);
	const [managers, setManagers] = useState([]);
	const [listStates, setListStates] = useState([]);

	const handleName = (event) => setName(event.target.value);
	const handleStreet = (event) => setStreet(event.target.value);
	const handleNeighborhood = (event) => setNeighborhood(event.target.value);
	const handleCity = (event) => setCity(event.target.value);
	const handleState = (event) => setState(event.target.value);
	const handleNumber = (event) => setNumber(event.target.value);
	const handleComplement = (event) => setComplement(event.target.value);
	const handleDescription = (event) => setDescription(event.target.value);

	const [loading, setLoading] = useState(false);

	useEffect(() => {

		async function run()
		{
			try
			{
				setLoading(true);

				let response = await Api.get('/states', {
					header: ['Authorization', user.token]
				});

				setLoading(false);

				if(response.statusCode !== 200)
					return window.notify({
						title: 'Ops!',
						message: response.body.message
					}, 'warning');

				console.log(response.body);

				setListStates(response.body);
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

	}, []);

	const handleZipCode = async (event) =>
	{
		try
		{
			let value = event.target.value;

			if(value.length < 8)
				return;

			let response = await superagent.get(`https://viacep.com.br/ws/${ value }/json/`);

			if(response.statusCode !== 200)
				return;

			setZipCode(value);
			setStreet(response.body.logradouro);
			setComplement(response.body.complemeto);
			setNeighborhood(response.body.bairro);
			setCity(response.body.localidade);
			setState(response.body.uf);
		}
		catch(e)
		{
			return window.notify({
				title: 'Eita!',
				message: e.message
			}, 'danger');
		}
	}

	const handleSubmit = async (event) =>
	{
		try
		{
			event.preventDefault();

			Validate({
				name,
				zipCode,
				street,
				complement,
				neighborhood,
				city,
				state
			});

			let nSalespeople = salespeople.map(register => register._id);
			let nManagers = managers.map(register => register._id);

			let address = {
				zip_code: zipCode,
				street,
				number,
				complement,
				neighborhood,
				city,
				state,
				description
			};

			let fields = {
				name,
				address,
				salespeople: nSalespeople,
				managers: nManagers
			};

			setLoading(true);

			let response = await Api.post('/store', {
				header: ['Authorization', user.token],
				fields
			});

			setLoading(false);

			if(response.statusCode !== 200)
				return window.notify({
					title: 'Ops!',
					message: response.body.message
				}, 'warning');

			window.notify({
				title: 'Uhul!',
				message: response.body.message
			});

			return history.push('/stores');
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

		<div className="row">

			<div className="col-md-12">

				<form method="post" onSubmitCapture={ handleSubmit }>

					<div className="card">

						<div className="card-header">

							<div className="card-title">Dados Iniciais</div>

						</div>

						<div className="card-body">

							<div className="form-group">
								<label>Nome</label>
								<input type="text" onChange={ handleName } className="form-control" required={ true } />
							</div>

						</div>

					</div>

					<div className="card">

						<div className="card-header">

							<div className="card-title">Endereço</div>

						</div>

						<div className="card-body">

							<Load load={ loading }>

								<div className="row">

									<div className="col-md-6">

										<div className="form-group">
											<label>CEP</label>
											<input type="number" onChange={ handleZipCode } className="form-control" required={ true } />
										</div>

										<div className="form-group">
											<label>Logradouro</label>
											<input type="text" onChange={ handleStreet } value={ street } className="form-control" required={ true } />
										</div>

										<div className="form-group">
											<label>Bairro</label>
											<input type="text" onChange={ handleNeighborhood } value={ neighborhood } className="form-control" required={ true } />
										</div>

										<div className="form-group">
											<label>Cidade</label>
											<input type="text" onChange={ handleCity } value={ city } className="form-control" required={ true } />
										</div>

									</div>

									<div className="col-md-6">

										<div className="form-group">
											
											<label>Estado</label>
											
											<select className="form-control" onChange={ handleState } value={ state } required={ true }>
												
												<option value>- Selecione -</option>
												
												{
													listStates.map(register => <option key={ register._id } value={ register.abbreviation }>{ register.abbreviation }</option>)
												}

											</select>
										
										</div>

										<div className="form-group">
											<label>Número</label>
											<input type="text" onChange={ handleNumber } value={ number } className="form-control" />
										</div>

										<div className="form-group">
											<label>Complemento</label>
											<input type="text" onChange={ handleComplement } className="form-control" />
										</div>

										<div className="form-group">
											<label>Descrição</label>
											<input type="text" onChange={ handleDescription } className="form-control" />
										</div>

									</div>

								</div>

							</Load>

						</div>

					</div>

					<StoreUsers { ...props } title={ 'Vendedor' } state={ salespeople } setState={ setSalespeople } otherState={ managers } />

					<StoreUsers { ...props } title={ 'Gerentes' } state={ managers } setState={ setManagers } otherState={ salespeople } />

					<ButtonLoad onClick={ handleSubmit } load={ loading } className="btn btn-success btn-block" type="submit">
						Cadastrar
					</ButtonLoad>

				</form>

			</div>

		</div>

	);
}