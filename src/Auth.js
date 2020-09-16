export const isAuthenticate = () =>
{
	let token = localStorage.getItem('user');

	if(token === null)
		return false;

	return true;
}