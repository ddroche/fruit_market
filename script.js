function randomNumber(min, max) {
	return Math.floor(Math.random() * (1 + max - min) + min);
}

function Fruit(fruitName, price, img){
	this.fruitName = fruitName;
	this.price = price;
	this.avgPrice = price;
	this.img = img;
}

function Customer(cash, numApples, numOranges, numBananas, numGrapes){
	this.cash = cash;
	this.numApples = numApples;
	this.numOranges = numOranges;
	this.numBananas = numBananas;
	this.numGrapes = numGrapes;
}

var apples = new Fruit('apples', randomNumber(0.5, 9.99), 'apple');
var oranges = new Fruit('oranges', randomNumber(0.5, 9.99), 'orange');
var bananas = new Fruit('bananas', randomNumber(0.5, 9.99), 'banana');
var grapes = new Fruit('grapes', randomNumber(0.5, 9.99), 'grape');

var fruitArray = [];
fruitArray.push(apples);
fruitArray.push(oranges);
fruitArray.push(bananas);
fruitArray.push(grapes);

var customer = new Customer(100, 0, 0, 0, 0);


$(document).ready(function(){

fruitArray.forEach(function(elem){
	var $div = $('<div class="container">');
	var $img = $('<img>');
	var $btnBuy = $('<button class="buy">');
	var $btnSell = $('<button class="sell">');
	var $price = $('<p class="price">');
	var $avgPrice = $('<p class="avgPrice">');

	$img.attr('src', elem.img + '.jpg');
	$btnBuy.text('Buy');
	$btnSell.text('Sell'); 
	$price.text('Current Price: ' + '$' + elem.price);
	$avgPrice.text('Average Price ' + '$' + elem.avgPrice);

	$div.append($img).append($btnBuy).append($btnSell).append($price).append($avgPrice);

	$('.fruitBasket').append($div);
	});

	



});