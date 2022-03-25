// flattening operators
import { EMPTY, fromEvent, Observable, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { concatMap, map, catchError } from 'rxjs/operators';

const source$ = new Observable(subsciber => {
  setTimeout(() => {
    subsciber.next('A');
  }, 2000);
  setTimeout(() => {
    subsciber.next('B');
  }, 5000);
});

source$.pipe(concatMap(val => of(1, 2))).subscribe(val => console.log(val));

// const someButton, endpointInput;
fromEvent(someButton, 'click')
  .pipe(
    // 获取input框框的值
    map(() => endpointInput.value),
    // 优势: queue一个个值 按顺序处理 (在服务器上store some datas时候考虑), no memory leak
    // concatMap waits for previous inner subscription ends and does next
    // 如果不想等 直接用switchMap 他会直接取消之前的
    // switchMap is used to fetch some data from server 别用来store data on server
    // 用mergeMap的话 所有inner subscription都是并行的 所以最后emit的东西不保证顺序
    concatMap(value =>
      ajax(`https://random-data-api.com/api/${value}/random_${value}`).pipe(
        catchError(err => of(`Could not do, ${err} happened`))
      )
    ),
    map(res => res.response.first_name)
    // still ends the subscription 应该去ends inner subscription
    // catchError(() => of(new Error('Error!')))
  )
  .subscribe({
    next: val => console.log(val),
    // 这会直接end subscription
    error: err => console.log('Error: ', err),
    complete: () => console.log('Completed'),
  });

// concatMap -> Queues/Buffers -> order 100% safe ->
// Memory leaks easy to notice -> safest one when don't know which to chose (maybe slow)

// switchMap -> Cancels/Unsub -> Memory leaks not dangerous ->
// always emit the latest value (good for responsiveness) -> order mostly safe

// mergeMap -> Concurrent inner subs -> least safe for memory leaks ->
// No definite order

// Which notifications coming from the Inner Observable does a
// Flattening Operator pass to the output?
// Answer: next and error notifications
