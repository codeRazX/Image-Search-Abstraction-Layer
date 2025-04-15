class UI{
    
    activeElement = (el,display = 'block')=>{
        const currentStyle = window.getComputedStyle(el).display;
        if(!el || currentStyle !== 'none')return;
        el.style.display = display;
    };
    
    desactivedElement = (el) => el.style.display = 'none';

    showError = (msg,container)=>{
        if(container.querySelector('.error'))return;
        const error = document.createElement('P');
        error.classList.add('error');
        error.textContent = msg;
        container.appendChild(error);
        setTimeout(()=>error.remove(),4000);
    }

    clearHTML = (container)=>{
        while(container.firstChild){
            container.removeChild(container.firstChild);
        }
    }

    generateHTML = (el,content = '',clas ='')=>{
        const element = document.createElement(el);
        if(clas)element.classList.add(clas);
        if(content)element.textContent = content;
        return element;
    }

    printRecents = (data,container)=>{
        data.forEach(term => {
            const li = this.generateHTML('li',term);
            container.appendChild(li);
        })
    }

    printSearch = (data, container)=>{
      
        
        data.forEach(({description,parentPage,url}) => {
            const card = this.generateHTML('DIV','','card');
            const imgCard = this.generateHTML('IMG','','card__img');
            const blockCard = this.generateHTML('DIV','','card__block');
            const descriptionCard = this.generateHTML('P',description,'card__description');
            const imageURL = this.generateHTML('P','URL image:','');
            const linkToURL = this.generateHTML('A',url,'card__link');
            const parentURL = this.generateHTML('P','URL page:','');
            const linkToPage = this.generateHTML('A',parentPage,'card__link');

            imgCard.loading = 'lazy';
            imgCard.src = url;
            imgCard.alt = `Image from: ${description}`;
            linkToURL.href = url;
            linkToURL.target = '_blank';
            linkToPage.href = parentPage;
            linkToPage.target = 'blank';

            imageURL.appendChild(linkToURL);
            parentURL.appendChild(linkToPage);
            blockCard.append(descriptionCard,imageURL,parentURL);
            card.append(imgCard,blockCard);
            container.append(card);
        })
       
       
    }
}


export default UI;