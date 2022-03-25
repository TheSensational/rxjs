import { Observable } from 'rxjs';

const observable$ = new Observable(subscriber => {
  console.log('Observable executed!');
  subscriber.next('Alice');
  subscriber.next('Ben');

  setTimeout(() => {
    subscriber.error(new Error('Failure'));
  }, 2000);

  // can't reach here because error notification ends subscription
  setTimeout(() => {
    subscriber.next('Charlie');
    subscriber.complete();
  }, 4000);

  return () => {
    // 最后执行
    // good place to do cleanup or cancellation
    console.log('Teardown');
  };
});

console.log('before subscribe');
// full observer object
observable$.subscribe({
  next: val => console.log(val),
  error: err => console.log(err.message),
  complete: () => console.log('Completed'),
});
console.log('after subscribe');
