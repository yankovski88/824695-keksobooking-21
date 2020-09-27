const FEATURES_HTML = [
  `popup__feature--wifi`,
  `popup__feature--dishwasher`,
  `popup__feature--parking`,
  `popup__feature--washer`,
  `popup__feature--elevator`,
  `popup__feature--conditioner`];

const a = [];
const arrOrigin = [ `w`, `q1`, `d`, `1`, `wa`, `q`];
const arr = [`q`, `w`, `d`, `wa`];
const q = [];
const w = [];
const d = [];
const wa = [];

for(let i = 0; i < arr.length; i++){
  for(let j = 0; j < arrOrigin.length; j++) {
    // console.log(arrOrigin[j]);
    if (arr[i] === arrOrigin[j]) {
      a.push(arr[i]);
    }

  }
}
for(let i = 0; i < a.length; i++){
  if (a[i] === `q`) {
    q.push(a[i]);
  }
  if (a[i] === `w`) {
    w.push(a[i]);
  }
  if (a[i] ===  `d`) {
    d.push(a[i]);
  }
  if (a[i] === `wa`) {
    wa.push(a[i]);
  }
}
console.log(wa);
const OFFER_FEATURES = [` wifi`, ` dishwasher`, ` parking`, ` washer`, ` elevator`, ` conditioner`];

function getRandomPartOfArr(arr) {
  const arrCopy = arr.slice();
  const randomNumber = getRandomInt(arrCopy.length);
  for (let i = 0; i < randomNumber; i++) {
    const randomNumberDel = getRandomInt(arrCopy.length);
    arrCopy.splice(randomNumberDel, 1);
  }
  return arrCopy;
}
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
