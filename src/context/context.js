import React, { useContext, createContext, useState, useCallback } from 'react';
import { db } from './firebase';
import { doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';

const Context = createContext();
export const ContextProvider = ({ children }) => {
  //* User Data ///////////////////////////////////////////////
  const [user, setUser] = useState({});
  const [data, setData] = useState({
    lists: [
      {
        listID: '0.05712737302733828',
        title: 'Personal',
        tasks: [],
      },
    ],
    currentList: 0,
  });

  //! METHODS ON USER DATA //////////////////////////////
  //* ADD TASK TO CURRENT LIST //////////////////////////

  const addItemToCurrentListHandler = task => {
    if (task === '') return;
    setData(previousValue => {
      const newData = {
        lists: previousValue.lists.map((list, index) => {
          if (index !== previousValue.currentList) return list;
          if (index === previousValue.currentList)
            return {
              listID: list.listID,
              title: list.title,
              tasks: [
                ...list.tasks,
                {
                  title: task,
                  taskID: String(Math.random()),
                  checked: false,
                },
              ],
            };
        }),
        currentList: previousValue.currentList,
      };

      return newData;
    });
  };
  //* SET CURRENT LIST ////////////////////////////////////////
  const setCurrentListHandler = listIndex => {
    setData(prev => {
      return { ...prev, currentList: listIndex };
    });
  };

  //* DELETE A LIST ITEM //////////////////////////////////////
  const deleteListItemHandler = id => {
    setData(previousValue => {
      const returnValue = {
        lists: previousValue.lists.map((list, index) => {
          if (index !== previousValue.currentList) return list;
          if (index === previousValue.currentList)
            return {
              listID: list.listID,
              title: list.title,
              tasks: list.tasks.filter(task => task.taskID !== id),
            };
        }),
        currentList: previousValue.currentList,
      };

      return returnValue;
    });
  };

  //* CHECK LIST ITEM HANDLER /////////////////////////////////

  const checkListItemHandler = id => {
    setData(previousValue => {
      const returnValue = {
        lists: previousValue.lists.map((list, index) => {
          if (index !== previousValue.currentList) return list;
          if (index === previousValue.currentList)
            return {
              listID: list.listID,
              title: list.title,
              tasks: list.tasks.map(task => {
                if (task.taskID !== id) return task;
                if (task.taskID === id)
                  return { ...task, checked: !task.checked };
              }),
            };
        }),
        currentList: previousValue.currentList,
      };
      return returnValue;
    });
  };

  //* /////////////////////////////////////////////////////////
  //! FIREBASE METHODS ////////////////////////////////////////

  //* INITIAL DATA SYNC AND FETCH //////////////////////////////

  const initialDataSync = useCallback(async () => {
    try {
      const docRef = doc(db, 'Users', user?.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData({
          currentList: 0,
          lists: docSnap.data().lists,
        });
      } else {
        await setDoc(doc(db, 'Users', user?.uid), {
          lists: data.lists,
        });
        console.error('No such document!');
      }
    } catch (error) {
      console.error(error);
    }
  }, [user?.uid]);

  React.useEffect(() => {
    initialDataSync();
  }, [initialDataSync]);

  //* DATA SYNC ON USER DATA CHANGE/////////////////////////////
  const createDoc = async () => {
    await setDoc(doc(db, 'Users', user?.uid), {
      lists: data.lists,
    });
  };

  React.useEffect(() => {
    createDoc();
  }, [data.lists]);

  //! /////////////////////////////////////////////////////////
  //* /////////////////////////////////////////////////////////
  return (
    <Context.Provider
      value={{
        data,
        user,
        setData,
        setUser,
        setCurrentListHandler,
        addItemToCurrentListHandler,
        deleteListItemHandler,
        checkListItemHandler,
      }}>
      {children}
    </Context.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(Context);
};
