import axios from "axios"

const baseURL = "http://seafood.fbcs.nl/api/"

/**
 * @param {Object} options axios
 * @param {String} withBearer either noBearer, withBearer or andRefresh
 * @param {Function} onErrorRefresh function that is executed if the token refresh failed. By default the user will be redirected to the login page
 */
const XHR = ({ method, url, data, params, headers }, withBearer = "andRefresh", onErrorRefresh = () => window.location.replace("/login")) => 
  new Promise((resolve, reject) => {
  if (!withBearer) withBearer = "andRefresh"

  let XHRconfig = {
    method,
    baseURL,
    url,
    data,
    params
  }

  if (withBearer !== "noBearer") XHRconfig.headers = Object.assign({ Authorization: "Bearer " + localStorage.getItem("token") }, headers);

  return axios(XHRconfig)
  .then(res => resolve(res))
  .catch(err => {
    if (err.response?.status === 401 && withBearer === "andRefresh") // do not refresh the token when we don't want to, this can create a infinite loop on the login page
      return doRefreshToken(err)
      .then(token => {
        XHRconfig.headers.Authorization = "Bearer " + token
        return axios(XHRconfig)
        .then(res => resolve(res))
        .catch(err => reject(err))
      })
      .catch(err => onErrorRefresh(err))

    return reject(err)
  })
})

const doRefreshToken = err => new Promise((resolve, reject) => {
  if (err.response?.data?.error === "jwt expired") {
    const refreshToken = localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken')

    if (!refreshToken) {
      return reject()
    } else {
      const XHRconfig = {
        method: "GET",
        url: baseURL + "user/refreshtoken.php",
        headers: { Authorization: "Bearer " + refreshToken }
      }

      axios(XHRconfig)
      .then(response => {
        localStorage.setItem('token', response.data.token)
        return resolve(response.data.token)
      })
      .catch(newErr => {
        console.error("could not refresh token", newErr)
        localStorage.removeItem('logo')
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        sessionStorage.removeItem('refreshToken')
        return reject(err)
      })
    }
  } else if (err.isAxiosError) {
    console.error("not axios error", err)
    localStorage.removeItem('logo')
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    sessionStorage.removeItem('refreshToken')
    return reject(err)
  }
})

export default XHR