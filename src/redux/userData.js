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
      console.log(action.payload);
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

      return {
        lists: [
          ...state.lists,
          { listName, listID: String(Math.random()), listItems: [] },
        ],
        currentList: 0,
      };
    },

    setCurrentList: (state, action) => {
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
      console.log('initial Sync', action.payload);

      return {
        lists: [...action.payload],
        currentList: state.currentList,
      };
    },

    sync: (state, action) => {
      console.log('syncing');
    },

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
