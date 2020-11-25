const CONVERT = {
	name: 'nome',
	zipCode: 'CEP',
	street: 'logradouro',
	number: 'número',
	complement: 'complemento',
	neighborhood: 'bairro',
	city: 'cidade',
	state: 'estado',
	description: 'descrição',
	date: 'data',
	store: 'loja',
	salespeople: 'vendedor',
	salespeople_participation: 'vendedor participante',
	bank: 'banco',
	promoter: 'promotora',
	product: 'produto',
	operation: 'operação',
	benefit: 'benefício',
	proposal_number: 'número da proposta',
	contract_number: 'número do contrato',
	funded_amount: 'valor financiado',
	debt_amount: 'valor divída',
	amount_released: 'valor liberado',
	installment_value: 'valor parcela'
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