var a = $('.tagChoice ul a');
var Candles = $('.Candles');
var Volume = $('.Volume');
var Aroon = $('.Aroon');
var MACD = $('.MACD');
var ACD = $('.ACD');
var WR = $('.WR');
for (let i = 0; i < a.length; i++){
    $(a[i]).click(function(){
        var currentLink = a.find('.currentLink');
        currentLink.removeClass("currentLink");
        $(this).children(0).addClass('currentLink');
        switch ($(this).text()) {
            case 'ACD':
                Aroon.hide();
                Candles.hide();
                MACD.hide();
                Volume.hide();
                WR.hide();
                ACD.fadeIn('2000');
                break;
            case 'Volume':
                Aroon.hide();
                Candles.hide();
                MACD.hide();
                ACD.hide();
                WR.hide();
                Volume.fadeIn('2000');
                break;
            case 'Aroon':
                Candles.hide();
                Volume.hide();
                MACD.hide();
                ACD.hide();
                WR.hide();
                Aroon.fadeIn('2000');
                break;
            case 'MACD':
                Candles.hide();
                Volume.hide();
                Aroon.hide();
                ACD.hide();
                WR.hide();
                MACD.fadeIn('2000');
                break;
            case 'W%R':
                Candles.hide();
                Volume.hide();
                Aroon.hide();
                ACD.hide();
                MACD.hide();
                WR.fadeIn('2000');
                break;
            case 'Candles':
            default:
                Aroon.hide();
                Volume.hide();
                MACD.hide();
                ACD.hide();
                WR.hide();
                Candles.fadeIn('2000');
                break;
        }
    })
}
