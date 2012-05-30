//on document is loaded
$(document).ready(function() {  
	importViews(function() {
    bindEvent();
    setTimeout(function() {
      changeView("home");
    }, 1000);
		
	});
});
