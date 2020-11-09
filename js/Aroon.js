
    function Aroon(stockName){
        var margin = {top: 20, right: 50, bottom: 30, left: 50},
        width = 780 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;
        var parseDate = d3.timeParse("%d-%b-%y");
        var xAroon = techan.scale.financetime()
            .range([0, width]);

        var yAroon = d3.scaleLinear()
            .range([height, 0]);
        var aroon = techan.plot.aroon()
                .xScale(xAroon)
                .yScale(yAroon);

        var xAxisAroon = d3.axisBottom(xAroon);

        var yAxisAroon = d3.axisLeft(yAroon);
        var accessorAroon = aroon.accessor();

        var svgAroon = d3.select(".layout").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .attr("class","Aroon")
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        d3.csv("../data/"+stockName.nameNumber + ".csv", function(error, dataAroon) {
            dataAroon = dataAroon.map(function(d) {
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
            }).sort(function(a, b) { return d3.ascending(accessorAroon.d(a), accessorAroon.d(b)); });

            svgAroon.append("g")
                    .attr("class", "aroon");

            svgAroon.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")");

            svgAroon.append("g")
                    .attr("class", "y axis")
                    .append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 6)
                    .attr("dy", ".71em")
                    .style("text-anchor", "end")
                    .text("Aroon");

            // data to display initially
            drawAroon(dataAroon.slice(0, dataAroon.length-20));
        });

        function drawAroon(dataAroon) {
            var aroonData = techan.indicator.aroon()(dataAroon);
            xAroon.domain(aroonData.map(accessorAroon.d));
            yAroon.domain(techan.scale.plot.aroon().domain());

            svgAroon.selectAll("g.aroon").datum(aroonData).call(aroon);
            svgAroon.selectAll("g.x.axis").call(xAxisAroon);
            svgAroon.selectAll("g.y.axis").call(yAxisAroon);
        }
    }