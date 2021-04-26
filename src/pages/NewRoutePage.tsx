import React, {FC, useState} from 'react';
import {View} from 'react-native';
import {Coordinate} from '../core/domain/Coordinate';
import SelectCordinate from '../components/SelectCoordinate';

const NewRoutesPage: FC = () => {
  const [selectCor, setSelectCor] = useState<boolean>(true);

  function addCoordinate(coordinate: Coordinate) {
    setSelectCor(false);
    console.log(coordinate);
  }

  if (selectCor) {
    return (
      <SelectCordinate
        addCoordinate={addCoordinate}
        cancel={() => {
          setSelectCor(false);
        }}
      />
    );
  } else {
    return <View />;
  }
};

export default NewRoutesPage;
