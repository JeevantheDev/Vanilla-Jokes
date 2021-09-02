import { addLikeOrDislike, getAllJokes } from '../../services/jokes.api';
import { StorageCtrl } from '../StorageCtrl/StorageCtrl';
import _ from 'lodash';

export const JokesCtrl = (function () {
  const data = {
    jokes: [],
    limit: 10,
    offset: 1,
    totalPage: 0,
    currentJoke: null,
    archiveJokes: StorageCtrl.getItems(),
  };

  return {
    getJokes: async () => {
      const res = await getAllJokes();
      data.jokes.push(...res.jokes);
      data.totalPage = Math.ceil(data.jokes.length / data.limit);
      return _.chunk(data.jokes, data.limit)[data.offset - 1];
    },

    getTotalPage: () => {
      return data.totalPage;
    },

    getCurrentOffset: () => {
      return data.offset;
    },

    updateOffset: (offset) => {
      data.offset = offset;
    },

    updateJokesByOffset: (currentPage) => {
      if (currentPage === '/') {
        return _.chunk(data.jokes, data.limit)[data.offset - 1];
      } else if (currentPage.includes('archive.html')) {
        return _.chunk(data.archiveJokes, data.limit)[data.offset - 1];
      }
    },

    updateJokesBySearch: (query, currentPage) => {
      if (currentPage === '/') {
        const currentData = _.chunk(data.jokes, data.limit)[data.offset - 1];
        return _.filter(currentData, (joke) => !joke.title.toLowerCase().search(query));
      } else if (currentPage.includes('archive.html')) {
        const currentData = _.chunk(data.archiveJokes, data.limit)[data.offset - 1];
        return _.filter(currentData, (joke) => !joke.title.toLowerCase().search(query));
      }
    },

    getArchiveJokes: () => {
      data.totalPage = Math.ceil(data.archiveJokes.length / data.limit);
      return _.chunk(data.archiveJokes, data.limit)[data.offset - 1];
    },

    setCurrentJoke: (jokeID) => {
      let found = null;
      // iterate through jokes
      data.jokes.forEach((joke) => {
        if (joke.id === parseInt(jokeID)) {
          found = joke;
        }
      });
      data.currentJoke = found;
    },

    resetCurrentJoke: () => {
      data.currentJoke = null;
    },

    likeJoke: async () => {
      let found = null;
      return await addLikeOrDislike({ id: data.currentJoke.id, like: 'true' }).then(({ success }) => {
        if (success) {
          data.jokes.forEach((joke) => {
            if (joke.id === data.currentJoke.id) {
              joke.like = joke.like + 1;
              found = joke;
            } else {
              return;
            }
          });
          return found;
        } else {
          return;
        }
      });
    },

    dislikeJoke: async () => {
      let found = null;
      return await addLikeOrDislike({ id: data.currentJoke.id, dislike: 'true' }).then(({ success }) => {
        if (success) {
          data.jokes.forEach((joke) => {
            if (joke.id === data.currentJoke.id) {
              joke.dislike += 1;
              found = joke;
            } else {
              return;
            }
          });
          return found;
        } else {
          return;
        }
      });
    },

    isArchieveJoke: (jokeID, currentPage) => {
      let found = null;
      if (currentPage === '/') {
        data.jokes.forEach((joke) => {
          if (joke.id === parseInt(jokeID)) {
            joke.archive = !joke.archive;
            found = joke;
          } else {
            return;
          }
        });
      } else if (currentPage.includes('archive.html')) {
        data.archiveJokes.forEach((joke) => {
          if (joke.id === parseInt(jokeID)) {
            joke.archive = !joke.archive;
            found = joke;
          } else {
            return;
          }
        });
      }
      return found;
    },
  };
})();
