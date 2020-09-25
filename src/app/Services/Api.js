import superagent from 'superagent'

function get(path)
{
	return new Promise((resolve, reject) => {

		superagent.get('http://localhost:8080' + path)
					.end((error, response) => resolve(response));

	});
}

function post(path, fields = {})
{
	return new Promise((resolve, reject) => {

		superagent.post('http://localhost:8080' + path)
					.send(fields)
					.set('Content-Type', 'application/json')
					.end((error, response) => resolve(response));

	});
}

export default { get, post };