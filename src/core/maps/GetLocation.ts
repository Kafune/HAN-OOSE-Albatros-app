import GetLocation from 'react-native-get-location';

const getLocation: Function = () => {
  return GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 150000,
  })
    .then((location: Object) => location)
    .catch((error: any) => {
      const {code, message} = error;
      console.warn(code, message);
    });
};

export default getLocation;
