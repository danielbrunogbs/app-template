import React from 'react'

export default function Load(props)
{
	const { load, children } = props;

	if(!load)
		return children;

	return (
		<div className="text-center">

			<div className="spinner-border" role="status">

				<span className="sr-only">Loading...</span>

			</div>
			
		</div>
	);
}