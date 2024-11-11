

export const getUserShowDetails = async(userId) => {

    const userShowDetailsResponse = await fetch(`http://localhost:3200/getUserShowDetails?userId=${userId}`, {
        method : "GET",
        credentials : "include"
    })
    
    if(userShowDetailsResponse.status === 200) {
    
        const data = await userShowDetailsResponse.json()

        return data.userShowsData

    } else if (userShowDetailsResponse.status === 404) {

        return userShowDetailsResponse.status

    } else {
        console.log(userShowDetailsResponse.status)
    }

}