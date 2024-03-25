<template>

  <div class="modal" tabindex="-1" ref="modal">
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
            <div class="col-6">
              <div class="row">
                <div><span class="text-sm text-danger ">*圖片上傳限制 1MB</span></div>
                <h5>主圖 </h5>
                <div class="row">
                  <div class="mb-3 col-sm-6">
                    <label for="image" class="form-label">輸入圖片網址</label> <button type="button"
                      class="btn btn-outline-danger btn-sm" @click="tempProduct.imageUrl = ''">
                      移除
                    </button>
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

                <div class="row">
                  <div class="col-12  justify-content-center align-items-center w-25">
                    <img class="img-fluid " alt="main photo" :src="tempProduct.imageUrl" v-if="tempProduct.imageUrl">
                  </div>
                </div>
              </div>

              <div class="row mt-5 ">
                <div class="row ">
                  <div class="d-flex gap-2  ">
                    <h5>副圖</h5>
                    <button class="btn btn-outline-primary btn-sm" @click="addImages">
                      新增圖片
                    </button>
                  </div>
                </div>


                <div class="row g-2 " v-for="(item, index) in this.tempProduct.imagesUrl" :key="item">
                  <div class="mb-3 col-8">
                    <label for="image" class="form-label">輸入圖片網址</label>
                    <button type="button" class="ms-2 btn btn-outline-danger btn-sm"
                      @click="tempProduct.imagesUrl[index] = ''">移除
                    </button>
                    <input type="text" class="form-control" id="image" placeholder="請輸入圖片連結"
                      v-model="tempProduct.imagesUrl[index]">
                    <label for="customFile" class="form-label">或 上傳圖片
                      <i class="fas fa-spinner fa-spin"></i>
                    </label>
                    <input type="file" id="customFile" class="form-control" @change="uploadFile(false, index)"
                      ref="filesInput">

                    <hr>
                  </div>
                  <div class="mb-3 col-4">

                    <div class="d-flex justify-content-center align-items-center object-fit-cover w-75 gap-2">
                      <img class="img-fluid" alt="images photo" :src="tempProduct.imagesUrl[index]"
                        v-if="tempProduct.imagesUrl[index]">
                    </div>


                  </div>
                </div>

              </div>

            </div>
            <div class="col-6">
              <div class="row mb-3">
                <label for="title" class="form-label">*標題</label>
                <input type="text" class="form-control " id="title" placeholder="請輸入標題" v-model="tempProduct.title"
                  @blur="customCheck('title')" :class="{ 'is-invalid': invalidMap.get('title') }">
                <div class="invalid-feedback">
                  *標題必填
                </div>
              </div>

              <div class="row gx-2">
                <div class="mb-3 col-md-12">
                  <label for="category" class="form-label">*分類</label>
                  <select id="category" class="form-select" v-model.trim="tempProduct.category">
                    <option value="test">test</option>
                    <option :value="item" v-for="item in findCategoriesList()" :key="item.id">{{ item }}</option>
                  </select>
                </div>
                <div class="mb-3 col-md-6">
                  <label for="num" class="form-label">*數量</label>
                  <input type="number" class="form-control" id="num" placeholder="請輸入數量" v-model="tempProduct.num"
                    :min="itemLimit.min_num" :max="itemLimit.max_num" @blur="customCheck('num')"
                    :class="{ 'is-invalid': invalidMap.get('num') }">
                  <div class="invalid-feedback">
                    *數量必填
                  </div>
                </div>
                <div class="mb-3 col-md-6">
                  <label for="unit" class="form-label">*單位</label>
                  <select id="unit" class="form-select" v-model.trim="tempProduct.unit">
                    <option value="件">件</option>
                    <option value="組">組</option>
                  </select>
                </div>

              </div>

              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">*原價</label>
                  <input type="number" class="form-control" id="origin_price" placeholder="請輸入原價"
                    v-model="tempProduct.origin_price" :min="itemLimit.min_price" :max="itemLimit.max_price"
                    @blur="customCheck('origin_price')" :class="{ 'is-invalid': invalidMap.get('origin_price') }">
                  <div class="invalid-feedback">
                    *原價必填
                  </div>
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">*售價</label>
                  <input type="number" class="form-control" id="price" placeholder="請輸入售價" v-model="tempProduct.price"
                    :min="itemLimit.min_price" :max="itemLimit.max_price" @blur="customCheck('price')"
                    :class="{ 'is-invalid': invalidMap.get('price') }">
                  <div class="invalid-feedback">
                    *售價必填
                  </div>
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
          <button type="submit" class="btn btn-primary" @click="confirmAction(tempProduct)">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {adminUploadApi} from "@/utils/const/path"
import modalMixin from "@/utils/mixins/modalMixin"
import itemLimit from '@/utils/const/itemLimit'
import categories from '@/utils/const/categories'

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
      tempProduct: {unit: ""},
      itemLimit: itemLimit,
      categories: categories,
      invalidMap: new Map(),
    }
  },
  watch: {
    product() { //NOTE 單向數據流 外層不能修改內層，但可以這樣改內容資料，當外層 prop 改變就監聽改內層 data
      this.tempProduct = this.product;
      //設置選項預設值
      this.tempProduct.imagesUrl = this.tempProduct.imagesUrl ? this.tempProduct.imagesUrl : [];
      this.tempProduct.category = this.product.category ? this.product.category : "test";
      this.tempProduct.unit = this.product.unit ? this.product.unit : "件";
      this.tempProduct.num = this.product.num ? this.product.num : this.itemLimit.min_num;

    }
  },
  mixins: [modalMixin],

  methods: {
    findCategoriesList() {
      let list = []
      for (const [key, value] of Object.entries(this.categories,)) {
        if (value.sub_category) {
          for (const subKey of Object.keys(value.sub_category)) {
            list.push(`${key}/${subKey}`)
          }
        } else {
          list.push(`${key}`)
        }
      }

      return list
    },
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
      this.tempProduct.imagesUrl.push([]);
    },
    customCheck(name) {
      if (!this.tempProduct[name]) {
        this.invalidMap.set(name, true);
      } else {
        this.invalidMap.delete(name);
      }
    },
    confirmAction(tempProduct) {
      this.customCheck('title');
      this.customCheck('price');
      this.customCheck('origin_price');

      if (this.invalidMap.size === 0) {
        this.$emit('update-product', tempProduct);
      }

    }
  },

}
</script>