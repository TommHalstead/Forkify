import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { CLOSE_MODAL_SEC } from './config.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

///////////////////////////////////////

// if (module.hot) {
//   module.hot.accept();
// }

// ASYNC FUNCTION TO FIND AND LOAD THE RECIPE BASED ON THE ID AND RENDER IT TO THE DOM
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    // 1.) Loading spinner
    recipeView.renderSpinner();

    // 1.5) Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // 2.) Render bookmarks to the view
    bookmarksView.update(model.state.bookmarks);

    // 2.5) Loading recipe
    await model.loadRecipe(id);

    // 3.) Rendering recipe with the state object we created and imported from the model module
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
    recipeView.renderError(); // We pass in nothing because we have a default message set in our renderError function.
  }
};

//  LOAD AND RENDER SEARCH RESULTS TO THE SEARCHVIEW BASED ON THE USER QUERY
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // Get search query
    const query = searchView.getQuery();
    if (!query) throw new Error();

    // Load search results
    await model.loadSearchResults(query); // WE MUST AWAIT this promise so that code execution in the background will stop while we're loading this.

    // Render results
    resultsView.render(model.getSearchResultsPage()); // Call our pagination function to display only wanted amount of results.

    // Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderError(this._errorMessage);
  }
};

// CONTROL AND RENDER 10 RESULTS PER PAGE AND RENDER/UPDATE THE NEWSERVINGS WHEN CLICKED
const controlPagination = function (goToPage) {
  // Render new results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // Render new pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update Recipe servings in the state
  model.updateServings(newServings);

  // Update the recipeView

  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1.) Add or remove bookmark based on bookmarked property
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2.) Update recipe view with bookmark change
  recipeView.update(model.state.recipe);

  // Render bookmarked bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (formData) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // Upload recipe data
    await model.uploadRecipe(formData);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change ID in the URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close from window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, CLOSE_MODAL_SEC * 500);
  } catch (err) {
    addRecipeView.renderError(err);
  }
};

// INITIALIZE ALL OF OUR EVENT HANDLERS WITH PUBSUB - CALLING OUR EVENT HANDLER FUNCTIONS WITH OUR CONTROLLER FUNCTIONS AS PARAMETERS FOR THE EVENT LISTENER TO CALL
const init = function () {
  bookmarksView.addHandlerRenderBookmarks(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
// We create this INIT function in order to call the addHandlerRender() and addHandlerSearch() function immediately as the engine reads it. Which in turn, calls the addHandlerRender() function that adds an event listener to the `hashchange` and `load` events on the view and waits for them to call the controlRecipes function.

init();
