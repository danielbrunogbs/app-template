import React, { useState, useEffect } from 'react'
import Load from '../Components/Load'
import Api from '../../../Services/Api'
import ButtonLoad from '../Components/ButtonLoad'
import Validate from '../../../Validators/Validate'
import Salesman from './Components/Salesman'

export default function CreateProposal(props)
{
	const { user, history } = props;

	const [loading, setLoading] = useState(false);
	const [btnLoading, setBtnLoading] = useState(false);
	const [submitLoad, setSubmitLoad] = useState(false);

	const [stores, setStores] = useState([]);
	const [salesman, setSalesman] = useState([]);
	const [banks, setBanks] = useState([]);
	const [promoters, setPromoters] = useState([]);
	const [products, setProducts] = useState([]);
	const [operations, setOperations] = useState([]);
	const [clients, setClients] = useState([]);
	const [benefits, setBenefits] = useState([]);

	/* INPUT'S` */

	const [inputDate, setInputDate] = useState('');
	const [inputStore, setInputStore] = useState('');
	const [inputSalesman, setInputSalesman] = useState('');
	const [inputSalesmanPart, setInputSalesmanPart] = useState('');
	const [inputBank, setInputBank] = useState('');
	const [inputPromoter, setInputPromoter] = useState('');
	const [inputProduct, setInputProduct] = useState('');
	const [inputOperation, setInputOperation] = useState('');

	const handleInputDate = (event) => setInputDate(event.target.value);
	const handleInputSalesman = (event) => setInputSalesman(event.target.value);
	const handleInputSalesmanPart = (event) => setInputSalesmanPart(event.target.value);
	const handleInputBank = (event) => setInputBank(event.target.value);
	const handleInputPromoter = (event) => setInputPromoter(event.target.value);
	const handleInputProduct = (event) => setInputProduct(event.target.value);
	const handleInputOperation = (event) => setInputOperation(event.target.value);

	const handleInputStore = (event) =>
	{
		let store = stores.find(register => register._id === event.target.value);

		if(!store)
		{
			setSalesman([]);
			setInputStore('');

			return;
		}

		if(!store.salespeople.length)
		{
			setSalesman([]);

			return window.notify({
				title: 'Ops!',
				message: 'Esta loja não possuí vendedores!'
			}, 'warning');
		}

		setSalesman(store.salespeople);
		setInputStore(store._id);
	}

	const [inputClient, setInputCliente] = useState('');
	const [inputNameClient, setInputNameClient] = useState('...');
	const [inputBenefit, setInputBenefit] = useState('');
	const [inputNumberProposal, setInputNumberProposal] = useState('');
	const [inputContractNumber, setInputContractNumber] = useState('');
	const [inputFundedAmount, setInputFundedAmount] = useState('');
	const [inputDebtAmount, setInputDebtAmount] = useState('');
	const [inputAmountReleased, setInputAmountReleased] = useState('');
	const [inputInstallmentValue, setInputInstallmentValue] = useState('');
	const [inputPortability, setInputPortability] = useState(false);
	const [inputDescription, setInputDescription] = useState('');
	const [inputClientId, setInputClientId] = useState('');

	const handleInputClient = (event) => setInputCliente(event.target.value);
	const handleInputNumberProposal = (event) => setInputNumberProposal(event.target.value);
	const handleInputContractNumber = (event) => setInputContractNumber(event.target.value);
	const handleInputFundedAmount = (event) => setInputFundedAmount(parseFloat(event.target.value.replace(',', '.')));
	const handleInputDebtAmount = (event) => setInputDebtAmount(parseFloat(event.target.value.replace(',', '.')));
	const handleInputAmountReleased = (event) => setInputAmountReleased(parseFloat(event.target.value.replace(',', '.')));
	const handleInputInstallmentValue = (event) => setInputInstallmentValue(parseFloat(event.target.value.replace(',', '.')));
	const handleInputPortability = (event) => setInputPortability(event.target.checked);
	const handleInputDescription = (event) => setInputDescription(event.target.value);

	const handleInputBenefit = (event) =>
	{
		let proposal = clients.find(register => register._id === event.target.value);

		if(!proposal)
			return;

		setInputBenefit(proposal.benefit);
		setInputContractNumber(proposal.contract_number);
		setInputClientId(proposal._id);
	}

	/* INPUT'S` */

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

	const handleSubmit = async (event) =>
	{
		try
		{
			event.preventDefault();

			Validate({
				date: inputDate,
				store: inputStore,
				salespeople: inputSalesman,
				bank: inputBank,
				promoter: inputPromoter,
				product: inputProduct,
				operation: inputOperation,
				benefit: inputBenefit,
				proposal_number: inputNumberProposal,
				contract_number: inputContractNumber,
				funded_amount: inputFundedAmount,
				debt_amount: inputDebtAmount,
				amount_released: inputAmountReleased,
				installment_value: inputInstallmentValue
			});

			setSubmitLoad(true);

			let response = await Api.post('/proposal', {

				headers: [
					['Authorization', user.token],
					['Content-Type', 'application/json']
				],

				fields: {
					date: inputDate,
					store: inputStore,
					salespeople: inputSalesman,
					salespeople_participation: inputSalesmanPart,
					bank: inputBank,
					promoter: inputPromoter,
					product: inputProduct,
					operation: inputOperation,
					benefit: inputBenefit,
					proposed_number: inputNumberProposal,
					contract_number: inputContractNumber,
					funded_amount: inputFundedAmount,
					debt_amount: inputDebtAmount,
					amount_released: inputAmountReleased,
					installment_value: inputInstallmentValue,
					portability: inputPortability,
					client: inputClientId,
					description: inputDescription
				}

			});

			setSubmitLoad(false);

			if(response.statusCode !== 200)
				return window.notify({
					title: 'Ops!',
					message: response.body.message
				}, 'warning');

			window.notify({
				title: 'Uhul!',
				message: response.body.message
			});

			return history.push('/proposals');
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
		window.$('.document').mask('000.000.000-00');

		return;

	}, []);

	return(

		<div className="row">

			<div className="col-md-12">

				<form method="post" onSubmitCapture={ handleSubmit }>

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
											<input type="date" className="form-control" onChange={ handleInputDate } />
										</div>

									</div>

								</div>

								<div className="row">

									<div className="col-md-4">

										<div className="form-group">
											<label>Loja</label>
											<select className="form-control" onChange={ handleInputStore }>
												
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
											<Salesman objects={ salesman } onChange={ handleInputSalesman } />
										</div>

									</div>

									<div className="col-md-4">

										<div className="form-group">
											<label>Vendedor Participante</label>
											<Salesman objects={ salesman } onChange={ handleInputSalesmanPart } />
										</div>

									</div>

									<div className="col-md-4">

										<div className="form-group">
											<label>Banco</label>
											<select className="form-control" onChange={ handleInputBank }>

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
											<select className="form-control" onChange={ handleInputPromoter }>

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
											<select className="form-control" onChange={ handleInputProduct }>

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
											<select className="form-control" onChange={ handleInputOperation }>

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
												<ButtonLoad className="btn btn-info btn-sm" type="button" load={ btnLoading } onClick={ handleSearchClient }>
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
										<input type="text" className="form-control" onChange={ handleInputNumberProposal } />
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
										<div className="input-group mb-3">
											<div className="input-group-prepend">
												<span className="input-group-text">R$</span>
											</div>
											<input type="text" className="form-control amount" placeholder="0,00" onBlur={ handleInputFundedAmount } />
										</div>
									</div>
								</div>

								<div className="col-md-4">
									<div className="form-group">
										<label>Valor Divída</label>
										<div className="input-group mb-3">
											<div className="input-group-prepend">
												<span className="input-group-text">R$</span>
											</div>
											<input type="text" className="form-control amount" placeholder="0,00" onBlur={ handleInputDebtAmount } />
										</div>
									</div>
								</div>

								<div className="col-md-4">
									<div className="form-group">
										<label>Valor Liberado</label>
										<div className="input-group mb-3">
											<div className="input-group-prepend">
												<span className="input-group-text">R$</span>
											</div>
											<input type="text" className="form-control amount" placeholder="0,00" onBlur={ handleInputAmountReleased } />
										</div>
									</div>
								</div>

								<div className="col-md-4">
									<div className="form-group">
										<label>Valor Parcela</label>
										<div className="input-group mb-3">
											<div className="input-group-prepend">
												<span className="input-group-text">R$</span>
											</div>
											<input type="text" className="form-control amount" placeholder="0,00" onBlur={ handleInputInstallmentValue } />
										</div>
									</div>
								</div>

								<div className="col-md-4">
									<div className="form-group">
										<label>Portabilidade</label>

										<div className="custom-control custom-switch">
											<input type="checkbox" className="custom-control-input" id="customSwitches" onClick={ handleInputPortability } />
											<label className="custom-control-label" htmlFor={ 'customSwitches' }></label>
										</div>

									</div>
								</div>

							</div>

							<div className="row">

								<div className="col-md-12">

									<div className="form-group">

										<label>Descrição</label>

										<textarea className="form-control" rows="12" onChange={ handleInputDescription }></textarea>

									</div>

								</div>

							</div>

						</div>

					</div>

					<ButtonLoad className="btn btn-success btn-block" load={ submitLoad } type="submit">
						Cadastrar
					</ButtonLoad>

				</form>

			</div>

		</div>

	);
}