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
}

function submitClient() {
	var client =  new Object();
	client.type = "client";
	client.id = gapi.auth2.getAuthInstance().currentUser.Ab.El;
	client.name = document.getElementById('name').innerHTML;
	client.image = $('#profilePic').attr('src');
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

	location.href = 'host-list.html';
}