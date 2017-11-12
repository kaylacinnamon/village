window.onload = function() {
	$.ajax({
		type: "post",
		url: "http://localhost:3000/host-list",
		contentType: 'application/json',
		complete: function(data) {
			populateList(data.responseText);
		}
	});
}

function populateList(data) {
	var myArray = JSON.parse(data);
	for (var i = 0; i < myArray.length; ++i) {
		var obj = JSON.parse(myArray[i]);
		if (obj.type == "host") {
			if (typeof obj.squareCash != 'undefined') {
				var servicesString = '';
				for (var j = 0; j < obj.services.length - 1; ++j) {
					servicesString += obj.services[j] + ', ';
				}
				servicesString += obj.services[j];
				document.getElementById('host-list').innerHTML += `
				<li class="list-group-item">
				<div class="profile_item row">
		  	<div class="col-xs-4"><img src="` + obj.image + `" class="img-circle" alt="` + obj.name + `"></div>
		    

		    <div class="col-xs-8"><h4 class="card-title">` + obj.name + `</h4>
				 	<p class="card-text">` + servicesString + `
				    </p>
				    <button type="button" class="btn btn-success" 
				    	onclick="window.open('https://mail.google.com/mail/?view=cm&fs=1&to=` + obj.email + `&su=Village Request',
				    	 '_blank', 'toolbar=yes, scrollbars=yes, resizable=yes, width=700, height=500');">Request</button>
					<button type="button" class="btn btn-success" 
				    	onclick="window.open('` + obj.squareCash + `', '_blank', 'toolbar=yes, scrollbars=yes, resizable=yes, width=700, height=500');">$</button>
				  </div>
				</li>
			`;
			} else {
				var servicesString = '';
				for (var j = 0; j < obj.services.length - 1; ++j) {
					servicesString += obj.services[j] + ', ';
				}
				servicesString += obj.services[j];
				document.getElementById('host-list').innerHTML += `
				<li class="list-group-item">
				<div class="profile_item row">
		  	<div class="col-xs-4"><img src="` + obj.image + `" class="img-circle" alt="` + obj.name + `"></div>
		    

		    <div class="col-xs-8"><h4 class="card-title">` + obj.name + `</h4>
				 	<p class="card-text">` + servicesString + `
				    </p>
				    <button type="button" class="btn btn-success" 
				    	onclick="window.open('https://mail.google.com/mail/?view=cm&fs=1&to=` + obj.email + `&su=Village Request',
				    	 '_blank', 'toolbar=yes, scrollbars=yes, resizable=yes, width=700, height=500');">Request</button>
				  </div>
				</li>
			`;
			}
		}

		
	}
}