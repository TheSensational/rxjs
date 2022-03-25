import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

new Observable(subscriber => {
  setTimeout(() => {
    subscriber.next({ category: 'Business', Content: 'A' });
  }, 1000);
  setTimeout(() => {
    subscriber.next({ category: 'Sports', Content: 'B' });
  }, 3000);
  setTimeout(() => {
    subscriber.next({ category: 'Business', Content: 'C' });
  }, 4000);
  setTimeout(() => {
    subscriber.next({ category: 'Sports', Content: 'D' });
  }, 6000);
})
  .pipe(filter(item => item.category === 'Sports'))
  .subscribe(item => console.log(item));
