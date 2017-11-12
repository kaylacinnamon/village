window.onload = function() {
	$.ajax({
		type: "post",
		url: "http://localhost:3000/index",
		contentType: 'application/json',
		complete: function(data) {
			countServices(data.responseText);
		}
	});
}

function countServices(data) {
	var myArray = JSON.parse(data);
	var electricityCount = 0;
	var foodCount = 0;
	var heatCount = 0;
	var laundryCount = 0;
	var shelterCount = 0;
	var showerCount = 0;
	var waterCount = 0;
	var wifiCount = 0;
	for (var i = 0; i < myArray.length; ++i) {
		var obj = JSON.parse(myArray[i]);
		for (var j = 0; j < obj.services.length; ++j) {
			if (obj.services[j] == "electricity") {
				++electricityCount;
			}
			if (obj.services[j] == "food") {
				++foodCount;
			}
			if (obj.services[j] == "heat") {
				++heatCount;
			}
			if (obj.services[j] == "laundry") {
				++laundryCount;
			}
			if (obj.services[j] == "shelter") {
				++shelterCount;
			}
			if (obj.services[j] == "shower") {
				++showerCount;
			}
			if (obj.services[j] == "water") {
				++waterCount;
			}
			if (obj.services[j] == "wifi") {
				++wifiCount;
			}
		}
	}
	document.getElementById('electricity-count').innerHTML = electricityCount;
	document.getElementById('food-count').innerHTML = foodCount;
	document.getElementById('heat-count').innerHTML = heatCount;
	document.getElementById('laundry-count').innerHTML = laundryCount;
	document.getElementById('shelter-count').innerHTML = shelterCount;
	document.getElementById('shower-count').innerHTML = showerCount;
	document.getElementById('water-count').innerHTML = waterCount;
	document.getElementById('wifi-count').innerHTML = wifiCount;
}