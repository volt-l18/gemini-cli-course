<script setup lang="ts">
import { ref } from 'vue'
import { X } from 'lucide-vue-next'

const foodOne = ref('')
const foodTwo = ref('')
const description = ref('')
const tags = ref<string[]>([])
const tagInput = ref('')

const handleTagInput = () => {
  if (tagInput.value.includes(',')) {
    const parts = tagInput.value.split(',')
    
    parts.forEach(part => {
      const trimmed = part.trim()
      if (trimmed) {
        if (!tags.value.includes(trimmed) && tags.value.length < 5) {
          tags.value.push(trimmed)
        }
      }
    })
    
    tagInput.value = ''
  }
}

const removeTag = (index: number) => {
  tags.value.splice(index, 1)
}

const handleSubmit = () => {
  if (!foodOne.value || !foodTwo.value || !description.value) {
    alert('Please fill out all required fields.')
    return
  }
  
  const comboData = {
    foodOne: foodOne.value,
    foodTwo: foodTwo.value,
    description: description.value,
    tags: tags.value,
  };

  console.log('New Combo Data:', comboData)

  // Clear form
  foodOne.value = ''
  foodTwo.value = ''
  description.value = ''
  tags.value = []
  tagInput.value = ''
};
</script>

<template>
  <div class="create-page">
    <h1 class="page-title">Create a New Combo</h1>
    <form @submit.prevent="handleSubmit" class="create-form">
      <div class="form-group">
        <label for="foodOne">Food One</label>
        <input
          type="text"
          id="foodOne"
          v-model="foodOne"
          required
        />
      </div>
      <div class="form-group">
        <label for="foodTwo">Food Two</label>
        <input
          type="text"
          id="foodTwo"
          v-model="foodTwo"
          required
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          id="description"
          v-model="description"
          rows="4"
          required
        ></textarea>
      </div>
      <div class="form-group">
        <label for="tags">Tags (comma-separated)</label>
        <input
          type="text"
          id="tags"
          v-model="tagInput"
          @input="handleTagInput"
          placeholder="e.g. sweet, savory, crunchy"
          :disabled="tags.length >= 5"
        />
        <div class="combo-tags" v-if="tags.length > 0" style="margin-top: 0.5rem;">
          <span v-for="(tag, index) in tags" :key="tag" class="tag">
            {{ tag }}
            <X :size="14" class="tag-remove" @click="removeTag(index)" />
          </span>
        </div>
        <small v-if="tags.length >= 5" style="color: var(--secondary-accent-color); font-size: 0.8rem; margin-top: 0.2rem; display: block;">Max 5 tags reached.</small>
      </div>
      <button type="submit" class="btn submit-btn">Create Combo</button>
    </form>
  </div>
</template>
