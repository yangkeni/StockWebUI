
    function Volume(stockName){
        var margin = {top: 20, right: 50, bottom: 30, left: 50},
        width = 780 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;
        var parseDate = d3.timeParse("%d-%b-%y");
        var xVolume = techan.scale.financetime()
                .range([0, width]);

        var yVolume = d3.scaleLinear()
                .range([height, 0]);

        var volume = techan.plot.volume()
                .accessor(techan.accessor.ohlc())   // For volume bar highlighting
                .xScale(xVolume)
                .yScale(yVolume);
        
        var xAxisVolume = d3.axisBottom(xVolume);

        var yAxisVolume = d3.axisLeft(yVolume);
                /*十字准线
        var volumeAnnotation = techan.plot.axisannotation()
                .axis(yAxisVolume)
                .orient('left');*/

        /*十字准线
        var crosshairVolume = techan.plot.crosshair()
                .xScale(xVolume)
                .yScale(yVolume)
                .xAnnotation([timeAnnotation])
                .yAnnotation([volumeAnnotation])
                .on("enter", enterVolume)
                .on("out", outVolume)
                .on("move", moveVolume);*/

        var svgVolume = d3.select(".layout").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .attr("class","Volume")
            .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
                /*十字准线
        var coordsTextVolume = svgVolume.append('text')
                .style("text-anchor", "end")
                .attr("class", "coords")
                .attr("xVolume", width - 15)
                .attr("yVolume", 5);

    */
        
        d3.csv("../data/"+stockName.nameNumber + ".csv", function(error, dataVolume) {
            var accessorVolume = volume.accessor();

            dataVolume = dataVolume.slice(0, 200).map(function(d) {
                // Open, high, low, close generally not required, is being used here to demonstrate colored volume
                // bars
                return {
                    date: parseDate(d.Date),
                    volume: +d.Volume,
                    open: +d.Open,
                    high: +d.High,
                    low: +d.Low,
                    close: +d.Close
                };
            }).sort(function(a, b) { return d3.ascending(accessorVolume.d(a), accessorVolume.d(b)); });

            svgVolume.append("g")
                    .attr("class", "volume");

            svgVolume.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")");

            svgVolume.append("g")
                    .attr("class", "y axis")
                .append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 6)
                    .attr("dy", ".71em")
                    .style("text-anchor", "end")
                    .text("Volume");
            /*十字准线
            svgVolume.append('g')
                    .attr("class", "crosshair")
                    .datum({ xVolume: xVolume.domain()[80], yVolume: 67.5 })
                    .call(crosshairVolume)
                    .each(function(d) { move(d); }); // Display the current data*/
            // Data to display initially
            drawVolume(dataVolume.slice(0, dataVolume.length-20));
        });

        function drawVolume(dataVolume) {
            xVolume.domain(dataVolume.map(volume.accessor().d));
            yVolume.domain(techan.scale.plot.volume(dataVolume, volume.accessor().v).domain());

            svgVolume.selectAll("g.volume").datum(dataVolume).call(volume);
            svgVolume.selectAll("g.x.axis").call(xAxisVolume);
            svgVolume.selectAll("g.y.axis").call(yAxisVolume);
        }
    }