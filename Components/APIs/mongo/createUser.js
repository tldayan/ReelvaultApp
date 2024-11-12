

export const createUser = async(username,userId) => {

  try {

      const userCreateReq = await fetch("https://reelvault.vercel.app/createUser", {
              method : "POST",
              body : JSON.stringify({username : username, userId : userId}),
              headers : {
                  "Content-Type" : "application/json"
              },
              credentials : "include"
          })
          
          return userCreateReq.status

  } catch (err) {
      console.log(err.message)
  }

}