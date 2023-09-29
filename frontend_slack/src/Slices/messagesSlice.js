import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter();
// По умолчанию: { ids: [], entities: {} }
const initialState = messagesAdapter.getInitialState();
// console.log('Я в событии setChannenl', initialState);

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: messagesAdapter.addMany,
    addMessage: messagesAdapter.addOne,
  },
});

export const { actions } = messagesSlice;
export const selectors = messagesAdapter.getSelectors((state) => state.messagesStore);
export default messagesSlice.reducer;
