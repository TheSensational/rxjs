import { Observable } from 'rxjs';

const observable$ = new Observable(subscriber => {
  console.log('Observable executed!');
  subscriber.next('Alice');
  setTimeout(() => subscriber.next('Ben'), 2000);
  setTimeout(() => subscriber.next('Charlie'), 4000);
  // subscriber.error();
  // subscriber.complete();
});

// const observer = {
//   next: val => console.log(val),
//   error: ...,
//   complete: ...,
// };

// observable$.subscribe(observer);

// next notification only! 简写版本
// const subscription = observable$.subscribe(val => console.log(val));

// setTimeout(() => {
//   console.log('Unsbscribe!');
//   subscription.unsubscribe();
// }, 3000);
console.log('subscription 1 starts');
observable$.subscribe(val => console.log('subscription 1:', val));
// each subscription is independent execution
setTimeout(() => {
  console.log('subscription 2 starts');
  observable$.subscribe(val => console.log('subscription 2:', val));
}, 1000);
