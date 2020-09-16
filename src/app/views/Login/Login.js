import React, { useState } from 'react'
import Api from '../../Services/Api'

export default function Login(props)
{
	const { history } = props;

	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);

	const handleEmail = (event) => setEmail(event.target.value);
	const handlePassword = (event) => setPassword(event.target.value);

	const handleLogin = async (event) =>
	{
		if(!email || !password)
			return alert('Preencha os campos!');

		let response = await Api.post('/login', { email, password });
		
		if(!response)
			return alert('Houve um erro!');

		let body = JSON.parse(response.text);

		if(response.status != 200) return alert(body.message);

		localStorage.setItem('user', response.text);

		history.push('/');
	}

	return(
		<div>
			
			<input type="email" onChange={ handleEmail } />

			<input type="password" onChange={ handlePassword } />

			<button type="button" onClick={ handleLogin }>Entrar</button>

		</div>
	);
}