$(document).ready(function(){

	$('#nav_traces > li > a').click(function(){

		var id = $(this).attr('id');

		$(this).parent().addClass('active');
		$(this).parent().siblings().removeClass('active');

		var toolbox_vis = $('#toolbox').css('display') == 'block' ? true : false;

		switch (id)
		{
			case 'load_trace' : $('#traces_header').html('Charger trace');
								$('#widgets').show();
								$('#my-widget2, #scale2').hide();
								$('#importer').show();
								$('#transformation_list').hide();
								$('#importer-transformation').hide();
								if(toolbox_vis)
								{
									$('#toolbox').hide();
									$('#traces').css('height', '92%');
								}
								break;

			case 'transform_trace' : 	$('#traces_header').html('Transformer trace');
										$('#widgets').show();
										$('#my-widget2, #scale2').show();
										$('#importer').hide();
										$('#transformation_list').hide();
										$('#importer-transformation').hide();
										if(!toolbox_vis)
										{
											$('#toolbox').show();
											$('#traces').css('height', '50%');
										}
									 	break;

			case 'compare_trace' : 	$('#traces_header').html('Comparer trace');
									$('#widgets').show();
									$('#my-widget2, #scale2').show();
									$('#importer').hide();
									$('#transformation_list').hide();
									$('#importer-transformation').hide();
									if(toolbox_vis)
									{
										$('#toolbox').hide();
										$('#traces').css('height', '92%');
									}
								   	break;

			case 'import_transformation' : 	$('#traces_header').html('Importer transformation');
											$('#widgets').hide();
											$('#my-widget2, #scale2').show();
											$('#importer-transformation').show();
											$('#importer').hide();
											$('#transformation_list').hide();
											if(toolbox_vis)
											{
												$('#toolbox').hide();
												$('#traces').css('height', '92%');
											}
											break;

			case 'history' : 	$('#traces_header').html('Historique');
								$('#widgets').hide();			
								$('#my-widget2, #scale2').show();
								$('#transformation_list').show();
								$('#importer').hide();
								$('#importer-transformation').hide();
								if(toolbox_vis)
								{
									$('#toolbox').hide();
									$('#traces').css('height', '92%');
								}
								break;

			case 'download_transformation' : 	$('#traces_header').html('Télécharger transformation');
												$('#widgets').hide();
												$('#my-widget2, #scale2').show();
												$('#transformation_list').show();
												$('#importer').hide();
												if(toolbox_vis)
												{
													$('#toolbox').hide();
													$('#traces').css('height', '92%');
												}
												break;

			default : break;
		}
	});

	$('#nav_pills > li > a').click(function(){

			var id = $(this).attr('id');

			$(this).parent().addClass('active');
			$(this).parent().siblings().removeClass('active');

			switch (id)
			{
				case 'ajouter_obsel' : 
									$('#row_replace').hide();
									break;

				case 'transformer_obsel' : 
									$('#row_replace').show();
								 	break;

				case 'supprimer_obsel' : 	
									$('#row_replace').hide();
								   	break;
				default : break;
			}
		});

});