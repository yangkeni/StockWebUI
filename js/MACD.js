
    var xMACD = techan.scale.financetime()
        .range([0, width]);

    var yMACD = d3.scaleLinear()
        .range([height, 0]);
    var macd = techan.plot.macd()
            .xScale(xMACD)
            .yScale(yMACD);

    var xAxisMACD = d3.axisBottom(xMACD);

    var yAxisMACD = d3.axisLeft(yMACD);
    var svgMACD = d3.select(".layout").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("class","MACD")
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("../data/"+stockName.nameNumber + ".csv", function(error, dataMACD) {
        var accessorMACD = macd.accessor();

        dataMACD = dataMACD.slice(0, 200).map(function(d) {
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
        }).sort(function(a, b) { return d3.ascending(accessorMACD.d(a), accessorMACD.d(b)); });

        svgMACD.append("g")
                .attr("class", "macd");

        svgMACD.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")");

        svgMACD.append("g")
                .attr("class", "y axis")
            .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("MACD");

        // Data to display initially
        drawMACD(dataMACD.slice(0, dataMACD.length-20));
    });

    function drawMACD(dataMACD) {
        var macdData = techan.indicator.macd()(dataMACD);
        xMACD.domain(macdData.map(macd.accessor().d));
        yMACD.domain(techan.scale.plot.macd(macdData).domain());

        svgMACD.selectAll("g.macd").datum(macdData).call(macd);
        svgMACD.selectAll("g.x.axis").call(xAxisMACD);
        svgMACD.selectAll("g.y.axis").call(yAxisMACD);
    }