import React from 'react'

export default function Paginate(props)
{
	const { object } = props;

	const Previous = () =>
	{
		if(!object.prev_page)
			return(
				<div>Teste</div>
			);

		return(
			<li className="page-item">
				<a className="page-link" href="#" aria-label="Previous">
					<span aria-hidden="true">&laquo;</span>
					<span className="sr-only">Previous</span>
				</a>
			</li>
		);
	}

	return(

		<ul className="pagination pg-primary">
			
			<Previous />
			
			<li className="page-item active"><a className="page-link" href="#">1</a></li>

			<li className="page-item"><a className="page-link" href="#">2</a></li>
			
			<li className="page-item"><a className="page-link" href="#">3</a></li>
			
			<li className="page-item">
				<a className="page-link" href="#" aria-label="Next">
					<span aria-hidden="true">&raquo;</span>
					<span className="sr-only">Next</span>
				</a>
			</li>
		
		</ul>

	);
}