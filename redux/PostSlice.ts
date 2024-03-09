import { createSlice, current } from "@reduxjs/toolkit";

const formData = createSlice({
  name: "form data",
  initialState: { data: {}, showModal: false },
  reducers: {
    setFormData(state, action) {
      const payload = action.payload;

      state = { data: payload.data, showModal: payload.showModal };
      return state;
    },
  },
});

export const formValue = (state: any) => {
  return state.formData;
};

export const { setFormData } = formData.actions;
export default formData;
