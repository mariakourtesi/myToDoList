

exports.getDate = function () {
  let today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  return today.toLocaleDateString("en-US", options);
};

exports.getYear = function () {
  return new Date().getFullYear();
};

