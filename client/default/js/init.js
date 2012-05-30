//on document is loaded
$(document).ready(function() {  
	importViews(function() {
    bindEvent();
    setTimeout(function() {
      changeView("home");
    }, 10000);
		
	});
});
