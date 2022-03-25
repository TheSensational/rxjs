import { Observable, of, EMPTY } from 'rxjs';
import { filter, map, tap, debounceTime, catchError } from 'rxjs/operators';

of(1, 7, 3, 6, 2)
  .pipe(
    tap({ next: val => console.log('Spy every element:', val) }),
    map(val => val * 2),
    filter(val => val > 5)
  )
  .subscribe(value => console.log('Output:', value));

// 假设debounceTime(2000) 就先等2秒 如果这两秒没有新的东西emit 就正常emit
// 如果有 这个旧emit就被取消 给新的emit重新计时两秒

new Observable(subscriber => {
  setTimeout(() => {
    subscriber.error(new Error('Timeout'));
  }, 3000);
})
  //.pipe(catchError(error => of('Error!')))
  .pipe(catchError(error => EMPTY)) // 这样隐藏error 就直接让这个observable complete了
  .subscribe({
    next: val => console.log(val),
    complete: () => console.log('Completed'),
  });
