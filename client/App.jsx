import React, { useState,useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import ChirpCard from "./components/ChirpCard.jsx";

const App = () => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [chirps, setChirps] = useState([
    {
      id: uuidv4(),
      name: "Josh",
      content: "This is the chirp body!",
      created: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
    },
    {
      id: uuidv4(),
      name: "Haylee",
      content: "Hello!",
      created: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
    },
    {
      id: uuidv4(),
      name: "Garrett",
      content: "I'm not mad!",
      created: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
    },
  ]);

  const handleNameChange = (e) => setName(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  //Send a Post request 
  const handleChirpSubmit = (e) => {
    e.preventDefault();
    
    const newChirp ={
      userid:1,
      content:content,
      location: ''
    };

    const options ={
      method : 'POST',
      headers:{'Content-Type' : 'application/json'},
      body : JSON.stringify(newChirp),
    };

    fetch('http://localhost:3000/api/chirps', options)
    .then(()=> console.log('success'))
    .then(()=>location.reload())
    .catch((err)=>console.log(err));

  };
//Send a Delete request
  const handleDelete = (id)=>{
    console.log('delete button clicked');
   
    fetch('http://localhost:3000/api/chirps/'+id, { method: 'DELETE' })
    .then(() => console.log('deleted'))
    .then(()=>location.reload())
    .catch((e)=>console.log(e));

}
//Send a Get request to retrieve a specific chirp
const handleDetails= (id)=>{

  console.log('details button clicked');

  fetch('http://localhost:3000/api/chirps/'+id)
  .then((response)=>response.json())
  .then((chirp)=>
    console.log(chirp))
  .catch((e)=>console.log(e));
  
}



//Send a Get request 
 useEffect(()=>{
   fetch('http://localhost:3000/api/chirps')
   .then(response=>  response.json())
   .then((allChirps)=>{
    console.log(allChirps);
    setChirps(allChirps);

     })
   
 },[]);
 
  

  return (
    <>
      <div className="container text-body text-center">
        <div className="row">
          <div className="col-12 p-0">
            <nav>
              <img
                className="banner"
                src="./assets/banner.jpg"
                alt="logo for awesome site yay"
              />
              <h1>Ghibli Chirpr</h1>
            </nav>
          </div>
        </div>
        <div className="row">
          <form action="">
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control mb-1"
                placeholder="name"
                aria-label="name"
                value={name}
                onChange={handleNameChange}
              />
              <textarea
                className="form-control mb-2"
                              aria-label="With textarea"
                              placeholder="(500 characters max)"
                value={content}
                onChange={handleContentChange}
                cols="30"
                rows="10"
              ></textarea>
              <button className="btn btn-dark" onClick={handleChirpSubmit}>
                Chirp It!
              </button>
            </div>
          </form>
          <div className=" chirps mb-4">
            {chirps.map((chirp) => (
              
              <ChirpCard
                key={chirp.id}
                name={chirp.name}
                content={chirp.content}
                created={chirp._created}
                id={chirp.id}
                deleteFunction={()=>{handleDelete(chirp.id)}}
                detailsFunction={()=>{handleDetails(chirp.id)}}
              />
              
              
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
