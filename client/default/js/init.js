//on document is loaded
$(document).ready(function() {
  debugger;
	importViews(function() {
    bindEvent();
    setTimeout(function() {
      changeView("home");
    }, 100);
		
	});
});
