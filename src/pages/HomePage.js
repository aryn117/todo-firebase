import { useState, useRef, useEffect } from 'react';

//component imports
import ListItem from './../components/HomePage/ListItem';
import TasksListView from './../components/HomePage/TasksListView';

//pages imports
import CreateNewListPage from './CreateNewListPage';
import SettingsPage from './SettingsPage';
import DeleteFullListPage from './DeleteFullListPage';

//asset imports
import { IoIosAdd, IoIosAddCircleOutline } from 'react-icons/io';
import { AiOutlineDelete } from 'react-icons/ai';
import NavbarIcon from './../assets/NavbarIcon.svg';

//redux imports
import { useDispatch, useSelector } from 'react-redux';
import { addToCurrentList, initialSync, sync } from '../redux/userData.js';

//auth
import { useUserAuth } from '../auth/userAuthContext';

//firebase
import { onSnapshot, doc, setDoc } from 'firebase/firestore';
import { db } from '../auth/firebase';

const HomePage = () => {
  // navigate to pages toggles
  const [openNewListModal, setOpenNewListModal] = useState(false);
  const [openSettingsToggle, setOpenSettingsToggle] = useState(false);
  const [openDeleteFullListModal, setOpenDeleteFullListModal] = useState(false);

  const dispatch = useDispatch();
  const userData = useSelector(state => state.userData);

  const { user } = useUserAuth();

  //task input-field ref
  const inputRef = useRef(null);

  //* ALL USERS ON SAME ACCOUNT DATA SYNC/ FIREBASE ON-SNAPSHOT REALTIME SYNC ////

  useEffect(() => {
    if (user.uid) {
      onSnapshot(doc(db, 'Users', user.uid), doc => {
        if (doc.data().lists) {
          dispatch(initialSync(doc.data().lists));
        }
      });
    }
  }, [user]);

  useEffect(() => {
    const firebaseSync = async () => {
      await setDoc(doc(db, 'Users', user.uid), {
        lists: userData.lists,
      });
    };
    if (user.uid) {
      firebaseSync();
    }
  }, [userData.lists]);

  //* /////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <div className='flex relative flex-col h-full sm:rounded-xl sm:border-2 sm:border-blue-500 w-full overflow-y-clip p-2 bg-[#F5FCFF]'>
        {/* CREATE NEW LIST PAGE **********************************************************************/}
        {openNewListModal && (
          <CreateNewListPage closeModal={setOpenNewListModal} />
        )}
        {/* DELETE A FULL LIST PAGE *******************************************************************/}
        {openDeleteFullListModal && (
          <DeleteFullListPage closeModal={setOpenDeleteFullListModal} />
        )}
        {/*  SETTINGS PAGE ****************************************************************************/}
        {openSettingsToggle && (
          <SettingsPage setSettingsToggle={setOpenSettingsToggle} />
        )}

        {/* OPEN SETTINGS BUTTON ***********************************************************************/}
        <div className='flex flex-row'>
          <button
            className='px-4 py-5 '
            onClick={() => setOpenSettingsToggle(true)}>
            <img src={NavbarIcon} alt='open navbar' />
          </button>
        </div>
        {/* HEADING ************************************************************************************/}

        <div className='flex flex-col w-full h-full pt-4 mt-4 '>
          <p className='pl-4 text-4xl font-semibold '>
            <span className='text-blue-500'>So,</span> What's the plan?
          </p>

          {/*  *****************************************************************************************/}

          <div className='flex flex-row items-center px-4 mt-8 '>
            <p className='text-xl font-semibold'> Your Lists </p>
            <div className='bg-blue-400 h-[3px] ml-2 flex-1 ' />
            <button
              onClick={() => setOpenDeleteFullListModal(true)}
              className='p-2 ml-2 text-xl text-white transition-all bg-red-400 rounded-lg active:scale-95'>
              <AiOutlineDelete />
            </button>
          </div>
          <div className='flex flex-row px-4 pt-3 pb-6 mt-1 mb-3 overflow-x-scroll '>
            {/* CREATE NEW LIST *************************************************************************/}
            <button
              onClick={() => setOpenNewListModal(true)}
              className='flex items-center text-5xl cursor-pointer  text-white justify-center px-6 py-2 sm:py-6 mr-5  bg-blue-500 shadow-lg rounded-xl transition-all transition-duration-[300ms] active:scale-[0.98] '>
              <IoIosAddCircleOutline />
            </button>
            {/* USER LISTS CONTAINER ********************************************************************/}
            {userData.lists.map((item, index) => (
              <ListItem
                name={item.listName}
                key={item.listID}
                index={index}
                currentList={userData.currentList}
              />
            ))}
          </div>
          {/* TASK INPUT ********************************************************************************/}
          <div
            className='flex flex-row justify-between px-2 my-4'
            action='submit'>
            <input
              ref={inputRef}
              type='text'
              placeholder='Create'
              className='flex-1 px-4 py-3 mr-2 text-lg shadow-lg outline-none rounded-xl '
            />
            <button
              onClick={() => {
                dispatch(addToCurrentList(inputRef.current.value));
                inputRef.current.value = '';
              }}
              className='px-3 py-3 text-2xl font-bold text-white bg-blue-500 rounded-xl transition-all shadow-xl transition-duration-[300ms] active:scale-[0.98]  '>
              <IoIosAdd />
            </button>
          </div>
          {/* TASK LIST VIEW CONTAINER *******************************************************************/}
          <TasksListView />
        </div>
      </div>
    </>
  );
};

export default HomePage;
