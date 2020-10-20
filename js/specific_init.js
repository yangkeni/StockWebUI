var stockSearch = window.location.search.substr(8);
var jqxhr = $.get('https://api.doctorxiong.club/v1/stock', {
    code: stockSearch
}).done(function (stock) {
    console.log('成功, 收到的数据: ' + JSON.stringify(stock));
    $('head title').text(stock.data[0].name);
    $('.title h3').text(stock.data[0].name);
    $('.title span').text(stock.data[0].code);
    let price = stock.data[0].price,
        amount = stock.data[0].priceChange,
        open = stock.data[0].open,
        close = stock.data[0].close,
        range = stock.data[0].changePercent,
        high = stock.data[0].high,
        low = stock.data[0].low,
        totalVolume = stock.data[0].volume,
        turnover = stock.data[0].turnover;
    /*priceInfo的基本资料*/
    let temp;
    temp = price.split(".");
    $('.price').html(temp[0]+". <span>" + temp[1] + "</span>");
    temp = amount.split(".");
    $('.amount').html(temp[0]+". <span>" + temp[1] + "</span>");
    temp = range.split(".");
    $('.range').html("(" + temp[0]+". <span>" + temp[1] + "</span>%)");
    if (parseFloat(price) > parseFloat(close)){
        $('.price').addClass("color-red");
        $('.amount').addClass("color-red");
        $('.range').addClass("color-red");
        $('.price+i').addClass("fa-arrow-up");
    }else if(parseFloat(price) < parseFloat(close)){
        $('.price').addClass("color-green");
        $('.amount').addClass("color-green");
        $('.range').addClass("color-green");
        $('.price+i').addClass("fa-arrow-down");
    }
    /*otherInfo 的基本资料*/
    /*上半部分 */
    $('.open+td').text(open);
    if (parseFloat(open) > parseFloat(close)){
        $('.open+td').addClass("color-red");
    }else if(parseFloat(open) < parseFloat(close)){
        $('.open+td').addClass("color-green");
    }
    $('.high+td').text(high);
    if (parseFloat(high) > parseFloat(close)){
        $('.high+td').addClass("color-red");
    }else if(parseFloat(high) < parseFloat(close)){
        $('.high+td').addClass("color-green");
    }
    let limitUp = (((parseFloat(close))*1.1).toFixed(2)).toString();
    $('.limitUp+td').text(limitUp);
    $('.totalVolume+td>span').text(totalVolume);
    /*下半部分 */
    $('.close+td').text(close);
    $('.low+td').text(low);
    if (parseFloat(low) > parseFloat(close)){
        $('.low+td').addClass("color-red");
    }else if(parseFloat(low) < parseFloat(close)){
        $('.low+td').addClass("color-green");
    }
    let limitDown = (((parseFloat(close))*0.9).toFixed(2)).toString();
    $('.limitDown+td').text(limitDown);
    $('.turnover+td>span').text(turnover);
});
