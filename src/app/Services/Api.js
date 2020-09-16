import superagent from 'superagent'

async function get(path)
{
	return new Promise((resolve, reject) => {

		superagent.get('https://api.novvodesign.com.br' + path)
					.end((error, response) => resolve(response));

	});
}

function post(path, fields = {})
{
	return new Promise((resolve, reject) => {

		superagent.post('https://api.novvodesign.com.br' + path)
					.send(fields)
					.set('Content-Type', 'application/json')
					.end((error, response) => resolve(response));

	});
}

export default { get, post };