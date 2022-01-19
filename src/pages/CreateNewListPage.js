import { useRef, useState } from 'react';
import cancelIcon from './../assets/CancelIcon.svg';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { createNewList } from '../redux/userData';

//? /////////////////////////////////////////////////////////
//* Modal Window For Creating A New List/////////////////////

const CreateNewListPage = ({ closeModal }) => {
  const inputRef = useRef(null);
  const [invalidInput, setInvalidInput] = useState(false);

  const dispatch = useDispatch();
  const userData = useSelector(state => state.userData);

  //* Create New List Function ///////////////////////////////////////
  const createNewListSubmitHandler = event => {
    event.preventDefault();
    if (inputRef.current.value === '') return;
    if (inputRef.current.value.indexOf(' ') !== -1) return;

    dispatch(createNewList(inputRef.current.value));

    inputRef.current.value = '';
    closeModal(false);
  };

  const validityCheckHandler = () => {
    if (inputRef.current.value === '') {
      setInvalidInput(true);
    }
    if (inputRef.current.value.indexOf(' ') !== -1) {
      setInvalidInput(true);
    }
    setInvalidInput(false);
  };

  return (
    <div className='absolute top-0 bottom-0 left-0 right-0 z-10 flex flex-col items-center justify-center backdrop-blur-lg '>
      <button
        className='absolute p-4 bg-red-400 rounded-lg shadow-lg w-fit top-8 right-8'
        onClick={() => closeModal(false)}>
        <img alt='cancel button' className='w-4' src={cancelIcon} />
      </button>
      <form
        onSubmit={event => createNewListSubmitHandler(event)}
        onChange={validityCheckHandler}
        className='flex flex-col justify-between w-full px-8 h-fit '
        action='submit'>
        <input
          ref={inputRef}
          type='text'
          placeholder='Create New List'
          className={`px-4 py-3 text-lg bg-white border-2  rounded-lg shadow-lg ${
            invalidInput ? 'border-red-600 ' : 'border-black'
          } `}
        />
        <button
          type='submit'
          className='px-5 mt-6 py-3 text-lg text-white bg-blue-400 rounded-lg shadow-lg transition-all transition-duration-[300ms]  active:scale-[0.98] '>
          Create New List{' '}
        </button>
      </form>
    </div>
  );
};

export default CreateNewListPage;
