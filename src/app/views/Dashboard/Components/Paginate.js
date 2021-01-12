import React, { useState, useEffect } from 'react'

export default function Paginate(props)
{
	const { page, setPage, body } = props;

	const [amount, setAmount] = useState(0);
	const [next, setNext] = useState(false);
	const [prev, setPrev] = useState(false);

	useEffect(() => {

		setAmount(body.pages);
		setNext(body.next_page);
		setPrev(body.prev_page);

	}, [body])

	const Previous = () =>
	{
		if(prev)
			return(
				<li className="page-item">
					<a className="page-link" href="#" aria-label="Previous">
						<span aria-hidden="true">&laquo;</span>
						<span className="sr-only">Previous</span>
					</a>
				</li>
			);

		return <div></div>;
	}

	const Next = () =>
	{
		if(next)
			return(
				<li className="page-item">
					<a className="page-link" href="#" aria-label="Next">
						<span aria-hidden="true">&raquo;</span>
						<span className="sr-only">Next</span>
					</a>
				</li>
			);

		return <div></div>;
	}

	const Pages = () =>
	{
		let render = [];

		render.push(<li className="page-item"><a className="page-link" onClick={ (event) => pressPage(event, 1) } id={ 1 } href="/">1</a></li>);

		for(let i = 2; i < amount; i++)
		{
			render.push(<li className="page-item"><a className="page-link" onClick={ (event) => pressPage(event, i) } key={ i } id={ i } href="/">{ i }</a></li>);
		}

		render.push(<li className="page-item"><a className="page-link" onClick={ (event) => pressPage(event, amount) } id={ amount } href="/">{ amount }</a></li>);

		return render;
	}

	const pressPage = (event, page) =>
	{
		event.preventDefault();

		setPage(page);
	}

	if(!body.page)
		return <div></div>;

	return(

		<ul className="pagination pg-primary">
			
			<Previous />
			
			<Pages />
		
			<Next />

		</ul>

	);
}