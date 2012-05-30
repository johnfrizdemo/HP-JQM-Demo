//on document is loaded
$(document).ready(function() {  
	importViews(function() {
    bindEvent();
    setTimeout(function() {
      console.log("change page");
      changeView("home");    
    }, 2000);
	});
});
