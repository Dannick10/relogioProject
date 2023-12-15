const horas = [...document.querySelectorAll('.horas')]
const minutos = [...document.querySelectorAll('.minutos')]
const segundos = [...document.querySelectorAll('.segundos')]
const input_relogio = document.querySelector('#input_relogio')
const body = document.querySelector('body')
const msg = document.querySelector('.msg')
const modal = document.querySelector('.modal')
const btn_ok = document.querySelector('#btn_ok')
const btn_cancel = document.querySelector('#btn_cancel')
const btn_parar = document.querySelector('#btn_parar')
const btn_definir = document.querySelector('#btn_definir')
const alarme_audio = new Audio('alarm-clock-short-6402.mp3')

alarme_audio.loop = -1

const cor_div = [...document.querySelectorAll('.cor')]

let h_atual
let alarme 
let alarme_tocando
let alarme_ativado

msg.style.translate = '0 -15px'

const date =()=>{
    const date = new Date()

    let hour = date.getHours()<10?'0'+date.getHours():date.getHours()
    let min = date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()
    let sec = date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds()
    
    horas.map((el)=>{
        el.innerHTML = hour   
    })
    
    minutos.map((el)=>{
        el.innerHTML = min   
    })
    
    segundos.map((el)=>{
        el.innerHTML = sec
    })
    
    if(sec == 0){
        setcor()
    }

    if(date.getTime() >= alarme){
        if(alarme_ativado && !alarme_tocando){
            alarme_tocando = true
            alarme_audio.play()
            btn_parar.style.display = 'block'
             
        }
    } 

}

function hexcor(){
    const chars = '0123456789abcdef;'
    const corTamanho = 6;
    let cor = '';

    for(var i = 0; i <corTamanho; i++){
        let corAleatoria = Math.floor(Math.random() * chars.length)
        cor+= chars.substring(corAleatoria,corAleatoria+1)
    }
    return '#'+cor
}

function setcor(){
    let novaCor = hexcor()
    cor_div.map((el)=>{
        el.style.background = novaCor
        el.style.transition = '1s'
    })
}

btn_ok.addEventListener('click',()=>{

    h_atual = Date.now()
    alarme = h_atual + (input_relogio.value * 1000)
    alarme_ativado = true 
    const d_alarme = new Date(alarme)
    msg.innerHTML = `Alarme: ${d_alarme.getHours()<10?'0'+d_alarme.getHours():d_alarme.getHours()}:${d_alarme.getMinutes()<10?'0'+d_alarme.getMinutes():d_alarme.getMinutes()}:${d_alarme.getSeconds()<10?'0'+d_alarme.getSeconds():d_alarme.getSeconds()}`
    msg.style.translate = '0'
})

btn_parar.addEventListener('click',(evt)=>{
    alarme_ativado = false
    alarme_tocando = false 
    input_relogio.value = ''
    msg.style.translate = '0 -15px'
    alarme_audio.pause()
    alarme_audio.currentTime = 0
   evt.target.style.display = 'none'
})

btn_definir.addEventListener('click',()=>{
    modal.classList.toggle('status')
    
})

btn_cancel.addEventListener('click',()=>{
    modal.classList.toggle('status')
   
})



setInterval(date,1000)