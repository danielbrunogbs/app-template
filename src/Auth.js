// import Api from './app/Services/Api'

export const isAuthenticate = () =>
{
	let token = localStorage.getItem('user');

	if(token === null)
		return false;

	//Implementar a validação de duração do token

	return true;
}