import { Button, CircularProgress, IconButton, LinearProgress, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import { storage } from "../firebase";
import { deleteObject, getDownloadURL, getStorage, listAll, ref, uploadBytes } from "firebase/storage";
import { Margin } from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import '../css/upload.css';
import nofile from '../media/undraw_upload_re_pasx.svg';
import subjects from "../subjects";

function Upload(props){
    const navigate=useNavigate();
    let [fetch,setFetch]=useState(true);
    let [curfiles,setCurfiles]=useState([]);
    let [files,setFiles]=useState([]);
    let [refetch,setRefetch]=useState(false);
    let [uploading,setLoad]=useState(false);
    let [loader,setLoader]=useState(false);
    let [open,setOpen]=useState(false);
    let [first,setFirst]=useState(true);
 
    //values
    let [branch,setBranch]=useState("");
    let [year,setYear]=useState("");
    let [subject,setSubject]=useState("");
    let [sublist,setSublist]=useState([]);

    const bucket=getStorage();

    let uploadFiles=()=>{
        if(files.length==0){
            setOpen(true);
            return;
        }
        setFirst(false);
        setLoad(true);
        console.log(files);
        const f=Array.from(files);
        f.forEach((file)=>{
            const fileref=ref(bucket,`${branch}/${year}/${subject}/${file.name}`);
            uploadBytes(fileref,file).then((res)=>{
                console.log(res);
                setFetch(true);
                document.getElementById('files').value='';
                setRefetch(true);
                setBranch("");
                setYear("");
                setSubject("");
            }).catch(e=>{
                console.log(e);
            })
        })
    }

    useEffect(()=>{
        if(first){
            setFetch(false);
            return;
        }
        if(!props.logged){
            navigate("/");
        }
        console.log("fetching...")
        const files=ref(bucket,'cse/e1/Pps');
        listAll(files).then(res=>{
            console.log(res);
            let result=[]; 
            if(res.items.length==0)setFetch(false);
            res.items.map(file=>{
                const filer=ref(storage,`${file._location.path_}`);
                getDownloadURL(filer).then(url=>{
                    result=[...result,[file,url]];
                    setCurfiles(result);
                    setFetch(false);
                })
            })
            setLoad(false);
        }).catch(e=>{
            console.log(e);
        })
    },[refetch]);

    
    useEffect(()=>{
        if(branch==="" || year==="")return;
        setSublist(subjects[branch][year]);
        setSubject("");
    },[branch,year])

    let deletefile=(file,ind)=>{
        setLoader(true);
        let newfiles=curfiles.filter((v,i)=>i!=ind);
        const fileref=ref(storage,`${file._location.path_}`);
        deleteObject(fileref).then(()=>{
            console.log("file deleted");
            setLoader(false);
            setCurfiles(newfiles);
        }).catch(e=>{
            setLoader(false);
        })
    }

    const handleClose = (e) => {
        setOpen(false);
    };

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

    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
    );

    return(
        <div   style={{backgroundColor:"rgb(249, 249, 237)",minHeight:"100vh"}}>
        <h1 className="heading">Curriculum Cache</h1>
            <div className="main">
                <div class="branch_subject">
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
            <div className="input_file">
                <input id="files" type="file" multiple onChange={(e)=>{setFiles(e.target.files)}} accept=".pdf,.xls,.txt,.doc,.docx"/>
                <button className="upload_btn" style={{cursor:`${fetch || branch==="" || year==="" || subject==="" || uploading?"no-drop":"pointer"}`}} onClick={uploadFiles}>Upload</button>
            </div>
            {
                uploading && !fetch?<p style={{textAlign:"center",fontSize:"14px"}}>Uploading...</p>:<p></p>
            }
            <div>
                {
                    uploading || fetch || loader?
                    <LinearProgress style={{margin:"0px 10px"}} color="secondary" />
                    :
                    <hr style={{margin:"10px"}}></hr>
                }
                <h2 style={{fontWeight:600,margin:"10px 10px"}}>Recent Files</h2>
            </div>
            {
                first?
                <div style={{textAlign:"center",marginTop:"50px"}}>
                    <img style={{width:"300px",paddingBottom:"20px",margin:"0px 10px"}} src={nofile}/>
                    <div>Upload Files</div>
                </div>
                :
                fetch ? <p style={{textAlign:"center",fontSize:"14px"}}>loading....</p> :
                curfiles.length==0 ?
                <div style={{textAlign:"center",marginTop:"50px"}}>
                    <img style={{width:"300px",paddingBottom:"20px",margin:"0px 10px"}} src={nofile}/>
                    <div>No Files</div>
                </div>
                :
                curfiles.map((file,ind)=>{
                    return (
                        <div className="card">
                            <div className="card-text">
                                <a key={file[1]} href={file[1]} target="_blank">{file[0]?file[0]._location.path_:"jagan"}</a>
                            </div>
                            <div className="card-delete">
                                <DeleteIcon onClick={()=>deletefile(file[0],ind)}/>
                            </div>
                        </div>
                    );
                })
            }
            
            </div>
            <Snackbar
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}
            message="Please select Files"
            action={action}
        />
        </div>
    );
}

export default Upload;