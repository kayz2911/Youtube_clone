import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";

const useUploadFile = () => {
  const storage = getStorage(app);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [downloadURL, setDownloadURL] = useState(null);

  const uploadFile = async (file, path) => {
    try {
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, path + fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          setError(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setDownloadURL(downloadURL);
          });
        }
      );
    } catch (error) {
      setError(error);
    }
  };

  return { progress, error, downloadURL, uploadFile };
};

export default useUploadFile;
