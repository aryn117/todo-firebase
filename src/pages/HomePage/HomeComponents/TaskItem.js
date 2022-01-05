import { IoMdRadioButtonOff, IoMdRadioButtonOn } from 'react-icons/io';
import { SwipeableListItem } from 'react-swipeable-list';
import { useGlobalContext } from '../../../context/context';
import 'react-swipeable-list/dist/styles.css';

const TaskItem = ({ checked, title, id }) => {
  const { checkListItemHandler } = useGlobalContext();

  return (
    <SwipeableListItem
      destructiveCallbackDelay={200}
      destructive={true}
      className='flex flex-row items-center justify-between px-4 py-2 my-2 bg-white border-2 border-blue-400 rounded-xl text-md '>
      <button
        onClick={() => checkListItemHandler(id)}
        className='text-3xl active:scale-[0.98] mr-2 transition-all transition-duration-[300ms] text-blue-500 '>
        {checked ? <IoMdRadioButtonOn /> : <IoMdRadioButtonOff />}
      </button>
      <p>{title}</p>
    </SwipeableListItem>
  );
};

export default TaskItem;
