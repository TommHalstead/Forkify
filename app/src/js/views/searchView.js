import View from './View';

class SearchView extends View {
  _parentElement = document.querySelector(`.search`);
  // _errorMessage = `You must search for something!`;
  // We will use this function to grab the query typed in by the user
  getQuery() {
    const query = this._parentElement.querySelector(`.search__field`).value; // We do a querySelector() on the parent el to find the first child with the matching class and grab that value from there.
    this.#clearInput();
    return query;
  }

  #clearInput() {
    this._parentElement.querySelector(`.search__field`).value = ``;
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener(`submit`, function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
