import { IoMdRadioButtonOff, IoMdRadioButtonOn } from 'react-icons/io';
import { AiOutlineDelete } from 'react-icons/ai';

import { useDispatch } from 'react-redux';
import { deleteItem, checkItem } from './../../redux/userData';

import { motion, AnimatePresence } from 'framer-motion';
import CheckBox from 'react-animated-checkbox';

const TaskItem = ({ checked, title, id }) => {
  const dispatch = useDispatch();

  const checkboxStyleConfig = {
    checkedColor: '#3498DB',
    size: 20,
    unCheckedColor: '#b8b8b8',
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -150, opacity: 0 }}
        className='flex flex-row items-center justify-between px-4 py-2 my-2 bg-white text-gray-800 dark:bg-gray-900 dark:text-white border-2 border-blue-400 rounded-xl text-md '>
        <div className='flex flex-row items-center '>
          <div className='flex mr-2'>
            <CheckBox
              checked={checked}
              checkBoxStyle={checkboxStyleConfig}
              duration={250}
              onClick={() => dispatch(checkItem(id))}
            />
          </div>
          <p className={`${checked ? ' text-gray-500 line-through' : ''}`}>
            {title}
          </p>
        </div>
        <button
          onClick={() => dispatch(deleteItem(id))}
          className='p-2 ml-2 text-lg text-white  transition-all bg-red-400 rounded-lg  active:scale-95 align-self-end '>
          <AiOutlineDelete />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default TaskItem;
