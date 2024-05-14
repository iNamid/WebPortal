async function stockLookUp(){

    try {

        
        const from = document.getElementById("day").value;

        function getRange(from){

            var to;
    
            if ( from == 30){

                var date = new Date();
                date.setDate(date.getDate() - 30);
                to = date.toISOString().split('T')[0];

            } else if( parseInt(from) == 60){
                var date = new Date();
                date.setDate(date.getDate() - 60);
                to = date.toISOString().split('T')[0];
            } else if( parseInt(from) == 90){
                var date = new Date();
                date.setDate(date.getDate() - 90);
                to = date.toISOString().split('T')[0];
            }

            return to;
            
        }

        const apiKey = 'JMjeqK7saDht_IkKppuBrJesDU8Xihzp';
        const ticker = document.getElementById("stockTickers").value;
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1; 
        const year = currentDate.getFullYear();
        const start = getRange(from);
        const end = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

        const response = await fetch(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${start}/${end}?apiKey=${apiKey}`);

        if (!response.ok){
            throw new Error ("API endopints couldn't be reached!");
        }

        const data = await response.json();
        console.log(data);

        
        const results = data.results;
        let labels = results.map(result => new Date(result.t).toLocaleDateString());
        let chartData = results.map(result => result.c);
        var ctx = document.getElementById('myChart');


        new Chart(ctx, {
 
                type: 'line',
                data: {
                labels: labels,
                datasets: [{
                    label: '($) of Stocks',
                    data: chartData,
                    borderWidth: 1
                }]
                },
                options: {
                
                }
            });

        
    } catch(error){
        console.error(error);
        
    }

}






document.getElementById("sub").addEventListener("click", function(){
    
 const chart = document.querySelector(".mychart");
    chart.innerHTML = "";

    const canvas = document.createElement('canvas');
    canvas.id = "myChart";
    canvas.height = 600;
    canvas.width = 800;

    chart.appendChild(canvas);
    stockLookUp();

});






async function redditStock(){

    try{
        const response = await fetch('https://tradestie.com/api/v1/apps/reddit');

        if(!response.ok){
            throw new Error ("API could not be reached");

        }

        const data =  await response.json();
        console.log(data);


        const body = document.querySelector("#table tbody")

        data.slice(0 ,5).forEach(t => {

            const row = document.createElement('tr');
            const cell_ticker = document.createElement('td');
            const tickerLink = document.createElement('a');
            tickerLink.textContent = t.ticker;
            
            tickerLink.href = `https://finance.yahoo.com/quote/${t.ticker}`;
            cell_ticker.appendChild(tickerLink);
            row.appendChild(cell_ticker);
            
            const cell_comment =  document.createElement('td');
            cell_comment.textContent = t.no_of_comments;
            row.appendChild(cell_comment);
            const cell_sentiment = document.createElement('td');

            
    

            if (t.sentiment === 'Bullish'){
                const img = document.createElement('img');
                img.src = 'https://static.thenounproject.com/png/2347804-200.png';
                img.width = 200; 
                img.height = 200; 
                cell_sentiment.appendChild(img);
            } else {
                const img = document.createElement('img');
                img.src = 'https://cdn1.iconfinder.com/data/icons/stock-investment-outline-1/64/24_bearish_downtrend_animal_stocks_finance_graph_investing_investment_finance_business-512.png';
                img.width = 200; 
                img.height = 200; 
                cell_sentiment.appendChild(img);

            }
            
            row.appendChild(cell_sentiment);
            body.appendChild(row);  
        });

    } catch(error){
        console.error(error);
    }
}

redditStock();
 

