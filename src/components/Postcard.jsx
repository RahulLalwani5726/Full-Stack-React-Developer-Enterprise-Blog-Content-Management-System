import { useEffect, useState } from 'react'
import StoreService from '../Appwrite/storage'
import {Link} from 'react-router-dom'
export default function Postcard({$id , title , featuredimage}){
    const [image , setImage] = useState();
    useEffect(()=>{
        StoreService.previewFile(featuredimage).then((data)=>{
            setImage(data)
        });
    },[title])
    return(
        <Link to={`/post/${$id}`} >
            <div className="w-full text-zinc-100 font-mono">
                <div>
                    <img className = "w-20 bg-zinc-100 rounded-xl" src={image?image.name:'https://cdn-icons-png.flaticon.com/512/11843/11843173.png'} alt={`${title} Image`} />
                </div>
                <h2>{title}</h2>
            </div>
        </Link>
    )
}