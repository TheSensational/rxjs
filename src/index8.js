import { interval, timer } from 'rxjs';

console.log('Started');

// 自己用原生构造器模拟 别忘了做cleanup
// const timer$ = new Observable(subscriber => {
//   const timeoutId = setTimeout(() => {
//     subscriber.next(0);
//     subscriber.complete();
//   }, 2000);

//   return () => {
//     clearTimeout(timeoutId);
//   };
// });

// timer$.subscribe({
//   next: val => console.log(val),
//   complete: () => console.log('completed!'),
// });

const subscription = timer(2000).subscribe({
  next: val => console.log(val),
  complete: () => console.log('completed!'),
});

setTimeout(() => {
  // 1000 < 2000 nothing happens
  subscription.unsubscribe();
}, 1000);

interval(1000).subscribe({
  next: val => console.log(val),
  complete: () => console.log('completed!'),
});
