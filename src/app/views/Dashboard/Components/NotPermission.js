import React from 'react'

export default function NotPermission()
{
	return(

		<div className="row">

			<div className="col-md-12">

				<div className="card">

					<div className="card-header">

						<div className="card-title text-center">
							<i className="fas fa-exclamation-triangle"></i>
							&ensp;
							Desculpe, você não tem permissão para isso!
						</div>

					</div>

				</div>

			</div>

		</div>

	);
}