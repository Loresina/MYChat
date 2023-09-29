import { createSlice, createEntityAdapter, current } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channelsSlice';

const messagesAdapter = createEntityAdapter();
// По умолчанию: { ids: [], entities: {} }
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: messagesAdapter.addMany,
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder.addCase(channelsActions.removeChannel, (state, action) => {
      const messagesToRemove = Object.values(state.entities)
        .filter((message) => message.channelId === action.payload.id)
        .map((message) => message.id);

      messagesAdapter.removeMany(state, messagesToRemove);
    });
  },
});

export const { actions } = messagesSlice;
export const selectors = messagesAdapter.getSelectors((state) => state.messagesStore);
export default messagesSlice.reducer;
