// import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';

// cold observable
const ajax$ = ajax('https://random-data-api.com/api/name/random_name');

ajax$.subscribe({
  next: data => console.log(data.response.first_name),
});

ajax$.subscribe({
  next: data => console.log(data.response.first_name),
});

ajax$.subscribe({
  next: data => console.log(data.response.first_name),
});

// hot observable: all subscriptions share the same source
// const helloButton = document.querySelector('button#hello');

// const helloClick$ = new Observable(subscriber => {
//   helloButton.addEventListener('click', event => {
//     subscriber.next(event);
//   });
// });

// helloClick$.subscribe(event => console.log(event.type, event.x, event.y));

// helloClick$.subscribe(event => console.log(event.type, event.x, event.y));

// helloClick$.subscribe(event => console.log(event.type, event.x, event.y));
