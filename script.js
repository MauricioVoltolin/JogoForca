const palavras = ["javascript","bootstrap","java","python","delphi"]
let tentativasUsadas = 0

let botoes = document.getElementById('botoes')
let letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
let palavraSecreta, palavraOculta
let jogando

iniciarJogo()

function iniciarJogo() {
    botoes.innerHTML = ''
    letras.forEach((value, index) => {
        botoes.innerHTML += `<button id='btn-${value}' class='btn btn-dark me-1 mb-1' onclick='checarLetra("${value}")'>${value}</button>`
    })
    
    jogando = true
    tentativasUsadas = 0
    palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)]
    
    palavraOculta = ''
    for (let i = 0; i < palavraSecreta.length; i++) {
        palavraOculta += '_ '
    }
    document.querySelector('h2').innerHTML = palavraOculta
    desenharForca(tentativasUsadas)
    
    document.getElementById('btnReiniciar').classList.add('d-none')
}

function checarLetra(letra) {
    if (!jogando) return
    let btn = document.getElementById('btn-' + letra)
    let achou = false
    for (let i = 0; i < palavraSecreta.length; i++) {
        if (palavraSecreta[i].toLowerCase() == letra.toLowerCase()) {
            achou = true
            palavraOculta = trocaLetra(palavraOculta, letra, i)
        } 
    }
    document.querySelector('h2').innerHTML = palavraOculta

    btn.classList.remove('btn-dark')
    btn.classList.add(achou ? 'btn-primary' : 'btn-danger')
    if (!achou) {
        tentativasUsadas++
        desenharForca(tentativasUsadas)
    }

    checarJogo()
}

function checarJogo() {
    if (tentativasUsadas == 6) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Você perdeu!!!!!'
        })
        jogando = false
        document.getElementById('btnReiniciar').classList.remove('d-none')
    }

    let listaTexto = palavraOculta.split(' ')
    let novaPalavra = listaTexto.join('')
    
    if (palavraSecreta.toLowerCase() == novaPalavra.toLowerCase()) {
        Swal.fire({
            icon: 'success',
            title: 'Aeeeeee',
            text: 'Você ganhou!!!!!'
        })
        jogando = false
        document.getElementById('btnReiniciar').classList.remove('d-none')
    }
}

function trocaLetra(textoOriginal, letra, posicao) {
    let listaTexto = textoOriginal.split(" ")
    listaTexto[posicao] = letra
    let novoTexto = listaTexto.join(" ")
    return novoTexto
}

function desenharForca(tentativasUsadas) {
    const canvas = document.getElementById("canvas")
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.lineWidth = 6   //aumentar a espessura da linha
    ctx.beginPath()
    ctx.strokeStyle = '#006700'
    ctx.moveTo(20, canvas.height - 10)
    ctx.lineTo(180, canvas.height - 10)
    ctx.stroke()
    ctx.beginPath()
    ctx.strokeStyle = '#4e2708'
    ctx.moveTo(60, canvas.height - 10)
    ctx.lineTo(60, 20)
    ctx.stroke()
    ctx.beginPath()
    ctx.strokeStyle = '#4e2708'
    ctx.moveTo(57, 20)
    ctx.lineTo(120, 20)
    ctx.stroke()
    ctx.beginPath()
    ctx.strokeStyle = '#555555'
    ctx.moveTo(117, 18)
    ctx.lineTo(117, 50)
    ctx.stroke()
    ctx.beginPath()
    ctx.strokeStyle = '#4e2708'
    ctx.moveTo(80, 20)
    ctx.lineTo(60, 40)
    ctx.stroke()
    if (tentativasUsadas >= 1) {
        ctx.strokeStyle = '#000'
        ctx.lineWidth = 4
        ctx.beginPath()
        ctx.arc(117, 65, 15, 0, Math.PI * 2)
        ctx.stroke()       
    }
    if (tentativasUsadas >= 2) {
        ctx.beginPath()
        ctx.moveTo(117, 80)
        ctx.lineTo(117, 140)
        ctx.stroke()
    }
    if (tentativasUsadas >= 3) {
        ctx.beginPath()
        ctx.moveTo(117, 90)
        ctx.lineTo(137, 120)
        ctx.stroke()
    }
    if (tentativasUsadas >= 4) {
        ctx.beginPath()
        ctx.moveTo(117, 90)
        ctx.lineTo(97, 120)
        ctx.stroke()
    }
    if (tentativasUsadas >= 5) {
        ctx.beginPath()
        ctx.moveTo(117, 138)
        ctx.lineTo(97, 170)
        ctx.stroke()
    }
    if (tentativasUsadas >= 6) {
        ctx.beginPath()
        ctx.moveTo(117, 138)
        ctx.lineTo(137, 170)
        ctx.stroke()
    }
}