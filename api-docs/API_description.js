
const config = require('../config');
const environment = process.env.NODE_ENV || 'development';
const service_url = environment != 'development' ? 'https://hp-api.easytv.eng.it/':'http://localhost:'+config.port+'/'
module.exports = 
{
  openapi: '3.0.1',
  info: {
    version: '1.3.0',
    title: 'EasyTV Personalization API',
    description: 'Description of EasyTV Personalization API'
  },
  servers: [{
      url: service_url,
      description: 'Production server'
  }],
  tags: [
    {
      name: 'Personalize profile'
    },
    {
      name: 'Personalize context'
    },
    {
      name: 'Personalize content'
    },
    {
      name: 'Interaction events'
    }
  ],
   paths: {
    '/EasyTV_HBMM_Restful_WS/personalize/profile': {
	    post: {
	        tags: ['Personalize profile'],
	        description: 'Presonalize a user profile.',
	        parameters:[
	          {
	            in: 'query',
	            name: 'radius',
	            schema: {
	              type: 'number',
	              maximum: 1.0
	            }
	          }],
	        requestBody: {
	            content: {
	                'application/json': {
	                  schema: {
	                    $ref: '#/components/schemas/personalize_profile'
	                  },
	                  example: {
	                        "user_id": 1,
	                      "user_profile": {
	                        "user_preferences": {
	                          "default": {"preferences": {
	                                            "http://registry.easytv.eu/common/volume": 90,
	                                            "http://registry.easytv.eu/common/contrast": 100,
	                                            "http://registry.easytv.eu/application/control/voice": true,
	                                            "http://registry.easytv.eu/application/cs/audio/track": "ca",
	                                            "http://registry.easytv.eu/application/cs/ui/language": "en",
	                                            "http://registry.easytv.eu/application/cs/audio/volume": 33,
	                                            "http://registry.easytv.eu/application/cs/ui/text/size": "20",
	                                            "http://registry.easytv.eu/application/tts/audio/speed": 0,
	                                            "http://registry.easytv.eu/application/tts/audio/voice": "male",
	                                            "http://registry.easytv.eu/application/tts/audio/volume": 90
	                          }}
	                        }
	                      }
	                    
	                    }
	                }
	              },
	          required: true
	        },
	        responses: {
	          '200': {
	            description: 'Return a personalized user profile.',
	            content: {
	                'application/json': {
	                    schema: {
	                      $ref: '#/components/schemas/personalize_output'
	                   }
	                }
	             }
	          },
	          '400': {
	              description: 'Error messages',
	              content: {
	                  'application/json': {
	                      schema: {
	                        $ref: '#/components/schemas/error_message'
	                     }
	                  }
	               }
	            }
	        }
	      }
    },
  '/EasyTV_HBMM_Restful_WS/personalize/context': {
      post: {
          tags: ['Personalize context'],
          description: 'Presonalize a user profile in relation to a specific context',
          parameters:[
          {
            in: 'query',
            name: 'radius',
            schema: {
              type: 'number',
              maximum: 1.0
            }
          }],
          requestBody: {
              content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/personalize_context'
                    },
            example: {
              "user_id": 1,
              "user_context": {
                  "http://registry.easytv.eu/context/location": "gr",
                  "http://registry.easytv.eu/context/time": "12:00:00"
                },
              "user_profile": {
                "user_preferences": {"default": {"preferences": {
                                    "http://registry.easytv.eu/common/volume": 90,
                                    "http://registry.easytv.eu/common/contrast": 100,
                                    "http://registry.easytv.eu/application/control/voice": true,
                                    "http://registry.easytv.eu/application/cs/audio/track": "ca",
                                    "http://registry.easytv.eu/application/cs/ui/language": "en",
                                    "http://registry.easytv.eu/application/cs/audio/volume": 33,
                                    "http://registry.easytv.eu/application/cs/ui/text/size": "20",
                                    "http://registry.easytv.eu/application/tts/audio/speed": 0,
                                    "http://registry.easytv.eu/application/tts/audio/voice": "male",
                                    "http://registry.easytv.eu/application/tts/audio/volume": 90
                    }    
                  },
                  "conditional": [{
                    "name": "Morning subtitles color contrast",
                    "preferences": {           
                      "http://registry.easytv.eu/common/volume": 90,
                      "http://registry.easytv.eu/application/cs/cc/subtitles/font/color": "#ffffff"
                    },  
                    "conditions": [{
                      "operands": [
                        {
                          "operands": [
                            "http://registry.easytv.eu/context/time",
                            "08:00:00"
                          ],
                          "type": "gt"
                        },
                        {
                          "operands": [
                            "http://registry.easytv.eu/context/time",
                            "15:00:00"
                          ],
                          "type": "lt"
                        }
                      ],
                      "type": "and"
                    }]
                  }]
                }
              }
            }
                  }
                },
            required: true
          },
          responses: {
            '200': {
              description: 'Return a personalization context',
              content: {
                  'application/json': {
                      schema: {
                        $ref: '#/components/schemas/personalize_output'
                     }
                  }
               }
            },
            '400': {
                description: 'Error messages',
                content: {
                    'application/json': {
                        schema: {
                          $ref: '#/components/schemas/error_message'
                       }
                    }
                 }
              }
          }
        }
     },
  '/EasyTV_HBMM_Restful_WS/personalize/content': {
         post: {
             tags: ['Personalize content'],
             description: 'Presonalize a user profile in relation to a specific content',
             parameters:[
              {
                in: 'query',
                name: 'radius',
                schema: {
                  type: 'number',
                  maximum: 1.0
                }
              }],
             requestBody: {
                 content: {
                     'application/json': {
                       schema: {
                         $ref: '#/components/schemas/personalize_content'
                       }
                     }
                   },
               required: true
             },
             responses: {
               '200': {
                 description: 'Return a personalization content',
                 content: {
                     'application/json': {
                         schema: {
                           $ref: '#/components/schemas/personalize_output'
                        },
                example: {
                  "user_id": 1,
                  "user_profile": {
                    "user_preferences": {"default": {"preferences": {
                                        "http://registry.easytv.eu/common/volume": 90,
                                        "http://registry.easytv.eu/common/contrast": 100,
                                        "http://registry.easytv.eu/application/control/voice": true,
                                        "http://registry.easytv.eu/application/cs/audio/track": "ca",
                                        "http://registry.easytv.eu/application/cs/ui/language": "en",
                                        "http://registry.easytv.eu/application/cs/audio/volume": 33,
                                        "http://registry.easytv.eu/application/cs/ui/text/size": "20",
                                        "http://registry.easytv.eu/application/tts/audio/speed": 0,
                                        "http://registry.easytv.eu/application/tts/audio/voice": "male",
                                        "http://registry.easytv.eu/application/tts/audio/volume": 90
                        }    
                      },
                        "recommendations": {
                                  "preferences": {
                                      "http://registry.easytv.eu/common/volume": 78,
                                      "http://registry.easytv.eu/common/contrast": 64,
                                      "http://registry.easytv.eu/common/content/audio/language": "EN",
                                      "http://registry.easytv.eu/common/display/screen/enhancement/cursor/color": "#41BA82",
                                      "http://registry.easytv.eu/application/tts/audio/language": "CA",
                                      "http://registry.easytv.eu/application/tts/audio/speed": 43,
                                      "http://registry.easytv.eu/application/tts/audio/volume": 75
                                  }
                        }
                    }
                  }
                }
                     }
                  }
               },
             '400': {
                 description: 'Error messages',
                 content: {
                     'application/json': {
                         schema: {
                           $ref: '#/components/schemas/error_message'
                        }
                     }
                  }
               }
             }
           }
         },
  '/EasyTV_HBMM_Restful_WS/interaction/events':{
    post: {
        tags: ['Interaction events'],
        description: 'Presonalize a user profile.',
        requestBody: {
            content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Interaction_events'
                  },
                  example: {
                      "user_id": 1,
                      "interaction_events": [
                          {
                              "user_context": {
                                  "http://registry.easytv.eu/context/light": "hallway",
                                  "http://registry.easytv.eu/context/location": "es",
                                  "http://registry.easytv.eu/context/proximity": 99,
                                  "http://registry.easytv.eu/context/time": "08:16:48",
                                  "http://registry.easytv.eu/context/device/screenSize/width": 720,
                                  "http://registry.easytv.eu/context/device/screenSize/height": 1344,
                                  "http://registry.easytv.eu/context/device/screenSize/diameter": 5.5,
                                  "http://registry.easytv.eu/context/device/screenSize/densityValue": 2,
                                  "http://registry.easytv.eu/context/device/screenSize/densityBucket": "xhdpi"
                              },
                              "preferences": {
                                  "http://registry.easytv.eu/common/volume": 5,
                                  "http://registry.easytv.eu/application/cs/ui/text/size": "20"
                              }
                          }
                      ]
                  }
                }
              },
          required: true
        },
        responses: {
          '200': {
            description: 'Return Ok.',
          },
          '500': {
              description: 'Error messages',
            }
        }
      }
    }
    
  },
  components: {
    schemas: {
      user_id: {
        type: 'integer',
        description: 'The user id, taken from the login'
      },
      user_context: {
        type: 'object',
          properties: {
           "http://registry.easytv.eu/context/device": {
             type: "string",
             description: 'Device type, one of mobile, tablet or PC' 
            },
            "http://registry.easytv.eu/context/light":{
               type: "string",
             description: 'The ambient light (dark, dark surroundings, living room, hallway, overcast day, home, class, workplace, sunrise, grocery, supermarket, theater, detailed work, visual task, demanding visual task, full daylight, direct sun)' 
            },
           "http://registry.easytv.eu/context/proximity":{
              type: "string",
             description: 'Measures the proximity of an object in cm relative to the view screen of a device' 
            },
           "http://registry.easytv.eu/context/location":{
             type: "string",
             description: 'The location as country code' 
           },
           "http://registry.easytv.eu/context/time":{
             type: "string",
             description: 'Current time in HH:MM:SS form' 
           },
          "http://registry.easytv.eu/context/device/screenSize/width":{
             type: "number",
             description: 'Device screen width in pixels' 
           },
          "http://registry.easytv.eu/context/device/screenSize/height":{
             type: "number",
             description: 'Device screen height in pixels' 
           },
           "http://registry.easytv.eu/context/device/screenSize/xdpi":{
               type: "number",
               description: 'Device physical pixels per inch of the screen in the X dimension' 
           },
           "http://registry.easytv.eu/context/device/screenSize/ydpi":{
               type: "number",
               description: 'Device physical pixels per inch of the screen in the Y dimension' 
           },
          "http://registry.easytv.eu/context/device/screenSize/diameter":{
             type: "number",
             description: 'screen diameter in inches' 
           },
          "http://registry.easytv.eu/context/device/screenSize/densityValue":{
             type: "number",
             description: 'density point (0.75, 1.0, 1.5, 2.0, 3.0, 4.0)' 
           },
          "http://registry.easytv.eu/context/device/screenSize/densityBucket":{
             type: "number",
             description: 'density bucket (ldpi, mdpi, hdpi, xhdpi, xxhdpi, xxxhdpi)' 
           },
           "http://registry.easytv.eu/context/device/soundMeter":{
             type: "string",
             description: 'sound meter (Breathing, Mosquito, Whisper, Park, Quiet office, Normal conversation, Busy traffic, Red level)'
           }
          }
      },
      user_content: {
        type: 'object',
          properties: {
           media: {
             type: "string"
          },
            episonde:{
               type: "string"
           }
          }
      },
      preferences: {
          type: "object",
          properties: {
            "http://registry.easytv.eu/application/control/csGazeAndGestureControlCursorGuiLanguage":{
              type: "string",description: "The gaze and gesture control interface lanugage"
             },
             "http://registry.easytv.eu/application/control/csGazeAndGestureControlCursorGuiTextSize":{
              type: "string",description: "The gaze and gesture control interface lanugage text size"
             },
             "http://registry.easytv.eu/application/control/csGazeAndGestureControlType":{
              type: "string",description: "The control type "
             },
             "http://registry.easytv.eu/application/control/voice":{
              type: "string",description: "Enable/disable voice control"
             },
             "http://registry.easytv.eu/application/cs/accessibility/audio/description":{
              type: "string",description: "Enable/disable audio description"
             },
             "http://registry.easytv.eu/application/cs/accessibility/detection/character":{
              type: "string",description: "Enable/disable character recognition"
             },
             "http://registry.easytv.eu/application/cs/accessibility/detection/sound":{
              type: "string",description: "Enable/disable sound detection"
             },
             "http://registry.easytv.eu/application/cs/accessibility/detection/text":{
              type: "string",description: "Enable/disable text detection"
             },
             "http://registry.easytv.eu/application/cs/accessibility/enhancement/image/type":{
              type: "string",description: "Image ehancement type "
             },
             "http://registry.easytv.eu/application/cs/accessibility/magnification/scale":{
              type: "string",description: "Image mangnification scale"
             },
             "http://registry.easytv.eu/application/cs/accessibility/sign/language":{
              type: "string",description: "Enable/disable text detection"
             },
             "http://registry.easytv.eu/application/cs/audio/eq/bass":{
              type: "string",description: "Equalizer bass level"
             },
             "http://registry.easytv.eu/application/cs/audio/eq/highs":{
              type: "string",description: "Equalizer  high level"
             },
             "http://registry.easytv.eu/application/cs/audio/eq/mids":{
              type: "string",description: "Equalizer  mild level"
             },
             "http://registry.easytv.eu/application/cs/audio/track":{
              type: "string",description: "Audio content language"
             },
             "http://registry.easytv.eu/application/cs/audio/volume":{
              type: "string",description: "Audio content volume level"
             },
             "http://registry.easytv.eu/application/cs/cc/audio/subtitle":{
              type: "string",description: "Enable/disable audio subtitles"
             },
             "http://registry.easytv.eu/application/cs/cc/subtitles/background/color":{
              type: "string",description: "Subtitle background color"
             },
             "http://registry.easytv.eu/application/cs/cc/subtitles/font/color":{
              type: "string",description: "Subtitle font color"
             },
             "http://registry.easytv.eu/application/cs/cc/subtitles/font/size":{
              type: "string",description: "Subtitle font size"
             },
             "http://registry.easytv.eu/application/cs/cc/subtitles/language":{
              type: "string",description: "subtitile language"
             },
             "http://registry.easytv.eu/application/cs/ui/audioAssistanceBasedOnTTS":{
              type: "string",description: "Enable/disable TTs reader of cs app interface"
             },
             "http://registry.easytv.eu/application/cs/ui/language":{
              type: "string",description: "Cs app interface lanugage"
             },
             "http://registry.easytv.eu/application/cs/ui/text/magnification/scale":{
              type: "string",description: "Enable/disable zoom text field"
             },
             "http://registry.easytv.eu/application/cs/ui/text/size":{
              type: "string",description: "Cs app interface text size"
             },
             "http://registry.easytv.eu/application/cs/ui/vibration/touch":{
              type: "string",description: "Enable/disable touch vibration"
             },
             "http://registry.easytv.eu/application/tts/audio/language":{
              type: "string",description: "TTs language"
             },
             "http://registry.easytv.eu/application/tts/audio/quality":{
              type: "string",description: "TTs audio quality"
             },
             "http://registry.easytv.eu/application/tts/audio/speed":{
              type: "string",description: "TTs speed"
             },
             "http://registry.easytv.eu/application/tts/audio/voice":{
              type: "string",description: "TTs voice"
             },
             "http://registry.easytv.eu/application/tts/audio/volume":{
              type: "string",description: "TTs volume level"
             },
             "http://registry.easytv.eu/common/content/audio/language":{
              type: "string",description: "General language"
             },
             "http://registry.easytv.eu/common/display/screen/enhancement/cursor/color":{
              type: "string",description: "Cursor color"
             },
             "http://registry.easytv.eu/common/display/screen/enhancement/cursor/Size":{
              type: "string",description: "Cursor size"
             },
             "http://registry.easytv.eu/common/volume":{
              type: "string",description: "Volume level"
             }
          }
      }, 
      condition:{
        type: 'object',
          properties: {
            type: {
              type: 'string'
            },
            operands:{
                type: "array",
                items: {
                  type: 'string',
                }
            }
        }
      },
      conditional:{
        type: 'object',
          properties: {
           name: {
             type: 'string'
           },
           conditions:{
               type: "array",
               items: {
                 $ref: "#/components/schemas/condition"
               }
           },
         preferences:{
           $ref: '#/components/schemas/preferences'
         }
        }
      },
      conditionals:{
          type: "array",
          items: {
            $ref: "#/components/schemas/conditional"
          }
      },     
      error_message:{
        type: 'object',
          properties: {
              user_id: {
                type: 'integer'
              },
              msg: {
                type: 'string'
              }
           }
      },
      user_profile: {
          type: 'object',
          properties: {
              user_preferences: {
                type: 'object',
                  properties: {
                  default: {
                    type: 'object',
                      properties: {
                      preferences: {
                        $ref: '#/components/schemas/preferences'
                      }
                    }
                  },
                  conditional:{
                  $ref: '#/components/schemas/conditionals'
                  }
                }
              }
          }
      },
      personalize_profile: {
        type: 'object',
        properties: {
          user_id: {
            $ref: '#/components/schemas/user_id'
          },
          user_profile: {
            $ref: '#/components/schemas/user_profile'
          }
        }
      },
      personalize_context: {
          type: 'object',
          properties: {
            user_id: {
              $ref: '#/components/schemas/user_id'
            },
            user_profile: {
              $ref: '#/components/schemas/user_profile'
            },
            user_context: {
                $ref: '#/components/schemas/user_context'
            }
          }
       },
       personalize_content: {
           type: 'object',
           properties: {
             user_id: {
               $ref: '#/components/schemas/user_id'
             },
             user_profile: {
               $ref: '#/components/schemas/user_profile'
             },
             user_context: {
                 $ref: '#/components/schemas/user_context'
             },
             user_content: {
                 $ref: '#/components/schemas/user_content'
             }
           }
        },
        personalize_output: {
            type: 'object',
            properties: {
              user_id: {
                $ref: '#/components/schemas/user_id'
              },
              user_profile: {
                  type: 'object',
                  properties: {
                      user_preferences: {
                        type: 'object',
                          properties: {
                          default: {
                            type: 'object',
                              properties: {
                              preferences: {
                                $ref: '#/components/schemas/preferences'
                              }
                            }
                          },
                          recommendations:{
                            type: 'object',
                              properties: {
                              preferences: {
                                $ref: '#/components/schemas/preferences'
                              }
                            }
                          }
                        }
                      }
                  }
              }
            }
         },
         Interaction_events: {
          type: 'object',
          properties: {
            user_id: {
              $ref: '#/components/schemas/user_id'
            },
            preferences: {
              $ref: '#/components/schemas/preferences'
            },
            user_context: {
                $ref: '#/components/schemas/user_context'
            }
          }
       }
    }
  }
}