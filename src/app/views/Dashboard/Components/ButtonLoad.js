import React from 'react'

export default function ButtonLoad(props)
{
	const { load, children, ...others } = props;

	if(load)
	{
		return(
			<button type="button" disabled={ true } { ...others }>

				<div className="spinner-border spinner-border-sm" role="status">
				  <span className="sr-only">Loading...</span>
				</div>

			</button>
		);
	}

	return <button type="button" { ...others }>{ children }</button>;
}