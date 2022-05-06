import { IoMdRadioButtonOff, IoMdRadioButtonOn } from 'react-icons/io';
import { AiOutlineDelete } from 'react-icons/ai';

import { useDispatch } from 'react-redux';
import { deleteItem, checkItem } from './../../redux/userData';

import { motion, AnimatePresence } from 'framer-motion';

const TaskItem = ({ checked, title, id }) => {
  const dispatch = useDispatch();

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -150, opacity: 0 }}
      className='flex flex-row items-center justify-between px-4 py-2 my-2 bg-white text-gray-800 dark:bg-gray-900 dark:text-white border-2 border-blue-400 rounded-xl text-md '>
      <div className='flex flex-row items-center '>
        <button
          onClick={() => dispatch(checkItem(id))}
          className='text-3xl active:scale-[0.98] mr-2 transition-all transition-duration-[300ms] text-blue-500 '>
          {checked ? <IoMdRadioButtonOn /> : <IoMdRadioButtonOff />}
        </button>
        <p>{title}</p>
      </div>
      <button
        onClick={() => dispatch(deleteItem(id))}
        className='p-2 ml-2 text-lg text-white transition-all bg-red-400 rounded-lg active:scale-95 align-self-end '>
        <AiOutlineDelete />
      </button>
    </motion.div>
  );
};

export default TaskItem;
