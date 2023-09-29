import AddChannel from './AddChannel';
// import Remove from './Remove.jsx';
// import Rename from './Rename.jsx';

const modals = {
  adding: AddChannel,
//   removing: Remove,
//   renaming: Rename,
};

export default (modalName) => modals[modalName];
