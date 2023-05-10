export const hasCommonCharsInOrder = (str1, str2) => {
  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();

  let commonCharCount = 0;

  for (let i = 0; i < str1.length; i++) {
    let startIndex = str2.indexOf(str1[i]);
    if (startIndex >= 0 && str1.slice(i).length >= 3) {
      let endIndex = str2.indexOf(str1.slice(i, i + 3), startIndex);
      if (endIndex >= startIndex) {
        commonCharCount += 3;
        i += 2;
      }
    }

    if (commonCharCount >= 3) {
      return true;
    }
  }

  return false;
};

export const strArrayHasCommonCharsInOrder = (str1, arr) =>  {
    for (let i = 0; i < arr.length; i++) {
      if (hasCommonCharsInOrder(str1, arr[i])) {
        return true;
      }
    }
    return false;
  }
