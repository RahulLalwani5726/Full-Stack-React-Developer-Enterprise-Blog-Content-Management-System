import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import dataBaseService from "../Appwrite/database";
import storageService from "../Appwrite/storage";
import { Button, Container, Loader } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userid === userData.$id : false;

  useEffect(() => {
    const fetchData = async () => {
      if (slug) {
        const fetchedPost = await dataBaseService.getPost(slug);
        if (fetchedPost) {
          setPost(fetchedPost);
        } else {
          navigate("/");
        }
      } else {
        navigate("/");
      }
      setLoading(false);
    };
    fetchData();
  }, [slug, navigate]);

  useEffect(() => {
    if (post?.featuredimage) {
      const getPreview = async () => {
        const url = await storageService.previewFile(post.featuredimage);
        setPreviewUrl(url);
      };
      getPreview();  
    }
  }, [post]);

  const deletePost = async () => {
    const status = await dataBaseService.deletePost(post.$id);
    if (status) {
      await storageService.deleteFile(post.featuredimage);
      navigate("/");
    }
  };

  {
    return loading ? (
      <Loader isEnabled={loading}/>
    ) : post ? (
      <div className="py-8 text-zinc-100">
        <Container>
          <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
            <img src={(previewUrl?previewUrl:"https://cdn-imgix.headout.com/media/images/c9db3cea62133b6a6bb70597326b4a34-388-dubai-img-worlds-of-adventure-tickets-01.jpg")} alt={post.title} className="rounded-xl" />
            {isAuthor && (
              <div className="absolute right-6 top-6">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button child="Edit" bgColor="bg-green-500" className="mr-3"/>
                </Link>
                <Button child="Delete" bgColor="bg-red-500" onClick={deletePost}/>
              </div>
            )}
          </div>
          <div className="w-full mb-6 font-serif">
            <h1 className="text-2xl font-bold">{post.title}</h1>
          </div>
          <div className="browser-css font-mono">{parse(post.content)}</div>
        </Container>
      </div>
    ) : null;
  }
}
