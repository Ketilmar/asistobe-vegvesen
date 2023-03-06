const exampleTrafficVolumeByLength = `{
    "data": {
        "trafficData": {
            "trafficRegistrationPoint": {
                "id": "74808V805815",
                "name": "Bønesskogen nord",
                "trafficRegistrationType": "VEHICLE",
                "location": {
                    "county": {
                        "name": "Vestland"
                    },
                    "municipality": {
                        "name": "Bergen"
                    },
                    "coordinates": {
                        "latLon": {
                            "lat": 60.331065,
                            "lon": 5.29924
                        }
                    }
                }
            },
            "volume": {
                "byHour": {
                    "edges": [
                        {
                            "node": {
                                "from": "2023-02-02T00:00:00+01:00",
                                "to": "2023-02-02T01:00:00+01:00",
                                "total": {
                                    "volumeNumbers": {
                                        "volume": 11
                                    },
                                    "coverage": {
                                        "percentage": 100       
                                    }
                                },
                                "byDirection": [
                                    {
                                        "heading": "Bønes",     
                                        "total": {
                                            "volumeNumbers": {  
                                                "volume": 4     
                                            }
                                        },
                                        "byLengthRange": [      
                                            {
                                                "total": {      
                                                    "volumeNumbers": {
                                                        "volume": 1
                                                    }
                                                }
                                            },
                                            {
                                                "total": {      
                                                    "volumeNumbers": {
                                                        "volume": 3
                                                    }
                                                }
                                            },
                                            {
                                                "total": {      
                                                    "volumeNumbers": {
                                                        "volume": 1
                                                    }
                                                }
                                            },
                                            {
                                                "total": {      
                                                    "volumeNumbers": {
                                                        "volume": 0
                                                    }
                                                }
                                            },
                                            {
                                                "total": {      
                                                    "volumeNumbers": {
                                                        "volume": 1
                                                    }
                                                }
                                            },
                                            {
                                                "total": {      
                                                    "volumeNumbers": {
                                                        "volume": 1
                                                    }
                                                }
                                            },
                                            {
                                                "total": {      
                                                    "volumeNumbers": {
                                                        "volume": 0
                                                    }
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        "heading": "Bråtet",    
                                        "total": {
                                            "volumeNumbers": {  
                                                "volume": 7     
                                            }
                                        },
                                        "byLengthRange": [      
                                            {
                                                "total": {      
                                                    "volumeNumbers": {
                                                        "volume": 6
                                                    }
                                                }
                                            },
                                            {
                                                "total": {      
                                                    "volumeNumbers": {
                                                        "volume": 1
                                                    }
                                                }
                                            },
                                            {
                                                "total": {      
                                                    "volumeNumbers": {
                                                        "volume": 0
                                                    }
                                                }
                                            },
                                            {
                                                "total": {      
                                                    "volumeNumbers": {
                                                        "volume": 0
                                                    }
                                                }
                                            },
                                            {
                                                "total": {      
                                                    "volumeNumbers": {
                                                        "volume": 1
                                                    }
                                                }
                                            },
                                            {
                                                "total": {      
                                                    "volumeNumbers": {
                                                        "volume": 0
                                                    }
                                                }
                                            },
                                            {
                                                "total": {      
                                                    "volumeNumbers": {
                                                        "volume": 0
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                        
                    ]
                }
            }
        }
    }
}`


  const exampleTrafficRegPoints = `{
        "data": {
        "trafficRegistrationPoints": [
            {
            "id": "46633V805290",
            "name": "SANDSLI",
            "location": {
              "county": {
                "name": "Vestland",
                "number": 46
              },
              "municipality": {
                "name": "Bergen",
                "number": 4601
              }
            }
          }
        ]
    }
}`

  export {exampleTrafficVolumeByLength, exampleTrafficRegPoints}