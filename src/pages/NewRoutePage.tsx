import React, {FC, useState} from 'react';
import {Coordinate} from '../core/domain/Coordinate';
import SelectCordinate from '../components/SelectCordinate';

const NewRoutesPage: FC = () => {
  // const [selectCor, setSelectCor] = useState<boolean>(false);

  function addCordinate(coordinate: Coordinate) {
    // setSelectCor(false);
    console.log('lel');
    coordinate;
  }

  return <SelectCordinate addCordinate={addCordinate} />;
};

export default NewRoutesPage;
