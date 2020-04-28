import { elements } from "./base";

export const getInput = () => elements.searchInput.value;

export const clearResults = () => elements.searchList.innerHTML = ' ';

//export const clearInput = () => elements.searchInput.value = ' ';

export const clearButton = () => elements.searchPagesBtn.innerHTML = ' ';
const renderNews = news => {
         console.log(news);
    const markup = `
    <li class="article">
    <a class="article-link" href="${news.url}">
     <img class="article-img" src="${news.urlToImage}">
     <h2 class="article-title">${reduceString(news.title)}</h2>
     <p class="article-description">${reduceString(news.description)}</p>
     <span class="article-author"> - ${reduceAuthor(news.author)}</span>
    </a>
  </li>
    
    `;
    elements.searchList.insertAdjacentHTML('afterbegin', markup);
};

const reduceAuthor = (aut, len = 20) => {
 
  let curStr = [];
 if(aut === null)
 {
   return (aut);
 }
 
 
  if(aut.length > 25)
  {
      let arr = aut.split('');
      curStr = arr.slice(0 , 20);
        console.log(curStr);
      return `${curStr.join('')}....`;
  }
  else{
  return(aut);
  }


};

const reduceString = (str, len = 42) => {
          let curStr = [];
          if(str.length > len)
          {
            str.split(' ').reduce((total , curr) => {
                    if(total + curr.length <= len) 
                    {
                          curStr.push(curr);                
                    }    
                    return total + curr.length; 
            }, 0);

            return `${curStr.join(' ')}....`;
          }
          return(str);
};

export const renderResults = (newsData, page = 1, newsPerPage = 20) => {

     if(newsData.length === 0)
     {
         noresults();
     }else{
     clearNoresults();
     }
    const start = (page - 1) * (newsPerPage);
    const end = page * newsPerPage ;
    console.log(newsData);
    newsData.forEach(renderNews);
    // // if(newsData.length > 10)
    // // {
    // // renderButtons(page, newsData.length, newsPerPage);
    // // newsData.slice(start, end).forEach(renderNews);
    // // }
    // // else{
    //   newsData.forEach(renderNews);
    // }
};

const createButton = (page, type) =>

  `
<button class="arrowContainer" data-goto=${type === 'next'? page+1: page-1}>

 <span><img class="Page${type}" src="public/public/arrow_${type}_white.png" alt="forward" width="75px"></span>  

</button>`;



const renderButtons = (page, numNews, newsPerPage) => {
      const pages = Math.ceil( numNews/newsPerPage);
     let button;
      if(page === 1 && pages > 1 ){
          //Button to go to next page
          button = createButton(page, 'next');
      }
      else if(page === pages && pages > 1 ){
          //Button to prev Page
          button = createButton(page, 'prev');
      }
   
      elements.searchPagesBtn.insertAdjacentHTML('afterbegin', button);
     
};

const noresults = () => {
      elements.searchResList.insertAdjacentHTML('afterbegin', `<h5 class="not-found">No article was found based on the search.</h5>`);
};
export const clearNoresults = () => {
  const notfound = document.querySelector('.not-found');
    if(notfound) 
    notfound.parentElement.removeChild(notfound);
};