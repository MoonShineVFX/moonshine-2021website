import React,{useState,useEffect} from 'react'
import {getWorkByidForArticle} from '../Helper/getfunction'
import { useParams, Link,useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Header from '../Components/Header'
function WatchArticle() {
  const {workid} = useParams();
	let navigate = useNavigate();
	const [data ,setData] = useState(null)
	console.log(workid)
  useEffect(()=>{
		if(!workid) return

		getWorkByidForArticle(workid,function(res){
			setData(res)
			console.log(res)
		})

		// window.onpopstate = () =>{
		// 	navigate(-1)
		// }
	},[])
  return (
    <section id="watch_article">
			{data &&
				<div className=" relative aspect-video">
					<ReactPlayer
						url={data.video_url}
						className='react-player'
						playing
						controls
						muted
						width='100vw'
						height='56.25vw'

					/>
      	</div>
			}
			<div className='w-10/12 lg:w-8/12 mx-auto'>
				{
					data ?
						<div className='flex justify-center flex-col items-center relative'>
							<div className=' text-lg lg:text-3xl font-normal mt-10 lg:mt-20 mb-6'>{data.title}</div>

							{data.article_text &&
								<div className='text-base my-10 leading-normal lg:my-20 lg:leading-8' data-aos="fade-up" data-aos-duration="1500">
									{data.article_text}
								</div>
							}

							{data.article_images&& 
								<div className=' flex flex-wrap gap-y-10 justify-between'>
									{data.article_images.map((item,index)=>{
										return(
											<div className='' data-aos="fade-up" data-aos-duration="1500">
												<img src={'https://storage.googleapis.com/web-moonshine-2022.appspot.com/img_article/'+item} alt="" className='max-w-full'/>
											</div>
										)
									})}
								</div>
							}
							{
								data.intro &&
								<div className=' whitespace-pre-line text-base mt-20 leading-8 w-full' data-aos="fade-up" data-aos-duration="1500">
										<div className='text-lg font-bold'>{data.title}</div>
										{data.intro}
								</div>
							}

						</div>

					: <div>Loading..</div>
				}
			</div>
		</section>
  )
}

export default WatchArticle



