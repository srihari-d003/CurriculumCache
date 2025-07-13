import React from "react";
import '../css/home.css';
import { useNavigate, useNavigation } from "react-router";
import safe from '../media/undraw_safe_re_kiil.svg';
import learn from '../media/undraw_learning_sketching_nd4f.svg';
import notes from '../media/undraw_online_test_re_kyfx.svg';
import logo from '../media/logos/mainlogo.svg';
import { firebaseAuth } from "../firebase";
import { Email, ExpandLess, Facebook, GitHub, LinkedIn, YouTube } from "@mui/icons-material";


function Home(props){
    const navigate=useNavigate();
    

    return(
        <div id="home">
            <div  className="homewrapper">

                <h1 className="heading">
                    <img className="logoimg" width={40} src={logo} />
                    Curriculum Cache</h1>
                    
                <button style={{display:props.logged?"block":"none"}} onClick={props.logout} className="logoutBtn">Logout</button>
                
                <div className="homemain">
                    <div className="desc1">
                        A digital vault designed to safeguard and preserve educational materials 
                        from B.Tech 1st year to the final year. It serves as a comprehensive archive, 
                        storing course materials, lecture notes, assignments, projects, and other 
                        academic resources. Users can access this vault to download relevant materials 
                        as needed, ensuring easy retrieval and utilization of educational content. 
                    </div>
                </div>
                <div className="Maincard">
                    <div className="onecard">
                        <br></br>
                            <img src={safe} height={100}/>
                    <p>
                    Robust security measures to protect sensitive educational materials and ensure that only authorized users have access to them.
                     </p>
                    <button onClick={()=>navigate("/files")}>Browse..</button>
                    </div>
                    <div className="onecard">
                        <br></br>
                            <img src={learn} height={100}/>
                    <p>The platform supports students in their learning journey, facilitating better understanding and mastery of course concepts. </p>
                    <button onClick={()=>navigate("/files")}>Browse..</button>
                    </div>
                    <div className="onecard">
                        <br></br>
                            <img src={notes} height={100}/>
                    <p>The vault includes a wide range of educational resources such as PDFs, course materials, lecture notes, assignments, projects.
                        </p> 
                    <button onClick={()=>navigate("/files")}>Browse..</button>
                    </div>
                </div>
                <div className="footerMain">
                    <div className="footer">
                        <div>
                            <p>
                            storing course materials, lecture notes, assignments, projects, and other 
                            academic resources. Users can access this vault to download relevant materials 
                            as needed, ensuring easy retrieval and utilization of educational content.
                            </p>
                        </div>
                        <div>
                                <div className="uploadbtn">
                                <button onClick={()=>{
                                    if(props.logged)
                                    navigate("/upload");
                                    else navigate("/login");
                                    }}>
                                    {props.logged?"Upload":"Login"}
                                </button>
                                </div>
                            
                                <div className="uploadbtn">
                                    <button onClick={()=>navigate("/files")}>
                                        Browse Files
                                    </button>
                                </div>
                                {
                                    props.logged?
                                <button onClick={props.logout} className="logoutBt">Logout</button>:<></>
                                }
                        </div>
                    </div>
                    <div className="footer2">
                        <p className="bottombtn">
                        <a href="#home" >
                        <ExpandLess fontSize="large" style={{color:"#fff",paddingTop:"7px"}} />
                        </a>
                        </p>
                        <div className="social" style={{textAlign:"center"}}>
                            <a href="https://www.linkedin.com/in/sriharidoupati03/" target="_blank">
                            <LinkedIn />
                            </a>
                            <a href="http://github.com/srihari_d003" target="_blank">
                            <GitHub />
                            </a>
                            <a href="mailto:sriharidoupati@gmail.com" target="_blank">
                            <Email />
                            </a>
                            <p>Developed Srihari 003<span style={{color:"red"}}>&#10084;</span></p>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Home;