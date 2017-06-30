/**
 * Created by adoug on 2017/6/27.
 */
export default function runQueue(queue, fn) {
  return queue.reduce((sequence, item, index) => {
    return sequence.then(fn(item, index))
  }, Promise.resolve())
}