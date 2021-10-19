import { useState, useEffect } from "react";
import Resizer from "react-image-file-resizer";
//firebase
import db from '../Config/firestorage'
import {ref,uploadBytesResumable, getDownloadURL,getStorage  } from "firebase/storage"


export const useStorage = (file) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);
    const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        500,
        300,
        "JPEG",
        80,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });
    // runs every time the file value changes
    // 應該先等按下確認後地上傳圖片
    // 選擇圖片後先顯示給使用者看 但還沒上傳 然後按下確定再上傳
    useEffect(() => {
        if (file) {
            // storage ref
            (async () => {  
              const newTimeName = Date.now()
              const image = await resizeFile(file.file);
              const storageRef =await ref(db, file.folder+file.filename);
              const uploadTask =uploadBytesResumable(storageRef, image);
              uploadTask.on('state_changed', (snapshot) => {
                  // Observe state change events such as progress, pause, and resume
                  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log('Upload is ' + progress + '% done');
                  setProgress(progress)
                  switch (snapshot.state) {
                    case 'paused':
                      console.log('Upload is paused');
                      break;
                    case 'running':
                      console.log('Upload is running');
                      break;
                    default:
                      console.log(' ')
                  }
                }, 
                (error) => {
                  // Handle unsuccessful uploads
                  setError(error)
                }, 
                () => {
                  // Handle successful uploads on complete
                  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setUrl(downloadURL)
                  });
                }
              ); 



            })()
           
             








        }
    }, [file]);

    return { progress, url, error};
};



export const useImageUrl = (img)=>{
  const [url, setUrl] = useState(null);
  const storage = getStorage();
//'data/14607268903042.jpg'
  // console.log(`data/${img}`)
  const imagesRef = ref(storage, `data/${img}`);
  getDownloadURL(imagesRef).then((url)=>{ 
    setUrl(url)
  })
  .catch((error) => {
    switch (error.code) {
      case 'storage/object-not-found':
        // File doesn't exist
        break;
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;
  
      case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        break;
      default:
        console.log('')
    }
  })

  return url 
}