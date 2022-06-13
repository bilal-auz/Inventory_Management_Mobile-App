const getPrice_w1 = (total) => {
  switch (true) {
    case total < 3000000:
      return 0.85;

    case total >= 3000000 && total < 6000000:
      return 0.8;

    case total >= 6000000 && total < 8000000:
      return 0.7;

    case total >= 8000000 && total < 10000000:
      return 0.65;

    case total >= 10000000:
      return 0.6;
  }
};

const getPrice_w2 = (total) => {
  switch (true) {
    case total < 3000000:
      return 0.9;

    case total >= 3000000 && total < 6000000:
      return 0.85;

    case total >= 6000000 && total < 8000000:
      return 0.75;

    case total >= 8000000 && total < 10000000:
      return 0.7;

    case total >= 10000000:
      return 0.65;
  }
};

const getPrice_w3 = (total) => {
  switch (true) {
    case total < 3000000:
      return 0.95;

    case total >= 3000000 && total < 6000000:
      return 0.9;

    case total >= 6000000 && total < 8000000:
      return 0.8;

    case total >= 8000000 && total < 10000000:
      return 0.75;

    case total >= 10000000:
      return 0.7;
  }
};

module.exports = { getPrice_w1, getPrice_w2, getPrice_w3 };
