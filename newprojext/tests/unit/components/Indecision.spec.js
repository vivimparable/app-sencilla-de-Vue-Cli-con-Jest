import { shallowMount } from "@vue/test-utils";
import Indecision from '@/components/IndecisionComponent.vue'
import { text } from "@fortawesome/fontawesome-svg-core";

describe('Componente Indecision.vue',()=>{

    let wrapper;
    let clgSpy;

beforeEach(()=>{
    wrapper= shallowMount(Indecision);
    clgSpy = jest.spyOn(console,'log');
    //jest.clearAllMocks()


    global.fetch = jest.fn(()=> Promise.resolve({
        json:()=>Promise.resolve({
                answer:'yes',
                forced:false,
                image:'https://yesno.wtf/assets/yes/2.gif'
            })
        
    }));



})

    test('Snapshot',()=>{
        expect(wrapper.html()).toMatchSnapshot();
    })


    test('Verificar H1',()=>{

        const wrapper = shallowMount(Indecision,{
            props:{
                title:"¡Welcome to the indecision game!"
            }
        })

        const dato1 = wrapper.find('h1').text();
       
            expect(dato1).toBe(wrapper.props().title)
    })  

    test('Input a la hora de dispar no suceda nada',async()=>{
        
        const getAnswerSpy = jest.spyOn( wrapper.vm,'peticion' )

        const input1 = wrapper.find('input');
        
        await input1.setValue('Hola Mundo');

            expect(clgSpy).toHaveBeenCalled();
            expect(getAnswerSpy).toHaveBeenCalledTimes(0);

        
    })

    test('Debe llamar el getAnswer',async ()=>{

        const getAnswer = jest.spyOn(wrapper.vm, 'peticion');

        const inputes = wrapper.find('input');

        await inputes.setValue('?')
            expect(getAnswer).toBeCalledTimes(1)
        
    })

    test('Pruebas en getAnswer',async()=>{


        await  wrapper.vm.peticion();
        const img = wrapper.find('img');
            expect(img).toBeTruthy();
            expect(wrapper.vm.answer).toBe('yes'); 
        
    })

    test('Prueba getanswer ---Fallo API',async()=>{

        fetch.mockImplementationOnce(()=>Promise.reject('DOWN API'))


        await wrapper.vm.peticion();
        
            expect(wrapper.vm.answer).toBe('Error Api')
            expect(wrapper.vm.img).toBeFalsy();

        //Mensaje de error
        const errorMsg= wrapper.find('h2').text();
            expect(errorMsg).toBe('ERROR :(')

    })


})