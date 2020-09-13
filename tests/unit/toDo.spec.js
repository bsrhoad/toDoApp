import Vue from "vue";
import Vuetify from "vuetify";
Vue.use(Vuetify);

// Components
import NewToDo from "@/components/NewToDo.vue";

// Utilities
import { mount, createLocalVue } from "@vue/test-utils";

const localVue = createLocalVue();

describe("NewToDo.vue", () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("should emit an event when the add v-btn is clicked", () => {
    const wrapper = mount(NewToDo, {
      localVue,
      vuetify
    });

    const event = jest.fn();
    const button = wrapper.find("#add");

    wrapper.vm.$on("add-new-to-do", event);

    expect(event).toHaveBeenCalledTimes(0);

    // Simulate a click on the button
    button.trigger("click");

    // Ensure that our mock event was called
    expect(event).toHaveBeenCalledTimes(1);
  });
});
