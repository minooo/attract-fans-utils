import { types } from 'mobx-state-tree';

/**
 * Mobx State Tree Store
 * The store recieves 3 parameters
 *  1st one is the Store Name
 *  2nd is an object with the Props and Computed values
 *  3rd is and object with the Actions
 **/

export default types
  .model('UserStore', { name: "minooo" })
  .views(self => ({}))
  .actions(self => ({
    getUser(user) {
        self = user
    },
    changeName(name) {
      self.name = name;
    }
  })).create({});
