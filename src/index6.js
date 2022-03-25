import { from, Observable, of } from 'rxjs';

of('Alice', 'Ben', 'Charlie').subscribe({
  next: val => console.log(val),
  complete: () => console.log('Completed!'),
});
// 上下一样
// const names$ = new Observable(subscriber => {
//   subscriber.next('Alice');
//   subscriber.next('Ben');
//   subscriber.next('Charlie');
//   subscriber.complete();
// });

// names$.subscribe({
//   next: val => console.log(val),
//   complete: () => console.log('Completed!'),
// });

function ourOwnOf(...args) {
  return new Observable(subscriber => {
    for (let i = 0; i < args.length; i++) {
      subscriber.next(args[i]);
    }
    subscriber.complete();
  });
}

from(['Alice', 'Ben', 'Charlie']).subscribe({
  next: val => console.log(val),
  complete: () => console.log('Completed!'),
});

const somePromise = new Promise((resolve, reject) => {
  // resolve('Resolved!');
  reject('Rejected!');
});
const observableFromPromise$ = from(somePromise);

observableFromPromise$.subscribe({
  next: val => console.log(val),
  error: err => console.log('Error:', err),
  complete: () => console.log('Completed'),
});
