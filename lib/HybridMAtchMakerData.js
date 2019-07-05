
var DimensionHandlers = require("./DimensionHandlers")

var Numeric = DimensionHandlers.Numeric
var Nominal = DimensionHandlers.Nominal
var Ordinal = DimensionHandlers.Ordinal
var SymmetricBinary = DimensionHandlers.SymmetricBinary
var Color = DimensionHandlers.Color

dimensionsHandlers = new Map();
dimensionsHandlers.set("http://registry.easytv.eu/common/content/audio/volume", new Numeric(95.0, 7.0, 0.0 ));
dimensionsHandlers.set("http://registry.easytv.eu/common/content/audio/language", new Nominal(["en","es","ca","gr","it"], -1.0));
dimensionsHandlers.set("http://registry.easytv.eu/common/display/screen/enhancement/font/size", new Numeric(26.0, 23.0, 1.0 ));
dimensionsHandlers.set("http://registry.easytv.eu/common/display/screen/enhancement/font/type", new Nominal(["fantasy","monospace","sans-serif","serif","cursive"], -1.0));
dimensionsHandlers.set("http://registry.easytv.eu/common/display/screen/enhancement/font/color", new Color(new Numeric(242.0, 7.0, -1.0 ),new Numeric(248.0, 16.0, -1.0 ),new Numeric(248.0, 36.0, -1.0 )));
dimensionsHandlers.set("http://registry.easytv.eu/common/display/screen/enhancement/background", new Color(new Numeric(236.0, 0.0, -1.0 ),new Numeric(231.0, 32.0, -1.0 ),new Numeric(236.0, 71.0, -1.0 )));
dimensionsHandlers.set("http://registry.easytv.eu/common/subtitles", new Nominal(["en","es","ca","gr","it"], -1.0));
dimensionsHandlers.set("http://registry.easytv.eu/common/signLanguage", new Nominal(["en","es","ca","gr","it"], -1.0));
dimensionsHandlers.set("http://registry.easytv.eu/common/displayContrast", new Numeric(94.0, 1.0, 0.0 ));
dimensionsHandlers.set("http://registry.easytv.eu/application/tts/speed", new Numeric(98.0, 12.0, 0.0 ));
dimensionsHandlers.set("http://registry.easytv.eu/application/tts/volume", new Numeric(90.0, 5.0, 0.0 ));
dimensionsHandlers.set("http://registry.easytv.eu/application/tts/language", new Nominal(["en","es","ca","gr","it"], -1.0));
dimensionsHandlers.set("http://registry.easytv.eu/application/tts/audioQuality", new Numeric(90.0, 20.0, 0.0 ));
dimensionsHandlers.set("http://registry.easytv.eu/application/cs/accessibility/imageMagnification/scale", new Numeric(94.0, 1.0, 0.0 ));
dimensionsHandlers.set("http://registry.easytv.eu/application/cs/accessibility/textDetection", new SymmetricBinary(-1.0));
dimensionsHandlers.set("http://registry.easytv.eu/application/cs/accessibility/faceDetection", new SymmetricBinary(-1.0));
dimensionsHandlers.set("http://registry.easytv.eu/application/cs/audio/volume", new Numeric(80.0, 12.0, 0.0 ));
dimensionsHandlers.set("http://registry.easytv.eu/application/cs/audio/track", new Nominal(["en","es","ca","gr","it"], -1.0));
dimensionsHandlers.set("http://registry.easytv.eu/application/cs/audio/audioDescription", new SymmetricBinary(-1.0));
dimensionsHandlers.set("http://registry.easytv.eu/application/cs/cc/audioSubtitles", new SymmetricBinary(-1.0));
dimensionsHandlers.set("http://registry.easytv.eu/application/cs/cc/subtitles/language", new Nominal(["en","es","ca","gr","it"], -1.0));
dimensionsHandlers.set("http://registry.easytv.eu/application/cs/cc/subtitles/fontSize", new Numeric(95.0, 4.0, 0.0 ));
dimensionsHandlers.set("http://registry.easytv.eu/application/cs/cc/subtitles/fontColor", new Color(new Numeric(216.0, 3.0, -1.0 ),new Numeric(251.0, 30.0, -1.0 ),new Numeric(253.0, 19.0, -1.0 )));
dimensionsHandlers.set("http://registry.easytv.eu/application/cs/cc/subtitles/backgroundColor", new Color(new Numeric(243.0, 18.0, -1.0 ),new Numeric(243.0, 73.0, -1.0 ),new Numeric(205.0, 21.0, -1.0 )));

module.exports.dimensionsHandlers = dimensionsHandlers