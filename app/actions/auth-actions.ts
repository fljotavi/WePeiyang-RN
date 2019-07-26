export const passTokenToStore = (token) => {
  console.log(`passing token to store`, token)
  return {
    type: "SET_TOKEN",
    payload: token
  }
}
export const deleteTokenFromStore = () => {
  return {
    type: "SET_TOKEN",
    payload: null
  }
}
