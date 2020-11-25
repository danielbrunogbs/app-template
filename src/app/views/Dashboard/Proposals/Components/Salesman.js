import React from 'react'

export default function Salesman(props)
{
	const { objects, ...others } = props;

	if(!objects.length)
		return(

			<select className="form-control">

				<option value>- Selecione uma loja -</option>

			</select>

		);

	return(

		<select className="form-control" { ...others }>

			<option value>- Selecione -</option>

			{
				objects.map(register => <option key={ register._id } value={ register._id }>{ register.name }</option>)
			}

		</select>

	);
}