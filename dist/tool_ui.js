$(document).ready(function(){

	$('#nav_traces > li > a').click(function(){

		var id = $(this).attr('id');

		$(this).parent().addClass('active');
		$(this).parent().siblings().removeClass('active');

		var toolbox_vis = $('#toolbox').css('display') == 'block' ? true : false;

		switch (id)
		{
			case 'load_trace' : $('#traces_header').html('Charger trace');
								$('#my-widget2, #scale2').hide();
								$('#importer').show();
								if(toolbox_vis)
								{
									$('#toolbox').hide();
									$('#traces').css('height', '92%');
								}
								break;

			case 'transform_trace' : 	$('#traces_header').html('Transformer trace');
										$('#my-widget2, #scale2').show();
										$('#importer').hide();
										if(!toolbox_vis)
										{
											$('#toolbox').show();
											$('#traces').css('height', '50%');
										}
									 	break;

			case 'compare_trace' : 	
									if(toolbox_vis)
									{
										$('#toolbox').hide();
										$('#traces').css('height', '92%');
									}
								   	break;

			case 'import_trace' : 	
									if(toolbox_vis)
									{
										$('#toolbox').hide();
										$('#traces').css('height', '92%');
									}
									break;

			case 'history' : 	
								if(toolbox_vis)
								{
									$('#toolbox').hide();
									$('#traces').css('height', '92%');
								}
								break;

			case 'download_transformation' : 	
												if(toolbox_vis)
												{
													$('#toolbox').hide();
													$('#traces').css('height', '92%');
												}
												break;

			default : break;
		}
	});

});