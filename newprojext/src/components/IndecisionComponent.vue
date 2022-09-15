<template>
<div v-if="!apiRestError">
    <h1>{{title}}</h1>
    <img v-if="image" :src="image" alt="Img">
    <p>¿Tienes dudas acerca de tu vida? Pues qué mejor manera que saberlo a través de memes. Adelante, haz tu pregunta y a ver que te depara el futuro.</p>
  <div class="bg-dark">

  </div>

    <div class="indecision-container">
        
        <input v-model="question" placeholder="¡Preguntame algo!" type="text" name="ask" id="ask">
        <p>Recuerda terminar con un signo de interrogación (?)</p>

        <div v-if="isValid" class="background-answer">
            <h2>{{question}}</h2>
            <h1 id="clases">{{returnAnswer}}</h1>
        </div>
    </div>
    </div>

    <div v-if="apiRestError">
        <h2>ERROR :(</h2>
        <p>Ha ocurrido un error al conectar con el servidor, recargue la página.</p>
        
        
    </div>

    
</template>

<script>
export default {
data(){
    return{
        question:"",
        answer:null,
        image:null,
        isValid:false,
        apiRestError:false,
        
        
    }
},watch:{
    question(value){

        this.isValid=false;
        
        console.log({value})

        if(value.includes('?')){
            this.peticion();
            this.isValid=true;
        }
    }
},methods:{
    async peticion(){
            
        this.answer="pensando";
        
        try {
            this.apiRestError=false;
            const data1 = await fetch('https://yesno.wtf/api');
            const {answer, image} = await data1.json();
            
            this.answer=answer;
            this.image= image
           

        } catch (error) {

            this.apiRestError=true;
            this.answer="Error Api"
            
           
        }
    }
},computed:{
    returnAnswer(){
        if(this.answer=="yes"){
            return "Claro que sí."
        }else if(this.answer == "no"){
            return "Me da que no."
        }else if(this.answer == "maybe"){
            return "Puede que sí O puede que no..."
        }else{
            return;
        }
    },titulo(){
        return this.title || "Error de Titulo"
    }
},props:{
    title:String
}
}
</script>

<style>
img, .bg-dark {
        height: 100vh;
        left: 0px;
        max-height: 100%;
        max-width: 100%;
        position: fixed;
        top: 0px;
        width: 100vw;
    }

    

    .indecision-container {
        position: relative;
        z-index: 99;
    }
    
    input {
        width: 250px;
        padding: 10px 15px;
        border-radius: 5px;
        border: none;
    }
    input:focus {
        outline: none;
    }

    p {
        color: rgb(255, 255, 255);
        font-size: 20px;
        margin-top: 0px;
    }

    h1, h2 {
        color: rgb(255, 255, 255);
    }
    
    h2 {
        margin-top: 150px;
    }
    

</style>