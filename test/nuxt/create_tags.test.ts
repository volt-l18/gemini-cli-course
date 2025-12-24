import { describe, it, expect, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Create from '../../app/pages/create.vue'

describe('CreatePage Tags', () => {
  it('should add tags when comma is typed', async () => {
    const wrapper = await mountSuspended(Create)
    const input = wrapper.find('#tags')

    await input.setValue('sweet,')
    // Access the component's internal state if possible, or check the rendered DOM
    // Since 'tags' ref is not exposed directly, we check the DOM for .tag elements
    
    // We need to wait for DOM update? setValue usually triggers it.
    
    const tags = wrapper.findAll('.tag')
    expect(tags.length).toBe(1)
    expect(tags[0].text()).toContain('sweet')
    
    // Input should be cleared
    expect(input.element.value).toBe('')
  })

  it('should not allow duplicate tags', async () => {
    const wrapper = await mountSuspended(Create)
    const input = wrapper.find('#tags')

    await input.setValue('sweet,')
    await input.setValue('sweet,')
    
    const tags = wrapper.findAll('.tag')
    expect(tags.length).toBe(1)
  })

  it('should limit tags to 5', async () => {
    const wrapper = await mountSuspended(Create)
    const input = wrapper.find('#tags')

    await input.setValue('1,')
    await input.setValue('2,')
    await input.setValue('3,')
    await input.setValue('4,')
    await input.setValue('5,')
    await input.setValue('6,')
    
    const tags = wrapper.findAll('.tag')
    expect(tags.length).toBe(5)
    expect(tags[4].text()).toContain('5')
    
    // Check if warning message is visible (optional, but good)
    const warning = wrapper.find('small')
    expect(warning.exists()).toBe(true)
    expect(warning.text()).toContain('Max 5 tags reached')
  })

  it('should remove tag when X is clicked', async () => {
    const wrapper = await mountSuspended(Create)
    const input = wrapper.find('#tags')

    await input.setValue('sweet,')
    expect(wrapper.findAll('.tag').length).toBe(1)
    
    await wrapper.find('.tag-remove').trigger('click')
    expect(wrapper.findAll('.tag').length).toBe(0)
  })
})
