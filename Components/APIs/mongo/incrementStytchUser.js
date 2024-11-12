


export const incrementStytchUser = async() => {

  try {

    const incrementReq = await fetch("https://reelvault.vercel.app/incrementStytchUser", {
        method : "POST",
        credentials : "include"
      })

      return incrementReq.status

  } catch (err) {
    console.log(err.message)
  }

}
