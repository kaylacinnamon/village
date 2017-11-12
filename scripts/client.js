function onSignIn(googleUser) {
	var profile = googleUser.getBasicProfile();
	console.log('ID: ' + profile.getId());
	console.log('Name: ' + profile.getGivenName());
	console.log('Image URL: ' + profile.getImageUrl());
	console.log('Email: ' + profile.getEmail());

	insertProfileInfo(profile.getGivenName(), profile.getImageUrl());
}

function signOut() {
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.disconnect();
	auth2.signOut().then(function() {
		console.log('User signed out.');
	});
}

function insertProfileInfo(name, picture) {
	document.getElementById('profileImage').innerHTML = 
		'<img src="' + picture + '" class="img-circle" alt="' + name + '">'
	document.getElementById('name').innerHTML = name;
}

function submitClient() {
	var client =  new Object();
	client.type = "client";
	client.id = gapi.auth2.getAuthInstance().currentUser.Ab.El;
	client.name = document.getElementById('name').innerHTML;
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
			contentType: 'application/json',
			success: function(data) {
			}
	});
}