const baseURL="https://mindicador.cl/api/"
const migrafico = document.querySelector("#migrafico");
const resultado=document.querySelector('.resultado')
const input=document.querySelector('#input')
let canvas;
const selector=document.querySelector('#selector')
const btn=document.querySelector('#btn')
const getCurrency = async(currency)=>{
    try{
        const res=await fetch(`https://mindicador.cl/api/${currency}`)
        const data=await res.json();
        console.log(data)
        return data;
    } catch (e){
        alert(e.message);
   
    }
}
const convertor = async(currency)=>{
    const datos = await getCurrency(currency);
    const currencyValue=datos.serie[0].valor;
    const convertor=input.value/currencyValue;
    resultado.innerHTML=convertor.toFixed(4);
   
}
const configGrafica = (currencies)=>{
    if (canvas) canvas.destroy();
    const type= 'line';
    const title= 'Currency';
    const bgColor='white'
    const dias= currencies.serie.slice(0,10);
    const dates=dias.map((x)=>{
        const date=new Date(x.fecha);
        return date.toLocaleDateString();
    });
    const value=dias.map((x)=>+x.valor);
    const config={
        type: type,
        data:{
            labels:dates,
            datasets:[
                {
                    label:title,
                    backgroundColor: bgColor,
                    data: value,
                },
            ],
        },
    }
 return config
}
const creargrafico=async(valores)=>{
    const currencies=await getCurrency(valores);
    const datos = configGrafica(currencies);
    canvas= new Chart(migrafico,datos);
};
btn.addEventListener('click', async()=>{
    await convertor(selector.value);
    await creargrafico(selector.value);
});



