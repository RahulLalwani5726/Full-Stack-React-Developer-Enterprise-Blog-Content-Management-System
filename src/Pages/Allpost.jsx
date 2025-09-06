import { useEffect, useState } from "react"
import dataBaseService from "../Appwrite/database";
import { Container , Postcard } from "../components/index";
import { useSelector } from "react-redux";
export default function Allpost(){
    const [posts , setPosts] = useState();
    const user = useSelector(state => state.auth.userData)
    useEffect(()=>{
        const fetchData = async ()=>{
            await dataBaseService.getPosts()
            .then((post) => setPosts(post?post.documents:[]));
        }
        fetchData();
    } , [navigator , ])
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    { posts &&  posts.map((post) => (
                        (post.userid == user.$id || post.status === 'active')?
                        <div key={post.$id} className='p-2 w-1/4'>
                            <Postcard {...post} />
                        </div>
                        :null
                    ))}
                </div>
            </Container>
        </div>
    )
}