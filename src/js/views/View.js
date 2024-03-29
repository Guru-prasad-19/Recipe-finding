import icons from 'url:../../img/icons.svg';
export default class View {
  _data;
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._clear();
    this._parent.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newEle = Array.from(newDom.querySelectorAll('*'));
    const curEle = Array.from(this._parent.querySelectorAll('*'));

    newEle.forEach((newEl, i) => {
      const curEl = curEle[i];
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(att =>
          curEl.setAttribute(att.name, att.value)
        );
      }
    });
  }

  _clear() {
    this._parent.innerHTML = '';
  }

  renderSpinner = function () {
    const html = `<div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
            </div>`;
    this._clear;
    this._parent.insertAdjacentHTML('afterbegin', html);
  };
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
    this._parent.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const msg = ` <div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>`;
    this._clear();
    this._parent.insertAdjacentHTML('afterbegin', msg);
  }
}
