

var today = "06/03/2023"
today = new Date(today.split('/')[2], today.split('/')[1] - 1, today.split('/')[0]);
var date2 = "01/11/2022"
date2 = new Date(date2.split('/')[2], date2.split('/')[1] - 1, date2.split('/')[0]);
var timeDiff = Math.abs(date2.getTime() - today.getTime());
var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
const months = Math.floor(diffDays / 30)
const remaningDays = diffDays - (months * 30)
console.log(diffDays)
console.log(months);
console.log(remaningDays);

