

export const UpdateUserShowDetails = async(userDetails,userId) => {

    try {

        const userShowDetails = await fetch("https://reelvault-server.vercel.app/postUpdateUserShowDetails", {
                method : "POST",
                body : JSON.stringify({ showDetails : userDetails, userId : userId}),
                headers : {
                    "Content-Type" : "application/json"
                },
                credentials : "include"
            })

            
            return userShowDetails.status

    } catch (err) {

        console.log(err.message)

    }

    


}