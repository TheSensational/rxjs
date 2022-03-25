import { interval, of } from 'rxjs';
import {
  concatMap,
  concatWith,
  delay,
  mergeMap,
  switchMap,
  take,
} from 'rxjs/operators';

const source$ = of(2000, 1000, 3000);
// 一个一个来 等
const concatMapExample = source$
  .pipe(concatMap(val => of(`Delayed by:${val}ms`).pipe(delay(val))))
  .subscribe(item => console.log(`With ConcatMap: ${item}`));

// 并行
const mergeMapExample = source$
  .pipe(
    delay(8000),
    mergeMap(val => of(`Delayed by:${val}ms`).pipe(delay(val)))
  )
  .subscribe(item => console.log(`With MergeMap: ${item}`));

// 后一个取消前一个
const source2$ = interval(3000);
const main = source2$
  .pipe(switchMap(() => interval(500).pipe(take(10))))
  .subscribe(val => console.log(val));

concatWith(
  interval(1000).pipe(take(4)),
  interval(2000).pipe(take(4)),
  interval(3000).pipe(take(4))
).subscribe(
  value => console.log(value),
  err => {},
  () => console.log('...and it is done!')
);
