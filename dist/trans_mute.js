function init() {
            // Create logical objects
			
			$('#historique').val("");
			$('#add_type').val("");
			$('#replace_type').val("");
			var index=$('#add_type').val();
			var index_replace=$('#replace_type').val();
            var trace        = new Samotraces.Lib.DemoTrace();
			var trace_Transformation = new Samotraces.Lib.DemoTrace();
            var tw           = new Samotraces.Lib.TimeWindow({start: 0,end: 20});
			var tw2          = new Samotraces.Lib.TimeWindow({start: 0,end: 20});
            var obsel_selector    = new Samotraces.Lib.Selector('Obsel','multiple');
			//var obsel_selector2    = new Samotraces.Lib.Selector('Obsel');
			
			//Visualisation options
            var options = { 
			
            url:  function(o) {
			     var attrs ="";
			   for (var attr in o.attributes)
				{
				  if(o.attributes[attr]!="")
				  {
                   attrs=attrs+' '+o.attributes[attr];
				  } 
				}
				  return 'images/'+o.type+attrs+'.png' ;
                },
                width: 25,
                height: 40,
                y: 0,
				
			};
			
			//create widgets
			var visu_origin = new Samotraces.Widgets.TraceDisplayIcons('my-widget',trace,tw,options);
			var visu=new Samotraces.Widgets.TraceDisplayIcons('my-widget2',trace_Transformation,tw2,options);
			new Samotraces.Widgets.WindowScale('scale',tw);
			new Samotraces.Widgets.WindowScale('scale2',tw2);
			var importer = new Samotraces.Widgets.ImportTrace('importer',trace);
			new Samotraces.Widgets.ImportTrace('importer transformation',trace_Transformation);
			
	       //>>Adding behaviour when clicking on obsels using jQuery
			$('body').on('click','#my-widget2 .Σ-obsel',function(e) {
				var obs = $.data(e.target,'Σ-data');
				obsel_selector.toggle(obs);
			});
			
			trace.addEventListener('trace:create:obsel',function(e) {
				var o = e.data;
				trace_Transformation.newObsel(o.type,o.timestamp,o.attributes);
				obsel_selector.empty(); 
				
			});
            var img="";
			obsel_selector.addEventListener('selection:add', function(e) {
				$("#delete-obs").prop("disabled",false);
				$("#modify-obs").prop("disabled",false);
				
				var obs = e.data;
				function create_points(obs) {
					var x = visu.options.x(obs);
					return String.concat(x+3,",10,",x+8,",15,",x+13,",10");
				}
				visu.svg
					.append('polygon')
					.attr('points',create_points(obs))
					.attr('stroke-width','1px')
					.attr('stroke','black')
					.attr('id',"__OBSEL__"+obs.id);
					
					//>>obsels selectionnées
					var valueattr_obsel_selection="";
					for(var attr in obs.attributes)
					{
					  valueattr_obsel_selection+= ' '+obs.attributes[attr];
					}
					var img_element_delete = jQuery("<img>",{
						id: 'delete_'+obs.id,
						src:'images/'+obs.type+''+valueattr_obsel_selection+'.png',
					});
			         var img_element_replace = jQuery("<img>",{
						id: 'replace_'+obs.id,
						src:'images/'+obs.type+''+valueattr_obsel_selection+'.png',
					});
					   $("#img_replace").append(img_element_replace);
					   $("#img_delete").append(img_element_delete);
				   //<<
			});
			
			obsel_selector.addEventListener('selection:remove', function(e) {
				if(obsel_selector.is_empty()) {
					$("#delete-obs").prop("disabled",true);
					$("#modify-obs").prop("disabled",true);
				}
				var obs = e.data;
				 $('#__OBSEL__'+obs.id).remove();
				 $('#replace_'+obs.id).remove();
				 $('#delete_'+obs.id).remove();
			});
			
			obsel_selector.addEventListener('selection:empty', function() {
					$("#delete-obs").prop("disabled",true);
					$("#modify-obs").prop("disabled",true);
				 visu.svg.selectAll('polygon').remove();
			});
			
			tw2.addEventListener('tw:update',function() {
				function update_points(p) {
					var id = $(p).attr('id');
					var obs = trace_Transformation.getObsel(id.substr(9));
					var x = visu.options.x(obs);
					return String.concat(x+3,",10,",x+8,",15,",x+13,",10");
				}
				$('polygon').each(function(i,p) {
				console.log(p);
					$(p).attr('points',update_points(p));
				})
			});
			
			
			//Crud Trace
			 var i=0;
			 var Transformation_Interaction=[];
			 var date = date_heure();
			 var texte = "";
		    
			//>>suggestion delete
			$("#delete-obs").click(function() { 
				i++;
				var img="";
				var attr_obsel_selection =[];
				var obsels_source_delete = [];
				
			if($('#activer_suggestion').is(':checked')!=true)	
			 {
			 obsel_selector.selection.forEach(function(obs) {
					obsels_source_delete.push({
						idObs : obs.id,
						timestamp : obs.timestamp,
						type : obs.type,
						attributes : obs.attributes ,							
					});	
							trace_Transformation.removeObsel(obs);
					        obsel_selector.unselect(obs);
				});
				Transformation_Interaction.push({
					id_interaction : i,
					date : date,
					evt : "trace:remove:obsel" ,
					obsels_source : obsels_source_delete				
				}); // TODO implémenter un get_selection
				obsel_selector.empty();
				texte = JSON.stringify(Transformation_Interaction);
			    document.getElementById('historique').value=texte;
			  }
			 
			  else{	
				obsel_selector.selection.forEach(function(obs) {
					obsels_source_delete.push({
						idObs : obs.id,
						timestamp : obs.timestamp,
						type : obs.type,
						attributes : obs.attributes ,							
					});	
					
			       //dialog
					 var valueattr_obsel_selection="";
					 for(var attr in obs.attributes)
					   {
						  valueattr_obsel_selection+= ' '+obs.attributes[attr];
						 if(jQuery.inArray(attr,attr_obsel_selection)==-1)
							{
							   attr_obsel_selection.push(attr);
							}
					    }
					  img +='<img src="images/'+obs.type+''+valueattr_obsel_selection+'.png"/>' ;
					 
				    })	 
				     $("#dialog").html('Voulez vous supprimer cet(s) obsel uniquement ?'+img);
					 $( "#dialog" ).dialog({
					  height:480,
					  width:480,
					  draggable: true,
					  resizable: true,
					  position: ["center",500] ,
					  show: {
						effect: "blind",
						duration: 800
						},
					  hide: {
						effect: "slide",
						duration: 500
						},
					 
					  buttons: {
						 
						 "Oui": function() {
						    
							     obsel_selector.selection.forEach(function(obs) {
				
								    trace_Transformation.removeObsel(obs);
									obsel_selector.unselect(obs);
								 });
								 obsel_selector.empty();
								 Transformation_Interaction.push({
									id_interaction : i,
									date : date,
									evt : "trace:remove:obsel" ,
									obsels_source : obsels_source_delete				
								}); // TODO implémenter un get_selection
							   texte = JSON.stringify(Transformation_Interaction);
							   document.getElementById('historique').value=texte;
							
							   $(this).dialog('close');	
						   },
						  "Non": function() {
						    
						     $(this).html('Voulez vous supprimer tous les obsels de type ?');
							 var div_element = jQuery("<div>",{
						      id: 'div_type' });	
						     
								$('#add_type > option' ).each(function() {
								    var checked=false;
									if($(this).attr("Id")!='vide')
									 {
									  var type=$(this).attr("Id");

									  obsels_source_delete.forEach(function(o) {
									
										  if(type==o.type)
											{
											  checked=true;
											} 							  
										});	
										$('<input>', {
											id: $(this).attr("Id"),
											type: "checkbox" ,
											checked: checked,
										}).appendTo(div_element);
										$('<label>', {
											id: 'lab'+$(this).attr("Id"),
											value:$(this).attr("Id"),
										}).html($(this).attr("Id")).appendTo(div_element);
										
										(div_element).append('<br><br>&emsp;les attributs: ');
										$('#dialog').append(div_element);
									    list_attributesvalue(trace,'div_type',type,"ul_suggestion","select_suggestion");
								    }	
										
								 });		
                               
							 //suppression après suggestion oui/non
							 $(this).dialog({
							  buttons: {
								  "Oui": function() { 
								   var cpt_attr_obsel=0;
								   var bool_valid_value=true;
								   var cpt_attr_model=0;
								   var obsels_source_delete=[];
								    trace_Transformation.traceSet.forEach(function(o){  
										$('#div_type > input:checked').each(function() {
										  if(o.type==$(this).attr("Id"))
											{
											  $('#ul_suggestion'+o.type+'> li').each(function() {
													cpt_attr_model++;
													for(var attr in o.attributes)
													{
													   if($(this).attr("Id")=='li'+attr)
														{
															if($('#select_suggestion'+o.type+attr).val()!='empty')
															{
															  var value_attr = $('#select_suggestion'+o.type+attr).val();
															}
															else
															{
															 var value_attr = o.attributes[attr];
															}
														  
														   cpt_attr_obsel++;
														   if (value_attr != o.attributes[attr]) 
															{
															  bool_valid_value=false;
															}
														}	
													}
													if(cpt_attr_model != cpt_attr_obsel)
													{
														var att=$(this).attr("Id").substr(2);
														if($('#select_suggestion'+o.type+att).val()=='empty')
														{
														   cpt_attr_model--;
														}
														else
														{
														   bool_valid_value=false;
														}
													}

												});
											
												if(bool_valid_value==true && cpt_attr_obsel==cpt_attr_model)
												  {
													obsels_source_delete.push({
														idObs : o.id,
														timestamp : o.timestamp,
														type : o.type,
														attributes : o.attributes ,							
													});	
													trace_Transformation.removeObsel(o);	 
												}	
												 bool_valid_value=true;
												 cpt_attr_obsel=0;
												 cpt_attr_model=0;
											}
									    });
                                     									
								    });
									
									//supprimer les obsels selectionné lore de la suggestion
									obsel_selector.selection.forEach(function(obs) {
				                       obsels_source_delete.forEach(function(o){
									     if(o.idObs!=obs.id)
										    {
								              trace_Transformation.removeObsel(obs);
											  obsel_selector.unselect(obs);
										    }
									   })
								    });
									 
									obsel_selector.empty(); 
									Transformation_Interaction.push({
										id_interaction : i,
										date : date,
										evt : "trace:remove:obsel" ,
										obsels_source : obsels_source_delete				
									}); // TODO implémenter un get_selection
									texte = JSON.stringify(Transformation_Interaction);
									document.getElementById('historique').value=texte;
									$(this).dialog('close');
								},
							   "Non": function() {
							     $(this).dialog('close');
															  
							    }
							   }
							});
							 
						}
					}
				});
	
			} 
		});	
		
		//>>add obsel 
		$("#add-obs").click(function() {
		  i++;
		  var obsels_source_add=[] ;
		  var attributes = {};
		  var type = $('#add_type').val();
		  var time = $('#add_TimeStamp').val();
		  if(controle_champsobligatoire("add_type")==false)
			{
			   return false;
			}
			else
			{
				$('#attrs > ul > li > label').each(function() {
				   if($('#select_interaction_add'+$('#add_type').val()+$(this).attr("Id")).val()!='empty')
					{
					 attributes[$(this).attr("Id")]=$('#select_interaction_add'+$('#add_type').val()+$(this).attr("Id")).val();
					}
				});

			   trace_Transformation.newObsel(type,time,attributes);	
			   obsels_source_add.push({
					idObs : 0,//getid
					timestamp : time,
					type : type,
					attributes : attributes 
					});
			   Transformation_Interaction.push({
					id_interaction : i,
					date : date,
					evt : "trace:create:obsel" ,
					obsels_source : obsels_source_add				
				   });
				   
				 texte = JSON.stringify(Transformation_Interaction);
				 document.getElementById('historique').value=texte ;
				
			}	 
		});
		//<<		
			
		//>>suggestion replace
		$("#modify-obs").click(function() { 
			i++;
			var img="";
			var valueattr_new_obsel="";
			var attr_obsel_selection =[];
			var obsels_source_modify=[] ;
			var obsels_source_transformer=[];
			var attributes = {};
			var type = $('#replace_type').val();
		    var time = $('#replace_TimeStamp').val();
			var valueattr_new_obsel="";
				
			if(controle_champsobligatoire('replace_type')==false)
			{
			   return false;
			}
			else
			{
				
				$('#attrs_replace > ul > li > label').each(function() {
				    if($('#select_interaction_replace'+$('#replace_type').val()+$(this).attr("Id")).val()!='empty')
					{
						attributes[$(this).attr("Id")]=$('#select_interaction_replace'+$('#replace_type').val()+$(this).attr("Id")).val();
						valueattr_new_obsel+=' '+$('#select_interaction_replace'+$('#replace_type').val()+$(this).attr("Id")).val();
					}
				});
				
					
			       if($('#activer_suggestion').is(':checked')!=true)
					{
						 obsel_selector.selection.forEach(function(obs) {
						
								obsels_source_modify.push({
									idObs : obs.id,
									timestamp : obs.timestamp,
									type : obs.type,
									attributes : obs.attributes ,
								  
								});
							 trace_Transformation.removeObsel(obs);
							 obsel_selector.unselect(obs);
							 //obsel_selector.select(new_obs);
							});
							
							if(time=="") 
							{					
							   obsels_source_modify.forEach(function(obsel){
							   trace_Transformation.newObsel(type,obsel.timestamp,attributes);
								obsels_source_transformer.push({
									timestamp_Tran : obsel.timestamp,
									type_Tran : type,
									attributes_Tran : attributes, 
								});
							 });
							
							}
							else
							{
							  trace_Transformation.newObsel(type,time,attributes);
							
							 obsels_source_transformer.push({
								timestamp_Tran : time,
								type_Tran : type,
								attributes_Tran : attributes, 
							 });
							}
							Transformation_Interaction.push({
								id_interaction : i,
								date : date,
								evt : "trace:update:obsel" ,
								obsels_source : obsels_source_modify,
								obsels_Transformer : obsels_source_transformer				
							});   
						 texte = JSON.stringify(Transformation_Interaction);
						 document.getElementById('historique').value=texte ;
						 $('#replace_TimeStamp').val("");
					}
						
				 else{	
						var obsel_id=[];
						trace_Transformation.traceSet.forEach(function(o){ 
						 obsel_id.push(o.id);
						});
						 
						 obsel_selector.selection.forEach(function(obs) {
						 obsels_source_modify.push({
							idObs : obs.id,
							timestamp : obs.timestamp,
							type : obs.type,
							attributes : obs.attributes ,
						});
						//dialog
						 var valueattr_obsel_selection="";
						 new_img='<img src="images/'+type+''+valueattr_new_obsel+'.png"/>' ;
						 for(var attr in obs.attributes)
						   {
							  valueattr_obsel_selection+= ' '+obs.attributes[attr];
							  
							 if(jQuery.inArray(attr,attr_obsel_selection)==-1)
								{
								   attr_obsel_selection.push(attr);
								}
							}
						 img +='<img src="images/'+obs.type+''+valueattr_obsel_selection+'.png"/>' ;
						 
						  
						});	  
						 $("#dialog").html('Voulez vous transformer cet(s) obsel uniquement<br>&emsp;'+img+"<br>en :<br>&emsp;"+new_img+"<br>?");
						 $( "#dialog" ).dialog({
						  height:480,
						  width:480,
						  draggable: true,
						  resizable: true,
						  position: ["center",500] ,
						   show: {
							effect: "blind",
							duration: 800
							},
						  hide: {
							effect: "slide",
							duration: 500
							},
						  buttons: {
							 
							 "Oui": function() {
								
									 obsel_selector.selection.forEach(function(obs) {
					
										 trace_Transformation.removeObsel(obs);
										 obsel_selector.unselect(obs);
										});
									     obsel_selector.empty(); 
									if(time=="")
									{					
									   obsels_source_modify.forEach(function(obsel){
									   trace_Transformation.newObsel(type,obsel.timestamp,attributes);
										obsels_source_transformer.push({
											timestamp_Tran : obsel.timestamp,
											type_Tran : type,
											attributes_Tran : attributes, 
										});
									 });
									
									}
									else
									{
									  trace_Transformation.newObsel(type,time,attributes);
									
									 obsels_source_transformer.push({
										timestamp_Tran : time,
										type_Tran : type,
										attributes_Tran : attributes, 
									 });
									}
									Transformation_Interaction.push({
										id_interaction : i,
										date : date,
										evt : "trace:update:obsel" ,
										obsels_source : obsels_source_modify,
										obsels_Transformer : obsels_source_transformer				
									});   
									texte = JSON.stringify(Transformation_Interaction);
									document.getElementById('historique').value=texte ;
									 $('#replace_TimeStamp').val("");
								 $(this).dialog('close');	
							   },
							    "Non": function() {
								
								 $("#dialog").html('Voulez vous remplacer chaque obsel de type ?<br>');
								 var div_element = jQuery("<div>",{
								 id: 'div_type' });	
								 $('#add_type > option' ).each(function() {
								    var checked=false;
									if($(this).attr("Id")!='vide')
									{
									  var type=$(this).attr("Id");

									  obsels_source_modify.forEach(function(o) {
									
										  if(type==o.type)
											{
											  checked=true;
											} 							  
										});	
										$('<input>', {
											id: $(this).attr("Id"),
											type: "checkbox" ,
											checked: checked,
										}).appendTo(div_element);
										$('<label>', {
											id: 'lab'+$(this).attr("Id"),
											value:$(this).attr("Id"),
										}).html($(this).attr("Id")).appendTo(div_element);
										
										(div_element).append('<br><br>&emsp;1)les attributs: ');
										$('#dialog').append(div_element);
									    list_attributesvalue(trace,'div_type',type,"ul_suggestion","select_suggestion");
								    }	
										
								});	
								   
								//>>relation entre les obsels selectionnés 
								$(this).append('<br>2)Relation entre obsel(s): ');
								$(this).append('<br><br>&emsp;<input type="radio"  name="choix" id="successive" onChange="obsel_relation()"> adjacence ');
								$(this).append('<div id=div_successive></div>');
								$(this).append('&emsp;<input type="radio"  name="choix" id="separe" onChange="obsel_separe()" > séparation ');
								//<<
								$(this).append("<br><br>par l'obsel ?"+new_img );
								 //suppression après suggestion oui/non
								 $(this).dialog({
								  buttons: {
									  "Oui": function() { 
										   var cpt_attr_obsel=0;
										   var bool_valid_value=true;
										   var cpt_attr_model=0;
										   var obsels_source_modify=[];
										   trace_Transformation.traceSet.forEach(function(o){  
												$('#div_type > input:checked').each(function() {
												  if(o.type==$(this).attr("Id"))
													{ 
														$('#ul_suggestion'+o.type+'> li').each(function() {
															cpt_attr_model++;
															for(var attr in o.attributes)
															{
															   if($(this).attr("Id")=='li'+attr)
																{
																	if($('#select_suggestion'+o.type+attr).val()!='empty')
																	{
																	  var value_attr = $('#select_suggestion'+o.type+attr).val();
																	}
																	else
																	{
																	 var value_attr = o.attributes[attr];
																	}
																  
																   cpt_attr_obsel++;
																   if (value_attr != o.attributes[attr]) 
																	{
																	  bool_valid_value=false;
																	}
																}	
															}
															if(cpt_attr_model != cpt_attr_obsel)
															{
																var att=$(this).attr("Id").substr(2);
																if($('#select_suggestion'+o.type+att).val()=='empty')
																{
																   cpt_attr_model--;
																}
																else
																{
																   bool_valid_value=false;
																}
															}

														});
														
														//relation entre les obsels
														 var bool_succ=false;
														 var bool_pred=false;
														if(document.getElementById('successive').checked==true)
														{ 
															if($('#prédécesseur'+$(this).attr("Id")).val()!="prédécesseurempty")
															{
															 var predecesseur=$('#prédécesseur'+$(this).attr("Id")).val();
															}
															else
															{
															 bool_pred=true;
															}
															if($('#successeur'+$(this).attr("Id")).val()!="successeurempty")
															{
															 var successeur=$('#successeur'+$(this).attr("Id")).val();
															}
															else
															{
															 bool_succ=true;
															}
														   for(var i=0;i<obsel_id.length;i++)
														   {
															  if(obsel_id[i]==o.id)
																{
																	trace.traceSet.forEach(function(ob){  
																	  if(obsel_id[i-1]==ob.id && predecesseur!="prédécesseurempty" && predecesseur==ob.type)
																	   {
																		 bool_pred=true;
																	   }
																	 
																	 if(obsel_id[i+1]==ob.id && successeur!="successeurempty" && successeur==ob.type)
																	   {
																		 bool_succ=true;
																	   }
																	   
																	});
																	
																}
															}
														}
														else
														{
														 bool_succ=true;
														 bool_pred=true;
														}
														//
													  if((bool_valid_value==true && cpt_attr_obsel==cpt_attr_model)&& (bool_succ==true && bool_pred==true))
													   {
															 obsels_source_modify.push({
																idObs : o.id,
																timestamp : o.timestamp,
																type : o.type,
																attributes : o.attributes ,							
															});	
															trace_Transformation.removeObsel(o);
															obsel_selector.unselect(o);
														}
														  bool_valid_value=true;										 
														  cpt_attr_obsel=0;
														  cpt_attr_model=0;
													}
												}); 
											});
											
											obsel_selector.empty(); 
									       if($('#replace_TimeStamp').val()=="")
									       {
												obsels_source_modify.forEach(function(obsel){
												 
													trace_Transformation.newObsel(type,obsel.timestamp,attributes);
													obsels_source_transformer.push({
														timestamp_Tran : obsel.timestamp,
														type_Tran : type,
														attributes_Tran : attributes, 
													});
												});
											}
                                            else
                                            {
											    trace_Transformation.newObsel(type,time,attributes);
												obsels_source_transformer.push({
													timestamp_Tran : time,
													type_Tran : type,
													attributes_Tran : attributes, 
												}); 
											}											
											Transformation_Interaction.push({
												id_interaction : i,
												date : date,
												evt : "trace:update:obsel" ,
												obsels_source : obsels_source_modify,
												obsels_Transformer : obsels_source_transformer				
											});   
											texte = JSON.stringify(Transformation_Interaction);
											document.getElementById('historique').value=texte ;
											 $('#replace_TimeStamp').val("");
											$(this).dialog('close');
										},
										
									    "Non": function() {
									     $(this).dialog('close');
																  
										}
								    }
								});
								 
							}
					    }
					});
				}
				
		    }		
		});	
        //<<
		
		    //>>change attribute/value depending on type
			$('#add_type').change( function() { 
			   var type=$('#add_type').val();
			   if(type=="")
			   {
				 $('#ul_interaction_add'+index).remove();
				 index=type;
			   }
			   else
			   {
				 $('#ul_interaction_add'+index).remove();
				 list_attributesvalue(trace,"attrs",type,"ul_interaction_add","select_interaction_add");
				 index=type;
			   }
			}); 	
			$('#replace_type').change( function() { 
			   var type=$('#replace_type').val();
			   if(type=="")
			   {
				 $('#ul_interaction_replace'+index_replace).remove();
				 index_replace=type;
			   }
			   else
			   {
				 $('#ul_interaction_replace'+index_replace).remove();
				 list_attributesvalue(trace,"attrs_replace",type,"ul_interaction_replace","select_interaction_replace");
				 index_replace=type;
			   }
			});
            //<<			
			 
	}
	
	
         //create list type/trace
         function list_typeobsel(trace,select_id)
            {
              var obsel_type=[];
                $('<option>', {
                    id: "vide",
                }).text("").appendTo('#'+select_id);
               
                trace.traceSet.forEach(function(o){
                   if(jQuery.inArray(o.type,obsel_type)==-1)
                    {
                     obsel_type.push(o.type);   
                         $('<option>', {
                            id: o.type,
                        }).text(o.type).appendTo('#'+select_id);
                   }             
                });   
                   
            } 
			
			//create listbox attributes values   
	     function list_attributesvalue(trace,div_id,select_type,ul_id,select_id)
		    {
				  var obsel_attr = [] ;
				  var obsel_value =[];
				  var obsel_type=[];
				  var obj = {};
				  var obsel_type_attr={};
				  trace.traceSet.forEach(function(o){
				  //>>type/attributes
 				  if(jQuery.inArray(o.type,obsel_type)==-1)
						 {
						   obsel_type.push(o.type);	
						   obsel_type_attr[o.type]=[];
						 }
					
					//<<
					for (var attr in o.attributes)
					{
					   if(jQuery.inArray(attr,obsel_attr)==-1)
						 {
						   obsel_attr.push(attr);
						   obj[attr] = [];
						 }
					}	
				   
				  });
				  
				   for (var type in obsel_type_attr)
				   {
				     var tab_attr=[];
				     trace.traceSet.forEach(function(o){
					
					 if(type==o.type)
					   {
						  for (var attr in o.attributes)
							{
							  if(jQuery.inArray(attr,tab_attr)==-1)
								 {
								   tab_attr.push(attr);
								   obsel_type_attr[o.type].push(attr);
								 }
							}	
                        }							
					 });
				   }
				
				  trace.traceSet.forEach(function(o){
					
					 for (var attr in o.attributes)
						{
						   
						   if(jQuery.inArray(o.attributes[attr],obsel_value)==-1)
							{
							 obsel_value.push(o.attributes[attr]); 
							 obj[attr].push(o.attributes[attr]);
							}
						}	
				   
				  });
					
			 //generate html listbox 
	          var ul_element = jQuery("<ul>",{
				     id: ul_id+select_type });
		      for(type in obsel_type_attr)
                {  		
				  if(type==select_type)
				    {
					  for(var j in obsel_type_attr[type])
				        {
						 var attr=obsel_type_attr[type][j];
						 var li_element = jQuery("<li>",{
							   id: 'li'+attr });	
							
							$('<label>', {
								id: attr,
								value:attr,
							}).html(attr+' : ').appendTo(li_element);

						   var select_element = jQuery("<select>",{
							  id: select_id+select_type+attr });
							  
								$('<option>', {
									id: "empty",
									value:"empty",
									size:1,
								}).text("").appendTo(select_element);
							 (select_element).appendTo(li_element);					   
									
							for(var k  in obj[attr])
							{
								$('<option>', {
									id: obj[attr][k],
									value:obj[attr][k],
								}).text(obj[attr][k]).appendTo(select_element);
							 (select_element).appendTo(li_element);
							}
							(ul_element).append(li_element);
							 $("#"+div_id).append(ul_element);
					    }
                      							
				    }	
				}	
		    }     
			
	
	     function obsel_relation()
			{
	         var tab=['prédécesseur','successeur'];
			 var ul_element = jQuery("<ul>",{
						id: 'ul_type'});
							 
				 $('#div_type > input:checked').each(function() {
				
				      var li_element = jQuery("<li>",{
					    id: 'li'+$(this).attr("Id") }); 
						$('<input>', {
							id: $(this).attr("Id"),
							type: "checkbox" ,
							checked:true,
						}).appendTo(li_element);
						$('<label>', {
							id: 'lab'+$(this).attr("Id"),
							value:$(this).attr("Id"),
						}).html($(this).attr("Id")+':').appendTo(li_element);
						 
						 var div_element=jQuery("<div>",{
							id: 'div'+$(this).attr("Id") });
								
						for(var i=0;i<tab.length;i++)
						    {
							  
							  var select_element = jQuery("<select>",{
								id: tab[i]+$(this).attr("Id") });
								
							    $('<label>', {
								   id: 'lab'+tab[i]+$(this).attr("Id"),
								   value:$(this).attr("Id"),
								}).html('<br>'+tab[i]+':').appendTo(li_element);
								$('<option>', {
									id:tab[i]+"empty",
									value:tab[i]+"empty",
								}).text("").appendTo(select_element);
								 (select_element).appendTo(li_element);					   
							
								$('#add_type > option' ).each(function() {
								  if($(this).attr("Id")!="vide")
								  {  
									$('<option>', {
									   id: 'op'+tab[i]+$(this).attr("Id"),
									   value:$(this).attr("Id"),
									   size:1,
									}).text($(this).attr("Id")).appendTo(select_element);
									
									(select_element).appendTo(li_element);
									 
								  }	
								
								});	
						
						    }	 
							//(div_element).appendTo(li_element);
							(ul_element).append(li_element);
						    $("#div_successive").append(ul_element);
				    });
				
			
               			
				
			}
			
	  function obsel_separe()
      {
	    $("#ul_type").remove();
	  }

	  function controle_champsobligatoire(select_id_type)
	   {
	     if($('#'+select_id_type).val()=="")
		    {
			    
				$('#'+select_id_type).css("border","1px solid #f00");
				$('#'+select_id_type).css("backgroundColor","#fba");
				$('#error_'+select_id_type).html("Vous n'avez pas spécifié le type d'obsel à créer");
				return false;
		    }
		  else
		    {
				$('#'+select_id_type).css("border","");
				$('#'+select_id_type).css("backgroundColor","");
				$('#error_'+select_id_type).html("");
				return true;
		    }
        }
	  
// calling the init function when the DOM has been loaded
window.addEventListener('DOMContentLoaded', init);