import React, { useState, useEffect } from 'react'
import Load from '../Components/Load'
import Api from '../../../Services/Api'
import ButtonLoad from '../Components/ButtonLoad'

export default function CreateProposal(props)
{
	const { user, history } = props;

	const [loading, setLoading] = useState(false);
	const [btnLoading, setBtnLoading] = useState(false);

	const [stores, setStores] = useState([]);
	const [salesman, setSalesman] = useState([]);
	const [banks, setBanks] = useState([]);
	const [promoters, setPromoters] = useState([]);
	const [products, setProducts] = useState([]);
	const [operations, setOperations] = useState([]);
	const [clients, setClients] = useState([]);
	const [benefits, setBenefits] = useState([]);

	/* INPUT'S` */

	const [inputClient, setInputCliente] = useState('');
	const [inputNameClient, setInputNameClient] = useState('...');
	const [inputBenefit, setInputBenefit] = useState('');
	const [inputContractNumber, setInputContractNumber] = useState('');

	const handleInputClient = (event) => setInputCliente(event.target.value);
	const handleInputContractNumber = (event) => setInputContractNumber(event.target.value);

	const handleInputBenefit = (event) =>
	{
		let proposal = clients.find(register => register._id === event.target.value);

		if(!proposal)
			return;

		setInputBenefit(proposal.benefit);

		setInputContractNumber(proposal.contract_number);
	}

	/* INPUT'S` */

	const handleStores = (event) =>
	{
		let store = stores.find(register => register._id === event.target.value);

		if(!store.salespeople.length)
		{
			setSalesman([]);

			return window.notify({
				title: 'Ops!',
				message: 'Esta loja não possuí vendedores!'
			}, 'warning');
		}

		setSalesman(store.salespeople);
	}

	const handleSearchClient = async () =>
	{
		try
		{
			setBtnLoading(true);

			let response = await Api.get('/client/' + inputClient, {
				header: ['Authorization', user.token]
			});

			setBtnLoading(false);

			if(response.statusCode !== 200)
			{
				setClients([]);
				setBenefits([]);
				setInputNameClient('...');
				setInputContractNumber('');

				return window.notify({
					title: 'Ops!',
					message: response.body.message
				}, 'warning');
			}

			window.notify({
				title: 'Oba!',
				message: 'Informações carregadas com sucesso!'
			});

			setClients(response.body);

			setBenefits(response.body.map(register => {
				return {
					_id: register._id,
					benefit: register.benefit,
					contract_number: register.contract_number
				};
			}));

			setInputNameClient(response.body[0].name);
		}
		catch(e)
		{
			return window.notify({
				title: 'Eita!',
				message: e.message
			}, 'danger');
		}
	}

	useEffect(() => {

		async function run()
		{
			try
			{
				setLoading(true);

				let response = await Api.get('/combo/proposal', {
					header: ['Authorization', user.token]
				});

				setLoading(false);

				if(response.statusCode !== 200)
					return window.notify({
						title: 'Ops!',
						message: response.body.message
					}, 'warning');

				setStores(response.body.stores);
				setBanks(response.body.banks);
				setPromoters(response.body.promoters);
				setProducts(response.body.products);
				setOperations(response.body.operations);
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

		window.$('.amount').mask('#,00', { reverse: true });

		return;

	}, []);

	const Salesman = () =>
	{
		if(!salesman.length)
			return(
				<select className="form-control">
					<option value>- Selecione um Loja -</option>
				</select>
			);

		return(

			<select className="form-control">

				<option value>- Selecione -</option>

				{
					salesman.map(register => <option key={ register._id } value={ register._id }>{ register.name }</option>)
				}

			</select>

		);
	}

	return(

		<div className="row">

			<div className="col-md-12">

				<div className="card">

					<div className="card-header">
						<div className="card-title">Origem da Proposta</div>
					</div>

					<div className="card-body">

						<Load load={ loading }>

							<div className="row">

								<div className="col-md-4">

									<div className="form-group">
										<label>Data</label>
										<input type="date" className="form-control" />
									</div>

								</div>

							</div>

							<div className="row">

								<div className="col-md-4">

									<div className="form-group">
										<label>Loja</label>
										<select className="form-control" onChange={ handleStores }>
											
											<option value>- Selecione -</option>
										
											{
												stores.map(register => <option key={ register._id } value={ register._id }>{ register.name }</option>)
											}

										</select>
									</div>

								</div>

								<div className="col-md-4">

									<div className="form-group">
										<label>Vendedor</label>
										<Salesman />
									</div>

								</div>

								<div className="col-md-4">

									<div className="form-group">
										<label>Vendedor Participante</label>
										<Salesman />
									</div>

								</div>

								<div className="col-md-4">

									<div className="form-group">
										<label>Banco</label>
										<select className="form-control">

											<option value>- Selecione -</option>

											{
												banks.map(register => <option key={ register._id } value={ register._id }>{ `${register.code} - ${register.short_name}` }</option>)
											}

										</select>
									</div>

								</div>

								<div className="col-md-4">

									<div className="form-group">
										<label>Promotora</label>
										<select className="form-control">

											<option value>- Selecione -</option>

											{
												promoters.map(register => <option key={ register._id } value={ register._id }>{ register.description }</option>)
											}

										</select>
									</div>

								</div>

								<div className="col-md-4">

									<div className="form-group">
										<label>Produto</label>
										<select className="form-control">

											<option value>- Selecione -</option>

											{
												products.map(register => <option key={ register._id } value={ register._id }>{ register.description }</option>)
											}

										</select>
									</div>

								</div>

								<div className="col-md-4">

									<div className="form-group">
										<label>Operação</label>
										<select className="form-control">

											<option value>- Selecione -</option>

											{
												operations.map(register => <option key={ register._id } value={ register._id }>{ register.description }</option>)
											}

										</select>
									</div>

								</div>

							</div>

						</Load>

					</div>

				</div>

				<div className="card">

					<div className="card-header">
						<div className="card-title">Dados da Proposta</div>
					</div>

					<div className="card-body">

						<div className="row">

							<div className="col-md-4">
								<div className="form-group">
									<label>CPF</label>

									<div className="input-group">

										<input type="text" className="form-control document" onChange={ handleInputClient } />

										<div className="input-group-prepend">
											<ButtonLoad className="btn btn-info btn-sm" load={ btnLoading } onClick={ handleSearchClient }>
												<i className="fas fa-search"></i>
											</ButtonLoad>
										</div>

									</div>

								</div>
							</div>

							<div className="col-md-4">
								<div className="form-group">
									<label>Cliente</label>
									<input type="text" className="form-control" value={ inputNameClient } disabled={ true } />
								</div>
							</div>

						</div>

						<div className="row">

							<div className="col-md-4">
								<div className="form-group">
									<label>Benefício (Nr. Contrato)</label>
									<select className="form-control" onChange={ handleInputBenefit }>

										<option value>- Selecione -</option>

										{
											benefits.map(register => <option key={ register._id } value={ register._id }>{ `${register.benefit} (${register.contract_number})` }</option>)
										}

									</select>
								</div>
							</div>

							<div className="col-md-4">
								<div className="form-group">
									<label>Número da Proposta</label>
									<input type="text" className="form-control" />
								</div>
							</div>

							<div className="col-md-4">
								<div className="form-group">
									<label>Número do Contrato</label>
									<input type="text" className="form-control" value={ inputContractNumber } onChange={ handleInputContractNumber } />
								</div>
							</div>

							<div className="col-md-4">
								<div className="form-group">
									<label>Valor Financiado</label>
									<div class="input-group mb-3">
										<div class="input-group-prepend">
											<span class="input-group-text">R$</span>
										</div>
										<input type="text" class="form-control amount" placeholder="0,00" />
									</div>
								</div>
							</div>

							<div className="col-md-4">
								<div className="form-group">
									<label>Valor Dívida</label>
									<div class="input-group mb-3">
										<div class="input-group-prepend">
											<span class="input-group-text">R$</span>
										</div>
										<input type="text" class="form-control amount" placeholder="0,00" />
									</div>
								</div>
							</div>

							<div className="col-md-4">
								<div className="form-group">
									<label>Valor Liberado</label>
									<div class="input-group mb-3">
										<div class="input-group-prepend">
											<span class="input-group-text">R$</span>
										</div>
										<input type="text" class="form-control amount" placeholder="0,00" />
									</div>
								</div>
							</div>

							<div className="col-md-4">
								<div className="form-group">
									<label>Valor Parcela</label>
									<div class="input-group mb-3">
										<div class="input-group-prepend">
											<span class="input-group-text">R$</span>
										</div>
										<input type="text" class="form-control amount" placeholder="0,00" />
									</div>
								</div>
							</div>

						</div>

					</div>

				</div>

			</div>

		</div>

	);
}