module.exports = {
  openapi: '3.0.1',
  info: {
    version: '1.3.0',
    title: 'Personalization',
    description: 'EasyTV Personalization API'
  },
  servers: [
    {
      url: 'https://hp-api.easytv.eng.it/',
      description: 'Production server'
    }
  ],
  tags: [
    {
      name: 'Personalize profile'
    },
    {
      name: 'Personalize context'
    },
    {
      name: 'Personalize content'
    }
  ],
   paths: {
    '/personalize/profile': {
	  post: {
        tags: ['Personalize profile'],
        description: 'Presonalize a user profile.',
        requestBody: {
            content: {
                'application/json': {
                  schema: {
                	  $ref: '#/components/schemas/personalize_profile'
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
                  	  $ref: '#/components/schemas/personalize_profile'
                   }
                }
             }
          }
        }
      }
    },
    '/personalize/weigths': {
  	  post: {
          tags: ['Personalize user weigths'],
          description: 'Presonalize the user associated weights.',
          requestBody: {
              content: {
                  'application/json': {
                    schema: {
                  	  $ref: '#/components/schemas/personalize_profile'
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
                    	  $ref: '#/components/schemas/personalize_profile'
                     }
                  }
               }
            }
          }
        }
      },
  '/personalize/context': {
  	  post: {
          tags: ['Personalize context'],
          description: 'Presonalize a user profile in relation to a specific context',
          requestBody: {
              content: {
                  'application/json': {
                    schema: {
                  	  $ref: '#/components/schemas/personalize_context'
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
                    	  $ref: '#/components/schemas/personalize_profile'
                     }
                  }
               }
            }
          }
        }
     },
     '/personalize/content': {
     	  post: {
             tags: ['Personalize content'],
             description: 'Presonalize a user profile in relation to a specific content',
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
                       	  $ref: '#/components/schemas/personalize_profile'
                        }
                     }
                  }
               }
             }
           }
         }
  },
  components: {
    schemas: {
      user_id: {
        type: 'integer',
        description: 'The user id, taken from the login',
      },
      key:{
          type: "string",
          description: 'A user preference key' 
      },
      user_context: {
          type: "array",
          description: 'The user context',
          items: {
            $ref: "#/components/schemas/key"
          }
      },
      user_content: {
          type: 'string',
          description: 'The user content',
          description: 'user content'
      },
      preferences: {
          type: "array",
          items: {
            $ref: "#/components/schemas/key"
          }
      },
      default: {
    	  type: 'object',
          properties: {
          preferences: {
            $ref: '#/components/schemas/preferences'
          }
        }
      },
      
      name:{
          type: 'string',
      },
      type:{
          type: 'string',
      },
      operand:{
          type: 'string',
      },
      operands:{
          type: "array",
          items: {
            $ref: "#/components/schemas/operand"
          }
      },
      condition:{
    	  type: 'object',
          properties: {
	          type: {
	            $ref: '#/components/schemas/type'
	          },
	          operands: {
		        $ref: '#/components/schemas/operands'
	       }
        }
      },
      conditions:{
          type: "array",
          items: {
            $ref: "#/components/schemas/condition"
          }
      },
      conditional:{
    	  type: 'object',
          properties: {
           name: {
            $ref: '#/components/schemas/name'
           },
           conditions: {
	        $ref: '#/components/schemas/conditions'
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
      user_preferences: {
    	  type: 'object',
          properties: {
          default: {
            $ref: '#/components/schemas/default'
          },
          conditional:{
  		    $ref: '#/components/schemas/conditionals'
          }
        }
      },
      
      user_profile: {
          type: 'object',
          properties: {
        	  user_preferences: {
              $ref: '#/components/schemas/user_preferences'
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
             },
             user_content: {
                 $ref: '#/components/schemas/user_content'
             }
           }
        }
    }
  }
};