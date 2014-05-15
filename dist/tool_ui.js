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
								$('#my-widget2, #scale2').css('visibility','hidden');
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
										$('#my-widget2, #scale2').css('visibility','visible');
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
									$('#my-widget2, #scale2').css('visibility','visible');
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
											$('#my-widget2, #scale2').css('visibility','visible');
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
								$('#my-widget2, #scale2').css('visibility','visible');
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
												$('#my-widget2, #scale2').css('visibility','visible');
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
									$('#row_add').show();
									$('#row_replace').hide();
									$('#row_delete').hide();
									break;

				case 'transformer_obsel' : 
									$('#row_add').hide();
									$('#row_replace').show();
									$('#row_delete').hide();
								 	break;

				case 'supprimer_obsel' : 	
									$('#row_add').hide();
									$('#row_replace').hide();
									$('#row_delete').show();
								   	break;
				default : break;
			}
		});

	/*
	pour la fonction essai avec tableau associatif pour la couleur     $('#my_select option:selected').attr('id');
	*/
	$('#add_type').change(function(){
		alert( "Change" );
		if ($('#add_type option:selected').attr("id")!="vide"){
			alert( "!=  " );
			$("#row_add > .col-md-3:nth-child(1) .progress-bar").removeClass('progress-bar-undone').addClass('bg-purple');
		} else {
			alert( "==  " );
			$("#row_add > .col-md-3:nth-child(1) .progress-bar").removeClass('bg-purple').addClass('progress-bar-undone');
		}
	});

});