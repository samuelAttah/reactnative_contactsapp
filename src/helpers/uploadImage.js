import storage from '@react-native-firebase/storage';

export default (username, file) => onSuccess => onError => {
  //note that whatever is selected, either creationdate or path must be unique like a key

  const fileName =
    file.path.substring(file.path.lastIndexOf('/') + 1) || file.creationDate;

  const ext = fileName.split('.').pop();

  const name = fileName.split('.')[0];

  const newFileName = `${name.slice(0, 5)}${Date.now()}.${ext}`;
  const pathToFile = `/contact-pictures/${username}/${newFileName}`;

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
