import { uniqueArray } from "./utils/uniqueArray";

export class KeywordHistory {
  $keywordHistory = null;
  data = null;

  constructor({ $target, onSearch }) {
    const $keywordHistory = document.createElement("ul");
    this.$keywordHistory = $keywordHistory;
    this.$keywordHistory.className = "HistoryKeyword";
    $target.appendChild(this.$keywordHistory);
    this.onSearch = onSearch;
    this.init();
    this.render();
  }

  init() {
    const keywordHistory = this.getHistory();
    this.setState(keywordHistory);
  }

  addKeyword(keyword) {
    const keywordHistory = this.getHistory();
    keyword = uniqueArray(keywordHistory);
    keywordHistory.unshift(keyword);
    keywordHistory = keywordHistory.slice(0, 5);
    localStorage.setItem("keywordHistory", keywordHistory.join(","));
    this.init();
  }

  getHistory() {
    const keywordHistory =
      localStorage.getItem("keywordHistory") === null
        ? []
        : localStorage.getItem("keywordHistory").split(",");

    return keywordHistory;
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    this.$keywordHistory.innerHTML = this.data
      .map((keyword) => `<li><button>${keyword}</button></li>`)
      .join("");
    this.$keywordHistory
      .querySelectorAll("li button")
      .forEach(($item, index) => {
        $item.addEventListener("click", () => {
          this.onSearch(this.data[index]);
        });
      });
  }
}
