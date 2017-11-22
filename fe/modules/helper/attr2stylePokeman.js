/**
 * Created by adoug on 2017/7/20.
 */

export function attr2stylePokeman(attr) {
  if (!attr) return {}

  let attr1 = attr[0],
    attr2 = attr.length > 1 ? attr[1] : attr1

  let result = {
    bgMain: `bg-${attr1}`,
    bdMain: `bd-${attr1}`,
    bglMain: `bgl-${attr1}`,
    bSen: `b-${attr2}`,
    bgSen: `bg-${attr2}`
  }

  if (attr.length === 1) {
    result.bSen = `bd-${attr1}`
  }

  return result
}