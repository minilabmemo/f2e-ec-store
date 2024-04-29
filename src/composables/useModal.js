import {ref, onMounted} from 'vue'
import Modal from 'bootstrap/js/dist/modal';

export function useModal(modal) {
  const newModal = ref(null)
  onMounted(() => {
    newModal.value = new Modal(modal.value);

  })

  function showModal() {
    if (newModal.value) {
      newModal.value.show();
    }

  }
  function hideModal() {
    newModal.value.hide();
  }

  return {showModal, hideModal}
}