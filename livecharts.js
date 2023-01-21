const tvDiv = document.querySelector('tradingview-widget-container');
sessionStorage.setItem('tvDiv', tvDiv);

//PASSING ALL SYMBOLS
let sym = exchangeInfo.symbols,markup="";
console.log(sym)

sym.forEach(element => {
       markup += '<option value="' + element.symbol + '">' + element.symbol + '</option>'
});

document.getElementById('pairs').innerHTML = markup;

//FUNCTION IS CALLED WHEN PAGE IS LOADED
loadCharts()
function loadCharts(){

    //GETTING CHARTS
    let symbols = document.getElementById('pairs').value
    console.log(symbols)
    sessionStorage.setItem('symbol', symbols)
    new TradingView.widget(
        {
        "autosize": true,
        "symbol": "BINANCE:" + symbols,
        "interval": "5",
        "timezone": "America/New_York",
        "theme": "light",
        "style": "1",
        "locale": "in",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "allow_symbol_change": true,
        "container_id": "tvchart"
      }
        );
}

let funct = loadCharts().value()
sessionStorage.setItem('funct', funct)
