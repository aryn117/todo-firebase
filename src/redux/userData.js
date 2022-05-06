import { createSlice } from '@reduxjs/toolkit';

//* /////////////////////////////////////////////////////////
//* /////////////////////////////////////////////////////////

export const userDataSlice = createSlice({
  name: 'userData',
  initialState: {
    lists: [],
    currentList: 0,
  },
  reducers: {
    setLoading: () => {},
    //* /////////////////////////////////////////////////////////
    //* ADD ITEM TO CURRENT LIST ///////////////////////////////
    addToCurrentList: (state, action) => {
      const listItem = action.payload;

      return {
        lists: state.lists.map((list, index) => {
          if (index !== state.currentList) return list;
          if (index === state.currentList)
            return {
              listID: list.listID,
              listName: list.listName,
              listItems: [
                ...list.listItems,
                {
                  title: listItem,
                  taskID: String(Math.random()),
                  checked: false,
                },
              ],
            };
        }),
        currentList: state.currentList,
      };
    },

    //* /////////////////////////////////////////////////////////
    //* /////////////////////////////////////////////////////////

    checkItem: (state, action) => {
      const id = action.payload;

      return {
        lists: state.lists.map((list, index) => {
          if (index !== state.currentList) return list;
          if (index === state.currentList)
            return {
              listID: list.listID,
              listName: list.listName,
              listItems: list.listItems.map(task => {
                if (task.taskID !== id) return task;
                if (task.taskID === id)
                  return { ...task, checked: !task.checked };
              }),
            };
        }),
        currentList: state.currentList,
      };
    },

    deleteItem: (state, action) => {
      const id = action.payload;

      return {
        lists: state.lists.map((list, index) => {
          if (index !== state.currentList) return list;
          if (index === state.currentList)
            return {
              listID: list.listID,
              listName: list.listName,
              listItems: list.listItems.filter(task => task.taskID !== id),
            };
        }),
        currentList: state.currentList,
      };
    },

    createNewList: (state, action) => {
      const listName = action.payload;
      let duplicateListCreatedFlag = false; // flag for duplicate list creation

      // check for duplicate list creation (sets flag = true)
      state.lists.forEach(item => {
        if (item.listName === listName) duplicateListCreatedFlag = true;
      });

      if (duplicateListCreatedFlag) {
        // console.log('Cannot Make Duplicate List');
        return { lists: [...state.lists], currentList: 0 };
      } else {
        return {
          lists: [
            ...state.lists,
            { listName, listID: String(Math.random()), listItems: [] },
          ],
          currentList: 0,
        };
      }
    },

    setCurrentList: (state, action) => {
      console.log(action.payload);
      return {
        lists: state.lists,
        currentList: action.payload,
      };
    },

    //* /////////////////////////////////////////////////////////
    //* DELETE FULL LISTS ///////////////////////////////////////
    deleteFullList: (state, action) => {
      return {
        lists: state.lists.filter(list => list.listID !== action.payload),
        currentList: 0,
      };
    },

    //* /////////////////////////////////////////////////////////
    initialSync: (state, action) => {
      if (action.payload) {
        return { lists: action.payload, currentList: state.currentList };
      } else {
        return {
          ...state,
        };
      }
    },

    // sync: (state, action) => {
    // },

    //delete full list
  },
});

export const {
  addToCurrentList,
  deleteItem,
  createNewList,
  setCurrentList,
  checkItem,
  deleteFullList,
  initialSync,
  sync,
} = userDataSlice.actions;
