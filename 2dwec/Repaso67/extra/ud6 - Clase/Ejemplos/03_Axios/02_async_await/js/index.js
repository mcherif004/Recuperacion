async function miPeticion(){
    try{
        let response = await axios.get('https://jsonplaceholder.typicode.com/users');
        let json = await response.data;
        json.forEach(element => {
            console.log(element.name);
        }); 
    }catch(error){
        console.log(error);
    }finally{
        console.log('--Me ves Siempre--');
    }
}
miPeticion();