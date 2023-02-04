import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { LogInUser } from "../api";
import ActionBar from "./ActionBar";
import './styles/Home.css'
import './styles/ActionBar.css'
import './styles/Story.css'
import { generate_game } from "../api/processor";
var nlp = require("wink-nlp-utils");



const Home = () => {
  const [story, setStory] = useState("");


  const handleChange=(s)=>{
    console.log(s)
    localStorage.setItem('story', s)
    generate_game(s)
  

  }

useEffect(() => {

}, [story])



  return (
    <div className="home">
 
        {localStorage.getItem('story') ?  
               <div className="home_wrapper"> 
               <img src='https://i.ytimg.com/vi/3Imc8tnQNpE/maxresdefault.jpg'/>
          <div className="dialogue_body">
            <h1>A new challenger approaches...</h1>
            <p className="dbp">
            {localStorage.getItem('story')}
            </p>
          </div>

          </div>
            :   
            <div className="story_content_wrap">
             <h1 className="story_header">Input a storyline</h1>
          <form className="story_wrap" >

          <textarea className="story_textArea"
            onChange={(e)=>{
              setStory(e.target.value)}}
            placeholder="Example:  Bilbo ,the Hobbit, is selected by the wizard Gandalf to help Thorin and his party of Dwarves to reclaim their ancestral home and treasure, which has been seized by the dragon Smaug. Bilbo sets out in The Hobbit timid and comfort-loving, and through his adventures grows to become a useful and resourceful member of the quest."
            >
            </textarea>
            <button  type="button" className="story_button" styles={{ width: "100px", height: "50px" }}
                      onClick={()=>{
                        handleChange(story)}}>Submit</button>
        </form>
        </div>
             
        }

      

        </div>
      //   {/* </div> */}
      //   {/* <ActionBar/> */}
      // </div>
    // </div>
  );
};

export default Home;