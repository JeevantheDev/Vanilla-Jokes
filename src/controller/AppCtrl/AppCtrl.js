import { JokesCtrl } from "../JokesCtrl/JokesCtrl.js";
import { StorageCtrl } from "../StorageCtrl/StorageCtrl.js";
import { UICtrl } from "../UICtrl/UICtrl.js";

export const AppCtrl = (function(JokesCtrl, UICtrl, StorageCtrl) {

    const state = {
        page: null
    }
    const loadEventListeners = function() {
        // Get UI Selectors
        const UISelectors = UICtrl.getSelectors();

        // Like Btn click Event
        if (state.page.includes('index.html')) {
            document.querySelector(UISelectors.jokesList).addEventListener('click', jokeLikeOrDislikeOrSaveClick);
        } else if(state.page.includes('archive.html')) {
            document.querySelector(UISelectors.jokesArchiveList).addEventListener('click', jokeLikeOrDislikeOrSaveClick);
        }
        document.querySelector(UISelectors.paginate).addEventListener('click', updatePaginateClick);
        document.querySelector(UISelectors.searhInput).addEventListener('keyup', searchJokeKeyup)
    }

    // Keyup search jokes
    const searchJokeKeyup = function(e) {
        const value = UICtrl.getSearchInput();
        const filteredJokes = JokesCtrl.updateJokesBySearch(value.toLowerCase(), state.page);
        UICtrl.populateJokeList(filteredJokes, state.page)
        UICtrl.updatePagination(JokesCtrl.getTotalPage(), JokesCtrl.getCurrentOffset())
    }
    
    // Click Joke Like Event
    const jokeLikeOrDislikeOrSaveClick = function(e) {
        e.stopPropagation();
        if(e.target.classList.contains('like-btn')) {
            const jokeID =  e.target.parentNode.id;
            const jokeIdArr = jokeID.split('-');
            const id = jokeIdArr[2];
            JokesCtrl.setCurrentJoke(id);
            JokesCtrl.likeJoke(id).then((res) => {
                UICtrl.updateJokeItem(res, state.page);
                JokesCtrl.resetCurrentJoke();
            });
        } else if(e.target.classList.contains('dislike-btn')) {
            const jokeID =  e.target.parentNode.id;
            const jokeIdArr = jokeID.split('-');
            const id = jokeIdArr[2];
            JokesCtrl.setCurrentJoke(id);
            JokesCtrl.dislikeJoke(id).then((res) => {
                UICtrl.updateJokeItem(res, state.page);
                JokesCtrl.resetCurrentJoke();
            });
        } else if(e.target.classList.contains('archive-btn')) {
            const jokeID =  e.target.parentNode.id;
            const jokeIdArr = jokeID.split('-');
            const id = jokeIdArr[2];
            const response = JokesCtrl.isArchieveJoke(id, state.page);
            if(response.archive) {
                StorageCtrl.storeItems(response)
            } else {
                StorageCtrl.deleteItems(response.id)
            }
            state.page.includes('index.html') ? 
                UICtrl.updateJokeItem(response, state.page) : 
                UICtrl.deleteArchiveJoke(response.id)

            JokesCtrl.resetCurrentJoke();
        }
    }

    // Click Update Paginate
    const updatePaginateClick = (e) => {
        e.stopPropagation();
        const pageNumber = e.target.id.split('-')[1];
        JokesCtrl.updateOffset(parseInt(pageNumber));
        const res = JokesCtrl.updateJokesByOffset(state.page);
        UICtrl.populateJokeList(res, state.page)
        UICtrl.updatePagination(JokesCtrl.getTotalPage(), JokesCtrl.getCurrentOffset())
    }
    return {
        init: function() {
            state.page = window.location.pathname;
            let jokes = [];
            if(state.page.includes('index.html')) {
                JokesCtrl.getJokes().then((res) => {
                    jokes.push(...res);
                    
                    if (jokes.length > 0) {
                        UICtrl.populateJokeList(jokes, state.page)
                        UICtrl.updatePagination(JokesCtrl.getTotalPage(), JokesCtrl.getCurrentOffset())
                        loadEventListeners();
                    } else {
                        return;
                    }
                });
                
            } else if(state.page.includes('archive.html')) {
                const data = JokesCtrl.getArchiveJokes();
                jokes.push(...data);
                if (jokes.length > 0) {
                    UICtrl.populateJokeList(jokes, state.page)
                    UICtrl.updatePagination(JokesCtrl.getTotalPage(), JokesCtrl.getCurrentOffset())
                    loadEventListeners();
                } else {
                    return;
                }
            }


        }
    }

})(JokesCtrl, UICtrl, StorageCtrl);
