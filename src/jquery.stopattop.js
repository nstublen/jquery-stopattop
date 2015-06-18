/* jquery.stopattop.js

1. Layout your HTML as you normally would. You should not need any
   HTML or CSS changes for this to work.
2. Use a jQuery selector with the stopAtTop() extension and when
   the selected element(s) reach the top of the page, they will stop
   scrolling.

Example usage:

$(document).ready(function() {
  // You can stop multiple elements at the top of the page, and
  // they will just overlap one another.
  $("nav").stopAtTop();
});;

*/

(function($) {
  $.fn.stopAtTop = function() {
    // Start tracking scroll movements when we are adding the first
	// "stop-at-top" element.
    if ($(".data-stop-at-top").length === 0) {
      trackScrolling();
    }

    this.each(function() {
      var $element = $(this);
      var navTop = $element.offset().top;
      var navWidth = $element.width();
      var navHeight = $element.height();

      // Remember the nav's initial position as a reference point.
      $element.data("firstTop", navTop);

      // The <nav> needs to be a fixed-position element for this to
	  // work well, so we'll need to replace it with some placeholder
	  // content that will keep the same document flow.
      $element.after($("<div></div>").css("height", navHeight));
      $element.css({
          "position": "fixed",
          "width": navWidth
        })
        .addClass("data-stop-at-top");
    });
  }

  // Watch scrolling on the window to reposition the selected elements. 
  function trackScrolling() {
    $(window).scroll(function() {
      $(".data-stop-at-top").each(function() {
        var firstTop = $(this).data("firstTop");
        var newTop = Math.max(0, firstTop - $(window).scrollTop());
        $(this).css("top", newTop);
      });
    });
  }
})(jQuery);