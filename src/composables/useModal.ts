import { ref, onMounted, type Ref } from 'vue';
import Modal from 'bootstrap/js/dist/modal';

export function useModal(modal: Ref<HTMLElement | null>) {
  const newModal = ref<Modal | null>(null);

  onMounted(() => {
    if (modal.value) {
      newModal.value = new Modal(modal.value);
    }
  });

  function showModal() {
    if (newModal.value) {
      newModal.value.show();
    }
  }

  function hideModal() {
    if (newModal.value) {
      newModal.value.hide();
    }
  }

  return { showModal, hideModal };
}
