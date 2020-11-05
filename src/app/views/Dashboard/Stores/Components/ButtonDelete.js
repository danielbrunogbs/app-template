import React, { useState } from 'react'
import ButtonLoad from '../../Components/ButtonLoad'
import Api from '../../../../Services/Api'

export default function ButtonDelete(props)
{
	const { user, stores } = props;

	const [loading, setLoading] = useState(false);

	const handleDestroy = async () =>
	{
		try
		{
			//
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