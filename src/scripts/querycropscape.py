import requests
import urllib
import time
import json
import csv

queryPayload = {
	"EnvironmentVariableName": "CropScape",
	"Domain": {
		"Mask": None,
		"SpatialRegionType": "CellGrid",
		"Lats": [ 29.1462, 30.348708333333335, 30.551116666666665, 30.753525 ],
		"Lons": [ -88.4743, -88.32506666666667, -88.17583333333333, -88.0266 ],
		"Lats2": None,
		"Lons2": None,
		"TimeRegion": {
			"Years": [ 2014 ],
			"Days": [ 1, 366 ],
			"Hours": [ 0, 24 ],
			"IsIntervalsGridYears": False,
			"IsIntervalsGridDays": True,
			"IsIntervalsGridHours": True
			}
		},
	"ParticularDataSources": {},
	"ReproducibilityTimestamp": 253404979199999
}

def fcRequest(req):
	def waitForData(result):
		if result.startswith('"completed'):
			return result
		else:
			hash = query[query.index("hash=") + 5:]
			while True:
				result = requests.get("http://fetchclimate2-dev.cloudapp.net/api/status?hash=" + hash).text
				if result.startswith('"completed'):
					return result
				time.sleep(4)
	def getData(query):
		blob = query[query.index("Blob=") + 5:-1]
		result = requests.get("http://fetchclimate2-dev.cloudapp.net/jsproxy/data?uri=" + urllib.parse.quote_plus( "msds:ab?AccountName=fc2cache&Container=requests&Blob=" + blob) + "&variables=lat,lon,values").text
		return result
	def compute():
		r = requests.post("http://fetchclimate2-dev.cloudapp.net/api/compute", data=json.dumps(req), headers = {'content-type': 'application/json'})
		return r.text
	query = compute()
	print (query)
	query = waitForData(query)
	print ("waited for data: " + query)
	return getData(query)

fakelats = [25.3,25.3,25.3]
fakelons = [-80.95,-80.65,-80.35]

#this file has a bunch of points that span the US for potential query parameters.
#with open('/home/bryan/data/testing.csv', 'r') as ifile:
#	reader = csv.reader(ifile)
#	next(reader)
#	for (lat,lon) in reader:
#		print (lat, lon)
#		queryPayload["Domain"]["Lats"] = fakelats
#		queryPayload["Domain"]["Lons"] = fakelons
#		queryData = fcRequest(queryPayload)
#		print (queryData)
#		break
#
#print()
#json

queryPayload["Domain"]["Lats"] = fakelats
queryPayload["Domain"]["Lons"] = fakelons
print (json.dumps(queryPayload))
queryData = fcRequest(queryPayload)
print (queryData)
