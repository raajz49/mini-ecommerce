<template>
  <!-- gives the overall look of the dialog -->
  <div v-if="show" class="dialog-overlay">
    <div class="dialog">
      <div class="dialog-content">
        <p>{{ message }}</p>
        <div class="dialog-actions">
          <CButton @click="onConfirm" variant="primary" size="md" :loading="confirmLoading"
            >Confirm</CButton
          >
          <CButton @click="onCancel" variant="destructive" size="md">Cancel</CButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
//button from cbutton
import CButton from './CButton.vue'

defineProps({
  show: Boolean,
  message: String,
})

const emit = defineEmits(['confirm', 'cancel'])

//confirmation functions
const onConfirm = () => {
  emit('confirm')
}

const onCancel = () => {
  emit('cancel')
}
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.dialog {
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
}

.dialog-content {
  text-align: center;
  color: #333;
}

.dialog-actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  justify-content: center;
}
</style>
