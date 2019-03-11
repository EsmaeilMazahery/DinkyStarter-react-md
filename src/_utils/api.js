class RequestError {
  constructor(status, message) {
    this.status = status
    this.message = message
  }
}

export const headers = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`
})

export const makePostOptions = data => ({
  method: 'POST',
  mode: 'cors',
  headers: headers(),
  body: JSON.stringify(data)
})

export const makeUploadOptions = data => ({
  method: 'POST',
  mode: 'cors',
  headers: ({
    //'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }),
  body: data
})

const buildGetUrlWithParams = (url, parameters) => {
  let qs = "";
  for (const key in parameters) {
    if (parameters.hasOwnProperty(key)) {
      const value = parameters[key];
      qs +=
        encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
    }
  }
  if (qs.length > 0) {
    qs = qs.substring(0, qs.length - 1); //chop off last "&"
    url = url + "?" + qs;
  }

  return url;
}


export const makePatchOptions = data => ({
  ...makePostOptions(data),
  method: 'PATCH'
})

export const makePutOptions = data => ({
  ...makePostOptions(data),
  method: 'Put'
})

export const getOptions = () => ({
  method: 'GET',
  headers: headers()
})

export const makeGetOptions = () => ({
  method: 'GET',
  headers: headers(),

})

export const deleteOptions = () => ({
  method: 'DELETE',
  mode: 'cors',
  headers: headers()
})

const request = (url, options) =>
  fetch(url, options).then(response => {
    const {
      status
    } = response

    if (status === 204) return {}
    const json = response.json()
    if (status >= 200 && status < 400) return json
    return json.then(message => {
      throw new RequestError(status, message)
    })
  })




export const plainGet = url =>
  request(url, {
    method: 'GET',
    header: {
      'Content-Type': 'application/json'
    }
  })
export const plainPost = (url, data) =>
  request(url, {
    method: 'POST',
    body: JSON.stringify(data)
  })

export const get = (url, params) => request(buildGetUrlWithParams(url, params), getOptions())
export const post = (url, data) => request(url, makePostOptions(data))
export const patch = (url, data) => request(url, makePatchOptions(data))
export const put = (url, data) => request(url, makePutOptions(data))
export const del = (url, id) => request(url + id, deleteOptions())
export const upload = (url, data) => request(url, makeUploadOptions(data))