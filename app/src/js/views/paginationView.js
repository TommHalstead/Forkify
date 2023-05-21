import View from './View';
import icons from 'url:../../img/icons.svg';
import * as model from '../model.js';
import { RES_PER_PAGE } from '../config';
import { mark } from 'regenerator-runtime';

class PaginationView extends View {
  _parentElement = document.querySelector(`.pagination`);

  addHandlerClick(handler) {
    this._parentElement.addEventListener(`click`, function (e) {
      const btn = e.target.closest(`.btn--inline`);
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  // GENERATE MARKUP FOR
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      model.state.search.results.length / model.state.search.resultsPerPage
    );

    // Page 1 - Other pages
    if (curPage === 1 && numPages > 1) {
      return ` 
  <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
    <span>Page ${curPage + 1}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button>
  `;
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return `
  <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${curPage - 1}</span>
  </button>`;
    }

    // Other page
    if (curPage < numPages) {
      return `
  <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${curPage - 1}</span>
  </button>

  <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
    <span>Page ${curPage + 1}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button>;
  `;
    }
    // Page 1 - No pages
    if (curPage === 1 && numPages === 1) return ``;
  }
}

export default new PaginationView();
