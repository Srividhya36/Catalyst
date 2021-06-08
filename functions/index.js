'use strict';

var express = require('express');
var app = express();
var catalyst = require('zcatalyst-sdk-node');
app.use(express.json());

app.get('/listen', (req, res) => {
	var catalystApp = catalyst.initialize(req);
		var	max_count = 150;
		console.log("max_cnt"+max_count)
		var minimum = 1;
		var randomnumber = Math.floor(Math.random() * max_count) + 1 ;
		console.log("random"+randomnumber);
		getDatafromDS(catalystApp, randomnumber,'Phrases').then( verse =>{
			console.log(verse[0]);
			var text = verse[0];
			res.send(text);
		}).catch(err => {
    console.log(err);
    sendErrorResponse(res);
	})
	
});


function getDatafromDS(catalystApp, rno,tablename){
	return new Promise((resolve, reject) => {
	  // Queries the Catalyst Data Store table
	  catalystApp.zcql().executeZCQLQuery("Select * from "+tablename+" where "+"Pno"+"='" + rno + "'").then(queryResponse => {
	   resolve(queryResponse);
	  }).catch(err => {
	   reject(err);
	  })
	 });
}
module.exports = app;
