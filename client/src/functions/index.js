export const signUp=(user)=>{
return fetch("http://localhost:8080/signup",{
    method:"POST",
    headers:{
      Accept:"application/json",
      "Content-Type":"application/json"
    },
    body:JSON.stringify(user)
  })
  .then(response=>{
    return response.json()
  })
  .catch(err=>{
    console.log('error',err);
  })
}

export const signin=(user)=>{
return fetch("http://localhost:8080/signin",{
    method:"POST",
    headers:{
      Accept:"application/json",
      "Content-Type":"application/json"
    },
    body:JSON.stringify(user)
  })
  .then(response=>{
    return response.json()
  })
  .catch(err=>{
    console.log('error',err);
  })
}

export const authenticate=(jwt,next)=>{
  if(typeof window !== "undefined"){
    localStorage.setItem("j",JSON.stringify(jwt))
    next()
  }
}


export const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false
    }
    if (localStorage.getItem("j")) {
        return JSON.parse(localStorage.getItem("j"));
    } else {
        return false;
    }
}

export const readUser = (userId,token)=>{
  console.log('reading user');
  console.log(userId, token);
  var authToken =`Bearer ${token}`;
  console.log('Bearer token',authToken)
  return fetch(`http://127.0.0.1:8080/user/${userId}`,{
      method:"GET",
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json",
        Authorization:authToken
      }
    })
    .then(response=>{
      console.log('found user',response);
      return response.json()
    }).catch(err=>{console.log(err);})
}

export const getUsrList=()=>{
  return fetch(`http://127.0.0.1:8080/users`,{
      method:"GET",
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json",
        Authorization:`Bearer ${isAuthenticated().token}`
      }
    })
    .then(response=>{
      return response.json()
    }).catch(err=>{console.log(err);})
}

export const updateUser=(user,userId)=>{
  console.log('updating user data');
  return fetch(`http://127.0.0.1:8080/user/${userId}`,{
    method:"PUT",
    headers:{
      Accept:"application/json",
      "Contente-Type":"application/json",
      Authorization:`Bearer ${isAuthenticated().token}`
    },
      body:JSON.stringify(user)
  })
  .then(response=>{
    return response.json()
  }).catch(err=>{
    console.log(err);
  })
}

export const uploadDp=(image,userId)=>{
  console.log('uploading user profile picture');
  console.log(image);
  return fetch(`http://127.0.0.1:8080/uploaddp/${userId}`,{
    method:"POST",
    headers:{
      Accept:"application/json",
      "Content-Type": "application/json",
      Authorization:`Bearer ${isAuthenticated().token}`
    },
    body:image
  }).then(response=>{
    return response.json()
  }).catch(err=>{
    console.log(err);
  })
}

export const fileUploader=(image,userId,type)=>{
  console.log(image);
  const fd = new FormData();
  fd.append('image',image,image.name);
  return  fetch(`http://127.0.0.1:8080/uploaddp/${userId}`,{
          method:"POST",
          headers:{
            Accept:"application/json",
            Authorization:`Bearer ${isAuthenticated().token}`
          },
          body:fd
        }).then(response=>{
          return response.json()
        }).catch(err=>{
          console.log(err);
        })
}


export const follow=(userId,token,followId)=>{
  var body={
    userId:userId,followId:followId
  }
  let jsonbody = JSON.stringify(body);
  console.log('body',jsonbody);
  return fetch(`http://127.0.0.1:8080/user/follow`,{
    method:"POST",
    headers:{
      Accept:"application/json",
      "Content-type": "application/json",
      Authorization :`Bearer ${token}`
    },
    body:jsonbody
  })
  .then(response=>{
    return response.json();
  })
  .catch(err=>{
    console.log(err)
  })
}

export const unfollow=(userId,token,unfollowId)=>{
  var body={
    userId:userId,unfollowId:unfollowId
  }
  let jsonbody = JSON.stringify(body);
  console.log('body',jsonbody);
  return fetch(`http://127.0.0.1:8080/user/unfollow`,{
    method:"POST",
    headers:{
      Accept:"application/json",
      "Content-type": "application/json",
      Authorization :`Bearer ${token}`
    },
    body:jsonbody
  })
  .then(response=>{
    return response.json();
  })
  .catch(err=>{
    console.log(err)
  })
}
