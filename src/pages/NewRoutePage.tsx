import React, {FC} from 'react';
import {Coordinate} from '../core/domain/Coordinate';
import SelectCordinate from '../components/SelectCordinate';

const NewRoutesPage: FC = () => {
  // const [selectCor, setSelectCor] = useState<boolean>(false);

  function addCordinate(coordinate: Coordinate) {
    console.log(coordinate);
  }

  return (
    <SelectCordinate
      addCordinate={addCordinate}
      cancel={() => {
        console.log('cancel');
      }}
    />
  );
};

export default NewRoutesPage;
