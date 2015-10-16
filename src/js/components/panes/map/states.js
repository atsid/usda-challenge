"use strict";
const states = [
    {
        "code": "AK",
        "name": "Alaska",
        "lat": 61.385,
        "lng": -152.2683,
        "bounds": {
            "minLat": 52.5964,
            "minLng": -169.9146,
            "maxLat": 71.5232,
            "maxLng": -129.993
        }
    },
    {
        "code": "AL",
        "name": "Alabama",
        "lat": 32.799,
        "lng": -86.8073,
        "bounds": {
            "minLat": 30.1463,
            "minLng": -88.4743,
            "maxLat": 35.0041,
            "maxLng": -84.8927
        }
    },
    {
        "code": "AR",
        "name": "Arkansas",
        "lat": 34.9513,
        "lng": -92.3809,
        "bounds": {
            "minLat": 33.0075,
            "minLng": -94.6198,
            "maxLat": 36.4997,
            "maxLng": -89.6594
        }
    },
    {
        "code": "AZ",
        "name": "Arizona",
        "lat": 33.7712,
        "lng": -111.3877,
        "bounds": {
            "minLat": 31.3325,
            "minLng": -114.8126,
            "maxLat": 37.0004,
            "maxLng": -109.0475
        }
    },
    {
        "code": "CA",
        "name": "California",
        "lat": 36.17,
        "lng": -119.7462,
        "bounds": {
            "minLat": 32.5121,
            "minLng": -124.6509,
            "maxLat": 42.0126,
            "maxLng": -114.1315
        }
    },
    {
        "code": "CO",
        "name": "Colorado",
        "lat": 39.0646,
        "lng": -105.3272,
        "bounds": {
            "minLat": 36.9949,
            "minLng": -109.0489,
            "maxLat": 41.0006,
            "maxLng": -102.0424
        }
    },
    {
        "code": "CT",
        "name": "Connecticut",
        "lat": 41.5834,
        "lng": -72.7622,
        "bounds": {
            "minLat": 40.9509,
            "minLng": -73.7272,
            "maxLat": 42.0511,
            "maxLng": -71.7874
        }
    },
    {
        "code": "DE",
        "name": "Delaware",
        "lat": 39.3498,
        "lng": -75.5148,
        "bounds": {
            "minLat": 38.4482,
            "minLng": -75.7919,
            "maxLat": 39.8296,
            "maxLng": -74.8526
        }
    },
    {
        "code": "FL",
        "name": "Florida",
        "lat": 27.8333,
        "lng": -81.717,
        "bounds": {
            "minLat": 24.3959,
            "minLng": -87.6256,
            "maxLat": 31.0035,
            "maxLng": -79.8198
        }
    },
    {
        "code": "GA",
        "name": "Georgia",
        "lat": 32.9866,
        "lng": -83.6487,
        "bounds": {
            "minLat": 30.3575,
            "minLng": -85.6082,
            "maxLat": 34.9996,
            "maxLng": -80.696
        }
    },
    {
        "code": "HI",
        "name": "Hawaii",
        "lat": 21.1098,
        "lng": -157.5311,
        "bounds": {
            "minLat": 18.71,
            "minLng": -160.3922,
            "maxLat": 22.3386,
            "maxLng": -154.6271
        }
    },
    {
        "code": "IA",
        "name": "Iowa",
        "lat": 42.0046,
        "lng": -93.214,
        "bounds": {
            "minLat": 40.3622,
            "minLng": -96.6357,
            "maxLat": 43.5008,
            "maxLng": -90.1538
        }
    },
    {
        "code": "ID",
        "name": "Idaho",
        "lat": 44.2394,
        "lng": -114.5103,
        "bounds": {
            "minLat": 41.9871,
            "minLng": -117.2372,
            "maxLat": 49.0018,
            "maxLng": -111.0471
        }
    },
    {
        "code": "IL",
        "name": "Illinois",
        "lat": 40.3363,
        "lng": -89.0022,
        "bounds": {
            "minLat": 36.9894,
            "minLng": -91.512,
            "maxLat": 42.5116,
            "maxLng": -87.0213
        }
    },
    {
        "code": "IN",
        "name": "Indiana",
        "lat": 39.8647,
        "lng": -86.2604,
        "bounds": {
            "minLat": 37.7718,
            "minLng": -88.098,
            "maxLat": 41.7611,
            "maxLng": -84.809
        }
    },
    {
        "code": "KS",
        "name": "Kansas",
        "lat": 38.5111,
        "lng": -96.8005,
        "bounds": {
            "minLat": 36.9927,
            "minLng": -102.0506,
            "maxLat": 40.0087,
            "maxLng": -94.6046
        }
    },
    {
        "code": "KY",
        "name": "Kentucky",
        "lat": 37.669,
        "lng": -84.6514,
        "bounds": {
            "minLat": 36.4931,
            "minLng": -89.5372,
            "maxLat": 39.1439,
            "maxLng": -82.0308
        }
    },
    {
        "code": "LA",
        "name": "Louisiana",
        "lat": 31.1801,
        "lng": -91.8749,
        "bounds": {
            "minLat": 28.8832,
            "minLng": -94.043,
            "maxLat": 33.0225,
            "maxLng": -88.7421
        }
    },
    {
        "code": "MA",
        "name": "Massachusetts",
        "lat": 42.2373,
        "lng": -71.5314,
        "bounds": {
            "minLat": 41.159,
            "minLng": -73.5081,
            "maxLat": 42.889,
            "maxLng": -69.7398
        }
    },
    {
        "code": "MD",
        "name": "Maryland",
        "lat": 39.0724,
        "lng": -76.7902,
        "bounds": {
            "minLat": 37.8889,
            "minLng": -79.4861,
            "maxLat": 39.722,
            "maxLng": -74.8581
        }
    },
    {
        "code": "ME",
        "name": "Maine",
        "lat": 44.6074,
        "lng": -69.3977,
        "bounds": {
            "minLat": 42.9182,
            "minLng": -71.0829,
            "maxLat": 47.455,
            "maxLng": -66.8628
        }
    },
    {
        "code": "MI",
        "name": "Michigan",
        "lat": 43.3504,
        "lng": -84.5603,
        "bounds": {
            "minLat": 41.6965,
            "minLng": -90.4175,
            "maxLat": 48.3042,
            "maxLng": -82.1221
        }
    },
    {
        "code": "MN",
        "name": "Minnesota",
        "lat": 45.7326,
        "lng": -93.9196,
        "bounds": {
            "minLat": 43.5008,
            "minLng": -97.2304,
            "maxLat": 49.3877,
            "maxLng": -89.4919
        }
    },
    {
        "code": "MO",
        "name": "Missouri",
        "lat": 38.4623,
        "lng": -92.302,
        "bounds": {
            "minLat": 35.9958,
            "minLng": -95.7527,
            "maxLat": 40.6181,
            "maxLng": -89.1005
        }
    },
    {
        "code": "MS",
        "name": "Mississippi",
        "lat": 32.7673,
        "lng": -89.6812,
        "bounds": {
            "minLat": 30.0905,
            "minLng": -91.6589,
            "maxLat": 35.0075,
            "maxLng": -88.0994
        }
    },
    {
        "code": "MT",
        "name": "Montana",
        "lat": 46.9048,
        "lng": -110.3261,
        "bounds": {
            "minLat": 44.3563,
            "minLng": -116.0458,
            "maxLat": 48.9991,
            "maxLng": -104.0186
        }
    },
    {
        "code": "NC",
        "name": "North Carolina",
        "lat": 35.6411,
        "lng": -79.8431,
        "bounds": {
            "minLat": 33.7666,
            "minLng": -84.3201,
            "maxLat": 36.588,
            "maxLng": -75.4129
        }
    },
    {
        "code": "ND",
        "name": "North Dakota",
        "lat": 47.5362,
        "lng": -99.793,
        "bounds": {
            "minLat": 45.934,
            "minLng": -104.0501,
            "maxLat": 48.9982,
            "maxLng": -96.5671
        }
    },
    {
        "code": "NE",
        "name": "Nebraska",
        "lat": 41.1289,
        "lng": -98.2883,
        "bounds": {
            "minLat": 39.9992,
            "minLng": -104.0543,
            "maxLat": 43.0006,
            "maxLng": -95.3091
        }
    },
    {
        "code": "NH",
        "name": "New Hampshire",
        "lat": 43.4108,
        "lng": -71.5653,
        "bounds": {
            "minLat": 42.6986,
            "minLng": -72.5592,
            "maxLat": 45.3058,
            "maxLng": -70.5583
        }
    },
    {
        "code": "NJ",
        "name": "New Jersey",
        "lat": 40.314,
        "lng": -74.5089,
        "bounds": {
            "minLat": 38.8472,
            "minLng": -75.5708,
            "maxLat": 41.3593,
            "maxLng": -73.8885
        }
    },
    {
        "code": "NM",
        "name": "New Mexico",
        "lat": 34.8375,
        "lng": -106.2371,
        "bounds": {
            "minLat": 31.3337,
            "minLng": -109.0489,
            "maxLat": 36.9982,
            "maxLng": -103.0023
        }
    },
    {
        "code": "NV",
        "name": "Nevada",
        "lat": 38.4199,
        "lng": -117.1219,
        "bounds": {
            "minLat": 35.003,
            "minLng": -120.0037,
            "maxLat": 42.0003,
            "maxLng": -114.0436
        }
    },
    {
        "code": "NY",
        "name": "New York",
        "lat": 42.1497,
        "lng": -74.9384,
        "bounds": {
            "minLat": 40.4772,
            "minLng": -79.7624,
            "maxLat": 45.0153,
            "maxLng": -71.7517
        }
    },
    {
        "code": "OH",
        "name": "Ohio",
        "lat": 40.3736,
        "lng": -82.7755,
        "bounds": {
            "minLat": 38.3761,
            "minLng": -84.8172,
            "maxLat": 42.321,
            "maxLng": -80.5188
        }
    },
    {
        "code": "OK",
        "name": "Oklahoma",
        "lat": 35.5376,
        "lng": -96.9247,
        "bounds": {
            "minLat": 33.6386,
            "minLng": -103.0064,
            "maxLat": 37.0015,
            "maxLng": -94.4357
        }
    },
    {
        "code": "OR",
        "name": "Oregon",
        "lat": 44.5672,
        "lng": -122.1269,
        "bounds": {
            "minLat": 41.9952,
            "minLng": -124.7305,
            "maxLat": 46.2891,
            "maxLng": -116.4606
        }
    },
    {
        "code": "PA",
        "name": "Pennsylvania",
        "lat": 40.5773,
        "lng": -77.264,
        "bounds": {
            "minLat": 39.7199,
            "minLng": -80.5243,
            "maxLat": 42.5167,
            "maxLng": -74.707
        }
    },
    {
        "code": "RI",
        "name": "Rhode Island",
        "lat": 41.6772,
        "lng": -71.5101,
        "bounds": {
            "minLat": 41.1849,
            "minLng": -71.9041,
            "maxLat": 42.0156,
            "maxLng": -71.0541
        }
    },
    {
        "code": "SC",
        "name": "South Carolina",
        "lat": 33.8191,
        "lng": -80.9066,
        "bounds": {
            "minLat": 32.0453,
            "minLng": -83.3588,
            "maxLat": 35.2075,
            "maxLng": -78.4836
        }
    },
    {
        "code": "SD",
        "name": "South Dakota",
        "lat": 44.2853,
        "lng": -99.4632,
        "bounds": {
            "minLat": 42.4772,
            "minLng": -104.0529,
            "maxLat": 45.9435,
            "maxLng": -96.438
        }
    },
    {
        "code": "TN",
        "name": "Tennessee",
        "lat": 35.7449,
        "lng": -86.7489,
        "bounds": {
            "minLat": 34.9884,
            "minLng": -90.3131,
            "maxLat": 36.6871,
            "maxLng": -81.6518
        }
    },
    {
        "code": "TX",
        "name": "Texas",
        "lat": 31.106,
        "lng": -97.6475,
        "bounds": {
            "minLat": 25.8419,
            "minLng": -106.6168,
            "maxLat": 36.5008,
            "maxLng": -93.5074
        }
    },
    {
        "code": "UT",
        "name": "Utah",
        "lat": 40.1135,
        "lng": -111.8535,
        "bounds": {
            "minLat": 36.9982,
            "minLng": -114.0504,
            "maxLat": 41.9993,
            "maxLng": -109.0462
        }
    },
    {
        "code": "VA",
        "name": "Virginia",
        "lat": 37.768,
        "lng": -78.2057,
        "bounds": {
            "minLat": 36.5427,
            "minLng": -83.6753,
            "maxLat": 39.4659,
            "maxLng": -74.9707
        }
    },
    {
        "code": "VT",
        "name": "Vermont",
        "lat": 44.0407,
        "lng": -72.7093,
        "bounds": {
            "minLat": 42.7289,
            "minLng": -73.4381,
            "maxLat": 45.0153,
            "maxLng": -71.4949
        }
    },
    {
        "code": "WA",
        "name": "Washington",
        "lat": 47.3917,
        "lng": -121.5708,
        "bounds": {
            "minLat": 45.5439,
            "minLng": -124.8679,
            "maxLat": 49.0027,
            "maxLng": -116.9165
        }
    },
    {
        "code": "WI",
        "name": "Wisconsin",
        "lat": 44.2563,
        "lng": -89.6385,
        "bounds": {
            "minLat": 42.4954,
            "minLng": -92.8564,
            "maxLat": 47.31,
            "maxLng": -86.2523
        }
    },
    {
        "code": "WV",
        "name": "West Virginia",
        "lat": 38.468,
        "lng": -80.9696,
        "bounds": {
            "minLat": 37.1953,
            "minLng": -82.6392,
            "maxLat": 40.6338,
            "maxLng": -77.731
        }
    },
    {
        "code": "WY",
        "name": "Wyoming",
        "lat": 42.7475,
        "lng": -107.2085,
        "bounds": {
            "minLat": 40.9986,
            "minLng": -111.0539,
            "maxLat": 44.9998,
            "maxLng": -104.0556
        }
    }
];

const stateMap = {};
states.forEach((state) => stateMap[state.code] = state);

module.exports = {
    statesByCode: stateMap,
    states: states,
};