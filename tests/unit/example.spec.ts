import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

// Testable components can be found in the testableComponents folder, though do
// make any necessary changes to them if any features or styling of the actual
// component changes. The testable components are there to demonstrate what edits
// have been made to these components in the past in order to make it possible to
// test them

// Example Test
describe('HelloWorld.vue', () => {
  it('renders the Hello World component correctly', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })
    expect(wrapper.exists()).equals(true)
  })
})
