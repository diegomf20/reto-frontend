class cardPais extends HTMLElement{
    constructor(){
        super();
        this.nombre_pais;
        this.capital;
        this.bandera_pais;
        this.timezones;
        this.fifa;
        this.poblacion=0;
        this.area=0;
    }

    static get observedAttributes(){
        return ['nombre_pais','capital','bandera_pais','fifa','poblacion','area','timezones']
    }
    attributeChangedCallback(attrib,oldV,newV){
                    
        switch (attrib) {
            case 'fifa':                
                this.fifa=newV;
                break;
            case 'nombre_pais':                
                this.nombre_pais=newV;
                break;
            case 'capital':   
                this.capital=newV;
                break;
            case 'timezones':   
                this.timezones=newV;
                break;
            case 'bandera_pais':   
                this.bandera_pais=newV;
                break;
            case 'poblacion':   
                this.poblacion=(newV/1000000).toFixed(2);
                break;
            case 'area':   
                this.area=(newV/1000000).toFixed(2);
                break;
            default:
                break;
        }
        this.innerHTML=`
        <div class="card">
                <div class="card-img">
                    <div class="iniciales">
                        ${this.fifa}
                    </div>
                    <img src="${this.bandera_pais}">
                </div>
                <div class="card-info">
                    <h2 class="text-center">${this.nombre_pais}</h2>
                    <h5 class="text-center">${this.capital}</h5>
                </div>
                <div class="card-fotter">
                    <div>
                        <h5>${this.poblacion} M</h5>
                        <h4>Población</h4>
                    </div>
                    <div>
                        <h5>${this.area} M</h5>
                        <h4>km²</h4>
                    </div>
                    <div>
                        <h5>${this.timezones}</h5>
                    </div>
                </div>
            </div>
        `;
    }
}
window.customElements.define("card-pais",cardPais);
class mainContent extends HTMLElement{
    constructor(){
        super();
        this.paises=[];
        fetch('https://restcountries.com/v3.1/lang/spa')
        .then(response => response.json())
        .then(
            (params) =>{
                this.paises=params.slice(3, 15);
                this.connectedCallback(); 
            }
        );

    }

    static get observedAttributes(){
        return []
    }

    connectedCallback(){   
        var contentComponents="";
        for (let i = 0; i < this.paises.length; i++) {
            const pais = this.paises[i];
            contentComponents+=`
                <card-pais 
                    fifa="${pais.fifa}" 
                    poblacion="${pais.population}" 
                    capital="${pais.capital}" 
                    timezones="${pais.timezones[0]}" 
                    area="${pais.area}" 
                    nombre_pais="${pais.name.common}" 
                    bandera_pais="${pais.flags.png}">
                </card-pais>`;
        }
        this.innerHTML=`
            <div class="container">
                <div class="main-content">
                    ${contentComponents}
                </div>
            </div>
        `;
    
    }
}
window.customElements.define("main-content",mainContent);