
使用vscode+live server或者webstorm在浏览器中打开
基本实现了实时的更新，每小时接收的查询数量小于95次/每IP

在基础界面可以观察到热门板块（以成交额为排序）的实时股票数据、自选板块的实时股票数据、推荐板块（按业绩排序）的推荐行业板块和板块领涨股
通过搜索（沪深拼音+股票代码）或者相关板块的链接进入详情界面，获得详细数据和包括k线图、MACD图在内的各种股票分析图
鼠标悬停在Candles栏或下方可以进行股票分析图的选择和切换

TODO:{
    “更多”功能的完善；
    “资讯速递”界面的完善；
    “股票预测分析”板块的完善；
    自选功能的完善；
    搜索功能相应正则的完善；
    文档抓取的完善（后端）；
}

Further:{
    使用vue.js完成前端框架的搭建；
}

后端需要完成的{
    在详细界面的URL（例如http://127.0.0.1:5501/html/specific.html?search=sh000001）中可以获得sh000001的字符串（股票代码）
    如果在相应目录下（data文件夹下）没有检索到相应的文件
    则将股票代码中的英文转换为大写并添在数字后，比如，sh000001的转换结果为000001.SS（sh的转换为SS，sz的转换为SZ）拼接在URL"https://query1.finance.yahoo.com/v7/finance/download/"的后头
    计算当前日期的时间戳记为period2和一年前日期的时间戳period1，将并将其作为参数，通过get方法结合相应参数访问URL获取csv文件，并将其通过之前的日期转换和改名（将文件名改为最初的股票代码）放入data文件夹中，刷新页面
    例如：如果想要获得sh000001的csv文件则通过get方法访问URL"https://query1.finance.yahoo.com/v7/finance/download/000001.SS?period1=1571304261&period2=1602926661&interval=1d&events=history&includeAdjustedClose=true"（后面这些参数除了时间戳都可以不动）

    或者可以爬取相应数据到data文件夹下，转换为csv的格式也行
    （大概就是需要指定文件的时候能得到一个类似与data文件夹下的sz000858.csv的指定文件就行）
}