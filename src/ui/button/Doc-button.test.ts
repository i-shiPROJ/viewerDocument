import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import DocButton from './Doc-button.vue';

describe('DocButton', () => {

    it('render button default text Button ', () => {
      const wrapper = mount(DocButton);
      expect(wrapper.text()).toBe('Button');
    });

    it('press btn disabled false', async ()=>{
      const wrapper = mount (DocButton,{
        props:{
          text: 'myButtom',
          color: 'blue',
          disabled: false
        },
        slots: {default: 'myButtom'}
      });

      await wrapper.trigger('click');

      expect(wrapper.emitted().click).toBeTruthy();

    });

    it('press btn activated', async ()=>{
      const wrapper = mount (DocButton,{
        props:{
          text: 'myButtom',
          color: 'blue',
          disabled: true
        },
        slots: {default: 'myButtom'}
      });

      await wrapper.trigger('click');

      expect(wrapper.emitted().click).toBeFalsy();

    });

});