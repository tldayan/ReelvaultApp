export const sessionExpiryCheck = async(stytchClient,prevSessionToken,expiryTimeStr) => {

  const expiryTime = new Date(expiryTimeStr);
  const currentTime = new Date();
  const timeDifference = expiryTime.getTime() - currentTime.getTime();
  const millisecondsIn30Days = 300000 /* 30 * 24 * 60 * 60 * 1000; */
  const isWithin30Days = timeDifference <= millisecondsIn30Days;

  if(isWithin30Days) {
    try {
      const refreshTokenReq = await stytchClient.session.authenticate({
      session_token: prevSessionToken,
      session_duration_minutes: 60}) 

      return refreshTokenReq.status_code;

      } catch (err) {
      console.log(err.message)
    }
  }
};

