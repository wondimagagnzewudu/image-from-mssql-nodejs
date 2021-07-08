var express = require('express');
const { reach } = require('joi');
var filereader= require('filereader');
var ps = require('../model/ps');
const fs = require('fs');
 var csv = require("csvtojson");
//const Blob = require("cross-blob");
var XLSX= require('xlsx');
var FileServer = require('file-server');
var message_in_use = require('../model/message_in_use');


exports.data_recviver_ps = function async(req, res) {

     
        const reader = new filereader();
 
       
        const rABS = !!reader.readAsBinaryString;
      
        csv()
  .fromFile('/rcimage.csv')
  .then(function async(jsonArrayObj){ 
    const items=jsonArrayObj
    console.log(items[1])

for(var k=0 ;k<items.length;k++){
   if((items[k].ID)<999999999999){
var base64Data = (items[k].photo).replace(/^0x/, "");

let binary = new Array();
for (let i = 0; i < base64Data.length / 2; i++) {
    let h = base64Data.substr(i * 2, 2);
    binary[i] = parseInt(h, 16);
}

let byteArray = new Uint8Array(binary);

fs.writeFile(`controller/image/${items[k].ID}.png`,byteArray, function  async(err) {
    if (err) throw err;
        console.log('It\'s saved!');
            
});
}}
       
   })
          

};
