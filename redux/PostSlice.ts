import { FormState, State } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";

const formData = createSlice({
  name: "form data",
  initialState: { data: {}, showModal: false, action: "" } as FormState,
  reducers: {
    setFormData(state, action) {
      const payload = action.payload;

      state = {
        data: payload.data,
        showModal: payload.showModal,
        action: payload?.action,
      };
      return state;
    },
  },
});

export const formValue = (state: State) => {
  return state.formData;
};

export const { setFormData } = formData.actions;
export default formData;
