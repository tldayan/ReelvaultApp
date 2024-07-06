
export const checkExistingUser = async(userId) => {

  try {

    const isUserExistingReq = await fetch(`https://reelvault-server.vercel.app/getIsUserExisting?userId=${userId}`, {
      method : "GET",
      headers : {
        "Content-Type" : "application/json"
      },
      credentials : "include"
    }) 

    const response = await isUserExistingReq.json()
    return response.message

  } catch(err) {
    console.log(err.message)
  }


}