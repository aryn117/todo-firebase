import React, { useState, useRef } from 'react';
import { useGlobalContext } from '../../context/context';
import { useUserAuth } from '../../context/UserAuthContext';

import ListItem from './HomeComponents/ListItem';
import CreateNewListModal from './HomeComponents/CreateNewListModal';
import TasksListView from './HomeComponents/TasksListView';
import Settings from './HomeComponents/Settings';

import { db } from './../../context/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

import { IoIosAdd, IoIosAddCircleOutline } from 'react-icons/io';
import NavbarIcon from './../../assets/NavbarIcon.svg';

const HomePage = () => {
  const inputRef = useRef(null);
  const [openNewListModal, setOpenNewListModal] = useState(false);
  const [openSettingsToggle, setOpenSettingsToggle] = useState(false);
  const { user } = useUserAuth();
  const { data, addItemToCurrentListHandler, setData } = useGlobalContext();

  //* ALL USERS ON SAME ACCOUNT DATA SYNC/ FIREBASE ONSNAPSHOT REALTIME SYNC ////

  React.useEffect(() => {
    if (!user?.uid) return;
    const unsub = onSnapshot(doc(db, 'Users', user?.uid), doc => {
      setData(prev => {
        return {
          ...prev,
          lists: doc.data().lists,
        };
      });
    });
  }, [user?.uid]);

  //* /////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <div className='flex relative flex-col h-full sm:rounded-xl sm:border-2 sm:border-blue-500 w-full overflow-y-clip p-2 bg-[#F5FCFF]'>
        {openNewListModal && (
          <CreateNewListModal closeModal={setOpenNewListModal} />
        )}
        {openSettingsToggle && (
          <Settings setSettingsToggle={setOpenSettingsToggle} />
        )}
        <div className='flex flex-row '>
          <button
            className='px-4 py-5 '
            onClick={() => setOpenSettingsToggle(true)}>
            <img src={NavbarIcon} alt='open navbar' />
          </button>
        </div>
        <div className='flex flex-col w-full h-full pt-4 mt-4 '>
          <p className='pl-4 text-4xl font-semibold '>
            <span className='text-blue-500'>So,</span> What's the plan?
          </p>
          {/* Lists Container */}
          <div className='flex flex-row items-center px-4 mt-8 '>
            <p className='text-xl font-semibold'> Your Lists </p>
            <div className='bg-blue-400 h-[3px] ml-2 flex-1 ' />
          </div>
          <div className='flex flex-row px-4 pt-3 pb-6 mt-1 mb-3 overflow-x-scroll '>
            {/** Add New List Button //////////////////////////////////////////////// */}
            <div
              onClick={() => setOpenNewListModal(true)}
              className='flex items-center text-4xl  text-white justify-center px-6 py-2 sm:py-6 mr-5  bg-blue-500 shadow-lg rounded-xl transition-all transition-duration-[300ms] active:scale-[0.98] '>
              <IoIosAddCircleOutline />
            </div>
            {/* Lists  */}
            {data.lists.map((item, index) => (
              <ListItem
                name={item.title}
                key={item.listID}
                index={index}
                currentList={data.currentList}
                // setAsCurrentList={setCurrentListHandler}
              />
            ))}
            {/* Input Item */}
          </div>
          <div
            className='flex flex-row justify-between px-2 my-4'
            action='submit'>
            <input
              ref={inputRef}
              type='text'
              placeholder='Create'
              className='px-4 py-3 text-lg shadow-lg outline-none rounded-xl '
            />
            <button
              onClick={() => {
                // ADD TASK AND CLEAR INPUT
                addItemToCurrentListHandler(inputRef.current.value);
                inputRef.current.value = '';
              }}
              className='px-3 py-3 text-2xl font-bold text-white bg-blue-500 rounded-xl transition-all shadow-xl transition-duration-[300ms] active:scale-[0.98]  '>
              <IoIosAdd />
            </button>
          </div>
          <TasksListView />
        </div>
      </div>
    </>
  );
};

export default HomePage;
