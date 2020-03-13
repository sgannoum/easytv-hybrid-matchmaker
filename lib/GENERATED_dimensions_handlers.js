/*!

EasyTV Matchmaker 

Copyright 2017-2020 Center for Research & Technology - HELLAS


The research leading to these results has received funding from
the European Union's H2020-ICT-2016-2, ICT-19-2017 Media and content convergence
under grant agreement no. 761999.
*/

//Generated 28 Feb 17:50:22


var Numeric = require("./DimensionHandlers").Numeric
var IntegerNumeric = require("./DimensionHandlers").IntegerNumeric
var DoubleNumeric = require("./DimensionHandlers").DoubleNumeric
var Nominal = require("./DimensionHandlers").Nominal
var Ordinal = require("./DimensionHandlers").Ordinal
var SymmetricBinary = require("./DimensionHandlers").SymmetricBinary
var Color = require("./DimensionHandlers").Color
var MultiNominal = require("./DimensionHandlers").MultiNominal

var stat = {}
stat.preferenceHandlers = new Map();
stat.preferenceHandlers.set("http://registry.easytv.eu/common/volume", new IntegerNumeric(100.0, 0.0, -1.0))
stat.preferenceHandlers.set("http://registry.easytv.eu/common/contrast", new IntegerNumeric(100.0, 0.0, -1.0))
stat.preferenceHandlers.set("http://registry.easytv.eu/common/content/audio/language", new Nominal(["en","es","ca","gr","it"], -1.0))
stat.preferenceHandlers.set("http://registry.easytv.eu/common/display/screen/enhancement/cursor/size", new DoubleNumeric(2.0, 1.0, -1.0))
stat.preferenceHandlers.set("http://registry.easytv.eu/common/display/screen/enhancement/cursor/color", new Color(new IntegerNumeric(254.0, 0.0, -1.0), new IntegerNumeric(254.0, 0.0, -1.0), new IntegerNumeric(254.0, 0.0, -1.0)))
stat.preferenceHandlers.set("http://registry.easytv.eu/application/tts/audio/language", new Nominal(["en","es","ca","gr","it"], -1.0))
stat.preferenceHandlers.set("http://registry.easytv.eu/application/tts/audio/speed", new IntegerNumeric(100.0, 0.0, -1.0))
stat.preferenceHandlers.set("http://registry.easytv.eu/application/tts/audio/volume", new IntegerNumeric(100.0, 0.0, -1.0))
stat.preferenceHandlers.set("http://registry.easytv.eu/application/tts/audio/voice", new Nominal(["male","female"], -1.0))
stat.preferenceHandlers.set("http://registry.easytv.eu/application/tts/audio/quality", new IntegerNumeric(8.0, 1.0, -1.0))
stat.preferenceHandlers.set("http://registry.easytv.eu/application/cs/cc/subtitles", new SymmetricBinary(0.0))
stat.preferenceHandlers.set("http://registry.easytv.eu/application/cs/cc/subtitles/language", new Nominal(["en","es","ca","gr","it"], -1.0))
stat.preferenceHandlers.set("http://registry.easytv.eu/application/cs/cc/subtitles/font/size", new IntegerNumeric(100.0, 0.0, -1.0))
stat.preferenceHandlers.set("http://registry.easytv.eu/application/cs/cc/subtitles/font/color", new Color(new IntegerNumeric(253.0, 0.0, -1.0), new IntegerNumeric(254.0, 0.0, -1.0), new IntegerNumeric(254.0, 0.0, -1.0)))
stat.preferenceHandlers.set("http://registry.easytv.eu/application/cs/cc/subtitles/background/color", new Color(new IntegerNumeric(254.0, 0.0, -1.0), new IntegerNumeric(254.0, 0.0, -1.0), new IntegerNumeric(254.0, 0.0, -1.0)))
stat.preferenceHandlers.set("http://registry.easytv.eu/application/cs/cc/audio/subtitle", new SymmetricBinary(0.0))
stat.preferenceHandlers.set("http://registry.easytv.eu/application/cs/ui/audioAssistanceBasedOnTTS", new SymmetricBinary(0.0))
stat.preferenceHandlers.set("http://registry.easytv.eu/application/cs/ui/text/size", new Ordinal(["15","20","23"], 1.0, 0.0, -1.0))
stat.preferenceHandlers.set("http://registry.easytv.eu/application/cs/ui/language", new Nominal(["en","es","ca","gr","it"], -1.0))
stat.preferenceHandlers.set("http://registry.easytv.eu/application/cs/ui/vibration/touch", new SymmetricBinary(0.0))
stat.preferenceHandlers.set("http://registry.easytv.eu/application/cs/ui/text/magnification/scale", new SymmetricBinary(0.0))
stat.preferenceHandlers.set("http://registry.easytv.eu/application/cs/audio/eq", new SymmetricBinary(0.0))
stat.preferenceHandlers.set("http://registry.easytv.eu/application/cs/audio/eq/low/shelf/frequency", new IntegerNumeric(220.0, 35.0, -1.0))
stat.preferenceHandlers.set("http://registry.easytv.eu/application/cs/audio/eq/low/shelf/gain", new IntegerNumeric(50.0, -50.0, -51.0))
stat.preferenceHandlers.set("http://registry.easytv.eu/application/cs/audio/eq/low/pass/frequency", new IntegerNumeric(1600.0, 80.0, -1.0))
stat.preferenceHandlers.set("http://registry.easytv.eu/application/cs/audio/eq/low/pass/qFactor", new DoubleNumeric(11.7, 0.7, -1.0))
stat.preferenceHandlers.set("http://registry.easytv.eu/application/cs/audio/eq/high/pass/frequency", new IntegerNumeric(5900.0, 800.0, -1.0))
stat.preferenceHandlers.set("http://registry.easytv.eu/application/cs/audio/eq/high/pass/qFactor", new DoubleNumeric(11.7, 0.7, -1.0))
stat.preferenceHandlers.set("http://registry.easytv.eu/application/cs/audio/eq/high/shelf/frequency", new IntegerNumeric(4700.0, 2200.0, -1.0))
stat.preferenceHandlers.set("http://registry.easytv.eu/application/cs/audio/eq/high/shelf/gain", new IntegerNumeric(50.0, -50.0, -51.0))
stat.preferenceHandlers.set("http://registry.easytv.eu/application/cs/audio/volume", new IntegerNumeric(100.0, 0.0, -1.0))
stat.preferenceHandlers.set("http://registry.easytv.eu/application/cs/audio/track", new Nominal(["en","es","ca","gr","it"], -1.0))
stat.preferenceHandlers.set("http://registry.easytv.eu/application/control/voice", new SymmetricBinary(0.0))
stat.preferenceHandlers.set("http://registry.easytv.eu/application/control/csGazeAndGestureControlType", new Nominal(["none","gaze_control","gesture_control"], -1.0))
stat.preferenceHandlers.set("http://registry.easytv.eu/application/control/csGazeAndGestureControlCursorGuiTextSize", new DoubleNumeric(3.0, 0.0, -1.0))
stat.preferenceHandlers.set("http://registry.easytv.eu/application/control/csGazeAndGestureControlCursorGuiLanguage", new Nominal(["en","es","ca","gr","it"], -1.0))
stat.preferenceHandlers.set("http://registry.easytv.eu/application/cs/accessibility/audio/description", new SymmetricBinary(0.0))
stat.preferenceHandlers.set("http://registry.easytv.eu/application/cs/accessibility/detection/text/reader", new SymmetricBinary(0.0))
stat.preferenceHandlers.set("http://registry.easytv.eu/application/cs/accessibility/detection/sound", new SymmetricBinary(0.0))
stat.preferenceHandlers.set("http://registry.easytv.eu/application/cs/accessibility/detection/face", new SymmetricBinary(0.0))
stat.preferenceHandlers.set("http://registry.easytv.eu/application/cs/accessibility/detection/text", new SymmetricBinary(0.0))
stat.preferenceHandlers.set("http://registry.easytv.eu/application/cs/accessibility/detection/character", new SymmetricBinary(0.0))
stat.preferenceHandlers.set("http://registry.easytv.eu/application/cs/accessibility/magnification", new SymmetricBinary(0.0))
stat.preferenceHandlers.set("http://registry.easytv.eu/application/cs/accessibility/magnification/scale", new DoubleNumeric(3.5, 1.5, -1.0))
stat.preferenceHandlers.set("http://registry.easytv.eu/application/cs/accessibility/sign/language", new Nominal(["en","es","ca","gr","it"], -1.0))
stat.preferenceHandlers.set("http://registry.easytv.eu/application/hbbtv/screen/reader", new SymmetricBinary(0.0))
stat.preferenceHandlers.set("http://registry.easytv.eu/application/hbbtv/screen/reader/speed", new Nominal(["slow","normal","fast"], -1.0))
stat.preferenceHandlers.set("http://registry.easytv.eu/application/hbbtv/cc/subtitles", new SymmetricBinary(0.0))
stat.preferenceHandlers.set("http://registry.easytv.eu/application/hbbtv/cc/subtitles/position", new Nominal(["up","down"], -1.0))
stat.preferenceHandlers.set("http://registry.easytv.eu/application/hbbtv/cc/subtitles/language", new Nominal(["ca","en","ar","es"], -1.0))
stat.preferenceHandlers.set("http://registry.easytv.eu/application/hbbtv/cc/subtitles/font/Size", new IntegerNumeric(50.0, 1.0, -1.0))
stat.preferenceHandlers.set("http://registry.easytv.eu/application/hbbtv/cc/subtitles/background", new SymmetricBinary(0.0))


stat.contextHandlers = new Map();
stat.contextHandlers.set("http://registry.easytv.eu/context/device", new Nominal(["pc","modile","tablet"], -1.0))
stat.contextHandlers.set("http://registry.easytv.eu/context/proximity", new IntegerNumeric(100.0, 0.0, -1.0))
stat.contextHandlers.set("http://registry.easytv.eu/context/location", new Nominal(["ca","gr","it","es"], -1.0))
//stat.contextHandlers.set("http://registry.easytv.eu/context/time", )
stat.contextHandlers.set("http://registry.easytv.eu/context/light", new Ordinal(["dark","dark surroundings","living room","hallway","overcast day","home","class","workplace","sunrise","grocery","supermarket","theater","detailed work","visual task","demanding visual task","full daylight","direct sun"], 15.0, 0.0, -1.0))


stat.contentHandlers = new Map();
stat.contentHandlers.set("http://registry.easytv.eu/application/cs/accessibility/detection/face", new SymmetricBinary(0.0))
stat.contentHandlers.set("http://registry.easytv.eu/application/cs/accessibility/detection/text", new SymmetricBinary(0.0))
stat.contentHandlers.set("http://registry.easytv.eu/application/cs/accessibility/detection/sound", new SymmetricBinary(0.0))
stat.contentHandlers.set("http://registry.easytv.eu/application/cs/accessibility/detection/character", new SymmetricBinary(0.0))
stat.contentHandlers.set("http://registry.easytv.eu/application/cs/cc/subtitles/language", new MultiNominal(["ca","gr","it","es"], -1.0))
stat.contentHandlers.set("http://registry.easytv.eu/application/cs/audio/track", new MultiNominal(["ca","gr","it","es"], -1.0))


module.exports = stat;
