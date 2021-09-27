export const fetchWork = async() =>{
  const requestOptions =  { 
    headers:{
      "Content-Type": "application/json",
      "Accept": "application/json",
      }
    }
  const response = await fetch('../data/data.json', requestOptions )
  const courseResp = await response.json()

  // setUserData(courseResp)
  console.log(courseResp);
  
}
