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
          <form class="row needs-validation" novalidate>
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

                <div class="row g-2 " v-for="(imageUrl, index) in tempProduct.imagesUrl" :key="imageUrl">
                  <div class="mb-3 col-8">
                    <label for="image" class="form-label">輸入圖片網址</label>
                    <button type="button" class="ms-2 btn btn-outline-danger btn-sm"
                      @click="tempProduct.imagesUrl.splice(index, 1);">移除
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
                  required>
                <div class="invalid-feedback">
                  *標題必填
                </div>
              </div>

              <div class="row gx-2">
                <div class="mb-3 col-md-12">
                  <label for="category" class="form-label">*分類</label>
                  <select id="category" class="form-select" v-model.trim="selectCategories" multiple>
                    <option value="test">test</option>
                    <option value="styles">styles</option>
                    <option :value="item.key" v-for="item in findCategoriesList()" :key="item.id">{{ item.key }} -{{
                      item.name }}
                    </option>
                  </select>
                </div>
                <div class="mb-3 col-md-6">
                  <label for="num" class="form-label">*數量</label>
                  <input type="number" class="form-control" id="num" placeholder="請輸入數量" v-model="tempProduct.num"
                    :min="itemLimit.min_num" :max="itemLimit.max_num" required>
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
                    v-model="tempProduct.origin_price" :min="itemLimit.min_price" :max="itemLimit.max_price" required>
                  <div class="invalid-feedback">
                    *原價必填
                  </div>
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">*售價</label>
                  <input type="number" class="form-control" id="price" placeholder="請輸入售價" v-model="tempProduct.price"
                    :min="itemLimit.min_price" :max="itemLimit.max_price" required>
                  <div class="invalid-feedback">
                    *售價必填
                  </div>
                </div>
              </div>
              <hr>

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea type="text" class="form-control" id="description" placeholder="請輸入產品描述"
                  v-model="tempProduct.description" style="height: 12.5rem"></textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea type="text" class="form-control" id="content" placeholder="請輸入產品說明內容" style="height: 12.5rem"
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
          </form>
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

<script setup>
import categories from '@/utils/config/categories'

import {adminUploadApi} from "@/utils/config/path"
import {useModal} from '@/composables/useModal.js'
import itemLimit from '@/utils/config/itemLimit'
import fetchAct from '@/utils/methods/fetchAct';
import {ref, watch} from 'vue'
const modal = ref(null)

const {showModal, hideModal} = useModal(modal);
defineExpose({
  showModal, hideModal
})
const props = defineProps({
  product: Object,
});
const tempProduct = ref({unit: ""})
const selectCategories = ref(['test'])

function setTempProductDefault() {
  tempProduct.value = props.product;
  tempProduct.value.imagesUrl = tempProduct.value.imagesUrl ? tempProduct.value.imagesUrl : [];
  tempProduct.value.category = props.product.category ? props.product.category : "test";
  selectCategories.value = tempProduct.value.category.split(",");
  tempProduct.value.unit = props.product.unit ? props.product.unit : "件";
  tempProduct.value.num = props.product.num ? props.product.num : itemLimit.min_num;
}
watch(
  () => props.product, () => {
    setTempProductDefault()
  }
);
watch(
  () => selectCategories.value, () => {
    tempProduct.value.category = selectCategories.value.join(',');

  }
);

function findCategoriesList() {
  let lists = []
  for (const [key, value] of Object.entries(categories,)) {
    if (value.sub_category) {
      for (const [subKey, sub] of Object.entries(value.sub_category)) {
        let item = {key: `${key}/${subKey}`, name: `${value.name}/${sub.name}`}
        lists.push(item)
      }
    } else {
      let item = {key: `${key}`, name: value.name}
      lists.push(item)
    }
  }

  return lists
}
let fileInput = ref(null);
let filesInput = ref(null);

function uploadFile(isMain, index) {
  let uploadedFile = null;

  if (isMain) {
    uploadedFile = fileInput.value.files[0];
  }
  if (!isMain) {
    uploadedFile = filesInput.value[index].files[0];
  }

  const formData = new FormData();
  formData.append('file-to-upload', uploadedFile);
  fetchAct.post(adminUploadApi, formData, "上傳圖片").then((response) => {

    if (response.success) {
      if (isMain) {
        tempProduct.value.imageUrl = response.imageUrl;
      } else {
        tempProduct.value.imagesUrl[index] = response.imageUrl;
      }

    }
  });
}
function addImages() {
  tempProduct.value.imagesUrl.push([]);
}

const emit = defineEmits(['update-product'])

function confirmAction(tempProduct) {

  const form = document.querySelector('.needs-validation');
  if (form.checkValidity()) {
    form.submit();
    emit('update-product', tempProduct);
  } else {
    form.classList.add('was-validated');
  }

}

</script>