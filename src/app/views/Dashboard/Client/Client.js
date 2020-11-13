import React, { useState } from 'react'
import Api from '../../../Services/Api'
import moment from 'moment'

import Load from '../Components/Load'
import ButtonLoad from '../Components/ButtonLoad'
import ExportClient from './Components/ExportClient'

export default function Client(props)
{
	const { user } = props;

	const [clients, setClients] = useState([]);
	const [input, setInput] = useState('');
	const [loading, setLoading] = useState(false);

	const cpf = (event) => setInput(event.target.value);

	const search = async (event) =>
	{
		try
		{
            event.preventDefault();
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

	const Detail = () =>
	{
		if(!clients.length)
			return null;

		let client = clients[0];

		return(

			<div className="row">

				<div className="col-md-12">

					<div className="card">

						<div className="card-header">

							<div className="card-title">Detalhamento</div>

						</div>

						<div className="card-body">

							<table className="table table-hover">

								<tbody>

									<tr>

										<th width="1">Nome</th>
										<td align="left">{ client.name }</td>
									
										<th width="1">Idade</th>
										<td align="left" colSpan={ 3 }>{ client.age }</td>

										<th width="1">Sexo</th>
										<td>{ client.gender }</td>

									</tr>

									<tr>

										<th width="1">CPF</th>
										<td className="document" align="left">{ client.document }</td>
									
										<th>Data de Nascimento</th>
										<td align="left" colSpan={ 5 }>{ moment(client.birth).format('DD/MM/YYYY') }</td>

									</tr>

									<tr>

										<th width="1">CEP</th>
										<td className="zip_code">{ client.cep }</td>

										<th width="1">Cidade</th>
										<td>{ client.city }</td>

										<th width="1">UF</th>
										<td colSpan={ 4 }>{ client.uf }</td>

									</tr>

									<tr>

										<th width="1">Logradouro</th>
										<td>{ client.address }</td>

										<th width="1">Bairro</th>
										<td colSpan={ 5 }>{ client.neighborhood }</td>

									</tr>

								</tbody>

							</table>

						</div>

					</div>

				</div>

			</div>

		);
	}

	return (

		<div>

			<div className="row">
				
				<div className="col-md-12">

					<div className="card full-height">

						<div className="card-header card-header-warning">

							<div className="card-title">
							
								Consultar Cliente

								<div className="pull-right">

									<ExportClient { ...props } />

								</div>

							</div>

						</div>

						<form onSubmitCapture={search}>

							<div className="card-body">

								<div className="form-group">

									<label>CPF</label>

									<input id="cpf" type="text" className="form-control" onChange={ cpf } />

								</div>

								<div className="form-group pull-right">

									<ButtonLoad load={ loading } className="btn btn-info btn-sm" type="submit" onClick={ search }>

										Buscar

									</ButtonLoad>

								</div>

							</div>

                  		</form>
					
					</div>

				</div>

			</div>

			<Load load={ loading } >

				<Detail />

				{
					clients.map(register => {

						return (

							<div className="row" key={ register._id }>
					
								<div className="col-md-12">

									<div className="card full-height">

										<div className="card-body">

											<table className="table table-hover">

												<tbody>

													<tr>

														<th width="1">Contrato</th>
														<td>{ register.contract_number }</td>

														<th width="1">Benefício</th>
														<td>{ register.benefit }</td>

														<th width="1">Espécies</th>
														<td>{ register.species }</td>

														<th width="1">DIB</th>
														<td>{ register.dib ? moment(register.dib).format('DD/MM/YYYY') : '-' }</td>

													</tr>

													<tr>

														<th width="1">Salário</th>
														<td>{ register.salary }</td>

														<th>Valor do Empréstimo</th>
														<td>{ register.loan_amount }</td>

														<th width="1">Margem</th>
														<td colSpan={ 3 }>{ register.margin.toLocaleString('pt-BR') }</td>

													</tr>

													<tr>

														<th width="1">Parcelas</th>
														<td>{ register.installments }</td>

														<th width="1">Valor Parcela</th>
														<td>{ register.installments_amount.toLocaleString('pt-BR') }</td>

														<th width="1">Taxa</th>
														<td colSpan={ 3 }>{ register.rate.toLocaleString('pt-BR') }</td>

													</tr>

													<tr>

														<th width="1">Parcelas Pagas</th>
														<td>{ register.installments_paid ? register.installments_paid : '-' }</td>

														<th width="1">Parcelas Abertas</th>
														<td>{ register.installments_payable ? register.installments_payable : '-' }</td>

														<th width="1">Banco Remetente</th>
														<td colSpan={ 3 }>{ register.bank_name }</td>

													</tr>

													<tr>

														<th width="1">Débito</th>
														<td>{ register.debit_balance }</td>

														<th width="1">Data Inicial</th>
														<td>{ register.date_initial ? moment(register.date_initial).format('DD/MM/YYYY') : '-' }</td>

														<th width="1">Data Final</th>
														<td colSpan={ 3 }>{ register.date_final ? moment(register.date_final).format('DD/MM/YYYY') : '-' }</td>

													</tr>

													<tr>

														<th width="1">Tipo Empréstimo</th>
														<td>{ register.loan_type }</td>

														<th width="1">Tipo Pagamento</th>
														<td>{ register.payment_method }</td>

														<th width="1">Manto Orgão</th>
														<td colSpan={ 3 }>{ register.organ_mant }</td>

													</tr>

													<tr>

														<th width="1">Banco Destinatário</th>
														<td>{ register.bank_receives }</td>

														<th width="1">Agência</th>
														<td>{ register.agency }</td>

														<th width="1">Conta</th>
														<td colSpan={ 3 }>{ register.account }</td>

													</tr>

													<tr>

														<th width="1">Orgão Pagador</th>
														<td>{ register.organ_payment }</td>

														<th width="1">Contatos</th>
														<td colSpan={ 5 }>{ register.contacts.map(contact => `${contact}, `) }</td>

													</tr>

												</tbody>

											</table>

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