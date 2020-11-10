import React, { useState } from 'react'
import ButtonLoad from '../../Components/ButtonLoad'
import Api from '../../../../Services/Api'

export default function ButtonDelete(props)
{
	const { user, setStores, stores, id } = props;

	const [loading, setLoading] = useState(false);

	const handleDestroy = async () =>
	{
		try
		{
			setLoading(true);

			let response = await Api.del('/store/' + id, {
				header: ['Authorization', user.token]
			});

			setLoading(false);

			if(response.statusCode !== 200)
				return window.notify({
					title: 'Ops!',
					message: response.body.message
				}, 'warning');

			setStores(stores.filter(register => register._id !== id));

			return window.notify({
				title: 'Uhul!',
				message: response.body.message
			});
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

		<div>

			<ButtonLoad load={ loading } className="btn btn-sm btn-danger" onClick={ handleDestroy }>

				<i className="fas fa-trash"></i>

			</ButtonLoad>

		</div>

	);
}