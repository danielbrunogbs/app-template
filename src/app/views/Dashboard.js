import React from 'react'

export default function Dashboard()
{
	const { name, email, token, access_token } = JSON.parse(localStorage.getItem('user'));

	localStorage.removeItem('user');

	return <div>Seja bem vindo, { name }.</div>;
}