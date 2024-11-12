


export const fetchWatchlist = async(userId) => {

  try {

    let userWatchlistFetch = await fetch(`https://reelvault-server.vercel.app/getUserWatchlist?userId=${userId}`,{
      method : "GET"
    })

    if (!userWatchlistFetch.ok) {
      throw new Error(`error: ${userWatchlistFetch.status}`);
    }

    let userWatchlist = await userWatchlistFetch.json()

    localStorage.setItem("userWatchlist", JSON.stringify(userWatchlist))

    return userWatchlist
    
  } catch(err) {
    console.log(err.message)
  }
}