import { JokesCtrl } from '../JokesCtrl/JokesCtrl';
import { StorageCtrl } from '../StorageCtrl/StorageCtrl';
import { UICtrl } from '../UICtrl/UICtrl';

export const AppCtrl = (function (JokesCtrl, UICtrl, StorageCtrl) {
  const state = {
    page: null,
    isLoading: true,
  };
  const loadEventListeners = function () {
    // Get UI Selectors
    const UISelectors = UICtrl.getSelectors();

    // Like Btn click Event
    let selector = state.page === '/' ? UISelectors.jokesList : UISelectors.jokesArchiveList;
    document.querySelector(selector).addEventListener('click', jokeClickAction);
    document.querySelector(UISelectors.paginate).addEventListener('click', updatePaginateClick);
    document.querySelector(UISelectors.searhInput).addEventListener('keyup', searchJokeKeyup);
  };

  // Keyup search jokes
  const searchJokeKeyup = function (e) {
    const value = UICtrl.getSearchInput();
    const filteredJokes = JokesCtrl.updateJokesBySearch(value.toLowerCase(), state.page);
    UICtrl.populateJokeList(filteredJokes, state.page);
    UICtrl.updatePagination(JokesCtrl.getTotalPage(), JokesCtrl.getCurrentOffset());
  };

  // Click Joke Like Event
  const jokeClickAction = function (e) {
    e.stopPropagation();
    if (e.target.classList.contains('like-btn')) {
      const jokeID = e.target.parentNode.id;
      const jokeIdArr = jokeID.split('-');
      const id = jokeIdArr[2];
      JokesCtrl.setCurrentJoke(id);
      JokesCtrl.likeJoke(id).then((res) => {
        UICtrl.updateJokeItem(res, state.page);
        JokesCtrl.resetCurrentJoke();
      });
    } else if (e.target.classList.contains('dislike-btn')) {
      const jokeID = e.target.parentNode.id;
      const jokeIdArr = jokeID.split('-');
      const id = jokeIdArr[2];
      JokesCtrl.setCurrentJoke(id);
      JokesCtrl.dislikeJoke(id).then((res) => {
        UICtrl.updateJokeItem(res, state.page);
        JokesCtrl.resetCurrentJoke();
      });
    } else if (e.target.classList.contains('archive-btn')) {
      const jokeID = e.target.parentNode.id;
      const jokeIdArr = jokeID.split('-');
      const id = jokeIdArr[2];
      const response = JokesCtrl.isArchieveJoke(id, state.page);
      if (response.archive) {
        StorageCtrl.storeItems(response);
      } else {
        StorageCtrl.deleteItems(response.id);
      }
      state.page === '/' ? UICtrl.updateJokeItem(response, state.page) : UICtrl.deleteArchiveJoke(response.id);
      console.log(JokesCtrl.getArchiveJokes());
      JokesCtrl.resetCurrentJoke();
    }
  };

  // Click Update Paginate
  const updatePaginateClick = (e) => {
    e.stopPropagation();
    const pageNumber = e.target.id.split('-')[1];
    JokesCtrl.updateOffset(parseInt(pageNumber));
    const res = JokesCtrl.updateJokesByOffset(state.page);
    UICtrl.populateJokeList(res, state.page);
    UICtrl.updatePagination(JokesCtrl.getTotalPage(), JokesCtrl.getCurrentOffset());
  };

  return {
    init: async function () {
      state.page = window.location.pathname;
      let jokes = [];
      UICtrl.renderLoading(state.isLoading);
      let data = state.page === '/' ? await JokesCtrl.getJokes() : JokesCtrl.getArchiveJokes();
      jokes.push(...(data || []));
      state.isLoading = false;
      UICtrl.renderLoading(state.isLoading);
      UICtrl.populateJokeList(jokes, state.page);
      UICtrl.updatePagination(JokesCtrl.getTotalPage(), JokesCtrl.getCurrentOffset());
      loadEventListeners();
    },
  };
})(JokesCtrl, UICtrl, StorageCtrl);
