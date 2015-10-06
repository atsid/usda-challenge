(function (global) {

    var util = global.usda.util;
    var dateFormat = d3.time.format("%m/%d/%y");
    var numeric = ['lat', 'lon', 'high', 'low', 'elevation'];
    var startDate = new Date('2015-01-01');
    var endDate = new Date('2015-12-31');

    var colors = {
        main: ['orchid'],
        highTemp: ['orange'],
        lowTemp: ['lightblue']
    };


    var Dashboard = function (dataUrl, map) {

        var that = this;
        this.locations = {}; //TEMP: hold unique stations for compiling list of lat/longs

        d3.csv(dataUrl,
            //accessor function cleans up each row as it is read from csv
            function (d) {

                var row = {
                    id: d.id,
                    name: d.name,
                    date: dateFormat.parse(d.date)
                };
                numeric.forEach(function (key) {
                    row[key] = parseFloat(d[key]);
                });
                row.location = {
                    latitude: row.lat,
                    longitude: row.lon
                };

                that.locations[d.id] = row.location;

                return row;
            },
            function(err, data) {

                var index = crossfilter(data);
                var all = index.groupAll();

                var stations = index.dimension(function(d) { return d.id; });
                var dates = index.dimension(function(d) { return d3.time.day(d.date); });
                var locations = index.dimension(function(d) { return d.location; });

                var dateGroup = dates.group();
                var stationGroup = stations.group().reduce(
                    util.reducers.location.add(),
                    util.reducers.location.remove(),
                    util.reducers.location.init()
                );

                var highGroup = dates.group().reduce(
                    util.reducers.average.add('high'),
                    util.reducers.average.remove('high'),
                    util.reducers.average.init()
                );

                var lowGroup = dates.group().reduce(
                    util.reducers.average.add('low'),
                    util.reducers.average.remove('low'),
                    util.reducers.average.init()
                );


                var stationsChart = dc.rowChart("#stations-chart");
                stationsChart
                    .width($('#stations-chart').innerWidth()-30)
                    .height(200)
                    .margins({top: 10, left:5, right: 10, bottom:20})
                    .colors(colors.main)
                    .group(stationGroup)
                    .dimension(stations)
                    .label(function (d) {
                        return d.value.label;
                    })
                    .valueAccessor(function (d) {
                        return d.value.count;
                    })
                    .elasticX(true)
                    .gap(2)
                    .ordering(function(i){return -i.value;})
                    .labelOffsetY(8)
                    .xAxis().ticks(3);

                stationsChart.on("postRedraw", function (e) {
                    console.log(stationGroup.all());
                    console.log(stationGroup.all().length + ' stations');
                    console.log(locations.top(Infinity));
                    console.log(locations.top(Infinity).length + ' locations');

                });


                var dateChart = dc.lineChart("#date-chart");
                dateChart
                    .width($('#date-chart').innerWidth()-30)
                    .height(200)
                    .margins({top: 10, left:30, right: 10, bottom:20})
                    .x(d3.time.scale().domain([startDate, endDate]))
                    .colors(colors.main)
                    .dimension(dates)
                    .group(dateGroup)
                    .renderArea(true);


                //composite chart - set shared values, then use `compose` to add individual graphs
                var tempChart = dc.compositeChart("#temp-chart");
                tempChart
                    .width($('#temp-chart').innerWidth()-30)
                    .height(200)
                    .margins({top: 10, left:30, right: 10, bottom:20})
                    .x(d3.time.scale().domain([startDate, endDate]))
                    .dimension(dates)
                    .compose([
                        dc.lineChart(tempChart)
                            .group(highGroup)
                            .colors(colors.highTemp)
                            .valueAccessor(function (d) {
                                return d.value.avg;
                            }),
                        dc.lineChart(tempChart)
                            .group(lowGroup)
                            .colors(colors.lowTemp)
                            .valueAccessor(function (d) {
                                return d.value.avg;
                            })
                    ]);


                var dataTable = dc.dataTable("#data-table");
                dataTable
                    .dimension(dates)
                    .group(function (d) {
                        return d.name;
                    })
                    .size(100) // (optional) max number of records to be shown, :default = 25
                    .columns([
                        function(d) { return d.date; },
                        function(d) { return d.high; },
                        function(d) { return d.low; },
                        function(d) { return d.lat; },
                        function(d) { return d.lon; },
                        function(d) { return d.elevation; }
                    ])
                    .sortBy( function(d) { return d.date; })
                    .order(d3.descending);

                global.stationsChart = stationsChart;
                global.dateChart = dateChart;
                global.tempChart = tempChart;
                global.dataTable = dataTable;


                dc.renderAll();


                //XXX: connecting these via direct access to the map is a temporary kludge. it also doesn't filter
                //TODO: event on point clicks to filter dashboard data
                Object.keys(that.locations).forEach(function (id) {
                    var location = that.locations[id];
                    var latLng = new google.maps.LatLng(
                        location.latitude,
                        location.longitude
                    );
                    var featureOptions = {
                        geometry: new google.maps.Data.Point(latLng),
                        properties: {id: id}
                    };
                    var feature = new google.maps.Data.Feature(featureOptions);
                    console.log(feature);
                    map.map.data.add(feature);
                });

                map.map.data.addListener('click', function(event) {
                    console.log('clicked point', event);
                    console.log('station: ' + event.feature.getProperty('id'));
                });

        });

    };

    global.usda.Dashboard = Dashboard;

}(this));