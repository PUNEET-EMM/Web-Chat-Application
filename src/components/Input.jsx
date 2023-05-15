
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import file from "../img/file.png";

const Input = () => {

  const [text,setText] = useState("");
  const [img,setImg] = useState(null);


  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  const handleSend =async()=>{
    if(img){
    
      try{
        const storageRef = ref(storage, uuid());
        await uploadBytesResumable(storageRef, img).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  img: downloadURL,
                }),
              });
  
           } catch(err){}
            
      });
        })
      }catch(err){}
    
    } else{
      await updateDoc(doc(db,"chats",data.chatId),{
        messages :arrayUnion({
          id:uuid(),
          text,
          senderId:currentUser.uid,
          date:Timestamp.now()

        })
      })

    }
    await updateDoc(doc(db,"userChats",currentUser.uid),{
      [data.chatId+".lastMessage"]:{
        text},
      [data.chatId+".date"]:serverTimestamp()
    })

    await updateDoc(doc(db,"userChats",data.user.uid),{
      [data.chatId+".lastMessage"]:{
        text},
      [data.chatId+".date"]:serverTimestamp()
    })


    setText("");
    setImg(null);

  }


  return (
    <div className="input">
        <input type ='text' placeholder=' Type something....' value={text} onChange={e=>setText(e.target.value)}></input>
        <div className='send'>
           <input type='file' id ="file" style={{display:"none"}}  onChange={e=>setImg(e.target.files[0])}></input>
           <label htmlFor='file'>
            <img src ={file} alt ="add"/>
           </label>
           <button onClick={handleSend}>Send</button>
        </div>
    </div>
  )
}

export default Input