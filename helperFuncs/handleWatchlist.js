


export async function handleWatchlist(entityId,userId,entityData,isInWatchlist) {

  let entityType = entityData.title ? "movie" : "show"
      
  if(isInWatchlist) {

    try {

      const deleteEntityRequest = await fetch(`http://localhost:3200/deleteUserWatchlist?entityId=${entityId}&userId=${userId}`,
        { method: "DELETE" }
      );


       if(deleteEntityRequest.ok) {

        const updatedWatchList = await deleteEntityRequest.json()
        
        localStorage.setItem("userWatchlist", JSON.stringify(updatedWatchList));
      
        return updatedWatchList
      }
    
    } catch (err) {
      console.log(err.message)
      return null
    }

  } else {

    let entityObject = {
      entityId: entityId,
      entityName: entityType === "movie" ? entityData.title : entityData.name,
      entityReleaseDate: entityType === "movie" ? entityData.release_date : entityData.first_air_date,
      entityPosterUrl: entityData.poster_path,
      entityType: entityType === "movie" ? "Movie" : "Show",
      entityDescription: entityData.overview
    }

    try {

      const addEntityRequest = await fetch(`https://reelvault-server.vercel.app/addUserWatchlist`, {
        method: "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({entityObject : entityObject, userId: userId})
      })

      if(addEntityRequest.ok) {

        const updatedWatchlist = await addEntityRequest.json()

        localStorage.setItem("userWatchlist", JSON.stringify(updatedWatchlist));

        return updatedWatchlist
      }
      
    } catch(err) {
      console.log(err.message)
      return null
    } 
  }
}