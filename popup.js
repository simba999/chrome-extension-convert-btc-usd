var totalPrice = parseFloat(document.getElementById('totalValue').innerText) || 0;
// Create DOM elements for adding BTC values to popup
function addValuesToDom(data) {
	const _data = JSON.parse(data);
	const btcDomElements = document.getElementById('btcValues');
	let element = document.createElement('input');
	element.className="value-item"

	if (_data.type === 'add') {
		totalPrice += parseFloat(_data.value);
		element.value = _data.value;
	} else {
		totalPrice -= parseFloat(_data.value);
		element.value = '-' + _data.value;
	}

	btcDomElements.appendChild(element);


	document.getElementById('totalValue').innerText = 'USD ' + totalPrice;
	
	// convert usd to btc
	var usdValueElement = document.getElementById('totalUSDValue');
	var price = totalPrice || 0;

	const fetchOptions = {
		method: 'get'
	}

	// fetch(`https://tranquil-sierra-98398.herokuapp.com/getBTC/${totalPrice}`, fetchOptions)
	// 	.then(function(res) {
	// 		// usdValueElement.innerText = res;
	// 		res.json().then((text) => {
	// 			usdValueElement.innerText = text.value;
	// 		})
	// 	})
}

var port = chrome.extension.connect({
    name: "Sample Communication"
});
port.postMessage("Hi BackGround");
port.onMessage.addListener(function(msg) {
    addValuesToDom(msg)
});

// convert usd to btc
var convertElement = document.getElementById("convert");

convertElement.onclick = function(element) {
	var totalValueElement = document.getElementById('totalValue');
	var usdValueElement = document.getElementById('totalUSDValue');
	var price = totalValueElement.innerText || 0;

	const fetchOptions = {
		method: 'get'
	}

	fetch(`https://tranquil-sierra-98398.herokuapp.com/getBTC/1.5`, fetchOptions)
		.then(function(res) {
			// usdValueElement.innerText = res;
			res.json().then((text) => {
				usdValueElement.innerText = text.value;
			})
		})
}