/*!

EasyTV Hybrid Matchmaker 

Copyright 2017-2020 Center for Research & Technology - HELLAS

Licensed under the New BSD License. You may not use this file except in
compliance with this licence.

You may obtain a copy of the licence at
https://github.com/REMEXLabs/GPII-Statistical-Matchmaker/blob/master/LICENSE.txt

The research leading to these results has received funding from
the European Union's H2020-ICT-2016-2, ICT-19-2017 Media and content convergence
under grant agreement no. 761999.
*/

//Generated 08 Jul 14:52:45

var Numeric = require("./DimensionHandlers").Numeric
var IntegerNumeric = require("./DimensionHandlers").IntegerNumeric
var Nominal = require("./DimensionHandlers").Nominal
var Ordinal = require("./DimensionHandlers").Ordinal
var SymmetricBinary = require("./DimensionHandlers").SymmetricBinary
var Color = require("./DimensionHandlers").Color


var hybrid = {}

hybrid.dimensionsHandlers = new Map();
hybrid.dimensionsHandlers.set("http://registry.easytv.eu/common/content/audio/volume", new IntegerNumeric(95.0, 7.0, 0.0 ));
hybrid.dimensionsHandlers.set("http://registry.easytv.eu/common/content/audio/language", new Nominal(["en","es","ca","gr","it"], -1.0));
hybrid.dimensionsHandlers.set("http://registry.easytv.eu/common/display/screen/enhancement/font/size", new IntegerNumeric(26.0, 23.0, 1.0 ));
hybrid.dimensionsHandlers.set("http://registry.easytv.eu/common/display/screen/enhancement/font/type", new Nominal(["fantasy","monospace","sans-serif","serif","cursive"], -1.0));
hybrid.dimensionsHandlers.set("http://registry.easytv.eu/common/display/screen/enhancement/font/color", new Color(new IntegerNumeric(242.0, 7.0, -1.0 ),new IntegerNumeric(248.0, 16.0, -1.0 ),new IntegerNumeric(248.0, 36.0, -1.0 )));
hybrid.dimensionsHandlers.set("http://registry.easytv.eu/common/display/screen/enhancement/background", new Color(new IntegerNumeric(236.0, 0.0, -1.0 ),new IntegerNumeric(231.0, 32.0, -1.0 ),new IntegerNumeric(236.0, 71.0, -1.0 )));
hybrid.dimensionsHandlers.set("http://registry.easytv.eu/common/subtitles", new Nominal(["en","es","ca","gr","it"], -1.0));
hybrid.dimensionsHandlers.set("http://registry.easytv.eu/common/signLanguage", new Nominal(["en","es","ca","gr","it"], -1.0));
hybrid.dimensionsHandlers.set("http://registry.easytv.eu/common/displayContrast", new IntegerNumeric(94.0, 1.0, 0.0 ));
hybrid.dimensionsHandlers.set("http://registry.easytv.eu/application/tts/speed", new IntegerNumeric(98.0, 12.0, 0.0 ));
hybrid.dimensionsHandlers.set("http://registry.easytv.eu/application/tts/volume", new IntegerNumeric(90.0, 5.0, 0.0 ));
hybrid.dimensionsHandlers.set("http://registry.easytv.eu/application/tts/language", new Nominal(["en","es","ca","gr","it"], -1.0));
hybrid.dimensionsHandlers.set("http://registry.easytv.eu/application/tts/audioQuality", new IntegerNumeric(90.0, 20.0, 0.0 ));
hybrid.dimensionsHandlers.set("http://registry.easytv.eu/application/cs/accessibility/imageMagnification/scale", new IntegerNumeric(94.0, 1.0, 0.0 ));
hybrid.dimensionsHandlers.set("http://registry.easytv.eu/application/cs/accessibility/textDetection", new SymmetricBinary(-1.0));
hybrid.dimensionsHandlers.set("http://registry.easytv.eu/application/cs/accessibility/faceDetection", new SymmetricBinary(-1.0));
hybrid.dimensionsHandlers.set("http://registry.easytv.eu/application/cs/audio/volume", new IntegerNumeric(80.0, 12.0, 0.0 ));
hybrid.dimensionsHandlers.set("http://registry.easytv.eu/application/cs/audio/track", new Nominal(["en","es","ca","gr","it"], -1.0));
hybrid.dimensionsHandlers.set("http://registry.easytv.eu/application/cs/audio/audioDescription", new SymmetricBinary(-1.0));
hybrid.dimensionsHandlers.set("http://registry.easytv.eu/application/cs/cc/audioSubtitles", new SymmetricBinary(-1.0));
hybrid.dimensionsHandlers.set("http://registry.easytv.eu/application/cs/cc/subtitles/language", new Nominal(["en","es","ca","gr","it"], -1.0));
hybrid.dimensionsHandlers.set("http://registry.easytv.eu/application/cs/cc/subtitles/fontSize", new IntegerNumeric(95.0, 4.0, 0.0 ));
hybrid.dimensionsHandlers.set("http://registry.easytv.eu/application/cs/cc/subtitles/fontColor", new Color(new IntegerNumeric(216.0, 3.0, -1.0 ),new IntegerNumeric(251.0, 30.0, -1.0 ),new IntegerNumeric(253.0, 19.0, -1.0 )));
hybrid.dimensionsHandlers.set("http://registry.easytv.eu/application/cs/cc/subtitles/backgroundColor", new Color(new IntegerNumeric(243.0, 18.0, -1.0 ),new IntegerNumeric(243.0, 73.0, -1.0 ),new IntegerNumeric(205.0, 21.0, -1.0 )));

module.exports = hybrid;