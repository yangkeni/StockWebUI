var jqxhrTop = $.get('https://api.doctorxiong.club/v1/stock/hot',{
}).done(function (stock){
    for (let i =0;i <3 ;i++){
        let topNo = "#topNo"+(i+1) +" ";
        $(topNo+'.StockName h3').text(stock.data[i].name);
        $(topNo+'.StockName span').text(stock.data[i].code);
        let price = stock.data[i].price,
            amount = stock.data[i].priceChange,
            close = stock.data[i].close,
            range = stock.data[i].changePercent;
        /*priceInfo的基本资料*/
        let temp;
        temp = price.split(".");
        $(topNo+'.price').html(temp[0]+". <span>" + temp[1] + "</span>");
        temp = amount.split(".");
        $(topNo+'.amount').html(temp[0]+". <span>" + temp[1] + "</span>");
        temp = range.split(".");
        $(topNo+'.range').html("(" + temp[0]+". <span>" + temp[1] + "</span>%)");
        if (parseFloat(price) > parseFloat(close)){
            $(topNo+'.price').addClass("color-red");
            $(topNo+'.amount').addClass("color-red");
            $(topNo+'.range').addClass("color-red");
        }else if(parseFloat(price) < parseFloat(close)){
            $(topNo+'.price').addClass("color-green");
            $(topNo+'.amount').addClass("color-green");
            $(topNo+'.range').addClass("color-green");
        }
    }
    $.get('https://api.doctorxiong.club/v1/stock?code=sh000001&code=sz399001&code=sz399006&code=sh600519&code=sz000858',{
    }).done(function (stock1){
        for (let i =0;i < 5 ;i++){
            let price = stock1.data[i].price,
                amount = stock1.data[i].priceChange,
                open = stock1.data[i].open,
                close = stock1.data[i].close,
                range = stock1.data[i].changePercent,
                high = stock1.data[i].high,
                low = stock1.data[i].low;
            let temp;
            if ( i < 3){
                let indexN = "#index"+(i+1)+" td";
                temp = amount.split(".");
                $($(indexN)[1]).html(temp[0]+". <span>" + temp[1] + "</span>");
                temp = price.split(".");
                $($(indexN)[3]).html(temp[0]+". <span>" + temp[1] + "</span>");
                temp = range.split(".");
                $($(indexN)[2]).html("(" + temp[0]+". <span>" + temp[1] + "</span>%)");
                if (parseFloat(amount) > 0){
                    $($(indexN)[1]).addClass("color-red");
                    $($(indexN)[2]).addClass("color-red");
                    $($(indexN)[3]).addClass("color-red");
                }else if(parseFloat(amount) < 0){
                    $($(indexN)[1]).addClass("color-green");
                    $($(indexN)[2]).addClass("color-green");
                    $($(indexN)[3]).addClass("color-green");
                }
            }else{
                let optionN = "#option"+(i-2) +" ";
                temp = price.split(".");
                $(optionN+'.price').html(temp[0]+". <span>" + temp[1] + "</span>");
                temp = amount.split(".");
                $(optionN+'.amount').html(temp[0]+". <span>" + temp[1] + "</span>");
                temp = range.split(".");
                $(optionN+'.range').html("(" + temp[0]+". <span>" + temp[1] + "</span>%)");
                if (parseFloat(price) > parseFloat(close)){
                    $(optionN+'.price').addClass("color-red");
                    $(optionN+'.amount').addClass("color-red");
                    $(optionN+'.range').addClass("color-red");
                }else if(parseFloat(price) < parseFloat(close)){
                    $(optionN+'.price').addClass("color-green");
                    $(optionN+'.amount').addClass("color-green");
                    $(optionN+'.range').addClass("color-green");
                }
                let optionOther = optionN+".otherInfo span";
                $($(optionOther)[0]).text(open);
                if ( parseFloat(open) > parseFloat(close)){
                    $($(optionOther)[0]).addClass("color-red");
                }else if(parseFloat(open) < parseFloat(close)){
                    $($(optionOther)[0]).addClass("color-green");
                }
                $($(optionOther)[1]).text(high);
                if (parseFloat(high) > parseFloat(close)){
                    $($(optionOther)[1]).addClass("color-red");
                }else if(parseFloat(high) < parseFloat(close)){
                    $($(optionOther)[1]).addClass("color-green");
                }
                $($(optionOther)[2]).text(close);
                $($(optionOther)[3]).text(low);
                if (parseFloat(low) > parseFloat(close)){
                    $($(optionOther)[2]).addClass("color-red");
                }else if(parseFloat(low) < parseFloat(close)){
                    $($(optionOther)[3]).addClass("color-green");
                }
            }
            
        }
        $.get('https://api.doctorxiong.club/v1/stock/industry/rank',{
        }).done(function (industry){
            let industryN = $('.recommendContent .recommendTheme span');
            $(industryN[0]).text(industry.data[0].name);
            $(industryN[1]).text(industry.data[1].name);
            let industry0stock = industry.data[0].stockCode;
            let industry1stock = industry.data[1].stockCode;
            $.get('https://api.doctorxiong.club/v1/stock?code='+industry0stock+'&code='+industry1stock,{
            }).done(function (industryStock){
                console.log(JSON.stringify(industryStock));
                for (let i =0;i <2 ;i++){
                    let industryNo = "#industryNo"+(i+1) +" ";
                    $(industryNo+'.title h3').text(industryStock.data[i].name);
                    $(industryNo+'.title span').text(industryStock.data[i].code);
                    let price = industryStock.data[i].price,
                        amount = industryStock.data[i].priceChange,
                        close = industryStock.data[i].close,
                        range = industryStock.data[i].changePercent;
                    /*priceInfo的基本资料*/
                    let temp;
                    temp = price.split(".");
                    $(industryNo+'.price').html(temp[0]+". <span>" + temp[1] + "</span>");
                    temp = amount.split(".");
                    $(industryNo+'.amount').html(temp[0]+". <span>" + temp[1] + "</span>");
                    temp = range.split(".");
                    $(industryNo+'.range').html("(" + temp[0]+". <span>" + temp[1] + "</span>%)");
                    if (parseFloat(price) > parseFloat(close)){
                        $(industryNo+'.price').addClass("color-red");
                        $(industryNo+'.amount').addClass("color-red");
                        $(industryNo+'.range').addClass("color-red");
                    }else if(parseFloat(price) < parseFloat(close)){
                        $(industryNo+'.price').addClass("color-green");
                        $(industryNo+'.amount').addClass("color-green");
                        $(industryNo+'.range').addClass("color-green");
                    }
                }
                var NStockA = $('.topStock .StockName a,[class$=-Stock] .title a');
                var NStockName = $('.topStock .StockName span,[class$=-Stock] .title span');
                for (let i =0 ; i < NStockA.length && i < NStockName.length; i++){
                    let tempName = $(NStockName[i]).text();
                    tempName = "?search="+tempName;
                    let tempHref = NStockA[i].href;
                    tempHref =tempHref + tempName;
                    $(NStockA[i]).attr('href',tempHref);
                }
            });
        });
    });
    
});
