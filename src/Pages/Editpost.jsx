import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import dataBaseService from "../Appwrite/database";
import { Container, PostForm } from "../components";

export default function Editpost(){
    const [post , setPost] = useState();
    const {slug} = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
        const getData =async () =>{
            if(slug){    
                await dataBaseService.getPost(slug).then((data)=>{
                    if(data){
                        setPost(data);   
                    }
                }).catch((error) => {console.log(error);
                })
            }else{
                navigate('/');
            }
        }
        getData();
    } , [slug , navigate]);
    return post? (
        <div className="py-8">
            <Container>
                <PostForm post = {post}/>
            </Container>
        </div>
    ):<h2 className="text-zinc-100 w-full mx-auto">No Post Found</h2>
}