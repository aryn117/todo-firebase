import { useUserAuth } from '../auth/userAuthContext';

import { motion, AnimatePresence } from 'framer-motion';

import cancelIcon from './../assets/CancelIcon.svg';

const SettingsPage = ({ setSettingsToggle }) => {
  const { logout, user } = useUserAuth();

  const logoutHandler = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, background: 'transparent' }}
      animate={{ background: '#D6EAF8', opacity: 1 }}
      exit={{ opacity: 0 }}
      className='absolute top-0 bottom-0 left-0 right-0 z-10 flex flex-col '>
      <motion.div
        key='settingsPageModal'
        initial={{ x: -150, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -500 }}
        transition={{ type: 'tween', ease: 'easeOut' }}
        className='flex flex-col w-[75%] h-full bg-blue-500 py-8 pl-8 rounded-r-[2rem] '>
        {/* Exit Button */}
        <button
          className='p-4 bg-red-400 rounded-lg shadow-lg w-fit active:scale-95 '
          onClick={() => setSettingsToggle(false)}>
          <img alt='cancel button' className='w-4' src={cancelIcon} />
        </button>
        {/* Title */}

        <div className='mt-12 text-5xl text-white '>Settings</div>
        {/* Profile Image from 'dicebear' */}

        <div className='flex w-32 h-32 mt-12 border-2 border-white rounded-full '>
          <img
            className='p-2 rounded-full shadow-lg object-fit '
            src={`https://avatars.dicebear.com/api/big-smile/${user.displayName}.svg`}
            alt='avatar'
          />
        </div>
        <p className='mt-4 text-xl font-semibold text-white '>
          {user.displayName}
        </p>
        <p className='mt-1 text-white text-md '>{user.email}</p>
        <button
          onClick={logoutHandler}
          className='px-8 py-2 mt-12 transition-all bg-white rounded-lg shadow-md w-fit active:scale-95'>
          Logout
        </button>
      </motion.div>
    </motion.div>
  );
};

export default SettingsPage;
