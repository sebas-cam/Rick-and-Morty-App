
export default class FTC {
    
    //Principal view data
    async catchMainData() {
        try {
            let data = await fetch("https://rickandmortyapi.com/api/character/?page=1")
                            .then(response =>( response.json()))
                            .then(data =>(data))            
        return data 

        } catch (e) {
            console.log(e)
        }             
    }

    //show character data alert
    async catchCharacter(id){
        try {
            let data = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
                            .then(response =>( response.json()))
                            .then(data =>(data))            
        return data 

        } catch (e) {
            console.log("error")
        }                   
    }

    //look for the character at input of navbar
    async findCharacter(name){
        try {
            let data = await fetch(`https://rickandmortyapi.com/api/character/?name=${name}`)
                            
            if (data.status === 200) {
                let datas = data.json()
                return datas
                
            }else if(data.status === 404){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Personaje no encontrado'                          
                })
                return this.catchMainData()

            } else{
                console.log("error de status")
            }

        } catch (e) {
           console.log(e) 
        }
        
    }

    //main pagination
    async pagination(n){

        try {
            let data = await fetch(`https://rickandmortyapi.com/api/character/?page=${n}`)
                            .then(response =>( response.json()))
                            .then(data =>(data))
            return data  

        } catch (e) {
            console.log(e)
        }
    }

    //pagination of the character found
    async paginationFindCharacter(n,name){

        try {
            let data = await fetch(`https://rickandmortyapi.com/api/character/?page=${n}&name=${name}`)
                            .then(response =>( response.json()))
                            .then(data =>(data))
            return data  

        } catch (e) {
            console.log(e)
        }
    }

}
