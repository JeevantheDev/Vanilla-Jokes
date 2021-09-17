export const UICtrl = (function () {
  const UISelectors = {
    isLoading: '#is-loading',
    jokesList: '#joke-list',
    listJokesItem: '#joke-list .joke-card',
    jokesArchiveList: '#joke-archive-list',
    listJokesArchiveItem: '#joke-archive-list .joke-card',
    paginate: '#paginate',
    searhInput: '#search',
  };

  return {
    getSelectors: function () {
      return UISelectors;
    },
    renderLoading: function (isLoading) {
      let html = isLoading
        ? ` <div  class="loading-container">
                <div class="preloader-wrapper big active">
                      <div class="spinner-layer spinner-red-only">
                        <div class="circle-clipper left">
                          <div class="circle"></div>
                        </div><div class="gap-patch">
                          <div class="circle"></div>
                        </div><div class="circle-clipper right">
                          <div class="circle"></div>
                        </div>
                      </div>
                    </div>
              </div>`
        : '';
      document.querySelector(UISelectors.isLoading).innerHTML = html;
    },
    populateJokeList: function (jokes, currentPage) {
      let html = '';
      jokes.length > 0
        ? jokes.forEach((joke) => {
            html += `
                    <div id="joke-${joke.id}" class="col s12 m6 joke-card">
                        <div class="card blue-grey darken-1">
                            <div class="card-content white-text">
                                <span class="card-title">${joke.title}</span>
                                <p>${joke.jokes}</p>
                            </div>
                            <div class="card-action review-container">
                                ${
                                  currentPage === '/'
                                    ? `<div class="review-container">
                                    <a id="joke-like-${joke.id}" class="flex-review curser-pointer">
                                        <i class="material-icons like-btn ${
                                          joke.like > 0 ? 'lime-text' : 'white-text'
                                        } text-darken-2">thumb_up</i>
                                        <span class="white-text">${joke.like}</span>
                                    </a>
                                    <a id="joke-dislike-${joke.id}" class="flex-review curser-pointer">
                                        <i class="material-icons dislike-btn ${
                                          joke.dislike > 0 ? '' : 'white-text'
                                        }">thumb_down_alt</i>
                                        <span class="white-text">${joke.dislike}</span>
                                    </a>
                                </div>`
                                    : ''
                                }
                                <a id="joke-like-${joke.id}" class="flex-review ml-auto curser-pointer">
                                    <i 
                                        class="material-icons archive-btn ${
                                          joke.archive ? 'yellow-text' : 'white-text'
                                        }">
                                        ${joke.archive ? 'unarchive' : 'archive'}
                                    </i>
                                </a>
                            </div>
                        </div>
                    </div>
                `;
          })
        : (html += `<p> No Jokes Found... </p>`);
      // insert joke items in HTML
      let selector = currentPage === '/' ? UISelectors.jokesList : UISelectors.jokesArchiveList;
      document.querySelector(selector).innerHTML = html;
    },
    updateJokeItem: function (item, currentPage) {
      let jokeItems =
        currentPage === '/'
          ? document.querySelectorAll(UISelectors.listJokesItem)
          : currentPage.includes('archive.html')
          ? document.querySelectorAll(UISelectors.listJokesArchiveItem)
          : null;

      jokeItems = Array.from(jokeItems);

      jokeItems.forEach((joke) => {
        const jokeID = joke.getAttribute('id');
        if (jokeID === `joke-${item.id}`) {
          document.querySelector(`#${jokeID}`).innerHTML = `
                        <div class="card blue-grey darken-1">
                            <div class="card-content white-text">
                                <span class="card-title">${item.title}</span>
                                <p>${item.jokes}</p>
                            </div>
                            <div class="card-action review-container">
                                ${
                                  currentPage === '/'
                                    ? `<div class="review-container">
                                    <a id="joke-like-${item.id}" class="flex-review curser-pointer">
                                        <i class="material-icons like-btn ${
                                          item.like > 0 ? 'lime-text' : 'white-text'
                                        } text-darken-2">thumb_up</i>
                                        <span class="white-text">${item.like}</span>
                                    </a>
                                    <a id="joke-dislike-${item.id}" class="flex-review curser-pointer">
                                        <i class="material-icons dislike-btn ${
                                          item.dislike > 0 ? '' : 'white-text'
                                        }">thumb_down_alt</i>
                                        <span class="white-text">${item.dislike}</span>
                                    </a>
                                </div>`
                                    : ''
                                }
                                <a id="joke-like-${item.id}" class="flex-review ml-auto curser-pointer">
                                    <i 
                                        class="material-icons archive-btn ${
                                          item.archive ? 'yellow-text' : 'white-text'
                                        }">
                                        ${item.archive ? 'unarchive' : 'archive'}
                                    </i>
                                </a>
                            </div>
                        </div>
                    `;
        }
      });
    },
    deleteArchiveJoke: function (id) {
      const jokeID = `#joke-${id}`;
      const joke = document.querySelector(jokeID);
      joke.remove();
    },
    updatePagination: function (totalPage, currentPaginate) {
      let html = '';
      for (let i = 1; i <= totalPage; i++) {
        html += `
                    <li class="${i === currentPaginate ? 'active' : 'waves-effect'}"><a id="page-${i}">${i}</a></li>
                `;
      }

      // insert pagination element
      document.querySelector(UISelectors.paginate).innerHTML = html;
    },
    getSearchInput: function () {
      return document.querySelector(UISelectors.searhInput).value;
    },
  };
})();
