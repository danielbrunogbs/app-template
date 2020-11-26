import React, { useState, useEffect } from 'react'
import Api from '../../../Services/Api'
import Load from '../Components/Load'

export default function ProposalDetail(props)
{
	const { user, params } = props;

	const [loading, setLoading] = useState(false);

	const [store, setStore] = useState({});
	const [salespeople, setSalespeople] = useState({});
	const [salespeopleParticipation, setSalespeopleParticipation] = useState({});
	const [bank, setBank] = useState({});
	const [promoter, setPromoter] = useState({});
	const [product, setProduct] = useState({});
	const [operation, setOperation] = useState({});
	const [client, setClient] = useState({});
	const [situation, setSituation] = useState({});
	const [proposal, setProposal] = useState({});

	useEffect(() => {

		async function run()
		{
			try
			{
				setLoading(true);

				let response = await Api.get('/proposals?_id=' + params.get('id'), {
					header: ['Authorization', user.token]
				});

				setLoading(false);

				if(response.statusCode !== 200)
					return window.notify({
						title: 'Ops!',
						message: response.body.message
					}, 'warning');

				setStore(response.body[0].store);
				setSalespeople(response.body[0].salespeople);
				setSalespeopleParticipation(response.body[0].salespeople_participation);
				setBank(response.body[0].bank);
				setPromoter(response.body[0].promoter);
				setProduct(response.body[0].product);
				setOperation(response.body[0].operation);
				setClient(response.body[0].client);
				setSituation(response.body[0].proposal_situation);
				setProposal(response.body[0]);
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

		<div className="row">

			<div className="col-md-12">

				<div className="card">

					<div className="card-header">
						<div className="card-title">Exemplo de Card</div>
					</div>

					<div className="card-body">

						<Load load={ loading }>

							<div>{ client.name }</div>

						</Load>

					</div>

				</div>

			</div>

		</div>

	);
}