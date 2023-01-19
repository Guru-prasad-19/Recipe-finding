import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationViews from './views/paginationViews.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// if (module.hot) {
//   module.hot.accept();
// }
const recipeContain = async function () {
  //Fetching recipes from API
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);
    if (!id) return;

    recipeView.renderSpinner();
    resultsView.update(model.getSearchResultsPage());

    bookmarksView.update(model.state.bookmarks);
    await model.loadRecipe(id);
    // console.log(recipe);
    // const { recipe } = model.state;
    //Rendering recipes
    recipeView.render(model.state.recipe);
    // controlServings();
  } catch (err) {
    // alert(err);
    recipeView.renderError(`${err} 💥💥💥`);
  }
};
const controlSearch = async function () {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    console.log(query);
    if (!query) return;
    await model.loadSearch(query);
    console.log(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());
    paginationViews.render(model.state.search);
  } catch (err) {}
};
// controlSearch();

const controlPagination = function (goTo) {
  // console.log(+goTo);
  resultsView.render(model.getSearchResultsPage(+goTo));
  paginationViews.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServings(+newServings);
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlBookmark = function () {
  // console.log(model.state.recipe.bookmarked);
  if (model.state.recipe.bookmarked)
    model.deleteBookmark(model.state.recipe.id);
  else model.addBookmark(model.state.recipe);
  // console.log(model.state.recipe);
  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
};
const controlBook = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();
    // console.log(newRecipe);
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    recipeView.render(model.state.recipe);

    addRecipeView.renderMessage();

    bookmarksView.render(model.state.bookmarks);

    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, 2500);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};
const init = function () {
  bookmarksView.addHandlerRender(controlBook);
  recipeView.addHandler(recipeContain);
  recipeView.addHandlerBookmarks(controlBookmark);
  searchView.addHandlerQuery(controlSearch);
  paginationViews.addClickHandler(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
  addRecipeView._addHandlerUpload(controlAddRecipe);
};
init();
