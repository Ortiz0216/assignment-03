# Pizza Bandit Firebase Notes

Things we need and why we need them:

* __Bootstrap__ will be used for creating styles and look-and-feel for our pages
* __jQuery__ is needed by Bootstrap
* __Popper.js__ is also needed by Bootstrap
* __Mapbox GL__ and __React Mapbox GL__ a free-(ish) map solution
* __Dotenv__ is for storing API KEYS that our app uses rather than hard-coding them into our repository.  (see note below)
* __Here API__ a service for mapping, location, places, georeferencing and other similar services
* __Firebase API__ a service for many SaaS/Paas needs including authentication and storage.

DOTENV note: The ENV features are built into create-react-app now.  See [Adding Custom Environment Variables](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables) for more.

## PROCEDURES

The things we need to do then are:

1. Run `create-react-app`
2. Add in additional packages:
    * Bootstrap: `npm install --save bootstrap`
    * jQuery: `npm install --save jquery`
    * Popper.js: `npm install --save popper.js`
    * mapbox gl: `npm install --save mapbox-gl`
    * react mapbox gl: `npm install --save react-mapbox-gl`
    * dotenv: `npm install --save dotenv`
    * firebase: `npm install --save firebase`
    * react-router: `npm install --save react-router`
    * react-router-dom: `npm install --save react-router-dom`
3. Update `index.js` and `App.js` to include resources from bootstrap and jquery
4. Create additional ReactJS Components
    * Login Form
        * Email Input
        * Password Input
    * Map
    * Pizza Listing
    * Pizza Ordering
5. [Store Environment Variables in DOTENV](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables) - a feature of `create-react-app`
6. Mapbox
    * Create an account at [Mapbox](https://www.mapbox.com/) to obtain an access key
    * Read up on [Mapbox-GL JS](https://docs.mapbox.com/mapbox-gl-js/api/)
    * Include mapbox styles in `index.js`
7. Obtain your location using your browser's [Geolocation](https://www.w3schools.com/html/html5_geolocation.asp)
    * use the [ReactJS lifecycle methods](https://reactjs.org/docs/react-component.html#the-component-lifecycle) to configure the Mapbox when your Component loads
    * set state variables to assist configuring the map
8. Use the Here API to find nearby places
    * Obtain API Keys - store in your `.env` file
    * Install `POSTMAN` or use `curl` (comes with git-bash) to test your API calls
    * Use [fetch](https://developers.google.com/web/ilt/pwa/working-with-the-fetch-api) to read REST calls into your app
    * Use [ReactJS lifecycle methods](https://reactjs.org/docs/react-component.html#the-component-lifecycle) to configure your REST call when your Component loads
9. Load up your nearby places from the HERE API into [Bootstrap Cards](https://getbootstrap.com/docs/4.3/components/card/)
10. Use [React Router](https://www.npmjs.com/package/react-router) to make different *pages* for your app 
11. Use Firebase
    * Authentication
    * Cloud Database
12. Use Redux for an MVC-like structure (modeled on Facebook's "Flux" architecture)
    * It quickly becomes evident why a central state store is needed as sending props down and state up gets VERY confusing eventually...
13. Add tests (should have been done in Chapter 9)


### Bootstrap your App with create-react-app

npm install --save react-router-dom

[Create React App](https://reactjs.org/docs/create-a-new-react-app.html) is a toolchain that assists in:

* package manaegement
* project structuring
* site packaging and builing
* live testing

It is a common approach to creating a ReactJS app.

---

# Create React App Notes

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
