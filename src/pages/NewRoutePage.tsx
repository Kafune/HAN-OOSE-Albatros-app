import React, {useState} from 'react';
import {View} from 'react-native';
import {Coordinate} from '../core/domain/Coordinate';
import SelectCordinate from '../components/SelectCoordinate';

const NewRoutesPage: React.FC = () => {
  const [selectCor, setSelectCor] = useState<boolean>(true);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const addCoordinate = (coordinate: Coordinate) => {
    setSelectCor(false);
  };

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
