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
		'<img src="' + picture + '" class="img-circle" id="profilePic" alt="' + name + '">'
	document.getElementById('name').innerHTML = name;
}

function submitHost() {
	var host =  new Object();
	host.type = "host";
	host.id = gapi.auth2.getAuthInstance().currentUser.Ab.El;
	host.name = document.getElementById('name').innerHTML;
	host.image = $('#profilePic').attr('src');
	host.address = document.getElementById('address').value;
	host.city = document.getElementById('city').value;
	host.state = document.getElementById('state').value;
	host.zip = document.getElementById('zip').value;
	host.phone = document.getElementById('phone').value;
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

	host.services = services;

	$.ajax({
		type: "post",
		url: "http://localhost:3000/host",
		dataType: 'json',
		data: JSON.stringify(host),
		contentType: 'application/json'
	});
}