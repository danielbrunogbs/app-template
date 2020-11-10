import superagent from 'superagent'
import config from './config.json'

function get(path, object = {})
{
	return new Promise((resolve, reject) => {

		let get = superagent.get(config.API_URL + path);
		
		if(object.fields)
			get.send(object.fields);

		if(object.headers)
			object.headers.map(header => get.set(header[0], header[1]));

		if(object.header)
			get.set(object.header[0], object.header[1]);

		get.end((error, response) => resolve(response));

	});
}

function post(path, object = {})
{
	return new Promise((resolve, reject) => {

		let post = superagent.post(config.API_URL + path);

		if(object.fields)
			post.send(object.fields);

		if(object.headers)
			object.headers.map(header => post.set(header[0], header[1]));

		if(object.header)
			post.set(object.header[0], object.header[1]);

		post.end((error, response) => resolve(response));

	});
}

function del(path, object = {})
{
	return new Promise((resolve, reject) => {

		let post = superagent.del(config.API_URL + path);

		if(object.fields)
			post.send(object.fields);

		if(object.headers)
			object.headers.map(header => post.set(header[0], header[1]));

		if(object.header)
			post.set(object.header[0], object.header[1]);

		post.end((error, response) => resolve(response));

	});
}

export default { get, post, del };