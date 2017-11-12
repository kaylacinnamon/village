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
		var servicesString = '';
		for (var j = 0; j < obj.services.length - 1; ++j) {
			servicesString += obj.services[j] + ', ';
		}
		servicesString += obj.services[j];
		document.getElementById('host-list').innerHTML += `
		<div class="card">
		  <div class="card-block">
		  	<img src="` + obj.image + `" class="img-circle" alt="` + obj.name + `">
		    <h4 class="card-title">` + obj.name + `</h4>
		 	<p class="card-text">` + servicesString + `
		    </p>
		    <button type="button" class="btn btn-success" onclick="request()">Request</button>
		  </div>
		</div>
	`;
	}
}