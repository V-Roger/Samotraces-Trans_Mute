$(document).ready(function(){

		/*Traces menu management*/


	$('#nav_traces > li > a').click(function(){

		var id = $(this).attr('id');

		$(this).parent().addClass('active');
		$(this).parent().siblings().removeClass('active');

		var toolbox_vis = $('#toolbox').css('display') == 'block' ? true : false;

		switch (id)
		{
			case 'load_trace' : $('#traces_header').html('Charger trace');
								$('#widgets').show();
								$('#trace-transformed-widget, #scale3').css('visibility','hidden');
								$('#trace-preview-widget, #scale2').css('visibility','hidden');
								$('#importer').show();
								$('#transformation_list').hide();
								$('#importer-transformation').hide();
								$('#apply-btn').hide();
								if(toolbox_vis)
								{
									$('#toolbox').hide();
									$('#traces').css('height', '90%');
								}
								break;

			case 'transform_trace' : 	$('#traces_header').html('Transformer trace');
										$('#widgets').hide();
										$('#trace-transformed-widget, #scale3').css('visibility','visible');
										$('#trace-preview-widget, #scale2').css('visibility','visible');
										$('#importer').hide();
										$('#transformation_list').hide();
										$('#importer-transformation').hide();
										$('#apply-btn').show();
										if(!toolbox_vis)
										{
											$('#toolbox').show();
											$('#traces').css('height', '50%');
										}
									 	break;

			case 'compare_trace' : 	$('#traces_header').html('Comparer trace');
									$('#widgets').show();
									$('#trace-transformed-widget, #scale3').css('visibility','visible');
									$('#trace-preview-widget, #scale2').css('visibility', 'hidden');
									$('#importer').hide();
									$('#transformation_list').hide();
									$('#importer-transformation').hide();
									$('#apply-btn').hide();
									if(toolbox_vis)
									{
										$('#toolbox').hide();
										$('#traces').css('height', '90%');
									}
								   	break;

			case 'import_transformation' : 	$('#traces_header').html('Importer transformation');
											$('#widgets').hide();
											$('#trace-transformed-widget, #scale3').css('visibility','visible');
											$('#trace-preview-widget, #scale2').css('visibility', 'hidden');
											$('#importer-transformation').show();
											$('#importer').hide();
											$('#transformation_list').hide();
											$('#apply-btn').hide();
											if(toolbox_vis)
											{
												$('#toolbox').hide();
												$('#traces').css('height', '90%');
											}
											break;

			case 'history' : 	$('#traces_header').html('Historique');
								$('#widgets').hide();			
								$('#trace-transformed-widget, #scale3').css('visibility','visible');
								$('#trace-preview-widget, #scale2').css('visibility', 'hidden');
								$('#transformation_list').show();
								$('#importer').hide();
								$('#importer-transformation').hide();
								$('#apply-btn').hide();
								if(toolbox_vis)
								{
									$('#toolbox').hide();
									$('#traces').css('height', '90%');
								}
								break;

			case 'download_transformation' : 	$('#traces_header').html('Télécharger transformation');
												$('#widgets').hide();
												$('#trace-transformed-widget, #scale3').css('visibility','visible');
												$('#trace-preview-widget, #scale2').css('visibility', 'hidden');
												$('#transformation_list').show();
												$('#importer').hide();
												$('#apply-btn').hide();
												if(toolbox_vis)
												{
													$('#toolbox').hide();
													$('#traces').css('height', '90%');
												}
												break;

			default : break;
		}
	});

		/*-----------------------*/
		/*Toolbox menu management*/

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
									$('#row_fusion').hide();
									break;

				case 'transformer_obsel' : 
									$('#row_add').hide();
									$('#row_replace').show();
									$('#row_delete').hide();
									$('#row_fusion').hide();
									document.getElementById('suggestion-delete').innerHTML = "";
									document.getElementById('suggestion-fusion').innerHTML = "";
									document.getElementById('suggestion-replace').innerHTML = "utiliser le système de suggestions?<br><input type=\"checkbox\" id=\"activer_suggestion\">";
									break;

				case 'supprimer_obsel' : 	
									$('#row_add').hide();
									$('#row_replace').hide();
									$('#row_delete').show();
									$('#row_fusion').hide();
									document.getElementById('suggestion-replace').innerHTML = "";
									document.getElementById('suggestion-fusion').innerHTML = "";
									document.getElementById('suggestion-delete').innerHTML = "utiliser le système de suggestions?<br><input type=\"checkbox\" id=\"activer_suggestion\">";
								   	break;

				case 'fusionner_obsel' : 	
									$('#row_add').hide();
									$('#row_replace').hide();
									$('#row_delete').hide();
									$('#row_fusion').show();
									document.getElementById('suggestion-replace').innerHTML = "";
									document.getElementById('suggestion-delete').innerHTML = "";
									document.getElementById('suggestion-fusion').innerHTML = "utiliser le système de suggestions?<br><input type=\"checkbox\" id=\"activer_suggestion\">";
								   	break;

				default : break;
			}
		});


	//ProgressBar
	/*
	pour la fonction essai avec tableau associatif pour la couleur     $('#my_select option:selected').attr('id');
	*/
	$('#add_type').change(function(){
		if ($('#add_type option:selected').attr("id")!="vide"){
			$("#row_add > .step:nth-child(1) .progress-bar").removeClass('progress-bar-undone').addClass('bg-purple');
		} else {
			$("#row_add > .step:nth-child(1) .progress-bar").removeClass('bg-purple').addClass('progress-bar-undone');
		}
	});

	$("#add_TimeStamp[type='text']").change(function(){
		if ($("#add_TimeStamp[type='text']").val()!=""){
			$("#row_add > .step:nth-child(2) .progress-bar").removeClass('progress-bar-undone').addClass('bg-darkblue');
		} else {
			$("#row_add > .step:nth-child(2) .progress-bar").removeClass('bg-purple').addClass('progress-bar-undone');
		}
	});

	$('#attrs').change(function(){
		var any = false;
		var someoptions=false;
		$("#attrs option:selected").each(function(){
			if($(this).hasClass("facultatif") && $(this).attr("id")=="empty") {
				someoptions=true;
			}
		    if($(this).attr("id")!="empty"){
		        any = true;
		    }
		});

		if(any==true){
			$("#add-obs").prop("disabled", false);
			$("#row_add > .step:nth-child(3) .progress-bar").removeClass('progress-bar-undone').addClass('bg-mediumblue');

			setTimeout(function() {
			$("#row_add > .step:nth-child(4) .progress-bar").removeClass('progress-bar-undone').addClass('bg-green');
			}, 100);
			setTimeout(function() {
				if(($(window).width()<990) && someoptions==false){
					$("#skip-attrs1").css('display', 'inherit');
				} else {
					$("#row_add > .step:nth-child(4) .progress-bar").trigger("click");
				}
			}, 100);
		} else {
			$("#row_add > .step:nth-child(3) .progress-bar").removeClass('bg-mediumblue').addClass('progress-bar-undone');
			$("#row_add > .step:nth-child(4) .progress-bar").removeClass('bg-green').addClass('progress-bar-undone');
		}
	});

	//Replace_Bar
		$('#img_replace').change(function(){
		var element=$("#replace_1");
		alert(element.length);
			if(element.length>0) {
				$("#row_replace > .step:nth-child(1) .progress-bar").removeClass('progress-bar-undone').addClass('bg-mauve');
			} else {
				$("#row_replace > .step:nth-child(1) .progress-bar").removeClass('bg-mauve').addClass('progress-bar-undone');	
			}
		});

		$('.step-choice').change(function(){
		if ($('.step-choice option:selected').attr("id")!="vide"){
			$("#row_replace > .step:nth-child(2) .progress-bar").removeClass('progress-bar-undone').addClass('bg-purple');
		} else {
			$("#row_replace > .step:nth-child(2) .progress-bar").removeClass('bg-purple').addClass('progress-bar-undone');
		}
	});

		$("#replace_TimeStamp[type='text']").change(function(){
		if ($("#replace_TimeStamp[type='text']").val()!=""){
			$("#row_replace > .step:nth-child(3) .progress-bar").removeClass('progress-bar-undone').addClass('bg-darkblue');
		} else {
			$("#row_replace > .step:nth-child(3) .progress-bar").removeClass('bg-purple').addClass('progress-bar-undone');
		}
	});

	$('#attrs_replace').change(function(){
		var any = false;
		var someoptions2=false;
		$("#attrs_replace option:selected").each(function(){
			if($(this).hasClass("facultatif") && $(this).attr("id")=="empty") {
				someoptions2=true;
			}
			if($(this).attr("id")!="empty"){
		        any = true;
		    }
		});

		if(any==true){
			$("#row_replace > .step:nth-child(4) .progress-bar").removeClass('progress-bar-undone').addClass('bg-mediumblue');
			setTimeout(function() {
			$("#row_replace > .step:nth-child(7) .progress-bar").removeClass('progress-bar-undone').addClass('bg-green');
			}, 100);
			setTimeout(function() {
				if(($(window).width() <990) && someoptions2==false){
					$("#skip-attrs2").css('display', 'inherit');
				} else {
					$("#row_replace > .step:nth-child(6) .progress-bar").trigger("click");
				}
			}, 100);

		} else {
			$("#row_replace > .step:nth-child(4) .progress-bar").removeClass('bg-mediumblue').addClass('progress-bar-undone');
			$("#row_replace > .step:nth-child(7) .progress-bar").removeClass('bg-green').addClass('progress-bar-undone');
		}
	});

	$(".step-suggest").change(function(){
			if($("#activer_suggestion").is(':checked')==true) {
				$("#row_replace > .step:nth-child(6) .progress-bar").removeClass('progress-bar-undone').addClass('bg-lightblue');
			} else {
				$("#row_replace > .step:nth-child(6) .progress-bar").removeClass('bg-lightblue').addClass('progress-bar-undone');
			}
	});

	//Delete Bar

	$(".step-suggest").change(function(){
			if($("#activer_suggestion").is(':checked')==true) {
				$("#row_delete > .step:nth-child(2) .progress-bar").removeClass('progress-bar-undone').addClass('bg-lightblue');
			} else {
				$("#row_delete > .step:nth-child(2) .progress-bar").removeClass('bg-lightblue').addClass('progress-bar-undone');
			}
	});


	//Buttons Clear

	$("#add-obs").click(function(){
		    $("#row_add .progress-bar").each( function(){
  				this.className = this.className.replace(/bg[^\s]+/, 'progress-bar-undone');
			});
			$("#add-obs").prop("disabled", true);
		});

	$("#modify-obs").click(function(){
			$("#row_replace .progress-bar").each( function(){
  				this.className = this.className.replace(/bg[^\s]+/, 'progress-bar-undone');
			});
			setTimeout(function() {			
			$("#activer_suggestion").prop('checked', false);
			}, 100);			
	});

	$("#delete-obs").click(function(){
			$("#row_delete .progress-bar").each( function(){
  				this.className = this.className.replace(/bg[^\s]+/, 'progress-bar-undone');
			});	
			setTimeout(function() {			
			$("#activer_suggestion").prop('checked', false);
			}, 100);
	});







	//switching toggle icons
	$('.navbar-toggle').click(function(){
		if($(this).hasClass("collapsed")){
			$(this).find(".glyphicon").removeClass('glyphicon-collapse-down').addClass('glyphicon-collapse-up');
		} else {
			$(this).find(".glyphicon").removeClass('glyphicon-collapse-up').addClass('glyphicon-collapse-down');
		}
		
	});

	// collapse responsive navbar on click
	$('#nav_traces_collapse a').on('click', function(){ 
        if($('.nav_traces_header > .navbar-toggle').css('display') !='none'){
            $(".nav_traces_header > .navbar-toggle").trigger( "click" );
        }
    });

    $('#nav_tools_collapse a').on('click', function(){ 
        if($('.nav_tools_header > .navbar-toggle').css('display') !='none'){
            $(".nav_tools_header > .navbar-toggle").trigger( "click" );
        }
    });



});