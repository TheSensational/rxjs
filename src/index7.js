import { fromEvent } from 'rxjs';

// addEventListener was added underneath
const subscription = fromEvent(someButton, 'click').subscribe({
  next: event => console.log(event),
});

setTimeout(() => {
  console.log('Unsubscribe');
  subscription.unsubscribe();
}, 5000);

// 上下same
// const triggerClick$ = new Observable(subscriber => {
//   someButton.addEventListener('click', event => {
//     subscriber.next(event);
//   });
// });

// triggerClick$.subscribe({
//   next: event => console.log(event),
// });
