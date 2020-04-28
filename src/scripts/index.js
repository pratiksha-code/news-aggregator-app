import  "../styles/index.css";
import * as Search from "./scripts2/search";
import * as searchView from "./Script3/searchView";
import {elements, renderLoader, clearLoader } from "./Script3/base";

const state = {};


const controlSearch = async () =>{
    //Get QUery from the view
    var query = searchView.getInput() ;
    console.log(query);


    if(query !== undefined || null || ' ')
    {
        state.search = new Search.Search(query);
        //Prepare UI for results
       // searchView.clearInput();
       searchView.clearButton();
       
        searchView.clearResults();
        searchView.clearNoresults();
        renderLoader(elements.searchResList);

        //Search for newsss
        await state.search.getSearchResults();
        clearLoader();
        searchView.renderResults(state.search.results);
        
    }
    else{
        searchView.clearResults();
        
        await state.search.TopHeadings();
        searchView.renderResults(state.search.results);

    }
   
    //
};

 elements.searchForm.addEventListener('keypress', e => {
     if(e.keyCode === 13){
         event.preventDefault();
         controlSearch();
     }
});

const topNews = async() => {
    renderLoader(elements.searchResList);

state.search = new Search.TopNews();
    await state.search.TopHeadings();
    clearLoader();
    searchView.renderResults(state.search.results);
    console.log(state.search.results);
};
topNews();

elements.searchPagesBtn.addEventListener('click', e =>{
     const btn = e.target.closest('.arrowContainer');
     if(btn)
     {

     const gotoPage = parseInt(btn.dataset.goto , 10);
     searchView.clearResults();
     searchView.clearButton();
    
   
     searchView.renderResults(state.search.results , gotoPage);
     }
});



