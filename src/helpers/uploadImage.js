import storage from '@react-native-firebase/storage';

export default (username, file) => onSuccess => onError => {
  //note that whatever is selected, either creationdate or path must be unique like a key

  let fileName = file.path.substring(file.path.lastIndexOf('/') + 1);
  const pathToFile = `/contact-pictures/${username}/${fileName}`;

  //   let fileName = file.path.substring(file.path.lastIndexOf('/') + 1);
  const reference = storage().ref(pathToFile);

  const task = reference.putFile(file.path);
  task
    .then(async () => {
      const url = await reference.getDownloadURL();
      onSuccess(url);
    })
    .catch(error => {
      onError(error);
    });
};
