import React, { useState } from "react";
import { motion } from "framer-motion";
import {Categories} from "../utils/Data"
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from "react-icons/md";
import Loader from "./Loader";
import { ref, uploadBytesResumable , getDownloadURL, deleteObject} from "firebase/storage";
import { storage } from "../firebase.config";
import {sendItem ,getAllFoodItems} from "../utils/fireBaseFunctions"
import { useStateValue } from "../Context/StateProvider"

const CreateContainer = () => {
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [{ foodItems }, dispatch] = useStateValue();

  const fetchData = async () => { 
    await getAllFoodItems().then(data => {
      dispatch({
        type: "SET_FOOD_ITEMS",
        foodItems: data
    });
    })
  }
  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `/images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          console.error('Error uploading image:', error);
          setFields(true);
          setMsg("Error uploading image :negative_squared_cross_mark:")
          setAlertStatus("danger");
          setTimeout(() => { 
            setFields(false);
            setIsLoading(false);
          },3000)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageAsset(downloadURL)
            setIsLoading(false);
            setFields(true);
            setMsg('Image uploaded successfully .');
            setTimeout(() => { 
            setFields(false);
          },3000)
          });
        }
      );
  }
  const deleteImage = () => {
    setIsLoading(true);
    const deletRef = ref(storage, imageAsset);
    deleteObject(deletRef).then(() => {
      setImageAsset(null);
      setIsLoading(false);
      setFields(true);
      setMsg('Image is deleted successfully .');
      setAlertStatus("success");
      setTimeout(() => { 
        setFields(false);
        clearData();
      }, 3000)
      
    })
  }
  const saveDetails = () => {
    setIsLoading(true);
    try {
      if (!title || !calories || !imageAsset || !price || !category) {
        setFields(true);
        setMsg("Required fields can't be empty");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 3000);
        
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageUrl: imageAsset,
          category: category,
          calories: calories,
          qty: 1,
          price: price
        };
        sendItem(data);
        setIsLoading(false);
        setFields(true);
        setMsg('data is Uploaded successfully .');
        clearData();
        setAlertStatus("success");
        setTimeout(() => { 
          setFields(false);
        }, 3000)
        fetchData()
      }
    } catch (error) {
      setFields(true);
      setMsg("Error uploading image :negative_squared_cross_mark:")
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 3000);
    }
  }
  const clearData = () => { 
    setTitle("");
  setCalories("");
  setPrice("");
  setCategory(null);
  setImageAsset(null);
  }
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-[90%] md:w-[50%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        {/* notification message */}
        {
          fields && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${alertStatus === "danger" ?
                "bg-red-400 text-red-800" :
                "bg-emerald-400 text-emerald-800"
                }`}>
              {msg}
              
            </motion.p>
          )
        }
        {/* Title */}
        <div className="py-2 w-full border-b border-gray-300 gap-2 flex items-center">
          <MdFastfood className="text-xl text-gray-700 " />
          <input type="text" required value={title}
            className="w-full rounded-md bg-transparent font-semibold h-full border-none outline-none text-textColor placeholder:text-gray-400"
            placeholder="  Give me a title ..."
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {/* Select  */}
        <div className="w-full ">
          <select onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg text-textColor py-1 border-b-2 border-gray-200 font-semibold ">
            <option value="other" className="text-base rounded-lg bg-white">Select Category</option>
            {
              Categories && Categories.map(item => (
                <option key={item.id} value={item.urlParamName} className="text-base rounded-lg bg-white capitalize outline-none border-0">{item.name}</option>
              ))
            }
          </select>
        </div>
        {/* Upload image */}
        <div className="group flex border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg flex-col border-2 border-dotted justify-center items-center">
          {
            isLoading ? <Loader /> :
              <>
                {!imageAsset ?
                  <>
                    <label className="w-full h-full flex flex-col items-center justify-center  cursor-pointer">
                      <div className="w-full h-full flex flex-col items-center justify-center">
                        <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                        <p className="text-gray-500 hover:text-gray-700"> Click here to upload </p>
                      </div>
                      <input type="file" name="uploadimage" accept="image/*" onChange={uploadImage} className="w-0 h-0" />
                    </label>
                  </> :
                  <>
                    <div className="relative h-full">
                      <img src={imageAsset} alt="uploaded image" className="w-full h-full object-cover" />
                      <button type="button" className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out" onClick={deleteImage} >
                        <MdDelete className="text-white" />
                      </button>
                    </div>
                  </>}
              </>}
        </div>
        {/* price  */}
        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFoodBank className="text-gray-700 text-2xl" />
            <input type="text" required value={calories}
              onChange={(e) => setCalories(e.target.value)} placeholder="Calories"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>

          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdAttachMoney className="text-gray-700 text-2xl" />
            <input type="text" required value={price}
              onChange={(e) => setPrice(e.target.value)} placeholder="Price"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>
        </div>

        <div className="flex items-center w-full">
          <button type="button" onClick={saveDetails}
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
          > Save </button>
        </div>

      </div>
    </div>
  );
}

export default CreateContainer