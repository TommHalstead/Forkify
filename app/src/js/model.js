import { async } from 'regenerator-runtime/runtime'; // Imports polyfills for async functions
import { API_URL, RES_PER_PAGE, KEY } from './config';
import { AJAX, makeObject } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: ``,
    results: [],
    page: 1,
    pageDefault: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

// ASYNC FUNCTIONS THAT MAKES THE API CALL IN ORDER TO GET THE RECIPE DATA AND THEN STORES IT ALL IN THE {RECIPE} OBJECT
export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}/${id}?key=${KEY}`);
    const { recipe: apiRec } = data.data;

    state.recipe = await makeObject(apiRec);

    if (state.bookmarks.some(bookmark => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch (err) {
    // Temp error handling
    console.error(`${err.name} - ${err.message} 🚩🚩`);
    throw err; // We throw this error because in our controller.js is where we call this function but this function lives here in the model.js. So therefore if this function has an error, as the engine is reading this code, it would short-circuit and throw this error right here, never propegating it to the controller. This way, we throw our error and now it will return the code execution to the calling function in the (controller.js) which is where we will catch and ha ndle this error.
  }
};

// LOADS SEARCH RESULTS BASED ON USER QUERY AND MAPS THE QUERIED RECIPE TO THE STATE.SEARCH.RESULTS OBJECT.
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query; // We created a search object within our state object, which holds the query that we here set to this parameter that is passed in, this way we update the query property with the queries that are searched.
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
    if (!data.results) throw new Error();

    state.search.results = data.data.recipes.map(
      rec => {
        return {
          id: rec.id,
          title: rec.title,
          publisher: rec.publisher,
          image: rec.image_url,
          ...(rec.key && { key: rec.key }),
        };
      } // Right here we map these objects in this array to a new array with new objects with the property names changed and we save these mapped arrays to our search object within our state object that we export to all modules.
    );
  } catch (err) {
    // console.error(`${err} 🏴`);
    throw err;
  } // We will throw this error, so that we can handle it in the controller, where we will call this function.
};
// This is the function we are creating for loading the search results, this will be called by the contoller, and the controller is the one who will tell this function what we're going to be searching for. Therefore we will pass in a `query` parameter in order to pass this argument in when we call it with the controller.

// ALGORITHYM FUNCTION TO GENERATE 10 SEARCH RESULTS PER PAGE
export const getSearchResultsPage = (page = state.search.pageDefault) => {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage; // PAGE = (1 - 1) * 10 = 0 // PAGE = (2 - 1) * 10 = 10
  const end = page * state.search.resultsPerPage; // PAGE 1 * 10 (results per page) = 10 // PAGE 2 * 10 = 20

  return state.search.results.slice(start, end); // SLICES THE RESULTS ARRAY BASED ON USER QUERY BY OUR START AND END LOGIC ABOVE
};

// ALGORITHYM FUNCTION FOR CALCULATING AND UPDATING THE SERVINGS
export const updateServings = newServings => {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    // newQt = oldQT * newServings / oldServings
  });
  // Update state recipe values
  state.recipe.servings = newServings;
};

const perstistBookmarks = function () {
  localStorage.setItem(`bookmarks`, JSON.stringify(state.bookmarks)); // Set item takes two parameters, a key(whatever you want to name it) and a value, that must first be a string in order to store it. Therefore we take our array of objects and pass it into our JSON.stringify() method.
};

// ADD BOOKMARKS TO THE BOOKMARK TAB
export const addBookmark = function (recipe) {
  // Push bookmark to bookmark array
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  perstistBookmarks();
};

// DELETE OUR BOOKMARKS
export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  // Mark current recipe as bookmarked = false
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  perstistBookmarks();
};

// Grab items from our local storage in order to render it via the previewView
const init = function () {
  const storage = localStorage.getItem(`bookmarks`);
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();

const clearBookmarks = function () {
  localStorage.clear(`bookmarks`);
};
// clearBookmarks();

// TAKING OUR FORM UPLOADED RECIPES AND PUSHING THEM TO AN ARRAY IN ORDER TO CREATE A NEW RECIPE
export const uploadRecipe = async function (formData) {
  try {
    const ingredients = Object.entries(formData)
      .filter(ings => ings[0].startsWith(`ingredient`) && ings[1] !== ``)
      .map(ingArrs => {
        const [quantity, unit, description] = ingArrs[1].trim().split(`,`);
        return {
          quantity: quantity ? +quantity : null,
          unit: unit === undefined ? `` : unit,
          description: description === undefined ? `` : description,
        };
      }); // Returns an array of key value pairs where the first item in the array is `ingredients`, that we then map to an object containing an array of the qty, unit, desc.

    const objectRecipe = {
      title: formData.title,
      source_url: formData.sourceUrl,
      image_url: formData.image,
      publisher: formData.publisher,
      cooking_time: +formData.cookingTime,
      servings: +formData.servings,
      ingredients,
    };

    const data = await AJAX(`${API_URL}?key=${KEY}`, objectRecipe);
    const {
      data: { recipe: apiRecipe },
    } = data;

    state.recipe = await makeObject(apiRecipe);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};
