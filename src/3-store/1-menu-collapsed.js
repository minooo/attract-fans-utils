import { types } from 'mobx-state-tree';

/**
 * Mobx State Tree Store
 * The store recieves 3 parameters
 *  1st one is the Store Name
 *  2nd is an object with the Props and Computed values
 *  3rd is and object with the Actions
 **/
// https://github.com/mobxjs/mobx-state-tree

export default types
  .model({ isCollapsed: types.boolean})
  .views(self => ({}))
  .actions(self => ({
    setCollapsed(val) {
        self.isCollapsed = val
    }
  })).create({ isCollapsed: false });
