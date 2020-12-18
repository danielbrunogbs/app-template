import React, { useState } from 'react'
import ButtonLoad from '../../Components/ButtonLoad'
import Api from '../../../../Services/Api'
import moment from 'moment'

export default function ExportProposal(props)
{
	const { user, filters } = props;

	const [loading, setLoading] = useState(false);
	const [url, setUrl] = useState('');
	const [filename, setFilename] = useState('');
	const [enable, setEnable] = useState(false);

	const handleExport = async (event) =>
	{
		try
		{
			setLoading(true);

			let response = await Api.get('/proposals/export', {
				header: ['Authorization', user.token],
				queries: filters
			});

			setLoading(false);

			if(response.statusCode !== 200)
				return window.notify({
					title: 'Ops!',
					message: response.body.message
				}, 'warning');

			let blob = new Blob([response.text], { type: response.header['content-type'] });
			let url = URL.createObjectURL(blob);

			setUrl(url);
			setFilename('propostas_' + moment().format('YYYY_MM_DD_HH_mm_ss') + '.csv');
			setEnable(true);

			return;
		}
		catch(e)
		{
			return window.notify({
				title: 'Eita!',
				message: e.message
			}, 'danger');
		}
	}

	const handleDisable = (event) =>
	{
		setUrl('');
		setFilename('');
		setEnable(false);
	}

	if(enable)
		return(

			<span>

				<a href={ url } download={ filename } onClick={ handleDisable } className="btn btn-success btn-sm text-white">
					<i className="fas fa-download"></i> Download
				</a>

			</span>

		);

	return(

		<span>

			<ButtonLoad type="button" load={ loading } className="btn btn-info btn-sm" onClick={ handleExport }>
				<i className="fas fa-download"></i>
			</ButtonLoad>

		</span>

	);
}