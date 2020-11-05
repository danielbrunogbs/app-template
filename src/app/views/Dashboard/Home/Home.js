import React, { useState, useEffect } from 'react'
import Load from '../Components/Load'
import Api from '../../../Services/Api'

export default function Home(props)
{
	const { user, history } = props;

	const [usersCount, setUsersCount] = useState(0);
	const [proposalsCount, setProposalsCount] = useState(0);
	const [clientsCount, setClientsCount] = useState(0);
	const [loading, setLoading] = useState(false);

	useEffect(() => {


		async function run()
		{
			try
			{
				setLoading(true);

				let combo = await Api.get('/combo/dashboard', {
					header: ['Authorization', user.token]
				});

				setLoading(false);

				if(combo.statusCode !== 200)
					return window.notify({
						title: 'Opss!',
						message: combo.body.message
					}, 'warning');

				setUsersCount(combo.body.counters.users);
				setProposalsCount(combo.body.counters.proposals);
				setClientsCount(combo.body.counters.clients);
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

	return(

		<div className="row">
			
			<div className="col-md-12">

				<Load load={ loading }>

					<div className="row">

						<div className="col-md-4">
							<div className="card card-dark bg-info-gradient">
								<div className="card-body pb-0">
									<h2 className="mb-2">{ usersCount }</h2>
									<p>Usuários Cadastrados</p>
								</div>
							</div>
						</div>

						<div className="col-md-4">
							<div className="card card-dark bg-info-gradient">
								<div className="card-body pb-0">
									<h2 className="mb-2">{ proposalsCount }</h2>
									<p>Propostas Registradas</p>
								</div>
							</div>
						</div>

						<div className="col-md-4">
							<div className="card card-dark bg-info-gradient">
								<div className="card-body pb-0">
									<h2 className="mb-2">{ clientsCount }</h2>
									<p>Clientes</p>
								</div>
							</div>
						</div>

					</div>

				</Load>

			</div>

		</div>

	);
}