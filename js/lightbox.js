/**
 * author: Daniel Husar
 */

(function (window, document, $, undefined) {
	'use strict';


	$.fn.extend({
		lightbox: function (options) {

			var settings = $.extend( {
				'sourceAttr' : 'href',      //source where to find the url for modal content
				'typeAttr'   : 'data-type'  //type of the content, can be image, static, ajax  (if not present it will guess)
			}, options);

		
			//main variables
			var template = '<div id="lightbox">\
												<div id="lightbox-content">\
													<img src="../img/close.png" alt="close" id="lightbox-close">\
													<div id="lightbox-data">\
														%content\
													</div>\
												</div>\
												<div id="lightbox-overlay"></div>\
											</div>',
					$lightbox,
					$lightboxContent,
					$lightboxOverlay;



			//center the content
			function centerContent() {

				$lightbox = $('#lightbox'),
				$lightboxContent = $('#lightbox-content'),
				$lightboxOverlay = $('#lightbox-overlay');
				
				var leftSpace = ( $(window).width()/2 + $lightboxContent.width()/2 < $(window).width() ) 
													? $(window).width()/2 - $lightboxContent.width()/2 - parseInt( ($('#lightbox-content').css('marginLeft') || 0).replace('px', ''))
													: 0;
				
				$lightboxContent.css('left', leftSpace )
												.css('top',        $(window).height()/7 + $(window).scrollTop())
												.css('visibility', 'visible');
				$lightboxOverlay.css('height',     $(document).height() + 'px');
			}

			//when window resize, recalculate lightbox position
			$(window).bind('resize', function(){
				setTimeout(function(){
					centerContent();
				}, 500);
			});

			//close modal when ESC pressed
			$(document).on('keydown', function(event) {
				if (event.keyCode == 27) {
					$lightbox.remove(); 
				}
			});

			//close modal on close icon and overlay clicked
			$('body').on('click', '#lightbox-overlay, #lightbox-close, .lightbox-close', function(event) {
				$lightbox.fadeOut(function(){
					$(this).remove();
				});  
				event.preventDefault();
			});


			//show lightbox
			return this.on('click', function(event){
				var $this = $(this),
						src = $this.attr(settings.sourceAttr).toLowerCase();

				//image
				if( /\.(jpg|jpeg|png|gif|bmp)$/.test(src) || $this.attr(settings.typeAttr) === 'image'){
					$(template.replace('%content', '<img src="'+src+'" alt="image" id="lightbox-image">')).appendTo('body');
					$('#lightbox-image').load(function(){
						centerContent();
					});
					
				//static content
				} else if ($(src).length !== 0 || $this.attr(settings.typeAttr) === 'static') {
					$(template.replace('%content', $(src).html())).appendTo('body');
					centerContent();
				 
				//ajax  
				} else {
					$.ajax({
						url : src,
						crossDomain : true,
						success : function (data) {
							$(template.replace('%content', data)).appendTo('body');
							centerContent();
							
						}
					})
				}
				
				event.preventDefault();
			});


		}
	});

}(this, this.document, this.jQuery));