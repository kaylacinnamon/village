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
		document.getElementById('email').style.display = "none";
		document.getElementById('addressform').style.display = "none";
		document.getElementById('hostForm').style.display = "none";
		document.getElementById('phoneForm').style.display = "none";
		document.getElementById('squareCashForm').style.display = "none";
		document.getElementById('submitButton').style.display = "none";
	}
}

function onSignIn(googleUser) {
	var profile = googleUser.getBasicProfile();
	console.log('ID: ' + profile.getId());
	console.log('Name: ' + profile.getGivenName());
	console.log('Image URL: ' + profile.getImageUrl());
	console.log('Email: ' + profile.getEmail());

	insertProfileInfo(profile.getGivenName(), profile.getImageUrl(), profile.getEmail());
	document.getElementById('signIn').style.display = "none";
	document.getElementById('signOut').style.display = "block";
	document.getElementById('profileImage').style.display = "block";
	document.getElementById('name').style.display = "block";
	document.getElementById('email').style.display = "block";
	document.getElementById('addressform').style.display = "block";
	document.getElementById('hostForm').style.display = "block";
	document.getElementById('phoneForm').style.display = "block";
	document.getElementById('squareCashForm').style.display = "block";
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
	document.getElementById('email').style.display = "none";
	document.getElementById('addressform').style.display = "none";
	document.getElementById('hostForm').style.display = "none";
	document.getElementById('phoneForm').style.display = "none";
	document.getElementById('squareCashForm').style.display = "none";
	document.getElementById('submitButton').style.display = "none";
}

function insertProfileInfo(name, picture, email) {
	document.getElementById('profileImage').innerHTML = 
		'<img src="' + picture + '" class="img-circle" id="profilePic" alt="' + name + '">'
	document.getElementById('name').innerHTML = name;
	document.getElementById('email').innerHTML = email;
}

function submitHost() {
	var host =  new Object();
	host.type = "host";
	host.id = gapi.auth2.getAuthInstance().currentUser.Ab.El;
	host.name = document.getElementById('name').innerHTML;
	host.email = document.getElementById('email').innerHTML;
	host.image = $('#profilePic').attr('src');
	host.address = document.getElementById('address').value;
	host.city = document.getElementById('city').value;
	host.state = document.getElementById('state').value;
	host.zip = document.getElementById('zip').value;
	host.phone = document.getElementById('phone').value;
	host.squareCash = document.getElementById('squareCash').value;
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

	host.services = services;

	$.ajax({
		type: "post",
		url: "http://localhost:3000/host",
		dataType: 'json',
		data: JSON.stringify(host),
		contentType: 'application/json'
	});
}