import Api from './app/Services/Api'

export const isAuthenticate = async () =>
{
	let user = localStorage.getItem('user');

	if(!user)
		window.location.href = '/login';

	/* Checa se pode prosseguir com a sessão */

	let response = await Api.get('/auth/check', {
		header: ['Authorization', JSON.parse(user).token]
	});

	if(response.body.logout)
	{
		localStorage.removeItem('user');
		window.location.href = '/login';
	}
}