import TaskItem from './TaskItem';

// import { deleteItem } from './../../redux/userData';
import { useSelector } from 'react-redux';

const TasksListView = () => {
  const userData = useSelector(state => state.userData);

  if (userData.lists.length < 1) {
    return (
      <div className='flex flex-col items-center justify-center dark:bg-gray-900 flex-1 w-full px-2 mt-4 mb-2 overflow-y-scroll'>
        <p className='text-2xl font-semibold text-gray-800 dark:text-white'>
          You have No Lists, <br></br>
          <span className='text-blue-500 '> Create A New One</span>
        </p>
      </div>
    );
  }
  return (
    <div className='flex flex-col flex-1 w-full px-2 mt-4 mb-2 overflow-y-scroll '>
      {userData.lists[userData.currentList].listItems.map(task => {
        return (
          <TaskItem
            key={task.taskID}
            id={task.taskID}
            checked={task.checked}
            title={task.title}
          />
        );
      })}
    </div>
  );
};

export default TasksListView;
