

async function doggos(){
    try{

        const response = await fetch("https://dog.ceo/api/breeds/image/random/10");

        if(!response.ok){

            throw new Error ("API couldn't be reached");
        }

        const data = await response.json();
        console.log(data);

        const slider = document.querySelector('.slider');
        data.message.forEach(imageSrc => {
            const img = document.createElement('img');
            img.className = "dogs";
            
            img.src = imageSrc;

            slider.appendChild(img);
                   
        });


        const left = document.querySelector(".left");
        const right = document.querySelector(".right");
        
        const dogs = document.querySelectorAll('.dogs');
        
        
        var sectionIndex = 0;
        
        right.addEventListener(('click') , function(){
        
            sectionIndex = (sectionIndex < dogs.length -1) ? sectionIndex + 1 : 0;
        
            slider.style.transform = 'translate(' + (sectionIndex) * -10 + '%';
        
        });
        
        
        left.addEventListener(('click') , function(){
        
            sectionIndex = (sectionIndex > 0) ? sectionIndex - 1 : 0;
        
            slider.style.transform = 'translate(' + (sectionIndex) * -10 + '%';
        
        });
        

    } catch(error){

        console.error(error);
    }
}

doggos();

 

async function dogBreed(){

    try{

        const response = await fetch('https://dogapi.dog/api/v2/breeds');

        if (!response.ok){
            throw new Error ("API couldn't be reached");
        }

        const data = await response.json();
        console.log(data);

        const breedButton = document.querySelector('.breed_buttons');

        //const breed = document.querySelectorAll('.breed_buttons button');

        const dogInfo = document.querySelector('.dogInfo')
        
        data.data.forEach((i, index) => {
            const button = document.createElement('button');
        
            button.className = 'button-74'
            button.textContent = i.attributes.name;
            button.id ="dog_butt" + index;

            button.addEventListener('click', function(){

                    dogInfo.innerHTML = '';
                    dogInfo.style.display = 'inline-block';
            
                    const header = document.createElement('h1');
                    const description = document.createElement('p');
                    const minLife = document.createElement('p');
                    const maxLife = document.createElement('p');


                    header.className = "header";
                    description.className = 'header';

                    description.textContent = i.attributes.description;
                    header.textContent = i.attributes.name;
                    minLife.innerHTML = '<strong>Minimum Life: </strong>' + i.attributes.life.min;
                    maxLife.innerHTML = '<strong>Maximum Life: </strong>' + i.attributes.life.max;


                    dogInfo.appendChild(header);
                    dogInfo.appendChild(description);
                    dogInfo.appendChild(minLife);
                    dogInfo.appendChild(maxLife);
                })


            breedButton.appendChild(button);

        })



    } catch(error){

        console.error(error);


    }

}

dogBreed();








