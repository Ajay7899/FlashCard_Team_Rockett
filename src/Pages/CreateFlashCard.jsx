//this is the root for creating flashcard
import React, { useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import FlashCardSchema from "../validations/schema/CardSchema";
import {AiOutlinePlus,AiOutlineUpload,AiOutlineEdit,AiOutlineDelete} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setFlashCard } from "../Redux_store/flashcardSlice";//function imported
import TextError from "../validations/FormError/TextError";

const CreateFlashCard = () => {
  const dispatch = useDispatch(); //for dispaching our action 
  const filePickerRef = useRef(null); //use to store mutable values that does not cause a re-render when updated
  const editRef = useRef(null);
  const filePickerForCard = useRef(null);
  const [groupImg, setGroupImg] = useState("");// state for group image which is empty initially
  const [cardImg, setCardImg] = useState([]);

/*function which will take values and actions as parameter and will dispatch the action to create 
flashcard and after that inputs will get reset*/
  const addFlashCard = (values, actions) => {
    
    dispatch(setFlashCard(values));//this values works as a payload to setFlashCard
    // console.log(values)
    // console.log(actions)
    actions.resetForm();
    setGroupImg("");
    setCardImg("");
  };
  
  
  return (
    <Formik
      initialValues={{
        groupid: (new Date().getMilliseconds()*1000).toLocaleString(), //to create unique group id
        groupname: "",
        groupdescription: "",
        groupimg: null,
        cards: [
          {
            cardid: (new Date().getMilliseconds()*1000).toLocaleString(),   //to create unique Card  id
            cardname: "",
            carddescription: "",
            cardimg:null,
          },
        ],
        createOn: new Date(Date.now()).toLocaleString(),
      }}
      validationSchema={FlashCardSchema}  //giving validation schema to the form to show error if values entered are wrong
      onSubmit={addFlashCard}
    >

      {/* values, isSubmitting, setFieldValue  these values are returned from formik object and they are destructured*/}
      {({ values, isSubmitting, setFieldValue }) => (
        <Form className="w-full space-y-5 text-black-600 text-bold font-medium">
          <div className="md:flex flex-col px-10 py-4 bg-white drop-shadow-lg space-y-4 rounded-lg">
            <div className="flex flex-col sm:flex-row items-center space-x-10 pt-3">
              <div className="flex flex-col relative">
                <label htmlFor="createGroup">Create Group *</label>
                <Field
                  type="text"
                  name="groupname"
                  id="createGroup"
                  placeholder=" Enter Group Name "
                  className="border-gray-300 md:w-96 border-2 rounded-lg focus:ring-gray-500 focus:border focus:border-gray-700"
                />
                <ErrorMessage component={TextError} name="groupname" /> 
              </div>
              {/*To add a group image*/}
              {groupImg ? (
                <img
                  src={groupImg}
                  alt="groupImg"
                  className="w-28 h-28 object-contain"
                />
               
              ) : (
                <button
                  type="button"
                  onClick={() => filePickerRef.current.click()} //current is the object present inside useRef which do not get re-render after update
                  className={`md:flex items-center px-10 py-2 mt-6 bg-white border-2 border-slate-300 active:border-blue-600 text-blue-700 font-semibold rounded-md space-x-2 `}
                >
                  <AiOutlineUpload className="w-6 h-6" />
                  <span>Upload Image</span>
                  <input
                    type="file"
                    ref={filePickerRef}
                    value={groupImg}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      const reader = new FileReader();//fileReader reads the content of the file
                      reader.readAsDataURL(file);//allows you to read the contents of a file as a data URL

                      reader.onload = () => {
                        setFieldValue("groupimg", reader.result);
                        setGroupImg(reader.result);
                      };
                    }}
                    hidden
                  />
                </button>
              )}
            </div>

            <div className="flex flex-col w-full sm:w-[70%]">
              <label htmlFor="addDescription" className="mb-2">
                Add Description
              </label>
              <Field
                as="textarea"
                name="groupdescription"
                id="addDescription"
                rows={3}
                placeholder="Enter  Group  Description "
                className="resize-none border-gray-300 border-2 rounded-lg  focus:ring-gray-400 focus:border focus:border-gray-400"
              />
              <ErrorMessage component={TextError} name="groupdescription" />
            </div>
          </div>

          <div className="text-black drop-shadow-lg ">
            {/* form for adding card and taking values of card field */}
            <FieldArray name="cards">
              {(arrayHelper) => {
                const cards = values.cards;   //taking values of card
                return (
                  <div className="">
                    {cards && cards.length > 0
                      ? cards.map((cards, index) => (
                          <div
                            className="flex rounded-t-lg items-center space-x-10 bg-white px-5 lg:px-10 py-4"
                            key={index}
                          >
                            {/*give numbering to card field */}
                            <div className="w-8 h-8 px-5 py-5 flex items-center justify-center bg-black text-white text-md font-semibold rounded-full opacity-95 ">
                              {index + 1} 
                            </div>
                            <div className="flex flex-col space-y-3 md:space-x-10 md:flex-row">
                              <div className="relative flex flex-col justify-center space-y-3">
                                <label htmlFor="enterTerm" className="">
                                  Enter Term
                                </label>
                                <Field
                                  type="text"
                                  id="enterTerm"
    
                                  name={`cards.${index}.cardname`}
                                  innerRef={editRef}
                                  placeholder="Enter Terms"
                                  className="border-gray-300 md:w-56 border-2 rounded-lg focus:ring-gray-500 focus:border focus:border-gray-700"
                                />
                                <ErrorMessage
                                  component={TextError}
                                  name={`cards.${index}.cardname`}
                                />
                              </div>
                              <div className="relative flex flex-col justify-center space-y-3">
                                <label htmlFor="enterdefinitionton" className="">
                                  Enter definition
                                </label>
                                <Field
                                  as="textarea"
                                  id="enterdefinition"
                                  name={`cards.${index}.carddescription`}
                  
                                  placeholder="Enter definition "
                                  className=" lg:w-72  resize-none border-gray-300 border-2 rounded-lg  focus:ring-gray-400 focus:border focus:border-gray-400"
                                />
                                <ErrorMessage
                                  component={TextError}
                                  name={`cards.${index}.carddescription`}
                                />
                              </div>

                              <div className="flex items-center space-x-2  mt-8">
                              {/*button to select the image */}

                              {cardImg && cardImg[index] ? (
                                <div className="md:flex  space-x-4 space-y-4 my-6 ">
                                  <div className="w-full relative min-w-[150px] min-h-[150px]  max-w-[200px] max-h-[150px] p-2   flex hover:border-slate-400 ">

                                    <label className="mt-5">
                                      <img
                                        src={values.cards[index].cardimg}
                                        alt="img"
                                        className="w-28 h-28 object-contain"
                                      />
                                    </label>
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                              {cardImg && cardImg[index] ? (
                                ''
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => {
                                    filePickerForCard?.current?.click(); //check if the object or any of its nested properties are null or undefined.
                                  }}
                                  name={`cards[${index}].cardimg`}
                                  className={` px-1 py-1  bg-white border-2 border-blue-600 active:border-slate-300 text-blue-700 font-semibold rounded-md space-x-2 w-auto sm:w-72  `}
                                >
                                  
                                  <span>+ Select Image</span>
                                  <input
                                    type="file"
                                    name={`cards[${index}].cardimg`}
                                    ref={filePickerForCard}
                                    value={cardImg[index]}
                                    onChange={(e) => {
                                      const file1 = e.target.files[0];
                                      const readerForCardImg = new FileReader();
                                      readerForCardImg.readAsDataURL(file1);
                                      readerForCardImg.onload = () => {
                                        setFieldValue(`cards.${index}.cardimg`,
                                          readerForCardImg.result
                                        )
                                        setCardImg((prev) => ({
                                          ...prev,
                                          [index]: readerForCardImg.result,
                                        }))
                                      };
                                    }}
                                    hidden
                                  />
                                </button>
                              )}

                                
                                <div className="flex items-center justify-around w-full md:flex-col md:space-y-5 md:mt-5">
                                <button
                                  type="button"
                                  //one input field is mandatory during initialstage
                                  onClick={() => {
                                    if (index > 0) arrayHelper.remove(index);
                                  
                                  }
                                  }
                                >
                                    <AiOutlineDelete className="w-7 h-7  text-black-500" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={()=> editRef.current.focus()}
                                  >
                                    <AiOutlineEdit className="h-7 w-7 text-blue-700" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                    <div className="bg-white rounded-b-lg flex w-full  mb-10 px-5 py-2">
                      <button
                        type="button"
                        //button to add more entries
                        onClick={() =>
                          arrayHelper.push({
                            cardid: (new Date().getMilliseconds()*1000).toLocaleString(),
                            cardname: "",
                            carddescription: "",
                            cardimg:null,
                          })
                        }
                        className="flex items-center space-x-2 text-blue-600  text-md   mb-5 mt-0 "
                      >
                        <AiOutlinePlus />
                        <span>Add More</span>
                      </button>
                    </div>
                    <div className="flex justify-center w-full">
                      <button
                        disabled={isSubmitting}
                        type="submit"
                        className="py-2 px-6  bg-red-600 text-white rounded-md"
                      >
                        Create
                      </button>
                    </div>
                  </div>
                );
              }}
            </FieldArray>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateFlashCard;
