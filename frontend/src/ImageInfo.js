import api from "./api";

export class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);
    this.data = data;
    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  showDetail(data) {
    // 상세 정보 요청
    api.fetchCatDetail(data.cat.id).then(({ data }) => {
      // 정보를 업데이트
      this.setState({
        visible: true,
        cat: data,
      });
    });
  }

  closeImageInfo() {
    this.setState({
      visible: false,
      cat: undefined,
    });
  }

  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data.cat;

      this.$imageInfo.innerHTML = `
        <div class="content-wrapper">
          <div class="title">
            <span>${name}</span>
            <div class="close">x</div>
          </div>
          <img src="${url}" alt="${name}"/>        
          <div class="description">
            <div>성격: ${temperament}</div>
            <div>태생: ${origin}</div>
          </div>
        </div>`;
      this.$imageInfo.style.display = "block";
      this.$imageInfo.querySelector(".close").addEveneListener("click", (e) => {
        this.closeImageInfo();
        document.addEventListener("keydown", (e) => {
          if (e.key === "escape") {
            this.closeImageInfo();
          }
        });
      });
      this.$imageInfo.addEveneListener("click", (e) => {
        if (e.target.className !== "imageInfo") {
          this.closeImageInfo();
        }
      });
    } else {
      this.$imageInfo.style.display = "none";
    }
  }
}
