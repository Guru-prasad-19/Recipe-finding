import View from './View';
import icons from 'url:../../img/icons.svg';
class paginationViews extends View {
  _parent = document.querySelector('.pagination');

  addClickHandler(handler) {
    this._parent.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      console.log(goToPage);

      handler(goToPage);
    });
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    if (numPages > 1 && curPage === 1)
      return ` <button data-goto = "${
        curPage + 1
      }"class="btn--inline pagination__btn--next">
                    <span>Page ${curPage + 1} </span>
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>`;
    if (numPages === curPage && numPages > 1)
      return `<button data-goto = "${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${curPage - 1}</span>
                </button>`;
    if (curPage < numPages)
      return `<button data-goto = "${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${curPage - 1}</span>
                </button>
                <button data-goto = "${
                  curPage + 1
                }" class="btn--inline pagination__btn--next">
                    <span>Page ${curPage + 1} </span>
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>`;
    return '';
  }
}
export default new paginationViews();
