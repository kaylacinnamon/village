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
			console.log(obj.squareCash);
			if (typeof obj.squareCash != 'undefined' &&  obj.squareCash != '') {
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
				    <div>


				    <button type="button" class="btn btn-info" 
				    	onclick="window.open('https://mail.google.com/mail/?view=cm&fs=1&to=` + obj.email + `&su=Village Request',
				    	 '_blank', 'toolbar=yes, scrollbars=yes, resizable=yes, width=700, height=500');">Request</button>
				   	<button onclick="increaseTU(` + obj.id + `)" type="button" class="btn btn-success" role="button" aria-disabled="true">
                        <span class="glyphicon glyphicon-thumbs-up" id="thumbsUp"> ` + obj.rating[0] + `</span>
                    	</button>

                   		 <button onclick="increaseTD(` + obj.id + `)" type="button" class="btn btn-danger" role="button" aria-disabled="true">
                        <span class="glyphicon glyphicon-thumbs-down" id="thumbsDown"> ` + obj.rating[1] + `</span>
                    	</button>
					<button type="button" class="btn btn-success" 
				    	onclick="window.open('` + obj.squareCash + `', '_blank', 'toolbar=yes, scrollbars=yes, resizable=yes, width=700, height=500');">$</button>

				    </div>

				    


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
				    <button type="button" class="btn btn-info" 
				    	onclick="window.open('https://mail.google.com/mail/?view=cm&fs=1&to=` + obj.email + `&su=Village Request',
				    	 '_blank', 'toolbar=yes, scrollbars=yes, resizable=yes, width=700, height=500');">Request</button>

				    	 <button onclick="increaseTU(` + obj.id + `)" type="button" class="btn btn-success" role="button" aria-disabled="true">
                        <span class="glyphicon glyphicon-thumbs-up" id="thumbsUp"> ` + obj.rating[0] + `</span>
                    	</button>

                   		 <button onclick="increaseTD(` + obj.id + `)" type="button" class="btn btn-danger" role="button" aria-disabled="true">
                        <span class="glyphicon glyphicon-thumbs-down" id="thumbsDown"> ` + obj.rating[1] + `</span>
                    	</button>
				  </div>
				</li>
			`;
			}
		}
	}
}

function sortAlpha() {
	// function sortList() {
	  var list, i, switching, b, shouldSwitch;
	  list = document.getElementById("host-list");
	  switching = true;
	  /* Make a loop that will continue until
	  no switching has been done: */
	  while (switching) {
	    // Start by saying: no switching is done:
	    switching = false;
	    b = list.getElementsByTagName("LI");
	    // Loop through all list items:
	    for (i = 0; i < (b.length - 1); i++) {
	      // Start by saying there should be no switching:
	      shouldSwitch = false;
	      /* Check if the next item should
	      switch place with the current item: */
	      if (b[i].getElementsByTagName("H4")[0].innerHTML.toLowerCase() > b[i+1].getElementsByTagName("H4")[0].innerHTML.toLowerCase()) {
	        /* If next item is alphabetically lower than current item,
	        mark as a switch and break the loop: */
	        shouldSwitch= true;
	        break;
	      }
	    }
	    if (shouldSwitch) {
	      /* If a switch has been marked, make the switch
	      and mark the switch as done: */
	      b[i].parentNode.insertBefore(b[i + 1], b[i]);
	      switching = true;
	    }
	  }
	// }
}

function sortPop() {
	// function sortList() {
	  var list, i, switching, b, shouldSwitch;
	  list = document.getElementById("host-list");
	  switching = true;
	  /* Make a loop that will continue until
	  no switching has been done: */
	  while (switching) {
	    // Start by saying: no switching is done:
	    switching = false;
	    b = list.getElementsByTagName("LI");
	    // Loop through all list items:
	    for (i = 0; i < (b.length - 1); i++) {
	      // Start by saying there should be no switching:
	      shouldSwitch = false;
	      /* Check if the next item should
	      switch place with the current item: */
	      var len = b[i].getElementsByTagName('BUTTON').length;
	      var len1 = b[i+1].getElementsByTagName('BUTTON').length;
	      if (Number(b[i].getElementsByTagName('BUTTON')[1].getElementsByTagName('span')[0].innerHTML) < Number(b[i+1].getElementsByTagName('BUTTON')[1].getElementsByTagName('span')[0].innerHTML)) {
	        /* If next item is alphabetically lower than current item,
	        mark as a switch and break the loop: */
	        shouldSwitch= true;
	        break;
	      }
	    }
	    if (shouldSwitch) {
	      /* If a switch has been marked, make the switch
	      and mark the switch as done: */
	      b[i].parentNode.insertBefore(b[i + 1], b[i]);
	      switching = true;
	    }
	  }
	// }
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

	location.reload();
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

	location.reload();
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