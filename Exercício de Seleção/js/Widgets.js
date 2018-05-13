	let newOrders = '';
	let comments = '';
	let newUsers = '';
	let pageViews = '';

fetch('http://dev.4all.com:3050/widgets')
	.then(response => response.json())
	.then(result => {
		comments =	result.comments
		newOrders = result.newOrders
		newUsers = result.newUsers
		pageViews = result.pageViews
	})
	.catch(err => {
	console.error('Fetch Error', err);
}).then(function() {

	let $ = document.querySelector.bind(document)
	$('#newOrders').innerHTML = newOrders;
	$('#comments').innerHTML = comments;
	$('#newUsers').innerHTML = newUsers;
	$('#pageViews').innerHTML = pageViews;
})

