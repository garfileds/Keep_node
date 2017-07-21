/**
 * Created by adoug on 2017/7/20.
 */

export function ch2enPokeman(attr) {
  if (!attr) return {}

  const ch2en = {
    '草': 'grass',
    '毒': 'poison'
  }

  let attr1 = ch2en[attr[0]],
    attr2 = attr.length > 1 ? ch2en[attr[1]] : attr1

  let result = {
    bgMain: `bg-${attr1}`,
    bdMain: `bd-${attr1}`,
    bglMain: `bgl-${attr1}`,
    bSlimSen: `b-${attr2}--slim`,
    bSen: `b-${attr2}`,
    bgSen: `bg-${attr2}`
  }

  if (attr.length === 1) {
    result.bSlimSen = `bd-${attr1}--slim`
    result.bSen = `bd-${attr1}`
  }

  return result
}