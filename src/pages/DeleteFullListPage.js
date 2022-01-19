//asset imports
import cancelIcon from './../assets/CancelIcon.svg';
import { AiOutlineDelete } from 'react-icons/ai';

//redux imports
import { useDispatch, useSelector } from 'react-redux';
import { deleteFullList } from './../redux/userData';

const DeleteFullListModal = ({ closeModal }) => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userData);

  return (
    <div className='absolute top-0 bottom-0 left-0 right-0 z-10 flex flex-col items-center justify-center backdrop-blur-lg'>
      {/* //* CANCEL BUTTON ////////////////////////////////////////////// */}
      <button
        className='absolute p-4 bg-red-400 rounded-lg shadow-lg w-fit top-8 right-8'
        onClick={() => closeModal(false)}>
        <img alt='cancel button' className='w-4' src={cancelIcon} />
      </button>
      {/* //* LIST DELETE MODAL ////////////////////////////////////// */}
      {userData.lists.length > 0 && (
        <div className='flex flex-col p-4 w-[70%] bg-white rounded-lg shadow-2xl '>
          {userData.lists.map(item => {
            return (
              <div
                key={item.listID}
                className='flex items-center justify-between px-6 py-2 my-2 text-lg text-white bg-blue-500 rounded-lg'>
                <p>{item.listName}</p>
                <button
                  onClick={() => dispatch(deleteFullList(item.listID))}
                  className='p-2 ml-2 text-xl text-white transition-all bg-red-400 rounded-lg active:scale-95'>
                  <AiOutlineDelete />
                </button>
              </div>
            );
          })}
        </div>
      )}
      {userData.lists.length < 1 && (
        <div className='flex flex-col p-4 w-[70%] bg-white rounded-lg shadow-2xl '>
          <p className='my-4 text-xl font-semibold text-black '>
            You Have No Lists To Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default DeleteFullListModal;
