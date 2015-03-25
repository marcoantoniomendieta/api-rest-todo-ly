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

var item = {
	"Content": "TestItem"
};

var itemChecked = {
	"Checked": true
};

var itemId;

frisby.create('Create inbox item')
	.post('https://todo.ly/api/items.json', item, {json: true})
	.inspectJSON()
	.expectJSON(item)
	.afterJSON(function(itemResponseData){
		itemId = itemResponseData.Id;
		frisby.create('Update inbox item')
			.put('https://todo.ly/api/items/' + itemId + '.json', itemChecked, {json: true})
			.inspectJSON()
			.expectJSON(itemChecked)
			//.afterJSON(function(itemResponseData){
			//	itemId = itemResponseData.Id;		
			//})
			.toss();
	})
	.toss();




var project = {
	"Content": "TestProject"
};

frisby.create('Create project')
	.post('https://todo.ly/api/projects.json', project, {json: true})
	.inspectJSON()
	.expectJSON(project)
	.expectJSONTypes({
		Id: Number
	})
	.afterJSON(function(json){
		//console.log(body);
		//var json = JSON.parse(body);
		var newProjectId = json.Id;
		console.log('NEW PROJECT ID:', newProjectId);
		
		var updateProjectInfo = {
			"Content": "TestProjectUpdated"
		};

		frisby.create('Update project')
			.put('https://todo.ly/api/projects/' + newProjectId + '.json', updateProjectInfo, {json: true})
			.expectJSON(updateProjectInfo)
			.afterJSON(function(json){
			
				frisby.create('Delete project')
					.delete('https://todo.ly/api/projects/' + newProjectId + '.json', {}, {json: true})
					.expectJSON({
						Deleted: true
					})
				.toss();
			})
		.toss();
		
	})
.toss();



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