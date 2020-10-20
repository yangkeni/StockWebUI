    var xWR = techan.scale.financetime()
            .range([0, width]);

    var yWR = d3.scaleLinear()
            .range([height, 0]);

    var williams = techan.plot.williams()
            .xScale(xWR)
            .yScale(yWR);

    var xAxisWR = d3.axisBottom(xWR);

    var yAxisWR = d3.axisLeft(yWR)
            .tickFormat(d3.format(",.3s"));

    var svgWR = d3.select(".layout").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("class","WR")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("../data/"+stockName.nameNumber + ".csv", function(error, dataWR) {
        var accessorWR = williams.accessor();

        dataWR = dataWR.map(function(d) {
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
        }).sort(function(a, b) { return d3.ascending(accessorWR.d(a), accessorWR.d(b)); });

        svgWR.append("g")
                .attr("class", "williams");

        svgWR.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")");

        svgWR.append("g")
                .attr("class", "y axis")
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("William %R");

        // Data to display initially
        drawWR(dataWR.slice(0, dataWR.length-20));
    });

    function drawWR(dataWR) {
        var williamsData = techan.indicator.williams()(dataWR);
        xWR.domain(williamsData.map(williams.accessor().d));
        yWR.domain(techan.scale.plot.williams().domain());

        svgWR.selectAll("g.williams").datum(williamsData).call(williams);
        svgWR.selectAll("g.x.axis").call(xAxisWR);
        svgWR.selectAll("g.y.axis").call(yAxisWR);
    }