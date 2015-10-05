(function (global) {

    var util = global.usda.util;
    var dateFormat = d3.time.format("%m/%d/%y");
    var numeric = ['lat', 'lon', 'high', 'low', 'elevation'];
    var startDate = new Date('2015-01-01');
    var endDate = new Date('2015-12-31');


    var Dashboard = function (dataUrl) {

        var nameKeys = {}; //map these to IDs for labeling later (there is probably a better crossfilter way to do this)

        d3.csv(dataUrl,
            //accessor function cleans up each row as it is read from csv
            function (d) {

                nameKeys[d.id] = d.name;

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

                return row;
            },
            function(err, data) {

                var index = crossfilter(data);
                var all = index.groupAll();

                var stations = index.dimension(function(d) { return d.id; });
                var dates = index.dimension(function(d) { return d3.time.day(d.date); });
                var locations = index.dimension(function(d) { return d.location; });

                var dateGroup = dates.group();
                var stationGroup = stations.group();

                var locationsGroup = stations.group().reduce(
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
                    .colors(['#339966'])
                    .group(stations.group())
                    .dimension(stations)
                    .label(function (p) {
                        return nameKeys[p.key];
                    })
                    .elasticX(true)
                    .gap(2)
                    .ordering(function(i){return -i.value;})
                    .labelOffsetY(8)
                    .xAxis().ticks(3);

                stationsChart.on("postRedraw", function (e) {

                    console.log(stationGroup.all());
                    console.log(locations.top(Infinity));
                    console.log(locations.top(Infinity).length);
                    console.log(locationsGroup.top(Infinity));
                });


                var dateChart = dc.lineChart("#date-chart");
                dateChart
                    .width($('#date-chart').innerWidth()-30)
                    .height(200)
                    .margins({top: 10, left:30, right: 10, bottom:20})
                    .x(d3.time.scale().domain([startDate, endDate]))
                    .colors(['#339966'])
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
                            .colors(['orange'])
                            .valueAccessor(function (d) {
                                return d.value.avg;
                            }),
                        dc.lineChart(tempChart)
                            .group(lowGroup)
                            .colors(['blue'])
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

        });

    };

    global.usda.Dashboard = Dashboard;

}(this));