import { useState, useRef, useEffect } from 'react';
import dayjs from 'dayjs';

//component imports
import ListItem from './../components/HomePage/ListItem';
import TasksListView from './../components/HomePage/TasksListView';
import LoadingScreen from '../components/LoadingScreen';

//framer imports
import { motion, AnimatePresence } from 'framer-motion';

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
import {
  addToCurrentList,
  initialSync,
  setCurrentList,
} from '../redux/userData.js';

//auth
import { useUserAuth } from '../auth/userAuthContext';

//firebase
import { onSnapshot, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../auth/firebase';

const HomePage = () => {
  // navigate to pages toggles
  const [openNewListModal, setOpenNewListModal] = useState(false);
  const [openSettingsToggle, setOpenSettingsToggle] = useState(false);
  const [openDeleteFullListModal, setOpenDeleteFullListModal] = useState(false);

  const dispatch = useDispatch();
  const userData = useSelector(state => state.userData);

  const { user, loading, setLoading } = useUserAuth();

  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const months = [
    'January',
    'Feburary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  //task input-field ref
  const inputRef = useRef(null);

  //* ALL USERS ON SAME ACCOUNT DATA SYNC/ FIREBASE ON-SNAPSHOT REALTIME SYNC ////

  useEffect(() => {
    const sync = async () => {
      // Fetch All tasks,Lists from firebase on Login
      let prevState;
      let triggered = true;

      if (user.uid) {
        setLoading(true);

        // get initial data
        const docRef = doc(db, 'Users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          onSnapshot(doc(db, 'Users', user.uid), doc => {
            if (doc.data().lists.length !== 0) {
              dispatch(initialSync(doc.data().lists));
              triggered = true;
            }
          });
        }

        setLoading(false);
      }
    };

    sync();
  }, [user]);

  // Sync Data when anything in the list changes

  useEffect(() => {
    const firebaseSync = async () => {
      if (user.uid === null) return; // guard
      if (userData.lists?.length === 0) return; // empty list
      if (userData.lists?.length !== -1) {
        await setDoc(doc(db, 'Users', user.uid), {
          lists: userData.lists,
        });
        setCurrentList(userData.currentList);
      }
    };
    if (user.uid !== null) {
      firebaseSync();
    }
  }, [userData.lists]);

  //* /////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <div className='flex relative flex-col h-full rounded-lg shadow-sm  md:shadow-2xl   w-full overflow-y-clip dark: text-white p-2 dark:bg-gray-800 bg-[#F5FCFF]'>
        {loading && <LoadingScreen />}
        {/* CREATE NEW LIST PAGE **********************************************************************/}
        <AnimatePresence>
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
        </AnimatePresence>

        {/* OPEN SETTINGS BUTTON ***********************************************************************/}
        <div className='navbar justify-between flex flex-row'>
          <button
            className='px-4 py-5 active:scale-95 '
            onClick={() => setOpenSettingsToggle(true)}>
            <img src={NavbarIcon} alt='open navbar' />
          </button>
          {/* navbar date   */}
          <div className='flex  justify-between items-center'>
            <h1 className='text-xl text-gray-800 dark:text-white font-semibold pr-2'>
              {days[dayjs().day()] + ',' + dayjs().date()}
              <span className='text-blue-500 text-xl '>
                {' ' + months[dayjs().month()]}
              </span>
            </h1>
          </div>
        </div>
        {/* HEADING ************************************************************************************/}

        <div className='flex flex-col w-full h-full pt-4 mt-4 '>
          <p className='pl-4 text-4xl font-semibold text-gray-800 dark:text-white '>
            <span className='text-blue-500'>So,</span> What's the plan?
          </p>

          {/*  *****************************************************************************************/}

          <div className='flex flex-row items-center px-4 mt-8 '>
            <p className='text-xl font-semibold text-gray-800 dark:text-white'>
              {' '}
              Your Lists{' '}
            </p>
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

          {userData.lists.length >= 1 && (
            <div
              className='flex flex-row justify-between  px-2 my-4'
              action='submit'>
              <input
                ref={inputRef}
                type='text'
                placeholder='Create Task✅'
                className='flex w-[85%] px-4 dark:bg-gray-900 dark:text-white text-gray-800 py-3 mr-2 text-lg shadow-lg outline-none rounded-xl '
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
          )}
          {/* TASK LIST VIEW CONTAINER *******************************************************************/}

          <TasksListView />
        </div>
      </div>
    </>
  );
};

export default HomePage;
