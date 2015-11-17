function randomNumber(min, max) {
	return Math.floor(Math.random() * (1 + max - min) + min);
}

function Fruit(fruitName, price, img){
	this.fruitName = fruitName;
	this.price = price;
	this.avgPrice = (0).toPrecision(3);
	this.img = img;
}

function Customer(cash){
	this.cash = cash;
	this.numApples = 0;
	this.numOranges = 0;
	this.numBananas = 0;
	this.numGrapes = 0;

	// Arrays of prices of purchased fruit
	this.applePrices = [];
	this.orangePrices = [];
	this.bananaPrices = [];
	this.grapePrices = [];
}

function randomPrice() {
	//var price = randomNumber(0,9) + '.' + randomNumber(0,9) + randomNumber(0,9);
	var price = [];
	for (var i = 0; i < 3; i++) {
		price.push(randomNumber(0, 9));
	}
	price = price.join('');
	parseInt(price);
	if (price < 100) {
		price = (price / 100).toPrecision(2);
	} else{
		price = (price / 100).toPrecision(3);
	}
	if (price < 0.5) {
		//TODO: Fix recursion
		//randomPrice();
		price = 0.5;
		price = price.toPrecision(2);
		return price;
	} else {
		return price;
	}
}

function averagePrice(priceArray) {
	var total = 0;
	priceArray.forEach(function(elem){
		total += parseFloat(elem);
	});
	console.log(total);

	var average = total / priceArray.length;
	average = average.toPrecision(3);
	return average;
}

function parseCash(cash){
	if (cash > 100){
		cash = cash.toPrecision(5);
	} else if (cash < 0) {
		cash = (0).toPrecision(3);
	} else if (cash < 10){
		cash = cash.toPrecision(3);
	} else if (cash > 10){
		cash = cash.toPrecision(4);
	}
	return cash;
}

// function sellInventory(fruit, customer) {
// 	customer.cash = fruit.price * customer.numApples
// }

var apples = new Fruit('apples', randomPrice(), 'apple');
var oranges = new Fruit('oranges', randomPrice(), 'orange');
var bananas = new Fruit('bananas', randomPrice(), 'banana');
var grapes = new Fruit('grapes', randomPrice(), 'grape');

var fruitArray = [];
fruitArray.push(apples);
fruitArray.push(oranges);
fruitArray.push(bananas);
fruitArray.push(grapes);

console.log(fruitArray);

var customer = new Customer(100);


$(document).ready(function(){

	$cash = $('<p>');
	$cash.text('$' + customer.cash);

	$('.cash').append($cash);

	fruitArray.forEach(function(elem){


		var $div = $('<div class="container">');
		var $img = $('<img>');
		var $btnBuy = $('<button class="buy">');
		var $btnSell = $('<button class="sell">');
		var $price = $('<p class="price">');
		var $avgPrice = $('<p class="avgPrice">');

		$img.attr('src', 'assets/' + elem.img + '.png')
				.attr('alt', elem.fruitName);
		$btnBuy.text('Buy');
		$btnSell.text('Sell');
		$price.text('Current Price: ' + '$' + randomPrice());
		$avgPrice.text('Avg. Purchased Price ' + '$' + elem.avgPrice);

		$div.append($img).append($btnBuy).append($btnSell).append($price).append($avgPrice);

		$('.fruitBasket').append($div);
	});

	var intervalID = setInterval(function() {
		fruitArray.forEach(function(elem){
			elem.price = randomPrice();
			$('.price').text('Current Price: ' + '$' + elem.price);
		});
	},500); // 15 seconds = 15000


	setTimeout(function(){
		clearInterval(intervalID);
		customer.cash = parseFloat(customer.cash);
		customer.cash += apples.price * customer.numApples;
		customer.cash += oranges.price * customer.numOranges;
		customer.cash += bananas.price * customer.numBananas;
		customer.cash += grapes.price * customer.numGrapes;
		console.log(customer.cash);
		alert('Congratulations! You now have $' + parseCash(customer.cash));
	}, 3000); // 5 minutes = 300000

	// buy apples
	$('img[alt="apples"]').next().on('click', function(){
		customer.applePrices.push(apples.price);
		customer.numApples++;
		customer.cash -= apples.price;
		if (customer.cash > 100){
			customer.cash = customer.cash.toPrecision(5);
		} else if (customer.cash < 0) {
			customer.cash = (0).toPrecision(3);
		} else if (customer.cash < 10){
			customer.cash = customer.cash.toPrecision(3);
		} else if (customer.cash > 10){
			customer.cash = customer.cash.toPrecision(4);
		}
		$cash.text('$' + customer.cash);
		apples.avgPrice = averagePrice(customer.applePrices);
		$(this).next().next().next().text('Avg. Purchased Price ' + '$' + apples.avgPrice);
		console.log(customer.numApples);
		console.log(customer.applePrices);
		console.log(averagePrice(customer.applePrices));
		console.log(apples.avgPrice);
	});

	// sell apples
	$('img[alt="apples"]').next().next().on('click', function(){
		if (customer.numApples > 0){
			customer.applePrices.push(apples.price * -1);
			customer.numApples--;
			console.log(customer.cash);
			console.log(apples.price);
			apples.price = parseFloat(apples.price);
			console.log(typeof customer.cash);
			console.log(typeof apples.price);
			customer.cash = parseFloat(customer.cash);
			customer.cash += apples.price;
			console.log(apples.price);
			if (customer.cash > 100){
				customer.cash = customer.cash.toPrecision(5);
			} else if (customer.cash < 0) {
				customer.cash = (0).toPrecision(3);
			} else if (customer.cash < 10){
				customer.cash = customer.cash.toPrecision(3);
			} else if (customer.cash > 10){
				customer.cash = customer.cash.toPrecision(4);
			}
			$cash.text('$' + customer.cash);
			apples.avgPrice = averagePrice(customer.applePrices);
			$(this).next().next().next().text('Avg. Purchased Price ' + '$' + apples.avgPrice);
			console.log(customer.applePrices);
		} else {
			alert('You have no apples!');
		}

	});

	// buy oranges
	$('img[alt="oranges"]').next().on('click', function(){
		customer.orangePrices.push(oranges.price);
		customer.numOranges++;
		customer.cash -= oranges.price;
		if (customer.cash > 100){
			customer.cash = customer.cash.toPrecision(5);
		} else if (customer.cash < 0) {
			customer.cash = (0).toPrecision(3);
		} else if (customer.cash < 10){
			customer.cash = customer.cash.toPrecision(3);
		} else if (customer.cash > 10){
			customer.cash = customer.cash.toPrecision(4);
		}
		$cash.text('$' + customer.cash);
		oranges.avgPrice = averagePrice(customer.orangePrices);
		$(this).next().next().next().text('Avg. Purchased Price ' + '$' + oranges.avgPrice);
		console.log(customer.numOranges);
		console.log(customer.orangePrices);
		console.log(averagePrice(customer.orangePrices));
		console.log(oranges.avgPrice);
	});

	// sell oranges
	$('img[alt="oranges"]').next().next().on('click', function(){
		if (customer.numOranges > 0){
			customer.orangePrices.push(oranges.price * -1);
			customer.numOranges--;
			console.log(customer.cash);
			console.log(oranges.price);
			oranges.price = parseFloat(oranges.price);
			console.log(typeof customer.cash);
			console.log(typeof oranges.price);
			customer.cash = parseFloat(customer.cash);
			customer.cash += oranges.price;
			console.log(oranges.price);
			if (customer.cash > 100){
				customer.cash = customer.cash.toPrecision(5);
			} else if (customer.cash < 0) {
				customer.cash = (0).toPrecision(3);
			} else if (customer.cash < 10){
				customer.cash = customer.cash.toPrecision(3);
			} else if (customer.cash > 10){
				customer.cash = customer.cash.toPrecision(4);
			}
			$cash.text('$' + customer.cash);
			oranges.avgPrice = averagePrice(customer.orangePrices);
			$(this).next().next().next().text('Avg. Purchased Price ' + '$' + oranges.avgPrice);
			console.log(customer.orangePrices);
		} else {
			alert('You have no oranges!');
		}

	});

	// buy bananas
	$('img[alt="bananas"]').next().on('click', function(){
		customer.bananaPrices.push(bananas.price);
		customer.numBananas++;
		customer.cash -= bananas.price;
		if (customer.cash > 100){
			customer.cash = customer.cash.toPrecision(5);
		} else if (customer.cash < 0) {
			customer.cash = (0).toPrecision(3);
		} else if (customer.cash < 10){
			customer.cash = customer.cash.toPrecision(3);
		} else if (customer.cash > 10){
			customer.cash = customer.cash.toPrecision(4);
		}
		$cash.text('$' + customer.cash);
		bananas.avgPrice = averagePrice(customer.bananaPrices);
		$(this).next().next().next().text('Avg. Purchased Price ' + '$' + bananas.avgPrice);
		console.log(customer.numBananas);
		console.log(customer.bananaPrices);
		console.log(averagePrice(customer.bananaPrices));
		console.log(bananas.avgPrice);
	});

	// sell bananas
	$('img[alt="bananas"]').next().next().on('click', function(){
		if (customer.numBananas > 0){
			customer.bananaPrices.push(bananas.price * -1);
			customer.numBananas--;
			console.log(customer.cash);
			console.log(bananas.price);
			bananas.price = parseFloat(bananas.price);
			console.log(typeof customer.cash);
			console.log(typeof bananas.price);
			customer.cash = parseFloat(customer.cash);
			customer.cash += bananas.price;
			console.log(bananas.price);
			if (customer.cash > 100){
				customer.cash = customer.cash.toPrecision(5);
			} else if (customer.cash < 0) {
				customer.cash = (0).toPrecision(3);
			} else if (customer.cash < 10){
				customer.cash = customer.cash.toPrecision(3);
			} else if (customer.cash > 10){
				customer.cash = customer.cash.toPrecision(4);
			}
			$cash.text('$' + customer.cash);
			bananas.avgPrice = averagePrice(customer.bananaPrices);
			$(this).next().next().next().text('Avg. Purchased Price ' + '$' + bananas.avgPrice);
			console.log(customer.bananaPrices);
		} else {
			alert('Yes, you have no bananas!');
		}

	});

	// buy grapes
	$('img[alt="grapes"]').next().on('click', function(){
		customer.grapePrices.push(grapes.price);
		customer.numGrapes++;
		customer.cash -= grapes.price;
		if (customer.cash > 100){
			customer.cash = customer.cash.toPrecision(5);
		} else if (customer.cash < 0) {
			customer.cash = (0).toPrecision(3);
		} else if (customer.cash < 10){
			customer.cash = customer.cash.toPrecision(3);
		} else if (customer.cash > 10){
			customer.cash = customer.cash.toPrecision(4);
		}
		$cash.text('$' + customer.cash);
		grapes.avgPrice = averagePrice(customer.grapePrices);
		$(this).next().next().next().text('Avg. Purchased Price ' + '$' + grapes.avgPrice);
		console.log(customer.numGrapes);
		console.log(customer.grapePrices);
		console.log(averagePrice(customer.grapePrices));
		console.log(grapes.avgPrice);
	});

	// sell grapes
	$('img[alt="grapes"]').next().next().on('click', function(){
		if (customer.numGrapes > 0){
			customer.grapePrices.push(grapes.price * -1);
			customer.numGrapes--;
			console.log(customer.cash);
			console.log(grapes.price);
			grapes.price = parseFloat(grapes.price);
			console.log(typeof customer.cash);
			console.log(typeof grapes.price);
			customer.cash = parseFloat(customer.cash);
			customer.cash += grapes.price;
			console.log(grapes.price);
			if (customer.cash > 100){
				customer.cash = customer.cash.toPrecision(5);
			} else if (customer.cash < 0) {
				customer.cash = (0).toPrecision(3);
			} else if (customer.cash < 10){
				customer.cash = customer.cash.toPrecision(3);
			} else if (customer.cash > 10){
				customer.cash = customer.cash.toPrecision(4);
			}
			$cash.text('$' + customer.cash);
			grapes.avgPrice = averagePrice(customer.grapePrices);
			$(this).next().next().next().text('Avg. Purchased Price ' + '$' + grapes.avgPrice);
			console.log(customer.grapePrices);
		} else {
			alert('You have no grapes!');
		}

	});
});
