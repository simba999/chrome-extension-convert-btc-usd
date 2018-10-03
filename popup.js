// Create DOM elements for adding BTC values to popup
function addValuesToDom(data) {
	const _data = JSON.parse(data);
	const btcDomElements = document.getElementById('btcValues');

	let element = document.createElement('input');
	element.value = _data.value;
	element.className="value-item"

	btcDomElements.appendChild(element);

	var totalPrice = parseFloat(document.getElementById('totalValue').innerText) || 0;
	
	if (_data.type === 'add') {
		totalPrice += parseFloat(_data.value);
	} else {
		totalPrice -= parseFloat(_data.value);
	}

	document.getElementById('totalValue').innerText = totalPrice;
}

var port = chrome.extension.connect({
    name: "Sample Communication"
});
port.postMessage("Hi BackGround");
port.onMessage.addListener(function(msg) {
    addValuesToDom(msg)
});