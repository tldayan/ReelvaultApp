


export const incrementStytchUser = async() => {

  try {

    const incrementReq = await fetch("http://localhost:3200/incrementStytchUser", {
        method : "POST",
        credentials : "include"
      })

      return incrementReq.status

  } catch (err) {
    console.log(err.message)
  }

}
