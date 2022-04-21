import FTC from "./fetch.js";

export default class UI {

    //PRINCIPAL VIEW
    async mainPage() {
        //CATCH DATA FROM DATA BASE
        let data = await new FTC().catchMainData()
        this.insertData(data)
        this.showCharacterData()
        this.findCharacter()
        this.pagination()
    }


    //look for the character 
    findCharacter() {
        document.getElementById("submit-search")
            .addEventListener("submit", async (e) => {
                try {
                    e.preventDefault()
                    let name = document.getElementById("input-search").value
                    let data = await new FTC().findCharacter(name)

                    this.replaceContent()
                    this.insertData(data)
                    this.showCharacterData()
                    this.paginationReplaceContent()
                    this.paginationFindCharacter(data, name)
                } catch (e) {
                    console.log(e)
                }

            })
    }

    //pagination of the character found
    paginationFindCharacter(data, name) {
        const CONTAINERPAGINATION = document.getElementById("pagination_botons")
        this.paginationReplaceBotons()
        CONTAINERPAGINATION.innerHTML += `
        <ul class="pagination">
          <li id="prev2" class="page-item direction"><a class="page-link" href="#">Previous</a></li>          
          <li id="next2" class="page-item direction"><a class="page-link" href="#">Next</a></li>
        </ul>
        `

        const CONTAINERNUMBER = document.getElementById("pagination-number");
        const NEXT2 = document.getElementById("next2")
        const PREV2 = document.getElementById("prev2")

        let a = 1;
        let pages = data.info.pages;

        CONTAINERNUMBER.innerHTML += `<p class="text-center text-pagination">${a} - ${pages}</p>`

        //NEXT PAGE
        NEXT2.addEventListener("click", async () => {
            a++;
            if (a > pages) {
                a--
                let data = await new FTC().paginationFindCharacter(a, name)
                this.replaceContent()
                this.insertData(data)
                this.showCharacterData()
                this.paginationReplaceContent()
                CONTAINERNUMBER.innerHTML += `
                <p class="text-center text-pagination">${a} - ${pages}</p>
                `
            }else{                
                let data = await new FTC().paginationFindCharacter(a, name)
                this.replaceContent()
                this.insertData(data)
                this.showCharacterData()
                this.paginationReplaceContent()
                CONTAINERNUMBER.innerHTML += `
                <p class="text-center text-pagination">${a} - ${pages}</p>
                `
            }

        })

        //PREV PAGE
        PREV2.addEventListener("click", async () => {
            a--
            if (a < 1) {
                a++
                let data = await new FTC().paginationFindCharacter(a, name)
                this.replaceContent()
                this.insertData(data)
                this.showCharacterData()
                this.paginationReplaceContent()
                CONTAINERNUMBER.innerHTML += `
                    <p class="text-center text-pagination">${a} - ${pages}</p>
                    `
            } else {
                let data = await new FTC().paginationFindCharacter(a,name)
                let pages = data.info.pages;
                this.replaceContent()
                this.insertData(data)
                this.showCharacterData()
                this.paginationReplaceContent()
                CONTAINERNUMBER.innerHTML += `
                        <p class="text-center text-pagination">${a} - ${pages}</p>`
            }
        })



    }

    //main pagination
    pagination() {
        let prev = document.getElementById("previous")
        let next = document.getElementById("next")
        const CONTAINER = document.getElementById("pagination-number");
        let a = 1;

        //NEXT PAGE
        next.addEventListener("click", async () => {

            a++
            let data = await new FTC().pagination(a)
            let pages = data.info.pages;
            this.replaceContent()
            this.insertData(data)
            this.showCharacterData()
            this.paginationReplaceContent()
            CONTAINER.innerHTML += `
                <p class="text-center text-pagination">${a} - ${pages}</p>
                `
        })

        //PREV PAGE
        prev.addEventListener("click", async () => {
            a--
            if (a < 1) {
                a++;
                let data = await new FTC().pagination(a)
                let pages = data.info.pages;
                this.replaceContent()
                this.insertData(data)
                this.showCharacterData()
                this.paginationReplaceContent()
                CONTAINER.innerHTML += `
                        <p class="text-center text-pagination">${a} - ${pages}</p>`
            } else {
                let data = await new FTC().pagination(a)
                let pages = data.info.pages;
                this.replaceContent()
                this.insertData(data)
                this.showCharacterData()
                this.paginationReplaceContent()
                CONTAINER.innerHTML += `
                        <p class="text-center text-pagination">${a} - ${pages}</p>`
            }
        })
    }

    //insert data at cards
    insertData(data) {
        const CONTAINER = document.getElementById("card-box")
        data.results.forEach(element => {
            CONTAINER.innerHTML += `
        <div class="col div_father">            
            <div class="character h-100" id="${element.id}">
                <img src="${element.image}"  class="card-img-top" alt="" >
                <h1 class="card-ti">${element.name}</h1> 
                <span class="info-text">
                <b>Gender:</b> ${element.gender} <br> 
                <b>Status:</b> ${element.status} <br>
                <b>Location:</b> ${element.location.name} <br>
                <b>Origin:</b> ${element.origin.name} <br>
                <b>Specie:</b> ${element.species} <br>
                <b>Episodes:</b> ${element.episode.length} 
                </span>               
            </div>  
        </div>
        `
        })

    }

    //show character data alert
    showCharacterData() {
        let charArray = document.getElementsByClassName("character")    

        /* for (let i = 0; i < charArray.length; i++) {
            charArray[i].addEventListener("click", async () => {

                let id = charArray[i].id;                
                let datos = await new FTC().catchCharacter(id)
                //active clicking
                alert(
                    `${datos.name}
                    ${datos.gender}
                    ${datos.status}
                    ${datos.location.name}
                    ${datos.origin.name}
                    ${datos.species}
                    ${datos.episode.length}`
                )
                
            })

        } */

    }

    //replace content of cards
    replaceContent() {
        const CONTAINER = document.getElementById("card-box")
        while (CONTAINER.hasChildNodes()) {
            CONTAINER.removeChild(CONTAINER.firstChild)
        }
    }
    //replace content of pagination number
    paginationReplaceContent() {
        const CONTAINER = document.getElementById("pagination-number")
        while (CONTAINER.hasChildNodes()) {
            CONTAINER.removeChild(CONTAINER.firstChild)
        }
    }
    //replace content of pagination botons
    paginationReplaceBotons() {
        const CONTAINER = document.getElementById("pagination_botons")
        while (CONTAINER.hasChildNodes()) {
            CONTAINER.removeChild(CONTAINER.firstChild)
        }
    }

}