/**
 * Created by adoug on 2017/5/15.
 */

export { isDescendant }

let isDescendant = function (parent, child) {
  let node = child.parentNode
  while (node !== null) {
    if (node === parent) {
      return true
    } else {
      node = node.parentNode
    }
  }

  return false
}

export default {
  isDescendant
}