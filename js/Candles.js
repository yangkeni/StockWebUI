        
        
    function Candles(stockName){
        function enter() {
                coordsText.style("display", "inline");
        }

        function out() {
                coordsText.style("display", "none");
        }

        function move(coords) {
                coordsText.text(
                timeAnnotation.format()(coords.xCandles) + ", " + ohlcRightAnnotation.format()(coords.yCandles)
                );
        }
        var margin = {top: 20, right: 50, bottom: 30, left: 50},
                        width = 780 - margin.left - margin.right,
                        height = 300 - margin.top - margin.bottom;
                var parseDate = d3.timeParse("%d-%b-%y");

        var xCandles = techan.scale.financetime()
                .range([0, width]);

        var yCandles = d3.scaleLinear()
                .range([height, 0]);

        var candlestick = techan.plot.candlestick()
                .xScale(xCandles)
                .yScale(yCandles);

        var yPercent = yCandles.copy();   // Same as y at this stage, will get a different domain later

        var yInit, yPercentInit, zoomableInit;
                
        var xAxisCandles = d3.axisBottom(xCandles);

        var yAxisCandles = d3.axisLeft(yCandles);

        var yRightAxisCandles = d3.axisRight(yCandles);

        var percentAxis = d3.axisLeft(yPercent)
                .tickFormat(d3.format('+.1%'));

        var percentAnnotation = techan.plot.axisannotation()
                .axis(percentAxis)
                .orient('left');
                
        
        var ohlcRightAnnotation = techan.plot.axisannotation()
                .axis(yRightAxisCandles)
                .orient('right')
                .format(d3.format(',.2f'))
                .translate([width, 0]);

        var timeAnnotation = techan.plot.axisannotation()
                .axis(xAxisCandles)
                .orient('bottom')
                .format(d3.timeFormat('%Y-%m-%d'))
                .width(65)
                .translate([0, height]);

        var crosshairCandles = techan.plot.crosshair()
                .xScale(xCandles)
                .yScale(yCandles)
                .xAnnotation([timeAnnotation])
                .yAnnotation([percentAnnotation, ohlcRightAnnotation])
                .on("enter", enter)
                .on("out", out)
                .on("move", move);

        var svgCandles = d3.select(".layout").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .attr("class","Candles")
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var coordsText = svgCandles.append('text')
                .style("text-anchor", "end")
                .attr("class", "coords")
                .attr("x", width - 15)
                .attr("y", 5);

        
        d3.csv("../data/"+stockName.nameNumber + ".csv", function(error, dataCandles) {
                if (error){
                        sleep(3000);
                        location.reload(true);
                }
                var accessorCandles = candlestick.accessor();

                dataCandles = dataCandles.slice(0, 200).map(function(d) {
                return {
                        date: parseDate(d.Date),
                        open: +d.Open,
                        high: +d.High,
                        low: +d.Low,
                        close: +d.Close,
                        volume: +d.Volume
                };
                }).sort(function(a, b) { return d3.ascending(accessorCandles.d(a), accessorCandles.d(b)); });

                xCandles.domain(dataCandles.map(accessorCandles.d));
                yCandles.domain(techan.scale.plot.ohlc(dataCandles, accessorCandles).domain());

                svgCandles.append("g")
                        .datum(dataCandles)
                        .attr("class", "candlestick")
                        .call(candlestick);

                svgCandles.append("g")
                        .attr("class", "x axis")
                        .attr("transform", "translate(0," + height + ")")
                        .call(xAxisCandles);

                svgCandles.append("g")
                        .attr("class", "y axis")
                        .call(percentAxis);

                svgCandles.append("g")
                        .attr("class", "y axis")
                        .attr("transform", "translate(" + width + ",0)")
                        .call(yRightAxisCandles);

                svgCandles.append('g')
                        .attr("class", "crosshair")
                        .datum({ xCandles: xCandles.domain()[80], yCandles: 67.5 })
                        .call(crosshairCandles)
                        .each(function(d) { move(d); }); // Display the current data

                svgCandles.append('text')
                        .attr("x", 5)
                        .attr("y", 15)
                        .text(stockName.nameZh + " （" + stockName.nameNumber + "）");
        });
    }
    