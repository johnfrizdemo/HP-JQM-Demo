//on document is loaded
$(document).ready(function() {  
	importViews(function() {
    bindEvent();
    changeView("home");    
	});
});
