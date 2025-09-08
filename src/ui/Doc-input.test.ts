import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import DocInput from "./Doc-input.vue";

describe('docinput', ()=>{
  it('render input with correct placeholder & inicial value', async()=>{
    const wrapper = mount(DocInput,{
      props:{
        tooltip: 'test tooltip',
        modelValue: 'inicialValue'
      }
    });

    expect(wrapper.find('input').element.placeholder).toBe('test tooltip');
    expect(wrapper.vm.$props.modelValue).toBe("inicialValue");
  })

});
