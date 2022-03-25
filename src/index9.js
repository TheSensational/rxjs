import { forkJoin, Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';

// const randomName$ = ajax('https://random-data-api.com/api/name/random_name');

// const randomNation$ = ajax(
//   'https://random-data-api.com/api/nation/random_nation'
// );

// const randomFood$ = ajax('https://random-data-api.com/api/food/random_food');

// call multiple endpoints at the same time and wait for them all got responses
// 他等所有的请求拿到结果了 一起出结果
// forkJoin([randomName$, randomNation$, randomFood$]).subscribe(
//   ([nameAjax, nationAjax, foodAjax]) =>
//     console.log(
//       `${nameAjax.response.first_name} is from ${nationAjax.response.capital} and likes to eat ${foodAjax.response.dish}`
//     )
// );

// forkJoin error handling
const a$ = new Observable(subscriber => {
  setTimeout(() => {
    subscriber.next('A');
    subscriber.complete();
  }, 5000);
  return () => {
    console.log('A teardown');
  };
});

const b$ = new Observable(subscriber => {
  setTimeout(() => {
    subscriber.error('Failure');
  }, 3000);
  return () => {
    console.log('B teardown');
  };
});

forkJoin([a$, b$]).subscribe({
  next: val => console.log(val),
  error: err => console.log('Error', err),
});
// 3秒之后 AB都teardown

// map operator extracted the needed part of the ajax response
const randomFirstName$ = ajax(
  'https://random-data-api.com/api/name/random_name'
).pipe(map(res => res.response.first_name));

const randomcapital$ = ajax(
  'https://random-data-api.com/api/nation/random_nation'
).pipe(map(res => res.response.capital));

const randomDish$ = ajax(
  'https://random-data-api.com/api/food/random_food'
).pipe(map(res => res.response.dish));

forkJoin([randomFirstName$, randomcapital$, randomDish$]).subscribe(
  ([firstName, capital, dish]) =>
    console.log(`${firstName} is from ${capital} and likes to eat ${dish}`)
);
