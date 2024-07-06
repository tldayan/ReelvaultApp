

export const deleteUserShowDetails = (userId,showId) => {

  try {

    const deleteUserShowDetailsReq = fetch("https://reelvault-server.vercel.app/deleteUserShowDetails", {
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({userId : userId, showId : showId}),
      method : "DELETE",
      credentials : "include"
    })

    return deleteUserShowDetailsReq.status

  } catch (err) {
      console.log(err.message)
  }
}