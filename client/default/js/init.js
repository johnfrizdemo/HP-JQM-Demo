//on document is loaded
$(document).ready(function() {  
	importViews(function() {
    bindEvent();
    setTimeout(function() {
      console.log("change page");
      changeView("googleMap");    
    }, 200);
	});
});
