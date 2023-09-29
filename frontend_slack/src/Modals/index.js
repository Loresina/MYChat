import AddChannel from './AddChannel';
import RemoveChannel from './RemoveChennel';
import RenameChannel from './RenameChennel';

const modals = {
  adding: AddChannel,
  removing: RemoveChannel,
  renaming: RenameChannel,
};

export default (modalName) => modals[modalName];
