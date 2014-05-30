// Utility function to convert Uint8Array to string.
function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf.buffer));
}

// Utility function to convert string to Uint8Array.
function str2ab(str) {
  var buf = new Uint8Array(str.length * 2); // 2 bytes for each char
  var bufView = new Uint16Array(buf.buffer);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

function str2ab8(str) {
  var buf = new Uint8Array(str.length); // 2 bytes for each char
  var bufView = new Uint8Array(buf.buffer);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

function ab2str8(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf.buffer));
}
