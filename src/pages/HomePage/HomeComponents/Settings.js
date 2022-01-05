import cancelIcon from './../../../assets/CancelIcon.svg';
import { useUserAuth } from '../../../context/UserAuthContext';
import { useNavigate } from 'react-router-dom';

const Settings = ({ setSettingsToggle }) => {
  const { user, firebaseLogoutHandler } = useUserAuth();

  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await firebaseLogoutHandler();
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='absolute top-0 bottom-0 left-0 right-0 z-10 flex flex-col backdrop-blur-lg'>
      <div className='flex flex-col w-[75%] h-full bg-blue-500 py-8 pl-8 rounded-r-[3rem] '>
        <button
          className='p-4 bg-red-400 rounded-lg shadow-lg w-fit'
          onClick={() => setSettingsToggle(false)}>
          <img alt='cancel button' className='w-4' src={cancelIcon} />
        </button>

        <div className='mt-12 text-5xl text-white '>Settings</div>

        <div className='flex w-32 mt-12 border-2 border-white rounded-full '>
          <img
            className='p-2 rounded-full shadow-lg object-fit '
            src={`https://avatars.dicebear.com/api/big-smile/${user.email}.svg`}
            alt='avatar'
          />
        </div>
        <p className='mt-4 text-xl text-white '> {user.email}</p>
        <button
          onClick={logoutHandler}
          className='px-8 py-2 mt-4 transition-all bg-white rounded-lg shadow-md w-fit active:scale-95'>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Settings;
