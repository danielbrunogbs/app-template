import React, { useState, useEffect } from 'react'
import Load from '../Components/Load'
import Api from '../../../Services/Api'

export default function Profiles(props)
{
	const { user } = props;

	const [profiles, setProfiles] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {

		async function run()
		{
			try
			{
				setLoading(true);

				let response = await Api.get('/profiles', {
					header: ['Authorization', user.token]
				});

				setLoading(false);

				if(response.statusCode !== 200)
					return window.notify({
						title: 'Ops!',
						content: response.body.message
					}, 'warning');

				setProfiles(response.body);
			}
			catch(e)
			{
				return window.notify({
					title: 'Eita!',
					content: e.message
				}, 'danger');
			}
		}

		run();

	}, []);

	const Registers = () =>
	{
		if(profiles.length < 1)
			return(

				<tr>
					<td colspan="3" align="center">Não há nada por aqui =/</td>
				</tr>

			);

		return profiles.map(register => (

			<tr>
				
				<td>{ register.description }</td>
				
				<td align="center">
					<a href="/" className="btn btn-info btn-sm">
						<i className="fas fa-edit"></i>
					</a>
				</td>
				
				<td align="center">
					<a href="/" className="btn btn-danger btn-sm">
						<i className="fas fa-trash"></i>
					</a>
				</td>
			
			</tr>

		));
	}

	return(

		<div className="row">

			<div className="col-md-12">

				<div className="card">

					<div className="card-header">

						<div className="card-title">

						Perfis

						<div className="pull-right">

							<button className="btn btn-success btn-sm" type="button" onClick={ () => alert('Em desenvolvimento') }>
								<i className="fas fa-plus-circle"></i> Adicionar
							</button>

						</div>

						</div>

					</div>

					<div className="card-body">

						<Load load={ loading }>

							<table className="table table-hover">

								<thead>

									<tr>
										<th>Perfil</th>
										<th width="1">Editar</th>
										<th width="1">Excluir</th>
									</tr>
								
								</thead>

								<tbody>

									<Registers />

								</tbody>

							</table>

						</Load>

					</div>

				</div>

			</div>

		</div>

	);
}