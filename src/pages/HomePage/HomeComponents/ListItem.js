import { useGlobalContext } from '../../../context/context';

const ListItem = ({ name, currentList, index }) => {
  const { setCurrentListHandler } = useGlobalContext();

  return (
    <div
      //* SETS CURRENT LIST
      onClick={() => setCurrentListHandler(index)}
      className={` ${
        currentList === index ? 'border-blue-500' : 'border-white'
      } border-4   flex items-center justify-center px-6 py-4 mr-5 text-xl bg-white shadow-lg rounded-xl transition-all transition-duration-[300ms] active:scale-[0.95] `}>
      {name}
    </div>
  );
};

export default ListItem;
