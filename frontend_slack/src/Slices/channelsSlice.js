import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

// const initialState = {
//   channels: [],
// };

const channelsAdapter = createEntityAdapter();
// По умолчанию: { ids: [], entities: {} }
const initialState = channelsAdapter.getInitialState();
console.log('Я в событии setChannenl', initialState);

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: channelsAdapter.addMany,
    // setChannels: (state, { payload: { existChannels } }) => {
    //   console.log('Я в событии setChannenl', existChannels);
    //   state.channels = [...state.channels, ...existChannels];
    // },
  },
});

export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channelsStore);
export default channelsSlice.reducer;
