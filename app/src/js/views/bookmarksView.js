import View from './View';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class BookmarksView extends View {
  _parentElement = document.querySelector(`.bookmarks__list`);
  _errorMessage = `No bookmarks yet, find a nice recipe and bookmark it!`;
  _message = ``;

  addHandlerRenderBookmarks(handler) {
    window.addEventListener(`load`, handler);
  }

  // We use this function here to call our previewView.render() within the render we have a condition if(!render) return markup; which we then call and pass in our .map() argument and pass in our bookmark argument and set our second parameter to false, so this method will always return our markup. That will make all of this an array of strings, that we then join together with the .join() method.
  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
