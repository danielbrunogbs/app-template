const CONVERT = {
	name: 'nome',
	zipCode: 'CEP',
	street: 'logradouro',
	number: 'número',
	complement: 'complemento',
	neighborhood: 'bairro',
	city: 'cidade',
	state: 'estado',
	description: 'descrição'
};

export default (fields = {}) =>
{
	let keys = Object.keys(fields);

	keys.map(key => {

		if(typeof fields[key] === "string")
		{
			if(!fields[key].length)
				throw new Error(`Preencha o campo ${ CONVERT[key] ? CONVERT[key] : key }!`);
		}
	
	});

	return;
}