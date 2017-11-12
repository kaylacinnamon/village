window.onload = function() {
	var auth2 = gapi.auth2.getAuthInstance();
	if (auth2.isSignedIn.get()) {
		console.log('signed in');
		document.getElementById('signIn').style.display = "none";
	}
	else {
		console.log('signed out');
		document.getElementById('signIn').style.display = "block";
		document.getElementById('signOut').style.display = "none";
		document.getElementById('profileImage').style.display = "none";
		document.getElementById('name').style.display = "none";
		document.getElementById('hostForm').style.display = "none";
		document.getElementById('phoneForm').style.display = "none";
		document.getElementById('submitButton').style.display = "none";
	}
}
function onSignIn(googleUser) {
	var profile = googleUser.getBasicProfile();
	console.log('ID: ' + profile.getId());
	console.log('Name: ' + profile.getGivenName());
	console.log('Image URL: ' + profile.getImageUrl());
	console.log('Email: ' + profile.getEmail());

	insertProfileInfo(profile.getGivenName(), profile.getImageUrl());
	document.getElementById('signIn').style.display = "none";
	document.getElementById('signOut').style.display = "block";
	document.getElementById('profileImage').style.display = "block";
	document.getElementById('name').style.display = "block";
	document.getElementById('hostForm').style.display = "block";
	document.getElementById('phoneForm').style.display = "block";
	document.getElementById('submitButton').style.display = "block";
}

function signOut() {
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.disconnect();
	auth2.signOut().then(function() {
		console.log('User signed out.');
	});
	document.getElementById('signIn').style.display = "block";
	document.getElementById('signOut').style.display = "none";
	document.getElementById('profileImage').style.display = "none";
	document.getElementById('name').style.display = "none";
	document.getElementById('hostForm').style.display = "none";
	document.getElementById('phoneForm').style.display = "none";
	document.getElementById('submitButton').style.display = "none";
}

function insertProfileInfo(name, picture) {
	document.getElementById('profileImage').innerHTML = 
		'<img src="' + picture + '" class="img-circle" id="profilePic" alt="' + name + '">'
	document.getElementById('name').innerHTML = name;
	$.ajax({
		type: "post",
		url: "http://localhost:3000/existing-client",
		contentType: 'application/json',
		complete: function(data) {
			existingClient(data.responseText);
		}
	});
}

function existingClient(data) {
	var myId = gapi.auth2.getAuthInstance().currentUser.Ab.El;
	var myArray = JSON.parse(data);
	for (var i = 0; i < myArray.length; ++i) {
		var obj = JSON.parse(myArray[i]);
		if (obj.id == myId && obj.type == 'client') {
			document.getElementById('phone').value = obj.phone;
			for (var j = 0; j < obj.services.length; ++j) {
				if (obj.services[j] == 'water') {
					document.getElementById("water").checked = true;
				}
				if (obj.services[j] == 'food') {
					document.getElementById("food").checked = true;
				}
				if (obj.services[j] == 'electricity') {
					document.getElementById("electricity").checked = true;
				}
				if (obj.services[j] == 'shower') {
					document.getElementById("shower").checked = true;
				}
				if (obj.services[j] == 'heat') {
					document.getElementById("heat").checked = true;
				}
				if (obj.services[j] == 'wifi') {
					document.getElementById("wifi").checked = true;
				}
				if (obj.services[j] == 'laundry') {
					document.getElementById("laundry").checked = true;
				}
				if (obj.services[j] == 'shelter') {
					document.getElementById("shelter").checked = true;
				}
			}
			break;
		}
	}
}

function submitClient() {
	$.ajax({
		type: "post",
		url: "http://localhost:3000/edit-client",
		contentType: 'application/json',
		complete: function(data) {
			editClient(data.responseText);
		}
	});
}

function editClient(data) {
	var myId = gapi.auth2.getAuthInstance().currentUser.Ab.El;
	var myArray = JSON.parse(data);
	var client =  new Object();
	var found = false;
	for (var i = 0; i < myArray.length; ++i) {
		var obj = JSON.parse(myArray[i]);
		if (obj.id == myId && obj.type == 'client') {
			found = true;
			client.id = obj.id;
			client.phone = document.getElementById('phone').value;
			var services = [];

			if (document.getElementById('water').checked) {
				services.push('water');
			}
			if (document.getElementById('food').checked) {
				services.push('food');
			}
			if (document.getElementById('electricity').checked) {
				services.push('electricity');
			}
			if (document.getElementById('shower').checked) {
				services.push('shower');
			}
			if (document.getElementById('shelter').checked) {
				services.push('shelter');
			}
			if (document.getElementById('heat').checked) {
				services.push('heat');
			}
			if (document.getElementById('wifi').checked) {
				services.push('wifi');
			}
			if (document.getElementById('laundry').checked) {
				services.push('laundry');
			}

			client.services = services;
			$.ajax({
				type: "put",
				url: "http://localhost:3000/update-client",
				dataType: 'json',
				data: JSON.stringify(client),
				contentType: 'application/json'
			});
			break;
		}
	}
	if (found == false) {
		client.type = "client";
		client.id = gapi.auth2.getAuthInstance().currentUser.Ab.El;
		client.name = document.getElementById('name').innerHTML;
		client.image = $('#profilePic').attr('src');
		client.phone = document.getElementById('phone').value;
		var services = [];

		if (document.getElementById('water').checked) {
			services.push('water');
		}
		if (document.getElementById('food').checked) {
			services.push('food');
		}
		if (document.getElementById('electricity').checked) {
			services.push('electricity');
		}
		if (document.getElementById('shower').checked) {
			services.push('shower');
		}
		if (document.getElementById('shelter').checked) {
			services.push('shelter');
		}
		if (document.getElementById('heat').checked) {
			services.push('heat');
		}
		if (document.getElementById('wifi').checked) {
			services.push('wifi');
		}
		if (document.getElementById('laundry').checked) {
			services.push('laundry');
		}

		client.services = services;

		$.ajax({
			type: "post",
			url: "http://localhost:3000/client",
			dataType: 'json',
			data: JSON.stringify(client),
			contentType: 'application/json'
		});
	}

	location.href = 'host-list.html';
}