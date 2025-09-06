import StorageService from "../Appwrite/storage";
import DataBaseService from "../Appwrite/database";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { Input, RTE, Select, Button } from "./index";
export default function PostForm({ post }) {
    const navigate = useNavigate();
    const {PreImg , setPreImg} = useState();
    const userData = useSelector((state) => state.auth.userData);
    
    const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
    useEffect(()=>{
        if(post){
            StorageService.previewFile(post.featuredimage).then((data) => {setPreImg(data)});
        }
    } , [post ,navigate])
  const submit = async (data) => {
    if (post) {
      const Imgfile = data.image[0]
        ? await StorageService.uploadFile(data.image[0])
        : null;

      if (Imgfile && post.featuredimage) {
        await StorageService.deleteFile(post.featuredimage);
      }
      const updatedData = {
        ...data,
        featuredimage: Imgfile ? Imgfile.$id : post.featuredimage,
      };

      const DBupdate = await DataBaseService.updatePost(post.$id, updatedData);

      if (DBupdate) {
        navigate(`/post/${DBupdate.$id}`);
      }
    } else {
      const Imgfile = data.image[0]
        ? await StorageService.uploadFile(data.image[0])
        : null;
      const DBupdate = await DataBaseService.createPost({
        ...data,
        featuredimage: Imgfile ? Imgfile.$id : undefined,
        userid: userData.$id,
      });
      if (DBupdate) navigate(`/post/${DBupdate.$id}`);
    }
  };
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-wrap text-zinc-100 w-full"
    >
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: false })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={PreImg}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-5"
          {...register("status", { required: true })}
        />
        <Button
          child={post ? "Update" : "Submit"}
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        ></Button>
      </div>
    </form>
  );
}
