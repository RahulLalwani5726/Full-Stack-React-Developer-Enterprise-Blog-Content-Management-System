import { useEffect, useState } from "react";
import dataBaseService from "../Appwrite/database";
import { useSelector } from "react-redux";
import { Container , Postcard } from "../components";
export default function Home() {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => state.auth.status);  // Call hooks here!
  const user = useSelector(state => state.auth.userData)
  useEffect(() => {
    async function fetchPosts() {
      const data = await dataBaseService.getPosts([]);
      if (data) {
        setPosts(data.documents);
      }
    }
    fetchPosts();
  }, []);

  if (posts && posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full text-zinc-100">
              <h1 className="text-2xl font-bold hover:text-zinc-400">
                {authStatus ? `No Post Available` : `Login to read posts`}
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            (post.userid == user.$id || post.status === 'active') ?
            <div key={post.$id} className="p-2 w-1/4">
              <Postcard {...post} />
            </div>
            :null
          ))}
        </div>
      </Container>
    </div>
  );
}
