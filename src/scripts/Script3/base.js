export const elements = {
    searchForm : document.querySelector(".searchCon"),
    searchInput : document.querySelector('#search'),
    searchList : document.querySelector('#news-articles'),
    toggleView : document.querySelector('.btn'),
    searchResList : document.querySelector('.result'),
    searchPagesBtn: document.querySelector('.BtnContainer'),
    searchBtnCon : document.querySelector('.arrowContainer'),
};

export const renderLoader = ele => {
    const loader = `
         <div class="loader">
           <svg>
                <use href="public/public/icons.svg#icon-cw"></use>
           </svg>
           <P>Loading...</p>
         </div>
    `;
    ele.insertAdjacentHTML('afterbegin',loader);
};

export const clearLoader = () =>{
    const load = document.querySelector('.loader');
    if(load) 
    load.parentElement.removeChild(load);
};