import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { bucket } from '../firebase/firebaseConfig';
import { selectUserDetails } from "../selectors/userSelector";

const useUserUploadProfilePicture = () => {
    const user = useSelector(selectUserDetails);
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    const uploadImage = async (file, userId) => {
        if (!file) {
            setError('No file provided');
            return;
        }

        setError(null);
        const storageRef = ref(bucket, `profilePictures/${userId}`);

        const uploadTask = uploadBytesResumable(storageRef, file);
        setUploading(true);

        return new Promise((resolve, reject) => {
            uploadTask.on('state_changed',
                (snapshot) => {
                    setUploadPercentage(((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0));
                },
                (error) => {
                    setUploading(false);
                    setError(error.message);
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setUploading(false);
                        resolve(downloadURL);
                        setUploading(false);
                    }).catch((error) => {
                        setUploading(false);
                        setError(error.message);
                        reject(error);
                    });
                }
            );
        });
    };


    return {
        uploadImage,
        uploading,
        error,
        uploadPercentage
    };
};

export default useUserUploadProfilePicture;
