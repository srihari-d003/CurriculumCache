import React from "react";
import {
    Route,
    Routes
  } from "react-router-dom";
import Home from "../UI-Pages/Home";
import Login from "../UI-Pages/Login";
import Signup from "../UI-Pages/Signup";
import Forgotpass from "../UI-Pages/Forgotpass";
import { useState,useEffect } from "react";
import { firebaseAuth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Upload from "../UI-Pages/Upload";
import { useLocation } from "react-router";
import FilesView from "../UI-Pages/FilesView";


function Main(props){
    const navigate = useNavigate();
    const location = useLocation();
    const [logged,isloggedin]=useState(null);

    useEffect(()=>{
            firebaseAuth.onAuthStateChanged((user)=>{
                if(user){
                    isloggedin(true);
                    console.log(location);
                    if(location.pathname==="/login" || location.pathname==="/signup" || location.pathname==="/forgotpassword")navigate("/");
                    else navigate(location.pathname);
                }else{
                    isloggedin(false);
                    if(location.pathname==="/upload")navigate("/");
                    else navigate(location.pathname);
                }
            })
    },[logged]);

    const Logout =()=>{
        firebaseAuth.signOut().then((data)=>{
            console.log("signed out");
            isloggedin(false);
        }).catch((e)=>{
            console.log(e.message);
    })
    }

    if(logged===null)return <h1 style={{marginTop:"50px"}}>loading...</h1>
    return (
        <div>
            <Routes>
            <Route exact path="/" element={<Home logout={Logout} logged={logged}/>} />

            <Route exact  path="/login" element={<Login loginsuccess={()=>{
                console.log("going to home");
                isloggedin(true);
                navigate("/");
            }}/>} />

            <Route exact path="/signup" element={<Signup loginsuccess={()=>{
                console.log("going to home");
                isloggedin(true);
                navigate("/");
            }}/>} />

            <Route exact path="/forgotpassword" element={<Forgotpass/>} />
            <Route exact path="/upload" element={<Upload logged={logged}/>}/>
            <Route exact path="/files" element={<FilesView/>}/>

            </Routes>
        </div>        
    );
}

export default Main;