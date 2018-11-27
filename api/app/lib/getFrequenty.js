module.exports = function getFrequenty(num, arr){
  return arr.reduce((total, element) => { return element == num ? total+1 : total }, 0);
};
