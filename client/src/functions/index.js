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
  return fetch(`http://127.0.0.1:8080/user/${userId}`,{
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
