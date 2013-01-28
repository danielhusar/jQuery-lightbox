/*
$(document).ready(function() { 
var link = '../img/close.png'; 
    //select all the a tag with name equal to modal
    $('a.lightbox').click(function(e) {
       //Cancel the link behavior
       e.preventDefault();

       //check if we are loading image or html content
       var id = $(this).attr('href').toLowerCase();
       var reg = new RegExp('\.(jpg|jpeg|png|gif|bmp)$', 'i');
       var image = reg.exec(id);
       if(image)
       {
          var template = '<div id="modal"><div id="mod_cont"><img src="'+link+'" alt="close" id="mod_close"><img src="'+id+'" alt="image" id="mod_img"></div><div id="mod_mask"></div></div>';
          $('body').append(template).fadeIn();
          
          $('#mod_img').load(function() {
          	$('#mod_cont').css('top',    $(window).height()/7 + $(window).scrollTop());
          	$('#mod_cont').css('left',   $(window).width()/2-$('#mod_cont').width()/2 + $(window).scrollLeft());
          	$('#mod_mask').css('height', $(document).height()+'px');
          	//alert($('#mod_cont').width());
          });
       }
       else
       {
       $.get(id, function(data){     
          var template = '<div id="modal"><div id="mod_cont"><img src="'+link+'" alt="close" id="mod_close">'+data+'</div><div id="mod_mask"></div></div>';
          $('body').append(template).fadeIn();
          //$('#mod_cont').ready(function() {
            $('#mod_cont').css('top',    $(window).height()/5 + $(window).scrollTop());
            $('#mod_cont').css('left',   $(window).width()/2-$('#mod_cont').width()/2 + + $(window).scrollLeft());
            $('#mod_mask').css('height', $(document).height()+'px');
          // }); 
        });   
       }
    });

    $('#mod_mask, #mod_close, .mclose').live('click', function() {
      $('#modal').fadeOut(500, function(){
        $(this).remove();
      });  
    });
    
    $(document).keydown(function(e) {
    // ESCAPE key pressed
    	if (e.keyCode == 27) {
        	$('#modal').remove(); 
    	}
	});

});

*/

(function (window, document, $, undefined) {
  'use strict';


  $.fn.extend({
    lightbox: function (options) {

      var settings = $.extend( {
        'effect' : 'none',
        'attr'   : 'href'
      }, options);

    
      $(document).on('keydown', function(event) {
        if (event.keyCode == 27) {
          $('#modal').remove(); 
        }
      });

      $('body').on('click', '#mod_mask, #mod_close, .mclose', function(event) {
        $('#modal').fadeOut(function(){
          $(this).remove();
        });  
        event.preventDefault();
      });

      var template = '<div id="modal">\
                        <div id="mod_cont">\
                          <img src="../img/close.png" alt="close" id="mod_close">\
                          %content\
                        </div>\
                        <div id="mod_mask"></div>\
                      </div>';

      return this.on('click', function(event){
        var src = $(this).attr(settings.attr).toLowerCase();
        if( new RegExp('\.(jpg|jpeg|png|gif|bmp)$', 'i').exec(src) ){
          var image = '<img src="'+src+'" alt="image" id="mod_img">';
          $(template.replace('%content', image)).appendTo('body');
        }

        $('#mod_cont').fadeIn();
        $('#mod_img').load(function() {
          $('#mod_cont').css('top',    $(window).height()/7 + $(window).scrollTop());
          $('#mod_cont').css('left',   $(window).width()/2-$('#mod_cont').width()/2 + $(window).scrollLeft());
          $('#mod_mask').css('height', $(document).height()+'px');
        });
        event.preventDefault();
      });



    }
  });

}(this, this.document, this.jQuery));