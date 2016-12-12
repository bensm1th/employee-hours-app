const moment = require('moment-timezone');
const React = require('react');
const ReactDOM = require('react-dom');


// // const d = new Date(Date.UTC(2016, 4, 27));
// // const d = moment.tz([2016, 3, 27, 9, 19], 'America/Los_Angeles').toDate();
// const before = { d: new Date() };
// const json = JSON.stringify(before);
// const after = JSON.parse(json);
// // console.log(after.d instanceof Date);//false
// // console.log(typeof after.d);//string
// after.d = new Date(after.d);
// console.log(after.d instanceof Date);//true
const d = new Date()
console.log(d);