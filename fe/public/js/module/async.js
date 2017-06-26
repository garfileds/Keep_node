/**
 * Created by adoug on 2017/6/23.
 */

export function runQueue(queue, fn, cb) {
  const step = function (index) {
    if (index >= queue.length) {
      cb()
    } else {
      if (queue[index]) {
        fn(queue[index], (error) => {
          if (error) {
            return cb(error)
          } else {
            step(index + 1)
          }
        })
      } else {
        step(index + 1)
      }
    }
  }

  step(0)
}