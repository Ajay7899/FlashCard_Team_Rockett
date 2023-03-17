import React, { useEffect, useState } from "react";
import { BiShare, BiShareAlt, BiCopy, BiArrowBack } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";//to subscribe the state and receive the latest update info
import { AiFillPrinter,AiOutlineDownload,AiFillCloseCircle} from "react-icons/ai";
import Facebook from "../Images_icons/facebook-icon.svg";
import Linkedin from "../Images_icons/linkedin-icon.svg";
import Whatsapp from "../Images_icons/whatsapp-icon.svg";
import cryingCat from "../Images_icons/cryingCat.png";
import Twitter from "../Images_icons/twitter-icon.svg";
import {FacebookShareButton,LinkedinShareButton,WhatsappShareButton,TwitterShareButton} from "react-share";

const Flashcard = () => {
  const { groupId } = useParams();  //retrieve route parameters from the component rendered by the matching route
  const navigate = useNavigate();

  const cards = useSelector((state) => state.flashcard.flashcards); // accessing values from store
  console.log(cards)
  

  const [ourCard, setOurCard] = useState({});
  const [singleCardDetail, setSingleCardDetail] = useState({});
/*the cards get filterd accordingly by id recieved in parameter and update at singleCardDetails */
  const displayCard = (id) => {
    const showSingleCard = ourCard.cards.filter((elem) => elem.cardid === id);
    setSingleCardDetail(showSingleCard[0]);
  };
/*it will filter cards and give card to ourCard or else nothing will be returned*/

  useEffect(() => {
    if (!groupId || !cards) return;
    const temp = cards.filter((elem) => elem.card.groupid === groupId);
    setOurCard(temp[0].card);
  }, [cards, groupId]);

  useEffect(() => {
    ourCard.cards && setSingleCardDetail(ourCard.cards[0]);
  }, [ourCard]);


  
  const [url, setUrl] = useState();        
  const [Copy, setCopy] = useState(false);  //state for copying link
  const [share, setShare] = useState("none");   //state for share button

  // share handler for show dispay
  const shareHandlerOpen = () => {
    setShare("flex");
    setUrl(`${document.location.href}`);
  };
  const shareHandlerClose = () => {
    setShare("none");
  };

  const handlePrint=()=>{
    window.print();
  }
/* show alert or message when link gets copied */
  useEffect(() => {
    Copy &&
      setTimeout(() => {
        setCopy(false);
      }, 2000);
  }, [Copy]);

  return (
/* flashcard details */

    <section className="flex flex-col text-red-800 text-xl">
      <header className="flex">
        <BiArrowBack
          className="text-3xl mr-6 bg-red-50 w-10 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <div className="flex flex-col ">
          <h2 className="text-xl text-black font-bold">{ourCard.groupname}</h2>
          {ourCard.groupdescription && (
            <p className=" my-2">{ourCard.groupdescription}</p>
          )}
        </div>
      </header>
      <main className="mt-6 grid grid-rows-1 md:grid-cols-4">
        <aside className="col-span-1 bg-white w-[70vw] md:w-[14rem] xl:w-[17rem] m-5 px-4 py-5 h-fit mr-2 rounded-md ">
          <h2 className="p-2 ">Flashcards</h2>
          <hr />
          <hr className="mb-2 mr-4 " />
          {ourCard.cards &&
            ourCard.cards.map((card) => (
              <p
                key={card.cardid}
                className={`py-2 px-8 text-slate-700 font-medium hover:bg-slate-100 cursor-pointer ${
                  card.cardid === singleCardDetail.cardid &&
                  "!text-green-800 !font-bold"
                }`}
                onClick={() => displayCard(card.cardid)}
              >
                {card.cardname}
              </p>
            ))}
        </aside>

        <section className="col-span-3 md:col-span-2 flex flex-col xl:flex-row items-center w-full bg-white  shadow-lg rounded-lg">
          <img
          /*ternary operator is used for getting the default image, if the condition is false or if the condition is true the selected image is displayed*/
            src={ 
              singleCardDetail.cardimg ? singleCardDetail.cardimg: cryingCat
          }
            alt="cryingCat"
            className="object-contain w-[32rem] xl:w-[20vw] h-full p-6"
          />
          <p className={`w-full p-6 py-10 `}>
            {singleCardDetail.carddescription}
          </p>
        </section>
        <aside className="col-span-1 flex md:flex flex-col items-center space-y-5">
          <button
            type="text"
           
            onClick={shareHandlerOpen}
            className="flex items-center py-3 px-4 xl:w-60 space-x-5 bg-white rounded-md shadow-lg active:scale-100 transition-all duration-100 hover:scale-105"
          >
            <BiShare className="scale-x-[-1]" />
            <span>Share</span>
          </button>

          <button onClick={handlePrint} className="flex items-center py-3 px-4 xl:w-60 space-x-5 bg-white rounded-md shadow-lg active:scale-100 transition-all duration-100 hover:scale-105">
            <AiOutlineDownload />
            <span>Download</span>
          </button>
          <button onClick={handlePrint} className="flex items-center py-3 px-4 xl:w-60 space-x-5 bg-white rounded-md shadow-lg active:scale-100 transition-all duration-100 hover:scale-105">
            <AiFillPrinter />
            <span>Print</span>
          </button>
        </aside>
      </main>



{/* share popup box */}
      <div className="popupBox" style={{ display: share }}>
        <div className="relative w-11/12 xl:w-2/5 sm:w-11/12 p-3 sm:p-8 bg-white rounded-lg inline-table">
          <h3 className="text-lg font-semibold mb-2 ">Share :</h3>
          <div className="flex sm:items-center flex-col sm:flex-row ">
            <span className="w-6/7 px-2 py-6 rounded-lg outline-dashed outline-1 outline-blue-200 inline-table">
              <span>Link :</span>&nbsp;&nbsp;
              <span className="inline-block">{url}</span>
              <h2 className="p-2 h-5 ml-3 text-sm text-red-500 font-semibold">
                {Copy && "Link copied to clipboard"}
              </h2>
            </span>

            <span className="flex mt-3 sm:mt-0">
              <BiCopy
                className="text-2xl ml-4  mb-5 cursor-pointer"
                onClick={() => setCopy(true)}
              />
              <BiShareAlt className="text-2xl  ml-4  mb-6 cursor-pointer" />
              <AiFillCloseCircle
                className="closebtn "
                onClick={shareHandlerClose}
              />
            </span>
          </div>
          <div className="mt-6 flex items-center space-x-10 justify-center">
            <WhatsappShareButton url="https://web.whatsapp.com/">
              <img
                src={Whatsapp}
                alt="Whatsapp"
                className="w-10 p-2 bg-black rounded-lg cursor-pointer"
              />
            </WhatsappShareButton>
            <FacebookShareButton url="https://www.facebook.com/">
              <img
                src={Facebook}
                alt="Facebook"
                className="w-10 p-2 bg-black rounded-lg cursor-pointer"
              />
            </FacebookShareButton>
            <LinkedinShareButton url="https://www.linkedin.com/">
              <img
                src={Linkedin}
                alt="Linkedin"
                className="w-10 p-2 bg-black rounded-lg cursor-pointer"
              />
            </LinkedinShareButton>
            <TwitterShareButton url="https://twitter.com/">
              <img
                src={Twitter}
                alt="Twitter"
                className="w-10 p-2 bg-black rounded-lg cursor-pointer"
              />
            </TwitterShareButton>
           
          </div>
        </div>
      </div>
    </section>
  );
};

export default Flashcard;
