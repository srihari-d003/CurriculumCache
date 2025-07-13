import React, { useEffect, useState } from "react";
import '../css/filesview.css';
import subjects from "../subjects";
import { LinearProgress } from "@mui/material";
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";
import { storage } from "../firebase";
import nofile from '../media/undraw_upload_re_pasx.svg';

function FilesView(params) {
    const bucket=getStorage();
    //values
    let [branch,setBranch]=useState("");
    let [year,setYear]=useState("");
    let [subject,setSubject]=useState("");
    let [sublist,setSublist]=useState([]);
    let [fetch,setFetch]=useState(false);
    let [curfiles,setCurfiles]=useState([]);
    let [browser,setBrowser]=useState(false);

    const handleChange = (e) =>{
        if(e.target.name==="branch"){
            setBranch(e.target.value);
        }
        if(e.target.name==="year"){
            setYear(e.target.value);
        }
        if(e.target.name==="subject"){
            setSubject(e.target.value);
        }
    }

    const getFiles =()=>{
        setBrowser(true);
        setFetch(true);
        setCurfiles([]);
        const files=ref(bucket,`${branch}/${year}/${subject}`);
        listAll(files).then(res=>{
            let result=[];
            if(res.items.length==0)setFetch(false);
            res.items.map(file=>{
                const filer=ref(bucket,`${file._location.path_}`);
                getDownloadURL(filer).then(url=>{
                    result=[...result,[file,url]];
                    setCurfiles(result);
                    setFetch(false);
                })
            });
        }).catch(e=>{
            setFetch(false);
            console.log(e);
        })
    }

    useEffect(()=>{
        if(branch==="" || year==="")return;
        setSublist(subjects[branch][year]);
        setSubject("");
    },[branch,year])


    return(
        <div  style={{backgroundColor:"rgb(249, 249, 237)",minHeight:"100vh"}}>
        <h1 className="heading">Curriculum Cache</h1>
            <div className="fileviewmain">
                <div className="fileviewbranch_subject">
                        <div>
                            <label>Branch   </label>
                            <br></br>
                            <select name="branch" id="branch" value={branch} onChange={handleChange}>
                                <option value="" selected disabled hidden>Choose here</option>
                                <option value="cse">CSE</option>
                                <option value="ece">ECE</option>
                                <option value="eee">EEE</option>
                                <option value="mech">MECH</option>
                                <option value="civil">CIVIL</option>
                                <option value="mme">MME</option>
                                <option value="chem">CHEM</option>
                            </select>
                        </div>
                        <div>
                            <label>Year   </label>
                            <br></br>
                            <select name="year" id="year" value={year} onChange={handleChange}>
                                <option value="" selected disabled hidden>Choose here</option>
                                <option value="e1">Engg1</option>
                                <option value="e2">Engg2</option>
                                <option value="e3">Engg3</option>
                                <option value="e4">Engg4</option>
                            </select>
                        </div>
                        <div>
                            <label>Subject   </label>
                            <br></br>
                            <select name="subject" id="subject" value={subject} onChange={handleChange}>
                                <option value="" selected disabled hidden>Choose here</option>
                                {
                                    sublist.map(subject=>{
                                        return(
                                            <option key={subject} value={subject}>{subject}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div style={{margin:"0px 10px"}}>
                <button className="filesupload_btn" style={{cursor:`${fetch || branch==="" || year==="" || subject===""?"no-drop":"pointer"}`}} onClick={getFiles}>Get Files</button>
                {
                    fetch?
                    <LinearProgress style={{margin:"10px 0px"}} color="secondary" />
                    :
                    <hr></hr>
                }
                </div>
                {
                fetch ? <p style={{textAlign:"center",fontSize:"14px"}}>loading....</p> :
                !fetch && curfiles.length==0 ?
                <div style={{textAlign:"center",marginTop:"50px"}}>
                    <img style={{width:"300px",paddingBottom:"20px",margin:"0px 10px"}} src={nofile}/>
                    <div>{browser?"No Files":"Browse Files"}</div>
                </div>
                :
                curfiles.map((file,ind)=>{
                    return (
                        <div className="card">
                            <div className="card-text">
                                <a key={file[1]} href={file[1]} target="_blank">{file[0]?file[0]._location.path_:"jagan"}</a>
                            </div>
                        </div>
                    );
                })
            }
            </div>  
        </div>
    )
}

export default FilesView;