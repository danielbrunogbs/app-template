import React, { useState, useEffect } from 'react'

import Load from '../../Components/Load'
import ButtonLoad from '../../Components/ButtonLoad'
import Api from '../../../../Services/Api'
import Salesman from './Salesman'
import moment from 'moment'

export default function ProposalFilter(props)
{
	const { setFilters, user } = props;
	
	const [fields, setFields] = useState([]);
	const [loading, setLoading] = useState(false);
	const [btnLoading, setBtnLoading] = useState(false);

	const [stores, setStores] = useState([]);
	const [salespeople, setSalespeople] = useState([]);

	const [banks, setBanks] = useState([]);
	const [promoters, setPromoters] = useState([]);
	const [products, setProducts] = useState([]);
	const [operations, setOperations] = useState([]);
	const [benefits, setBenefits] = useState([]);
	const [proposedSituations, setProposedSituations] = useState([]);

	/* INPUT'S */

	const [inputDate, setInputDate] = useState('');
	const [inputStore, setInputStore] = useState('');
	const [inputSalesman, setInputSalesman] = useState('');
	const [inputSalesmanParticipation, setInputSalesmanParticipation] = useState('');
	const [inputBank, setInputBank] = useState('');
	const [inputPromoter, setInputPromoter] = useState('');
	const [inputProduct, setInputProduct] = useState('');
	const [inputOperation, setInputOperation] = useState('');
	const [inputProposedSituation, setInputProposedSituation] = useState('');

	const [inputClient, setInputClient] = useState({});
	const [inputBenefit, setInputBenefit] = useState('');
	const [inputNumberProposal, setInputNumberProposal] = useState('');
	const [inputNumberContract, setInputNumberContract] = useState('');
	const [inputFundedAmount, setInputFundedAmount] = useState('');
	const [inputDebtAmount, setInputDebtAmount] = useState('');
	const [inputAmountReleased, setInputAmountReleased] = useState('');
	const [inputInstallmentAmount, setInputInstallmentAmount] = useState('');
	const [inputPortability, setInputPortability] = useState(false);

	/* INPUT'S */

	/* HANDLER'S */

	const handleInputDate = (event) => setInputDate(event.target.value);
	const handleInputSalesman = (event) => setInputSalesman(event.target.value);
	const handleInputSalesmanParticipaton = (event) => setInputSalesmanParticipation(event.target.value);
	const handleInputBank = (event) => setInputBank(event.target.value);
	const handleInputPromoter = (event) => setInputPromoter(event.target.value);
	const handleInputProduct = (event) => setInputProduct(event.target.value);
	const handleInputOperation = (event) => setInputOperation(event.target.value);
	const handleInputProposedSituation = (event) => setInputProposedSituation(event.target.value);

	const handleInputClient = (event) => setInputClient(event.target.value);
	const handleInputBenefit = (event) => setInputBenefit(event.target.value);
	const handleInputNumberProposal = (event) => setInputNumberProposal(event.target.value);
	const handleInputNumberContract = (event) => setInputNumberContract(event.target.value);
	const handleInputFundedAmount = (event) => setInputFundedAmount(event.target.value);
	const handleInputDebtAmount = (event) => setInputDebtAmount(event.target.value);
	const handleInputAmountReleased = (event) => setInputAmountReleased(event.target.value);
	const handleInputInstallmentAmount = (event) => setInputInstallmentAmount(event.target.value);
	const handleInputPortability = (event) => setInputPortability(event.target.checked);

	/* HANDLER'S */

	const handleSubmit = (event) =>
	{
		try
		{
			event.preventDefault();

			let filter = [];

			if(inputDate.length)
				filter.push({ date: moment(inputDate).format('YYYY-MM-DD HH:mm:SS') });

			if(inputStore.length)
				filter.push({ 'store._id': inputStore });

			if(inputSalesman.length)
				filter.push({ 'salespeople._id': inputSalesman });

			if(inputSalesmanParticipation.length)
				filter.push({ 'salespeople_participation._id': inputSalesmanParticipation });

			if(inputBank.length)
				filter.push({ 'bank._id': inputBank });

			if(inputPromoter.length)
				filter.push({ 'promoter._id': inputPromoter });

			if(inputProduct.length)
				filter.push({ product: inputProduct });

			if(inputOperation.length)
				filter.push({ operation: inputOperation });

			if(inputProposedSituation.length)
				filter.push({ proposed_situation: inputProposedSituation });

			if(inputClient.length)
				filter.push({ 'client.document': inputClient.replace(/[^0-9]/g, '') });

			if(inputBenefit.length)
				filter.push({ benefit: inputBenefit });

			if(inputNumberProposal.length)
				filter.push({ proposed_number: inputNumberProposal });

			if(inputNumberContract.length)
				filter.push({ contract_number: inputNumberContract });

			if(inputFundedAmount.length)
				filter.push({ funded_amount: inputFundedAmount });

			if(inputDebtAmount.length)
				filter.push({ debt_amount: inputDebtAmount });

			if(inputAmountReleased.length)
				filter.push({ amount_released: inputAmountReleased });

			if(inputInstallmentAmount.length)
				filter.push({ installment_value: inputInstallmentAmount });

			filter.push({ portability: inputPortability });

			setFilters(filter);
		}
		catch(e)
		{
			return window.notify({
				title: 'Eita!',
				message: e.message
			}, 'danger');
		}
	}

	const selectStore = (event) =>
	{
		let store = stores.find(register => register._id === event.target.value);

		if(!store)
		{
			setSalespeople([]);
			return;
		}

		setSalespeople(store.salespeople);
		setInputStore(event.target.value);
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
				setBenefits([]);

				return window.notify({
					title: 'Ops!',
					message: response.body.message
				}, 'warning');
			}

			window.notify({
				title: 'Oba!',
				message: 'Informações carregadas com sucesso!'
			});

			setBenefits(response.body.map(register => {
				return {
					_id: register._id,
					benefit: register.benefit,
					contract_number: register.contract_number
				};
			}));
		}
		catch(e)
		{
			return window.notify({
				title: 'Eita!',
				message: e.message
			}, 'danger');
		}
	}

	const clearFilter = () =>
	{
		setFilters([]);

		setInputDate('');
		setInputStore('');
		setInputSalesman('');
		setInputSalesmanParticipation('');
		setInputBank('');
		setInputPromoter('');
		setInputProduct('');
		setInputOperation('');
		setInputClient('');
		setInputBenefit('');
		setInputNumberProposal('');
		setInputNumberContract('');
		setInputFundedAmount('');
		setInputDebtAmount('');
		setInputAmountReleased('');
		setInputInstallmentAmount('');
		setInputPortability(false);
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
				setProposedSituations(response.body.proposed_situations);

				window.$('.document').mask('000.000.000-00');
				window.$('.amount').mask('#,00', { reverse: true });
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

	return(

		<span>

			<button type="button" className="btn btn-warning btn-sm" data-toggle="modal" data-target="#exampleModal">
				<i className="fas fa-filter"></i>
			</button>

			<div className="modal fade" id="exampleModal" tabIndex={ -1 } role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				
				<div className="modal-dialog" role="document">
				
					<div className="modal-content">

						<form method="post" onSubmitCapture={ handleSubmit }>
							
							<div className="modal-body">
								
								<Load load={ loading }>

									<ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
											
										<li className="nav-item">
											<a className="nav-link active btn-sm" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Origem da Proposta</a>
										</li>
									
										<li className="nav-item">
											<a className="nav-link btn-sm" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Dados da Proposta</a>
										</li>
									
									</ul>

									<div className="row">

										<div className="col-md-12">
											
											<div className="tab-content" id="pills-tabContent">

												<div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">

													<div className="form-group">
														<label>Data</label>
														<input type="date" className="form-control" onChange={ handleInputDate } />
													</div>

													<div className="form-group">
														<label>Loja</label>
														<select className="form-control" onChange={ selectStore }>
															<option value>- Selecione -</option>

															{
																stores.map(register => <option key={ register._id } value={ register._id }>{ register.name }</option>)
															}

														</select>
													</div>


													<div className="form-group">
														<label>Vendedor</label>
														<Salesman objects={ salespeople } onChange={ handleInputSalesman } />
													</div>

													<div className="form-group">
														<label>Vendedor Participante</label>
														<Salesman objects={ salespeople } onChange={ handleInputSalesmanParticipaton } />
													</div>

													<div className="form-group">
														<label>Banco</label>
														<select className="form-control" onChange={ handleInputBank }>
															<option value>- Selecione -</option>

															{
																banks.map(register => <option key={ register._id } value={ register._id }>{ `${register.code} - ${register.short_name}` }</option>)
															}

														</select>
													</div>

													<div className="form-group">
														<label>Promotora</label>
														<select className="form-control" onChange={ handleInputPromoter }>
															<option value>- Selecione -</option>

															{
																promoters.map(register => <option key={ register._id } value={ register._id }>{ register.description }</option>)
															}

														</select>
													</div>

													<div className="form-group">
														<label>Produto</label>
														<select className="form-control" onChange={ handleInputProduct }>
															<option value>- Selecione -</option>

															{
																products.map(register => <option key={ register._id } value={ register._id }>{ register.description }</option>)
															}

														</select>
													</div>

													<div className="form-group">
														<label>Operação</label>
														<select className="form-control" onChange={ handleInputOperation }>
															<option value>- Selecione -</option>

															{
																operations.map(register => <option key={ register._id } value={ register._id }>{ register.description }</option>)
															}

														</select>
													</div>

													<div className="form-group">
														<label>Situação</label>
														<select className="form-control" onChange={ handleInputProposedSituation }>
															<option value>- Selecione -</option>

															{
																proposedSituations.map(register => <option key={ register._id } value={ register._id }>{ register.description }</option>)
															}

														</select>
													</div>

												</div>
											
												<div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">

													<div className="form-group">
														<label>CPF</label>

														<div className="input-group">

															<input type="text" className="form-control document" onBlur={ handleInputClient } />

															<div className="input-group-prepend">
																<ButtonLoad className="btn btn-info btn-sm" type="button" load={ btnLoading } onClick={ handleSearchClient }>
																	<i className="fas fa-search"></i>
																</ButtonLoad>
															</div>

														</div>

													</div>

													<div className="form-group">
														<label>Benefício (Nr. Contrato)</label>
														<select className="form-control" onChange={ handleInputBenefit }>
															<option value>- Selecione -</option>

															{
																benefits.map(register => <option key={ register._id } value={ register.benefit }>{ `${register.benefit} (${register.contract_number})` }</option>)
															}

														</select>
													</div>

													<div className="form-group">
														<label>Número de Proposta</label>
														<input type="text" className="form-control" onChange={ handleInputNumberProposal } />
													</div>

													<div className="form-group">
														<label>Número do Contrato</label>
														<input type="text" className="form-control" onChange={ handleInputNumberContract } />
													</div>

													<div className="form-group">
														<label>Valor Financiado</label>
														<div className="input-group mb-3">
															<div className="input-group-prepend">
																<span className="input-group-text">R$</span>
															</div>
															<input type="text" className="form-control amount" onBlur={ handleInputFundedAmount } placeholder="0,00" />
														</div>
													</div>

													<div className="form-group">
														<label>Valor Dívida</label>
														<div className="input-group mb-3">
															<div className="input-group-prepend">
																<span className="input-group-text">R$</span>
															</div>
															<input type="text" className="form-control amount" onBlur={ handleInputDebtAmount } placeholder="0,00" />
														</div>
													</div>

													<div className="form-group">
														<label>Valor Liberado</label>
														<div className="input-group mb-3">
															<div className="input-group-prepend">
																<span className="input-group-text">R$</span>
															</div>
															<input type="text" className="form-control amount" onBlur={ handleInputAmountReleased } placeholder="0,00" />
														</div>
													</div>

													<div className="form-group">
														<label>Valor Parcelado</label>
														<div className="input-group mb-3">
															<div className="input-group-prepend">
																<span className="input-group-text">R$</span>
															</div>
															<input type="text" className="form-control amount" onBlur={ handleInputInstallmentAmount } placeholder="0,00" />
														</div>
													</div>

													<div className="form-group">
														<label>Portabilidade</label>

														<div className="custom-control custom-switch">
															<input type="checkbox" className="custom-control-input" onClick={ handleInputPortability } id="customSwitches" />
															<label className="custom-control-label" htmlFor={ 'customSwitches' }></label>
														</div>

													</div>

												</div>
											
											</div>

										</div>

									</div>

								</Load>

							</div>
							
							<div className="modal-footer">
								<button type="button" onClick={ clearFilter } className="btn btn-danger btn-sm">Limpar</button>
								<button type="submit" className="btn btn-success btn-sm">Aplicar</button>
							</div>

						</form>
					
					</div>
	
				</div>
			
			</div>

		</span>

	);
}