class searchView {
  _parent = document.querySelector('.search');
  getQuery() {
    const query = this._parent.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }
  _clearInput() {
    this._parent.querySelector('.search__field').value = '';
  }
  addHandlerQuery(handler) {
    this._parent.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}
export default new searchView();
