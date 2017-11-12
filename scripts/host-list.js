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
				<li class="list-group-item" id="` + obj.id + `">
				<div class="profile_item row">
		  	<div class="col-xs-4 "><img src="` + obj.image + `" class="img-circle" alt="` + obj.name + `"></div>
		    

		    <div class="col-xs-8 "><h4 class="card-title">` + obj.name + `</h4>
				 	<p class="card-text">` + servicesString + `
				    </p>
				    <button type="button" class="btn btn-success" 
				    	onclick="window.open('https://mail.google.com/mail/?view=cm&fs=1&to=` + obj.email + `&su=Village Request',
				    	 '_blank', 'toolbar=yes, scrollbars=yes, resizable=yes, width=700, height=500');">Request</button>
					<button type="button" class="btn btn-success" 
				    	onclick="window.open('` + obj.squareCash + `', '_blank', 'toolbar=yes, scrollbars=yes, resizable=yes, width=700, height=500');">$</button>


				    	<button onclick="increaseTU(` + obj.id + `)" type="button" class="btn btn-success" role="button" aria-disabled="true">
                        <span class="glyphicon glyphicon-thumbs-up" id=""> ` + obj.rating[0] + `</span>
                    	</button>

                   		 <button onclick="increaseTD(` + obj.id + `)" type="button" class="btn btn-danger" role="button" aria-disabled="true">
                        <span class="glyphicon glyphicon-thumbs-down" id=""> ` + obj.rating[1] + `</span>
                    	</button>
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
				<li class="list-group-item" id="` + obj.id + `">
				<div class="profile_item row">
		  	<div class="col-xs-4"><img src="` + obj.image + `" class="img-circle" alt="` + obj.name + `"></div>
		    

		    <div class="col-xs-8"><h4 class="card-title">` + obj.name + `</h4>
				 	<p class="card-text">` + servicesString + `
				    </p>
				    <button type="button" class="btn btn-success" 
				    	onclick="window.open('https://mail.google.com/mail/?view=cm&fs=1&to=` + obj.email + `&su=Village Request',
				    	 '_blank', 'toolbar=yes, scrollbars=yes, resizable=yes, width=700, height=500');">Request</button>

				    	 <button onclick="increaseTU(` + obj.id + `)" type="button" class="btn btn-success" role="button" aria-disabled="true">
                        <span class="glyphicon glyphicon-thumbs-up" id=""> ` + obj.rating[0] + `</span>
                    	</button>

                   		 <button onclick="increaseTD(` + obj.id + `)" type="button" class="btn btn-danger" role="button" aria-disabled="true">
                        <span class="glyphicon glyphicon-thumbs-down" id=""> ` + obj.rating[1] + `</span>
                    	</button>
				  </div>
				</li>
			`;
			}
		}

		
	}
}

function increaseTU(id) {
	$.ajax({
		type: "post",
		id: id,
		url: "http://localhost:3000/thumbs-up-host",
		contentType: 'application/json',
		complete: function(data) {
			thumbsUpHost(data.responseText, this.id);
		}
	});
}

function thumbsUpHost(data, id) {
	var myArray = JSON.parse(data);
	var host = new Object();
	for (var i = 0; i < myArray.length; ++i) {
		var obj = JSON.parse(myArray[i]);
		if (obj.id == id && obj.type == 'host') {
			host.id = id;
			host.rating = obj.rating;
			host.type = obj.type;
			host.rating[0] = ++obj.rating[0];
			console.log(host.rating[0]);
			$.ajax({
				type: "put",
				url: "http://localhost:3000/update-TU-rating",
				dataType: 'json',
				data: JSON.stringify(host),
				contentType: 'application/json'
			});
			break;
		}
	}
}

function increaseTD(id) {
	$.ajax({
		type: "post",
		id: id,
		url: "http://localhost:3000/thumbs-down-host",
		contentType: 'application/json',
		complete: function(data) {
			thumbsDownHost(data.responseText, this.id);
		}
	});
}

function thumbsDownHost(data, id) {
	var myArray = JSON.parse(data);
	var host = new Object();
	for (var i = 0; i < myArray.length; ++i) {
		var obj = JSON.parse(myArray[i]);
		if (obj.id == id && obj.type == 'host') {
			host.id = id;
			host.rating = obj.rating;
			host.type = obj.type;
			host.rating[1] = ++obj.rating[1];
			console.log(host.rating[1]);
			$.ajax({
				type: "put",
				url: "http://localhost:3000/update-TD-rating",
				dataType: 'json',
				data: JSON.stringify(host),
				contentType: 'application/json'
			});
			break;
		}
	}
}