import React, { useEffect,useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { formDisplayState,formStatusState, adminServiceState } from '../atoms/fromTypes'
import { useForm } from 'react-hook-form';

function ServiceForm({handleCreate,handleEdit}) {
  const {register, handleSubmit, reset, formState: { errors }} = useForm(
    {defaultValues: { 
      title: "", sort_num:"" , 
      articleCheckbox:"",
      display:"",
    }});

  const [ isCheckbox , setIsCheckbox] = useState(false)
  const onSubmit = (data) => {
    console.log(data)
    if(data.method === 'ADD'){
      handleCreate(data)
      
    } else if (data.method === 'EDIT'){
      console.log('EDITTT')
      handleEdit(service.uid,data)
    }
  };
  const [showModal, setShowModal] = useRecoilState(formDisplayState);
  const service = useRecoilValue(adminServiceState);
  const formStatus = useRecoilValue(formStatusState);
  const handleClose = () => {
    setShowModal(false);
  };
  const handleCheckboxChange = (e) =>{

  }
  useEffect(()=>{
    formStatus === 'EDIT' ? 
      reset(service && {
              title: service.title,
              title_cht: service.title_cht,
              params_name: service.params_name,
              link:service.link,
              sort_num: service.sort_num,
              articleCheckbox: service.article === '1' ? setIsCheckbox(true)   : setIsCheckbox(false),
              intro:service.intro,
              intro_cht:service.intro_cht,
              display:service.display,
              article_title:service.children ? service.children.article_title : "" ,
              article_subtitle:service.children ? service.children.article_subtitle : "" ,
              article_intro:service.children ? service.children.article_intro : "" ,
            })   
      : reset()
  },[])
  return (
    <div className={'w-full h-screen  absolute top-0 left-0 z-20 overflow-hidden'}>
      <div className=' opacity-30 absolute inset-0 bg-black ' onClick={handleClose}></div>
      <div className=' relative w-4/5 bg-white mx-auto my-20 p-5 overflow-auto'>
        <div className='text-xl text-center font-bold'>{formStatus === 'ADD' ? '新增' : '編輯'}</div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className='flex gap-4'>
            <div className='main w-1/2'>
              <div className="mb-3 flex gap-3">
                <div>
                  <label htmlFor="exampleURL0" className="form-label inline-block mb-2 text-gray-700">單元名稱</label>
                  <input
                    type="text"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                    placeholder="單元名稱"
                    {...register('title')}
                  />
                </div>
                <div>
                  <label htmlFor="exampleURL0" className="form-label inline-block mb-2 text-gray-700">單元名稱(中文)</label>
                  <input
                    type="text"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                    placeholder="單元名稱(中文)"
                    {...register('title_cht')}
                  />
                </div>

              </div>
              <div className="mb-3 flex gap-3">
                <div>
                  <label htmlFor="exampleURL0" className="form-label inline-block mb-2 text-gray-700">參數名稱(小寫無空格)</label>
                  <input
                    type="text"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                    placeholder="參數名稱"
                    {...register('params_name')}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleURL0" className="form-label inline-block mb-2 text-gray-700">排序(輸入1-999)</label>
                  <input
                    type="text"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                    placeholder="排序"
                    {...register('sort_num')}
                  />
                </div>
              </div>
              <div className="mb-3 ">
                <label htmlFor="exampleURL0" className="form-label inline-block mb-2 text-gray-700">官網連結(https網址)</label>
                <input
                  type="text"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                  placeholder="Link"
                  {...register('link')}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="exampleURL0" className="form-label inline-block mb-2 text-gray-700">簡介</label>
                <textarea
                  rows="6"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                  placeholder="介紹"
                  {...register('intro')}
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleURL0" className="form-label inline-block mb-2 text-gray-700">介紹(中文)</label>
                <textarea
                  rows="6"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                  placeholder="介紹(中文)"
                  {...register('intro_cht')}
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleURL0" className="form-label inline-block mb-2 text-gray-700">
                  前台顯示 
                  </label>
                
                <div className="flex items-center mb-4">
                    <input  id="default-radio-1" type="radio" value="1" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" {...register("display")}/>
                    <label htmlFor="default-radio-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">顯示此項</label>
                </div>
                <div className="flex items-center">
                    <input  id="default-radio-2" type="radio" value="0" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"  {...register("display")}/>
                    <label htmlFor="default-radio-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">不顯示此項</label>
                </div>
              </div>

            </div>
            <div className='left w-1/2'>


              {
                formStatus === 'EDIT' && 
                <div className="mb-3 ">
                  <div className='mb-3'>
                    <h1 className='mb-2'>設定封面</h1>

                    <input type="file" className="custom form-control border p-2" id="file" name="photo" {...register('file')} />
                  </div>
                  <div className='flex justify-center items-center'>
                    {service.imgpath ?
                     <img src={service ? service.imgpath :　"1"} className="w-3/5"  alt={service && service.imgpath} /> : 
                     <div className='border w-4/5 h-32 text-zinc-300 text-xs'>JPEG Image 1280*720 ~ 1920*1080 </div>
                    }
                
                  </div>
                  <hr className='mt-3 mb-3'/>
                  <div className="mb-3 ">
                    <div className="flex items-center mb-4">
                        <input  id="article-types-1" type="checkbox" name="article-types" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" {...register("articleCheckbox")} onChange={(e)=>setIsCheckbox(e.target.checked)} 
                        checked={isCheckbox}
                        />
                        <label htmlFor="article-types-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">是否擴充內文</label>
                    </div>
                  </div>

                
                </div>
              }

              {formStatus === 'EDIT' && isCheckbox &&  
                // children
                <>
                  <div className="mb-3 ">
                    <label htmlFor="exampleURL0" className="form-label inline-block mb-2 text-gray-700">主標</label>
                    <input
                      type="text"
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                      placeholder="主標"
                      {...register('article_title')}
                    />
                  </div>
                  <div className="mb-3 ">
                    <label htmlFor="exampleURL0" className="form-label inline-block mb-2 text-gray-700">副標</label>
                    <input
                      type="text"
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                      placeholder="副標"
                      {...register('article_subtitle')}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleURL0" className="form-label inline-block mb-2 text-gray-700">內文介紹</label>
                    <textarea
                      rows="6"
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                      placeholder="內文介紹"
                      {...register('article_intro')}
                    ></textarea>
                  </div>
                  
                </>

                
              }
             


            </div>

          </div>
          
         
          
          <div>
            {
              formStatus === 'EDIT' ? 
              <button type="submit" className="py-2 px-4 bg-black text-white  rounded-md" >
                儲存編輯<input type="hidden" value="EDIT"  {...register('method')}/></button>
              :
              <button type="submit" className="py-2 px-4 bg-black text-white  rounded-md" >
                新增<input type="hidden" value="ADD"  {...register('method')}/></button>
            }
          </div>


        </form>
      </div>
    </div>
  )
}

export default ServiceForm