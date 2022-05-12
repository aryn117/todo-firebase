import { useDispatch, useSelector } from 'react-redux';
import { setCurrentList } from './../../redux/userData';

import { motion, AnimatePresence } from 'framer-motion';

const ListItem = ({ name, currentList, index }) => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userData);

  return (
    <motion.div
      //* SETS CURRENT LIST
      onClick={() => dispatch(setCurrentList(index))}
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      transition={{ type: 'tween' }}
      className={` ${
        currentList === index ? 'border-blue-500' : 'border-white'
      } border-4   flex items-center curson-pointer justify-center px-6 py-3 mr-5 text-xl bg-white text-gray-800 dark:bg-gray-900 dark:text-white shadow-lg rounded-xl transition-all transition-duration-[300ms] active:scale-[0.95] `}>
      {name}
    </motion.div>
  );
};

export default ListItem;
