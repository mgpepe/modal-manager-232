/* ===========================================================
 * modal-manager-232.js
 * https://github.com/mgpepe/modal-manager-232
 * ===========================================================
 * Copyright 2013 Petar Petrov, Bulgaria.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

var ModalManager = (function(){
	var title = "";
	var subtitle = "";
	var body_html = "";
	var content = "";
	var callback = null; // needs to be renamed (and all files that use it to callback_submit)
	var remote_form_url = "";
	var callback_close = null;
	var callback_open = null;
	var ok_only = null;
	var custom_button_text = null;
	var no_buttons = null;
	// Upload
	var upload_url = null;
	var upload_callback = null;
	return {
		pop_it: function (options){
			if(typeof(options)!='undefined'){
				if(typeof(options.title)!='undefined'){
					title = options.title;
				}	
				if(typeof(options.subtitle)!='undefined'){
					subtitle = options.subtitle;
				}
				if(typeof(options.body_html)!='undefined'){
					body_html = options.body_html;
				}	
				if(typeof(options.content)!='undefined'){
					content = options.content;
				}	
				if(typeof(options.callback)!='undefined'){
					callback = options.callback;
				}	
				if(typeof(options.ok_only)!='undefined'){
					ok_only = options.ok_only;
				}
				if(typeof(options.custom_button_text)!='undefined'){
					custom_button_text = options.custom_button_text;
				}
				if(typeof(options.no_buttons)!='undefined'){
					no_buttons = options.no_buttons;
				}
				if(typeof(options.callback_close)!='undefined'){
					callback_close = options.callback_close;
				}	
				if(typeof(options.callback_open)!='undefined'){
					callback_open = options.callback_open;
				}	
				if(typeof(options.remote_form_url)!='undefined'){
					remote_form_url = options.remote_form_url;
				}else{
					remote_form_url = "";
				}
				// Upload Form
				if(typeof(options.upload_url)!='undefined'){
					upload_url = options.upload_url;
				}
				if(typeof(options.upload_callback)!='undefined'){
					upload_callback = options.upload_callback;
				}
				if(typeof(options.upload_open_object)!='undefined'){
					upload_open_object = options.upload_open_object;
				}
			}
			if(upload_url){
				sv_popup.create_n_append_upload();
			}else{
				sv_popup.create_n_append();	
			}
			
		},
		create_n_append_upload:function(){
			var html='';
				html+='<div id="popup" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
					'<div class="modal-header">'+
					 	'<button id="pop-up-close" type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>'+
					 	'<div id="pop-up-title" >'+title+'</div>'+
					 	'<div id="pop-up-subtitle" >'+subtitle+'</div>'+
					 	'<div id="pop-up-header-dzhv"></div>'+
					'</div>'+
					'<div id="pre-modal-body" style="padding: 15px;">'+content+'</div>'+
					'<div class="modal-body" id="pop-up-body">';
			
					

				html+='<div id="file-upload"><form  id="popup-upload-form" method="post" action="'+upload_url+'" enctype="multipart/form-data">'+
							'<ul>'+
							'	<!-- The file uploads will be shown here -->'+
							'</ul>'+

							'<div id="pop-up-upload-drop">Довлачи тук :)<a>Browse</a>'+
							'	<input type="file" name="upl" multiple />'+
							'</div>'+

							
						'</form></div>';


					html+='</div>'+
					'<div class="modal-footer">'+
					 	'<button  id="popup-submit" type="submit"   class="btn btn-primary">Изпрати</button>'+
					 	'<button id="popup-cancel-button" class="btn" data-dismiss="modal" aria-hidden="true">Отказ</button>'+
					'</div>';
						if (remote_form_url!='')
							html+='</form>';
					html+='</div>';
				$('#modal-managed').html(html);
				// remove both buttons	
				sv_popup.custom_button_set('OK');
				// Activate uploaduplad
				if(upload_callback){
					console.log(upload_callback);
					ajax_upload.init(upload_callback);
				}
				if (remote_form_url!=''){
					$('#popup').modal({remote:remote_form_url});
					$('#popup-form').on('submit', callback)
				}else{
					$('#popup').modal();
					$('#popup-submit').on('click', callback);
				}
		},
		// upload_execute_callback:function(callback, param){
		// 	callback(param);
		// },
		create_n_append:function (){
			if(title!="" || content!="" || remote_form_url!=""){
				var html=''+
				'<div id="popup" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
					'<div class="modal-header">'+
					 	'<button id="pop-up-close" type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>'+
					 	'<div id="pop-up-title" class="h1">'+title+'</div>'+
					 	'<div id="pop-up-subtitle" >'+subtitle+'</div>'+
					 	'<div id="pop-up-header-dzhv"></div>'+
					'</div>';
					if (remote_form_url!='')
						html+='<form id="popup-form" action="" method="POST" style="margin:0" enctype="multipart/form-data">';
					html+='<div id="pre-modal-body" style="padding: 15px;">'+content+'</div>'+
					'<div class="modal-body" id="pop-up-body">'+body_html+
					'</div>'+
					'<div class="clear"></div>'+
					'<div class="modal-footer">'+
					 	'<button  id="popup-submit" type="submit"   class="btn btn-sv">Давай</button>'+
					 	'<button id="popup-cancel-button" class="btn" data-dismiss="modal" aria-hidden="true">Отказ</button>'+
					'</div>';
						if (remote_form_url!='')
							html+='</form>';
					html+='</div>';
				$('#popup-modal').html(html);
				if(ok_only){
					sv_popup.custom_button_set('OK');
				}
				if(custom_button_text){ sv_popup.custom_button_set(custom_button_text) }
				if(no_buttons){
					$('#popup-submit').hide();
					$('#popup-cancel-button').hide();
				}
				if(callback_open){
					callback_open();
				}
				if (remote_form_url!=''){
					$('#popup').modal({remote:remote_form_url});
					$('#popup-form').on('submit', callback)
				}else{
					$('#popup').modal();
					$('#popup-submit').on('click', callback);
				}
				if (callback_close){
					$('#popup').on('hidden', function () {
					    callback_close();
					})
				}

				
			}
		},
		close_it:function(callback){
			$('#popup').on('hidden', callback);
			$('#popup').modal('hide');
		},
		set_callback_close:function(callback){
			callback_close = callback;
		},
		get_callback_close:function(){
			return callback_close;
		},
		remove_form_add_html:function(html){
			$('#pre-modal-body').remove();
			$('#pop-up-body').appendTo('#popup');
			$('#pop-up-body').html(html);
			$('.modal-footer').appendTo('#popup');
			$('#popup-form').remove();
		},
		custom_button_set:function(string){
			$('#popup-cancel-button').addClass('btn-sv');
			$('#popup-cancel-button').text(string);
			$('#popup-submit').hide();
		}

	}

}());

