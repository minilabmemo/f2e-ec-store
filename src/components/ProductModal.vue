<template>

  <div class="modal" tabindex="-1" ref="modal">
    <!-- 請同學自行新增 v-model -->
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>新增產品</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-6">
              <div><span class="text-sm text-danger ">*圖片上傳限制 1MB</span></div>
              <h5>主圖 </h5>
              <div class="row">
                <div class="mb-3 col-sm-6">
                  <label for="image" class="form-label">輸入圖片網址</label>
                  <input type="text" class="form-control" id="image" placeholder="請輸入圖片連結"
                    v-model="tempProduct.imageUrl">

                </div>
                <div class="mb-3 col-sm-6">
                  <label for="customFile" class="form-label">或 上傳圖片
                    <i class="fas fa-spinner fa-spin"></i>
                  </label>
                  <input type="file" id="customFile" class="form-control" @change="uploadFile(true)" ref="fileInput">
                </div>
              </div>

              <div class="d-flex justify-content-center align-items-center w-25">
                <img class="img-fluid " alt="main photo" :src="tempProduct.imageUrl">
              </div>
              <button type="button" class="btn btn-outline-danger">
                移除
              </button>

              <!-- TODO B 移除圖片與整理 A 上傳動畫-->
              <!-- TODO A 單位限制 B 分類選項 -->
              <div class="mt-5">
                <h5>副圖
                  <button class="btn btn-outline-primary btn-sm d-block " @click="addImages">
                    新增圖片
                  </button>
                </h5>
                <div class="row" v-for="(item, index) in this.tempProduct.imagesUrl" :key="item">
                  <div class="mb-3 col-sm-6">
                    <label for="image" class="form-label">輸入圖片網址</label>
                    <input type="text" class="form-control" id="image" placeholder="請輸入圖片連結"
                      v-model="tempProduct.imagesUrl[index]">
                    <label for="customFile" class="form-label">或 上傳圖片
                      <i class="fas fa-spinner fa-spin"></i>
                    </label>
                    <input type="file" id="customFile" class="form-control" @change="uploadFile(false, index)"
                      ref="filesInput">
                    <hr>
                  </div>
                  <div class="mb-3 col-sm-6">

                    <div class="d-flex justify-content-center align-items-center object-fit-cover w-50">
                      <img class="img-fluid" alt="images photo" :src="item">
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div class="col-sm-6">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input type="text" class="form-control" id="title" placeholder="請輸入標題" v-model="tempProduct.title">
              </div>

              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input type="text" class="form-control" id="category" placeholder="請輸入分類"
                    v-model="tempProduct.category">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="unit" class="form-label">單位</label>
                  <input type="text" class="form-control" id="unit" placeholder="請輸入單位" v-model="tempProduct.unit">
                </div>
              </div>

              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input type="number" class="form-control" id="origin_price" placeholder="請輸入原價"
                    v-model="tempProduct.origin_price">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input type="number" class="form-control" id="price" placeholder="請輸入售價" v-model="tempProduct.price">
                </div>
              </div>
              <hr>

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea type="text" class="form-control" id="description" placeholder="請輸入產品描述"
                  v-model="tempProduct.description"></textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea type="text" class="form-control" id="content" placeholder="請輸入產品說明內容"
                  v-model="tempProduct.content"></textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" :true-value="1" :false-value="0" id="is_enabled"
                    v-model="tempProduct.is_enabled">
                  <label class="form-check-label" for="is_enabled">
                    是否啟用
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消
          </button>
          <button type="button" class="btn btn-primary" @click="$emit('update-product', tempProduct)">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {adminUploadApi} from "@/utils/const/path"
import modalMixin from "@/utils/mixins/modalMixin"
export default {
  inject: ['httpMessageState'],
  props: {
    product: {
      type: Object,
      default() {return {};}
    }
  },

  data() {
    return {
      modal: {},
      tempProduct: {},

    }
  },
  watch: {
    product() { //NOTE 單向數據流 外層不能修改內層，但可以這樣改內容資料，當外層 prop 改變就監聽改內層 data
      this.tempProduct = this.product;
      this.tempProduct.imagesUrl = this.tempProduct.imagesUrl ? this.tempProduct.imagesUrl : [];
    }
  },
  mixins: [modalMixin],
  updated() {
    console.log("refs", this.$refs)
  },
  methods: {

    uploadFile(isMain, index) {
      let uploadedFile = null;
      if (isMain) {
        uploadedFile = this.$refs.fileInput.files[0];
      }
      if (!isMain) {
        uploadedFile = this.$refs.filesInput[index].files[0];
      }



      const formData = new FormData();
      formData.append('file-to-upload', uploadedFile);
      this.$http.post(adminUploadApi, formData).then((response) => {
        console.log(response.data);
        this.httpMessageState(response, '上傳圖片');
        if (response.data.success) {
          if (isMain) {
            this.tempProduct.imageUrl = response.data.imageUrl;
          } else {
            this.tempProduct.imagesUrl[index] = response.data.imageUrl;
          }

        }
      });
    },
    addImages() {
      console.log("addImages")
      this.tempProduct.imagesUrl.push([]);
    }
  },

}
</script>@/utils/const/path