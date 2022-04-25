import { FaPlusCircle } from "react-icons/fa";
import { storage } from "../firebase/config"; 
import {ref,uploadBytes,uploadBytesResumable,getDownloadURL} from 'firebase/storage'


export const InputFile= ({link,setFile}) => {
  const handleChange = async (e) => {
      try {
      const newFile = e.target.files[0]
      const imageRef = ref(storage, link)
      await uploadBytes(imageRef, newFile)
      const newUrl = await getDownloadURL(imageRef)
      setFile(newUrl)
      } catch (error) {
        console.log("errorrr")
      }
      
    }
    return <label>
    <FaPlusCircle color={"green"} size={20} cursor={"pointer"}/>
    <input
      style={{ display: "none" }}
      type="file"
      onChange={handleChange}
    />
  </label>
       
}


