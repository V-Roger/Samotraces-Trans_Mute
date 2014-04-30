$(document).ready(function(){

	$('#transformer_trace').click(function(){

		var vis = $('#toolbox').css('display') == 'block' ? true : false;

		if(vis)
		{
			$('#toolbox').toggle();
			$('#traces').css('height', '90%');
		}
		else
		{
			$('#toolbox').toggle();
			$('#traces').css('height', '50%');
		}
	});

});