import GetLocation from 'react-native-get-location';

const getLocation = () => {
  return GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000,
  })
    .then(location => {
      return location;
    })
    .catch(error => {
      const {code, message} = error;
      console.warn(code, message);
    });
};

export default getLocation;
