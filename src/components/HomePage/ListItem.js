import { useDispatch, useSelector } from 'react-redux';
import { setCurrentList } from './../../redux/userData';

const ListItem = ({ name, currentList, index }) => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userData);

  return (
    <div
      //* SETS CURRENT LIST
      onClick={() => dispatch(setCurrentList(index))}
      className={` ${
        currentList === index ? 'border-blue-500' : 'border-white'
      } border-4   flex items-center justify-center px-6 py-4 mr-5 text-xl bg-white shadow-lg rounded-xl transition-all transition-duration-[300ms] active:scale-[0.95] `}>
      {name}
    </div>
  );
};

export default ListItem;
