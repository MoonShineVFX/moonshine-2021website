import React, { useEffect, useState } from "react";
import { constSelector, useRecoilState, useRecoilValue } from "recoil";
import {
  formDisplayState,
  workState,
  formStatusState,
} from "../atoms/fromTypes";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { uploadImgToBunny, authGetBunnyKey } from "../../../Helper/getfunction";

function EditForm({ categoryData, handleCreateWork, handleEditWork }) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      intro: "",
      sort_num: "",
      youtube_id: "",
      year_of_work: "",
      video_url: "",
      vimeo_id: "",
      youtube_id: "",
      article: false,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "img_list",
  });
  const [token, setToken] = useState("");
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const onSubmit = (data) => {
    console.log(data);
    if (data.method === "ADD") {
      handleCreateWork(data);
    } else if (data.method === "EDIT") {
      console.log("EDITTT");
      handleEditWork(work.uid, data);
    }
  };
  const [showModal, setShowModal] = useRecoilState(formDisplayState);
  const work = useRecoilValue(workState);
  const formStatus = useRecoilValue(formStatusState);
  const [currentCategory, setCurrentCategory] = useState();
  const handleClose = () => {
    setShowModal(false);
  };
  const handleChange = (e) => {
    console.log(e.target.value);
    filterCurrentCategory(e.target.value);
  };
  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    let pathname = "/msweb/for_global/data/";
    if (file) {
      const currentDateTime = Date.now();
      const fileExtension = file.name.split(".").pop();
      const renamedFile = new File(
        [file.slice()],
        currentDateTime + "." + fileExtension,
        { type: file.type }
      );
      pathname = pathname + currentDateTime + "." + fileExtension;
      const reader = new FileReader();
      reader.onload = () => {
        const imageDataUrl = reader.result;
        // 在此處可以對圖片數據進行處理或顯示預覽圖���
        console.log(imageDataUrl);
        uploadImgToBunny(pathname, renamedFile, token)
          .then((data) => {
            // 將 imageUrl 回填到表單中對應的 input 欄位

            console.log(data);
            if (data.success) {
              setValue(`img_list.${index}.img`, data.data.uri);
            }
          })
          .catch((error) => console.error(error));
      };
      reader.readAsDataURL(file);
    }
  };
  const filterCurrentCategory = (cid) => {
    const filteredCategory = categoryData.filter((value) => {
      return value.id === cid;
    });
    setCurrentCategory(filteredCategory[0]);
  };
  useEffect(() => {
    formStatus === "EDIT" ? reset(work && work) : reset();
    if (work) {
      filterCurrentCategory(work.category);
    }

    authGetBunnyKey((res) => {
      setToken(res.bunnyApi);
    });
  }, [token]);
  return (
    <div className={"w-full h-screen  absolute top-0 left-0 z-20 "}>
      <div
        className=" opacity-30 fixed inset-0 bg-black "
        onClick={handleClose}
      ></div>
      <div className=" relative w-4/5 bg-white mx-auto my-10 p-5 overflow-auto ">
        <div className="text-xl text-center font-bold">
          {formStatus === "ADD" ? "新增作品" : "編輯作品"}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="flex gap-4">
            <div className="main w-2/5">
              <div className="mb-3">
                <label
                  htmlFor="exampleURL0"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  作品名稱
                </label>
                <input
                  type="text"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                  id="exampleURL0"
                  placeholder="作品名稱"
                  {...register("title")}
                />
              </div>
              <div className="relative mb-3">
                <label
                  htmlFor="exampleURL0"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  分類
                </label>
                <select
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                  id="category"
                  {...register("category")}
                  onChange={(e) => handleChange(e)}
                >
                  {categoryData.map((item, index) => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.name} - {item.name_cht}
                      </option>
                    );
                  })}
                </select>
              </div>
              {currentCategory ? (
                <div className="relative mb-3">
                  <label
                    htmlFor="exampleURL0"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    子分類
                  </label>
                  <select
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                    id="category"
                    {...register("sub_category")}
                  >
                    {currentCategory.sub_category ? (
                      currentCategory.sub_category.map((item, index) => {
                        return (
                          <option key={item.id} value={item.id}>
                            {item.title}{" "}
                          </option>
                        );
                      })
                    ) : (
                      <option>沒有子分類</option>
                    )}
                  </select>
                </div>
              ) : (
                <div>0</div>
              )}

              <div className="flex gap-3">
                <div className="mb-3">
                  <label
                    htmlFor="exampleURL0"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    作品年分
                  </label>
                  <input
                    type="text"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                    id="exampleURL0"
                    placeholder="作品年分"
                    {...register("year_of_work")}
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="exampleURL0"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    排序(1-999)
                  </label>
                  <input
                    type="text"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                    placeholder="排序"
                    {...register("sort_num")}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label
                  htmlFor="exampleURL0"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  影片位置(直接貼上youtube or vimeo 網址)
                </label>
                <input
                  type="text"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                  placeholder="影片位置"
                  {...register("video_url")}
                />
              </div>
              {formStatus === "EDIT" && work.vimeo_id && (
                <div className="mb-3">
                  <label
                    htmlFor="exampleURL0"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    這是原本的vimeo(新版網頁請直接更新貼在上欄){" "}
                  </label>
                  <div>
                    {formStatus === "EDIT" && work.vimeo_id && (
                      <span>https://vimeo.com/{work.vimeo_id}</span>
                    )}
                  </div>
                </div>
              )}
              {formStatus === "EDIT" && work.youtube_id && (
                <div className="mb-3">
                  <label
                    htmlFor="exampleURL0"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    這是原本的youtube (新版網頁請直接更新貼在上欄)
                  </label>
                  <div>
                    {formStatus === "EDIT" && work.youtube_id && (
                      <span>
                        https://www.youtube.com/watch?v={work.youtube_id}
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="mb-3">
                <label
                  htmlFor="exampleURL0"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  前台顯示
                </label>

                <div className="flex items-center mb-4">
                  <input
                    id="default-radio-1"
                    type="radio"
                    value="1"
                    name="default-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    {...register("display")}
                  />
                  <label
                    htmlFor="default-radio-1"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    顯示作品
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="default-radio-2"
                    type="radio"
                    value="0"
                    name="default-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    {...register("display")}
                  />
                  <label
                    htmlFor="default-radio-2"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    不顯示此作品
                  </label>
                </div>
              </div>
            </div>
            <div className="left w-3/5">
              <div className="mb-3">
                <label
                  htmlFor="exampleURL0"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  Credit
                </label>
                <textarea
                  rows="6"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                  placeholder="Credit"
                  {...register("intro")}
                ></textarea>
              </div>

              <div className="mb-3">
                <input
                  name="isArticle"
                  type="checkbox"
                  {...register("article")}
                  className="mr-2"
                />
                是否啟用作品介紹頁面
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleURL0"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  作品劇照列表
                </label>
                <ul>
                  {fields.map((item, index) => (
                    <li
                      key={item.id}
                      className="flex items-center space-x-2 mb-2"
                    >
                      <Controller
                        render={({ field }) => (
                          <input
                            {...field}
                            type="checkbox"
                            defaultChecked={item?.isCover}
                            className="form-control block px-3 py-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          />
                        )}
                        name={`img_list.${index}.isCover`}
                        control={control}
                      />
                      <Controller
                        render={({ field }) => (
                          <input
                            {...field}
                            className="form-control block w-2/3 px-3 py-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          />
                        )}
                        name={`img_list.${index}.img`}
                        control={control}
                      />
                      <button
                        type="button"
                        className="py-2 px-3 bg-black text-white rounded-md text-sm"
                        onClick={() => remove(index)}
                      >
                        Remove
                      </button>
                      <label
                        htmlFor={`img_list.${index}.file`}
                        className="py-2 px-3 bg-black text-white rounded-md text-sm"
                      >
                        上傳
                        <input
                          id={`img_list.${index}.file`}
                          type="file"
                          className="hidden"
                          onChange={(e) => handleFileChange(e, index)}
                        />
                      </label>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="py-2 px-4 bg-black text-white rounded-md text-sm"
                  onClick={() =>
                    append({ img: "https://xx.com/01.jpg", isCover: false })
                  }
                >
                  新增一張
                </button>
              </div>

              <div className="mb-3">
                <label
                  htmlFor="exampleURL0"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  作品介紹
                </label>
                <textarea
                  rows="6"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                  placeholder="作品介紹"
                  {...register("article_text")}
                ></textarea>
              </div>

              {formStatus === "EDIT" && (
                <div className="mb-3 ">
                  <div className="mb-3">
                    <h1 className="mb-2">設定作品縮圖</h1>

                    <input
                      type="file"
                      className="custom form-control border p-2"
                      id="file"
                      name="photo"
                      {...register("file")}
                    />
                  </div>

                  <img
                    src={work ? work.imgpath : "1"}
                    className="img-fluid"
                    alt={work && work.imgpath}
                  />
                </div>
              )}
            </div>
          </div>

          <div>
            {formStatus === "EDIT" ? (
              <button
                type="submit"
                className="py-2 px-4 bg-black text-white  rounded-md"
              >
                儲存編輯
                <input type="hidden" value="EDIT" {...register("method")} />
              </button>
            ) : (
              <button
                type="submit"
                className="py-2 px-4 bg-black text-white  rounded-md"
              >
                新增作品
                <input type="hidden" value="ADD" {...register("method")} />
              </button>
            )}
            <div className="text-xs inline-block ml-3">
              縮圖請建立作品後再上傳
            </div>
          </div>
        </form>
      </div>
      {uploading && <div>上傳中...</div>}
    </div>
  );
}

export default EditForm;
