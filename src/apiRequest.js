 const apiRequest=async (url='', optionsObj=null, errMsg=null)=>{
    try{
        const response=await fetch(url,optionsObj)//optionsObj post ah get ah
        //usestate la irrukara data uh server la irrukara data uh sync aaganum adhuku dha optionsObj
        if(!response.ok) throw("Please reload")
    }catch(err){
        errMsg=err.Message;
    }finally{
        return errMsg
    }
}
export default apiRequest

//to create fake api server
//npx json-server -p 3500 -w data/db.json