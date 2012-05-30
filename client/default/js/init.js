//on document is loaded
$(document).ready(function() {
  debugger;
	importViews(function() {
		changeView("home");
		bindEvent();
	});
});
