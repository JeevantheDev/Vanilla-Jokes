# Vanilla -Jokes

> Fetch Jokes using Third party API.

##### `API: https://tattijokes.herokuapp.com`

### Build using JS Design Pattern

- Tech Stack

  - HTML, CSS, Materialize CSS(CDN)
  - Vanilla JS, lodash
  -

- `Home Page`

  - `Search Bar` integartion.
  - Render all the jokes with `pagination`. (from `API`)
  - `Like & Dislike` a joke.
  - `Archive` a joke. (Save in `localstorage`)

- `Archive Page`
  - `Search Bar` integartion.
  - Render all the jokes with `pagination`. (from `localstorage`)
  - `Unarchive` a joke. (Remove from `localstorage`)

### Setup Project

> In Development

- ```
      npm i
  ```
- ```
      npm run start
  ```
- Navigate to (http://localhost:8084/)

> In Production

- ```
      npm run build
  ```
- It will create a `build` folder inside `root` of the directory containing a file named as `app.bundle.js`.
