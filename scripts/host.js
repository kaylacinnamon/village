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

function submitHost() {
	console.log('hi');
}