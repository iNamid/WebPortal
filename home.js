
async function quotesGen (){
    try{
        const response = await fetch(`https://zenquotes.io/api/quotes`);

        if (!response.ok){
            throw new Error("Couldn't reach endpoints");
        }

        const data = await response.json();
       

        data.forEach((i) => {

            const quote = i.q;
            const author = i.a;  
            document.getElementById("quote").textContent = quote;
            document.getElementById("author").textContent = author;
           
      
        });

    } catch(error){
        console.error(error);

    }
  
   
}


quotesGen();














  