import React, {useEffect} from 'react'

import { useForm } from 'react-hook-form';

function AdminHeader() {
  const {
    register,handleSubmit,setValue, watch,formState: { errors }} = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <section className='w-full bg-white p-5 text-black relative'>
      <div className='w-full border-b mb-10'>
        <h1>關於我們</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="mb-3 ">
          <label htmlFor="exampleURL0" className="form-label inline-block mb-2 text-gray-700">Home Video</label>
          <input
            type="text"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
            placeholder="Link"
            {...register('home_video')}
          />
        </div>
        <hr />

        <div className='mt-3'>
          <button type="submit" className="py-2 px-4 bg-black text-white  rounded-md" onClick={handleSubmit(onSubmit)}>
                    儲存編輯
          </button>
        </div>

      </form>


    </section>
  )
}

export default AdminHeader