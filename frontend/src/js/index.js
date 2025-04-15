import '../sass/app.scss';
import * as fetching from './fetching';
import dom from './dom';
import UI from './UI';

(()=>{
   
    const userInterface = new UI;
    let currentPage = 1;

    const getRecent = async()=>{
        try{
            userInterface.activeElement(dom.loaderRecent);
            const data = await fetching.fetchRecent();
            userInterface.printRecents(data,dom.listRecent);
        }
        catch(error){
            console.error(error)
        }
        finally{
            userInterface.desactivedElement(dom.loaderRecent);
        }
        
    }

    const getDataSearch = async(e)=>{
        if(e)e.preventDefault();

        if(dom.main.classList.contains('appear'))return;
        let success = false;
        const search = dom.form.search.value.trim();
        let data;
        if(!search){
            userInterface.showError('Please enter a valid search term',dom.form);
            return;
        }
        userInterface.clearHTML(dom.containerResult);
        userInterface.activeElement(dom.loaderGrid);
        const mainDisplay = window.getComputedStyle(dom.main).display;
        const sliderDisplay = window.getComputedStyle(dom.containerSlider).display;

        try{
            data = await fetching.fetchSearch(search,currentPage);
            if(!Array.isArray(data))return;
          
            
            if(mainDisplay === 'none'){
                userInterface.activeElement(dom.main);
                window.location.href =`#${dom.main.id}`;
            };

            if(sliderDisplay === 'none')userInterface.activeElement(dom.containerSlider,'flex');

            success = true;
         
        }
        catch(error){
            console.log(error);
            mainDisplay !== 'none'? userInterface.showError(error,dom.containerResult) :  userInterface.showError(error,dom.form);
            success = false;
        }
        finally{
           
            if(success){
                setTimeout(()=>{
                    userInterface.desactivedElement(dom.loaderGrid);
                    userInterface.printSearch(data,dom.containerResult);
                    dom.main.classList.add('appear');
                   
                    setTimeout(()=>dom.main.classList.remove('appear'),500);
                },1000)
               
            }
        }
       
      
    }

    getRecent();
    dom.form.addEventListener('submit', getDataSearch);

    dom.nextBTN.addEventListener('click', (e)=>{
        ++currentPage;
        getDataSearch();
        userInterface.activeElement(dom.previewBTN);
        
    });

    dom.previewBTN.addEventListener('click', function(e){
        --currentPage;
        getDataSearch();
        if(currentPage <= 1) userInterface.desactivedElement(this);
        
    });
   
})();