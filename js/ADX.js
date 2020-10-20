    var xADX = techan.scale.financetime()
            .range([0, width]);

    var yADX = d3.scaleLinear()
            .range([height, 0]);

    var adx = techan.plot.adx()
            .xScale(xADX)
            .yScale(yADX);

    var xAxisADX = d3.axisBottom(xADX);

    var yAxisADX = d3.axisLeft(yADX)
            .tickFormat(d3.format(",.3s"));

    var svgADX = d3.select(".layout").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("class","ACD")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("../data/"+stockName.nameNumber + ".csv", function(error, dataADX) {
        var accessorADX = adx.accessor();

        dataADX = dataADX.map(function(d) {
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
        }).sort(function(a, b) { return d3.ascending(accessorADX.d(a), accessorADX.d(b)); });

        svgADX.append("g")
                .attr("class", "adx");

        svgADX.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")");

        svgADX.append("g")
                .attr("class", "y axis")
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Average Directional Index");

        // Data to display initially
        drawADX(dataADX.slice(0, dataADX.length-20));
    });

    function drawADX(dataADX) {
        var adxData = techan.indicator.adx()(dataADX);
        xADX.domain(adxData.map(adx.accessor().d));
        yADX.domain(techan.scale.plot.adx(adxData).domain());

        svgADX.selectAll("g.adx").datum(adxData).call(adx);
        svgADX.selectAll("g.x.axis").call(xAxisADX);
        svgADX.selectAll("g.y.axis").call(yAxisADX);
    }