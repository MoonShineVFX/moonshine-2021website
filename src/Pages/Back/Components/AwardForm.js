import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { formDisplayState,formStatusState, adminAwardState } from '../atoms/fromTypes'
import { useForm } from 'react-hook-form';

function AwardForm({handleCreate,handleEdit}) {
  const {register, handleSubmit, reset, formState: { errors }} = useForm(
    {defaultValues: { title: "", sort_num:""}});
  const onSubmit = (data) => {
    console.log(data)
    if(data.method === 'ADD'){
      handleCreate(data)
      
    } else if (data.method === 'EDIT'){
      console.log('EDITTT')
      handleEdit(award.uid,data)
    }
    
  };
  const [showModal, setShowModal] = useRecoilState(formDisplayState);
  const award = useRecoilValue(adminAwardState);
  const formStatus = useRecoilValue(formStatusState);
  const handleClose = () => {
    setShowModal(false);
  };
  useEffect(()=>{
    formStatus === 'EDIT' ? reset(award && award) : reset()
  },[])
  return (
    <div className={'w-full h-screen  absolute top-0 left-0 z-20 overflow-hidden'}>
      <div className=' opacity-30 absolute inset-0 bg-black ' onClick={handleClose}></div>
      <div className=' relative w-4/5 bg-white mx-auto my-20 p-5 overflow-auto'>
        <div className='text-xl text-center font-bold'>{formStatus === 'ADD' ? '新增獎項' : '編輯獎項'}</div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className='flex gap-4'>
            <div className='main w-1/2'>
              <div className="mb-3">
                <label htmlFor="exampleURL0" className="form-label inline-block mb-2 text-gray-700">獎項名稱</label>
                <input
                  type="text"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                  id="exampleURL0"
                  placeholder="獎項名稱"
                  {...register('title')}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleURL0" className="form-label inline-block mb-2 text-gray-700">作品排序(輸入1-999)</label>
                <input
                  type="text"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                  placeholder="排序"
                  {...register('sort_num')}
                />
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
                    <h1 className='mb-2'>設定作品縮圖</h1>

                    <input type="file" className="custom form-control border p-2" id="file" name="photo" {...register('file')} />
                  </div>
                  <div className='bg-zinc-900 w-4/5 h-32 flex justify-center items-center'>
                    <img src={award ? award.imgpath :　"1"} className="img-fluid"  alt={award && award.imgpath} />
                  </div>

                
                </div>
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

export default AwardForm