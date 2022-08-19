var Randomize = {};

function Integer(options) {
  var _a = options || {},
    _b = _a.min,
    min = _b === void 0 ? 1 : _b,
    _c = _a.max,
    max = _c === void 0 ? 9 : _c;
  return (Math.random() * (max - min + 1) + min) | 0;
}
Randomize.Integer = Integer;

function Double(options) {
  var _a = options || {},
    _b = _a.min,
    min = _b === void 0 ? 0 : _b,
    _c = _a.max,
    max = _c === void 0 ? 1 : _c;
  return Math.random() * (max - min) + min;
}
Randomize.Double = Double;

function String(options) {
  var _a = options || {},
    _b = _a.length,
    length = _b === void 0 ? 16 : _b,
    _c = _a.letters,
    letters = _c === void 0 ? "abcdefghijklmnopqrstuvwxyz" : _c;
  var text = "";
  for (var i = 0; i < length; i++) {
    text += letters[Integer({ min: 0, max: letters.length - 1 })];
  }
  return text;
}
Randomize.String = String;

function Array2D(options) {
  var _a = options || {},
    _b = _a.N,
    N = _b === void 0 ? 10 : _b,
    _c = _a.M,
    M = _c === void 0 ? 10 : _c,
    _d = _a.value,
    value =
      _d === void 0
        ? function () {
            return Integer(null);
          }
        : _d,
    _e = _a.sorted,
    sorted = _e === void 0 ? false : _e;
  var D = [];
  for (var i = 0; i < N; i++) {
    D.push([]);
    for (var j = 0; j < M; j++) {
      D[i].push(value(i, j));
    }
    if (sorted)
      D[i].sort(function (a, b) {
        return a - b;
      });
  }
  return D;
}
Randomize.Array2D = Array2D;

function Array1D(options) {
  var _a = options || {},
    _b = _a.N,
    N = _b === void 0 ? 10 : _b,
    _c = _a.value,
    value =
      _c === void 0
        ? function () {
            return Integer(null);
          }
        : _c,
    _d = _a.sorted,
    sorted = _d === void 0 ? false : _d;
  return Array2D({
    N: 1,
    M: N,
    value:
      value &&
      function (i, j) {
        return value(j);
      },
    sorted: sorted,
  })[0];
}
Randomize.Array1D = Array1D;

function Graph(options) {
  var _a = options || {},
    _b = _a.N,
    N = _b === void 0 ? 5 : _b,
    _c = _a.ratio,
    ratio = _c === void 0 ? 0.3 : _c,
    _d = _a.value,
    value =
      _d === void 0
        ? function () {
            return Integer(null);
          }
        : _d,
    _e = _a.directed,
    directed = _e === void 0 ? true : _e,
    _f = _a.weighted,
    weighted = _f === void 0 ? false : _f;
  var G = new Array(N);
  for (var i = 0; i < N; i++) {
    G[i] = new Array(N);
  }
  for (var i = 0; i < N; i++) {
    for (var j = 0; j < N; j++) {
      if (i === j) {
        G[i][j] = 0;
      } else if (directed || i < j) {
        G[i][j] = Math.random() < ratio ? (weighted ? value(i, j) : 1) : 0;
      } else {
        G[i][j] = G[j][i];
      }
    }
  }
  return G;
}
Randomize.Graph = Graph;

export default Randomize;