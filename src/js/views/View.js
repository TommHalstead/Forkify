import icons from 'url:../../img/icons.svg'; // Parcel 2

export default class View {
  _data;

  // RENDER ALL VIEWS - ALL VIEWS HAVE THESE METHODS AND VARIABLE NAMES DUE TO PROTOTYPAL INHERITANCE
  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered to the DOM (e.g recipe)
   * @param {Boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @returns {string} If render is false.
   * @this {Object} View instance
   * @author Thomas Halstead
   * @todo Finish implementation
   */
  render(data, render = true) {
    this._data = data; // Creates a recipe property and sets it to the argument that is received.
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._insertHTML(markup);
  }
  // CLEAR THE OLD HTML MARKUP
  _clear() {
    this._parentElement.innerHTML = ``;
  } // Here we create a helper function to clear the container for us

  // UPDATE IGREDIENT DATA FOR SERVINGS - RENDER ONLY UPDATED ELEMENTS
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup(); // Store our HTML

    const newDOM = document.createRange().createContextualFragment(newMarkup); // These methods transform HTML markup into to a DOM element tree
    const newElements = Array.from(newDOM.querySelectorAll(`*`));
    const curElements = Array.from(this._parentElement.querySelectorAll(`*`));

    // LOOP OVER NEW VIRTUAL DOM AND CHANGE THE CONTENT - ALSO LOOPING OVER THE curElements ARRAY FROM INSIDE THE forEach() loop!!
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // UPDATE TEXT CONTENT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ``
      ) {
        curEl.textContent = newEl.textContent;
      }
      // UPDATE ATTRIBUTES - USE ISEQUALNODE TO COMPARE THE NODES THEMSELVES, USE ARRAY.FROM TO CREATE AN ARRAY FROM THE
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        ); // Replace all the different attribute names from the newEl to the curEl
      }
    });
  }
  // INSERT HTML INTO THE DOM
  _insertHTML(markup) {
    this._parentElement.insertAdjacentHTML(`afterbegin`, markup);
  }
  // RENDER SPINNER FOR LOADING VIEWS
  renderSpinner() {
    const markup = `
  <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>`;
    this._clear();
    this._insertHTML(markup);
  }
  // RENDER ERROR MESSAGE FOR ERRORS
  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this._clear();
    this._insertHTML(markup);
  }
  // RENDER SUCCESS MESSAGES
  renderMessage(message = this._message) {
    const markup = `
   <div class="recipe">
     <div class="message">
       <div>
         <svg>
           <use href="${icons}#icon-smile"></use>
         </svg>
       </div>
       <p>${message}</p>
     </div>`;
    this._clear();
    this._insertHTML(markup);
  }
}
