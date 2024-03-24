export function currency(num) {
  const n = parseInt(num, 10);
  return `${n.toFixed(0).replace(/./g, (c, i, a) => (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c))}`;
}

export function date(time) {
  const localDate = new Date(time * 1000);
  return localDate.toLocaleDateString();
}


//找尋商品其中一個分類
export function extractOneCategory(category) {
  const cats = category.split(',').flatMap(subStr => subStr.split('|'));
  let oneCat = []
  cats.forEach(cat => {
    if (!cat.includes('/')) {
      oneCat = [cat]
    } else {
      const catArr = cat.split('/')
      if (catArr.length == 2) {
        const cat = catArr[0];
        const subCat = catArr[1];
        oneCat = [cat, subCat]
      }
    }
  })
  return oneCat
}