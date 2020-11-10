function loadMasks()
{
	$('.document').mask((value) => {

		if(value.length <= 11)
			return '000.000.000-00';

		if(value.length <= 14)
			return '00.000.000/0000-00';

	});

	$('.zip_code').mask('00000-000');
}

function notify(content = {}, state = 'success')
{
	switch(state)
	{
		case 'success':
			content.icon = 'fas fa-check';
			break;

		case 'info':
			content.icon = 'fas fa-bell';
			break;

		case 'danger':
			content.icon = 'fas fa-exclamation';
			break;

		default:
			content.icon = 'fas fa-bell';
			break;
	}

	$.notify(content,{
		type: state,
		placement: {
			from: 'top',
			align: 'left'
		},
		time: 0,
		delay: 3000,
	});
}