//on document is loaded
$(document).ready(function() {  
	importViews(function() {
    bindEvent();
    console.log("change page");
    changeView("home");    
	});
});
