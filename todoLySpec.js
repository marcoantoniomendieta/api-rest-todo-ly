// Frisby test

var frisby = require('frisby');

frisby.globalSetup({
	request:{
		headers: {
			'Authorization': 'Basic bWFyY29zaXM2c3RlckBnbWFpbC5jb206NTkwODczMg=='
		},
		//proxy: 'http://172.20.240.5:8080/'
	}
});
/*
frisby.create('Get all non-deleted projects')
	.get('https://todo.ly/api/projects.json')
	.inspectJSON()
	.expectJSON('*', {
		Deleted: false
	})
	.afterJSON(function(responseData){
		// LOOP to delete all project
		for(var i = 0; i < responseData.length; i++) {
			frisby.create('Delete proect with ID:' + responseData[i].Id)
				.delete('https://todo.ly/api/projects/' + responseData[i].Id + '.json')
				.expectJSON({
					Deleted: true
				})
			.toss();
		}
	})
.toss();
*/
var newUserId;
frisby.create('Create User TODO.LY')
	.post('https://todo.ly/api/user.json', {
		"Email": "marcosis6ster@gmail.com",
		"FullName": "Joe Blow",
		"Password": "5908732"
		}, {json: true})
	.expectStatus(200)	
	.inspectJSON()
	.expectJSON({
		"Email": "marcosis6ster@gmail.com",
		"FullName": "Joe Blow"
		})
	.afterJSON(function(responseUserData){
		newUserId = responseUserData.Id;
		console.log('NEW PROJECT ID:', newUserId)
		var updateUserEmail = {
		"FullName": "Marco Mendieta"
		};

		frisby.create('Update User TODO.LY')
			.put('https://todo.ly/api/user/'+ newUserId +'.json', updateUserEmail, {json: true})
			.expectStatus(200)	
			.inspectJSON()
			.expectJSON(updateUserEmail)
			.afterJSON(function(responseUserData){
				updatedUserId = responseUserData.Id;
				frisby.create('Delete User TODO.LY')
					.delete('https://todo.ly/api/user/'+ updatedUserId +'.json', {json: true})
					.expectStatus(200)	
					.inspectJSON()
					.expectJSON(responseUserData)
					.toss();
			})
			.toss();
		
	})	
.toss();



*/