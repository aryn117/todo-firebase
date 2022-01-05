import React, { useState } from 'react';
import { useGlobalContext } from '../../../context/context';
import { MdDeleteOutline } from 'react-icons/md';
//prettier-ignore
import {  SwipeableList, SwipeableListItem, SwipeAction, TrailingActions} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

import TaskItem from './TaskItem';

const TasksListView = () => {
  const { data, setData, deleteListItemHandler } = useGlobalContext();

  //* List Item Swipe handler /////////////////////////////////
  const trailingActionsHandler = () => (
    <TrailingActions>
      <SwipeAction destructive={true} onClick={() => null}>
        <div className='flex items-center justify-center px-4 my-2 mr-2 text-3xl font-semibold text-white bg-red-400 rounded-lg '>
          <MdDeleteOutline /> <p className='mx-1 text-sm'>Delete</p>
        </div>
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList className='flex flex-col flex-1 w-full px-2 mt-4 mb-2 overflow-y-scroll '>
      {data.lists[data.currentList].tasks.map(task => {
        return (
          <SwipeableListItem
            threshold={0.75}
            swipeStartThreshold={50}
            onSwipeEnd={() => deleteListItemHandler(task.taskID)}
            trailingActions={trailingActionsHandler()}
            key={task.taskID}>
            <TaskItem
              key={task.taskID}
              id={task.taskID}
              checked={task.checked}
              title={task.title}
            />
          </SwipeableListItem>
        );
      })}
    </SwipeableList>
  );
};

export default TasksListView;
