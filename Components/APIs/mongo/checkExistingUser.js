
export const checkExistingUser = async(userId) => {

  try {

    const isUserExistingReq = await fetch(`http://localhost:3200/getIsUserExisting?userId=${userId}`, {
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