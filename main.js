const BASE_URL = 'https://api.coincap.io/v2/assets?amount=100';
const btn = document.querySelector('input');
const main = document.querySelector('main')
const div = document.createElement('div');
div.setAttribute('class', 'container');
const submit = document.querySelector('submit')



/**
 * WHEN THE FORM IS SUBMITTED
 */
document.querySelector("form").addEventListener('submit', (event) => {
    event.preventDefault()
    fetch (`https://api.coincap.io/v2/assets/${event.target.crypto.value}`)
    .then((res) => res.json())
    .then((response) => {
        console.log('fetch successful')

        //GRABBING SEARCH VALUE
        let search = document.getElementById('search').value
        console.log(search)
        
        //REMOVING DIV THAT HOLDS LIST ONCE FORM IS SUBMITTED
        div.remove()

        //GRABBING COING DATA
        let coins = response.data

        //ERROR HANDELING: IF COIN IS NOT ON THE LIST
        if(!coins){
            alert(`COIN IS NOT ON THE HOT 100 LIST.`)
            window.location.reload();
        }

        
        /**
         * CREATE SECTION
         * ADD CLASS
         * ADD SECTION TO THE END OF MAIN
         */
        
        let section = document.createElement('section');
        section.setAttribute('class', 'search-container');
        main.append(section)

        //CLEARING CONTAINER AFTER SEARCH
        let sContainer = document.querySelector('.search-container');
        sContainer.innerHTML = '';
        
        //RANK DATA
        let rank = response.data.rank;
        console.log(rank)

        //COIN NAME DATE
        let name = response.data.name;
        console.log(name)
        
        //SYMBOL DATA
        let symbol = response.data.symbol;
        console.log(symbol)

        //PRICE DATA
        let price = parseFloat(response.data.priceUsd).toFixed(2);
        console.log(price)

        //MARKETCAP DATE
        let marketCap = parseFloat(response.data.marketCapUsd).toFixed(2)
        console.log(marketCap)

        //PERCENT CHANGE IN 24HRS
        let change = parseFloat(response.data.changePercent24Hr).toFixed(2)
        console.log(change)
        
        /**
         * CREATE AN ARTICLE
         * ADD CLASS
         */
        let article = document.createElement('article');
        article.className = 'card';
        console.log(article)

        /**
         * CREATE H2
         * UPDATE TEXT CONTENT TO RANK DATA
         * ADD TO SECTION
         */
        let heading = document.createElement('h2');
        heading.innerHTML = `#${rank}`
        section.append(heading);

        /**
         * CREATE H3
         * UPDATE TEXT CONTENT TO SYMBOL DATA
         * ADD TO SECTION AFTER HEADING
         */
        let shortened = document.createElement('h3')
        shortened.innerHTML = symbol
        heading.after(shortened)

        /**
         * CREATE H4
         * UPDATE TEXT CONTENT TO NAME DATA
         * ADD TO SECTION AFTER SYMBOL
         */
        let fullname = document.createElement('h4');
        fullname.innerHTML = name
        shortened.after(fullname)

        /**
         * CREATE P
         * UPDATE TEXT CONTENT TO PRICE DATA
         * ADD TO SECTION AFTER NAME
         */
        let usd = document.createElement('p');
        usd.innerHTML = `$${price}`;
        fullname.after(usd)

        /**
         * CHECKING TO SEE IF MARKET CAP IS IN THE BILLIONS
         * ADDS 'B' TO ADD OF PRICE
         */
        console.log(`Marketcap: ${marketCap}`)
        let market = document.createElement('p');
        if(marketCap.length >= 10){
        market.textContent = `$${marketCap.slice(0,3)}B`;
        usd.after(market)
        }
    
        /**
         * CHECKING TO SEE IF MARKET CAP IS IN THE MILLIONS
         * ADDS 'M' TO ADD OF PRICE
         */
        if(marketCap >= 1000000 && marketCap < 1000000000){
        market.textContent = `$${marketCap.slice(0,3)}M`;
        usd.after(market) 
        }

        /**
         * CREATE P ELEMENT
         * UPDATING CONTENT WITH MARKET CHANGE %
         */
        let marketChange = document.createElement('p');
        marketChange.textContent = `${change}%`;
        market.after(marketChange)

        //IF THE MMARKET CHANGES NEG OR POS IN 24HRS
        if(change < 0){
            marketChange.style.color = "red";
            marketChange.innerHTML =  change + '%'
        }  else if(change > 0){
            marketChange.style.color = "green";
            marketChange.innerHTML = change + '%';
        } else{
            marketChange.style.color = "black";
        }

        //clearing form after submit
        const form = document.querySelector('form')
        form.reset();
    })

    .catch((error) => {
        console.log(error)
    });
    
})

// /**
//  * WHEN WINDOW LOADS, LIST OF 100 TOP CRYPTO COINS WILL LOAD
//  */
window.addEventListener('load', (event) => {
    event.preventDefault()
    fetch (`${BASE_URL}`)
    .then((res) => res.json())
    .then((response) => {
        console.log(response)

        /**
         * CREATING THE TITLE CATEGORIES
         */
        let section = document.createElement('section');
        let p = document.createElement('p')
        p.setAttribute('class', 'title')
        p.textContent = 'Rank Symbol Name Price Market-Cap 24hr'

        /**
         * NAME OF LIST
         */
        let hot = document.createElement('h1')
        hot.setAttribute('class', 'hot')
        hot.textContent = 'Hot 100'
        hot.style.fontFamily = 'Impact'
        main.append(hot)

        /**
         * DATE
         */
        let hotP = document.createElement('p')
        hotP.textContent = "Januaray 17, 2023"
        hotP.setAttribute('class', 'date')
        hot.append(hotP)
        
        //ADDING TO DOM:
        main.append(section)
        section.append(p)


        /**
         * GRABBING THE COIN DATA
         */
        let coins = response.data
        for(let i = 0; i < coins.length; i++){

            //FUNCTION TO CREATE THE FORMAT FOR THE LIST
            function getCoin(){
            
            //RANK INFO
            let rank = response.data[i].rank;
            console.log(rank)
    
            //NAME INFO
            let name = response.data[i].name;
            console.log(name)
    
            //SYMBOL INFO
            let symbol = response.data[i].symbol;
            console.log(symbol)
    
            //PRICE INFO
            let price = parseFloat(response.data[i].priceUsd).toFixed(2);
            console.log(price)
    
            //MARKETCAP INFO
            let marketCap = parseFloat(response.data[i].marketCapUsd).toFixed(2)
            console.log(marketCap)
    
            //PERCENT CHANGE INFO
            let change = parseFloat(response.data[i].changePercent24Hr).toFixed(2)
            console.log(change)
            
            /**
             * CREATING ARTICLE
             * ADD CLASS NAME
             */
            let article = document.createElement('article');
            article.className = 'card';
            console.log(article)
    
            /**
             * CREATING H2
             * SETTING H2 TO RANK VALUE
             */
            let heading = document.createElement('h2');
            heading.textContent = `#${rank}`
            article.append(heading);

            /**
             * CREATING H3
             * SETTING H3 TO SYMBOL VALUE
             */
            let shortened = document.createElement('h3')
            shortened.textContent = symbol
            heading.after(shortened)
    
            /**
             * CREATING H4
             * SETTING H4 TO NAME VALUE
             */
            let fullname = document.createElement('h4');
            fullname.textContent = name
            shortened.after(fullname)

            /**
             * CREATING P
             * SETTING P TO PRICE VALUE
             */
            let usd = document.createElement('p');
            usd.textContent = `$${price}`;
            fullname.after(usd)
    
            //console.log(`Marketcap: ${marketCap}`)

            /**
             * CREATING P
             * CHECKING TO SEE IF GREATHER  THAN 10
             * IF TRUE, SETTING P TO MARKETCAP VALUE + 'B' FOR BILLIONS
             */
            let market = document.createElement('p');
            if(marketCap.length >= 10){
            market.textContent = `$${marketCap.slice(0,3)}B`;
            usd.after(market)
            }

            /**
             * CREATING P
             * CHECKING TO SEE IF BETWEEN 1MILLION & LESS THAN 1 BILLION
             * IF TRUE, SETTING P TO MARKETCAP VALUE + 'M' FOR MILLIONS
             */
            if(marketCap >= 1000000 && marketCap < 1000000000){
            market.textContent = `$${marketCap.slice(0,3)}M`;
            usd.after(market) 
            }
    
            /**
             * CREATING P
             * SETTING MARKET CHANGE TO CHANGE VALUE %
             */
            let marketChange = document.createElement('p');
            marketChange.textContent = `${change}%`;
            market.after(marketChange)
    
            //IF THE MARKET CHANGES POS OR NEG IN 24HRS
            if(change < 0){
                marketChange.style.color = "red";
                marketChange.innerHTML =  change + '%'
            }  else if(change > 0){
                marketChange.style.color = "green";
                marketChange.innerHTML = change + '%';
            } else{
                marketChange.style.color = "black";
            }
            
            //ADDING TO DOM
            main.appendChild(div)
            div.append(article)
            }
            
            //CALLING FUNCTION
            getCoin()

        }//for loop closing tag
    })
    .catch((error) => {
        console.log(error)
    })
})



