// در فایل FormatNumber.js
const formatNumber = (number) => {
  const numericValue = parseFloat(number);
  if (isNaN(numericValue)) {
    return '0';
  }
  return numericValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default formatNumber;
