import {ref, watchEffect} from 'vue'
import {useWindowSize} from '@vueuse/core'

export function useDeviceSize() {
  const {width} = useWindowSize()
  const isExtraSmallDevice = ref(false);
  watchEffect(() => {
    let newWidth = width.value
    if (newWidth >= 480) {
      isExtraSmallDevice.value = false;

    } else {
      isExtraSmallDevice.value = true;

    }
  });
  return {isExtraSmallDevice}
}