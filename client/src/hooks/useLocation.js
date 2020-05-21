import {useEffect,useState} from  'react';

const option = {
  enableHighAccuracy:true,
  timeout:10000,
  maximumAge:0
}

export default function useLocation(){
  const [location,setLocation]=useState(null);
  const [requestedLocation,setrequestedLocation]=useState(false);
  useEffect(()=>{
          console.log('getting location');
      setrequestedLocation(true);
      const success =({
        coords:{
          latitude,
          longitude
        }
      })=>{
        setLocation({
          latitude,
          longitude
        });
      };

      const error =(error)=>{
        fetch('https://ipapi.co/json')
        .then(res=>res.json())
        .then(location=>{
          setLocation({
            latitude:location.latitude,
            longitude:location.longitude
          })
        });
      };
        navigator.geolocation.getCurrentPosition(success,error,option);
  },[]);

  return location;
}
