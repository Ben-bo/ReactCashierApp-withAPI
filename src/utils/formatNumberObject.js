const FormatNumberObject = (num) => {
  return num.JSON.stringify().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
};

export default FormatNumberObject;
