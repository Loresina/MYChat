import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: ' messages',
  initialState,
  reducers: {
    setMessages: (state, { payload: { newMessages } }) => {
      console.log('Я в событии setMessages', newMessages);
      state.messages = [...state.messages, ...newMessages];
    },
  },
});

export const { setMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
