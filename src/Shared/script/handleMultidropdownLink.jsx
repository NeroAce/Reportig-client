const hash = {};

export function handleMultidropdown(setPage, setValue, newList, stringValue) {
  setPage(1);
  let str = "";
  hash[stringValue] = "";
  const params = { countrycode: newList };
  for (var i of params.countrycode) {
    hash[stringValue] = `${hash[stringValue]}&${stringValue}=${i}`;
  }

  for (let i in hash) {
    str = `${str}${hash[i]}`;
  }

  console.log(str);
  console.log(hash);
  setValue(str);
}
