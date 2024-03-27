import { isLogin } from "../functions/funcs.js";


const getuserInfo = async () =>{
  const id = isLogin()
    if(id){
        
        
        await fetch("https://uqkfskiduursccnhissi.supabase.co/rest/v1/users?select=*",{
            headers:{
                apikey:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxa2Zza2lkdXVyc2Njbmhpc3NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0NzU2MTksImV4cCI6MjAyNTA1MTYxOX0.BL4OkMrGMlJwg9hWusC6qHC5ztwsF1vzzyB802FSHUw" 
            }
        }).then(res => res.json())
        .then(data => {
            const user = data.find(item =>{
               
                 if(item.userID == id){
                   
                   window.location.href = "../index.html"
                   
                 }
                
                 
                 
                })
             return user;   
        })
    }
   
    return false
    
}

export {getuserInfo}