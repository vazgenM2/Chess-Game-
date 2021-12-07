let table = document.querySelector('.chess-table');
let allB = document.querySelector('.allBlocks');
let a = document.querySelector('.ate')
let count = 0
let whiteFigures = ['img/t1-n.png', 'img/t1-d.png', 'img/t1-p.png', 'img/t1-t.png', 'img/t1-a.png', 'img/t1-p.png', 'img/t1-d.png', 'img/t1-n.png',
    'img/t1-z.png', 'img/t1-z.png', 'img/t1-z.png', 'img/t1-z.png', 'img/t1-z.png', 'img/t1-z.png', 'img/t1-z.png', 'img/t1-z.png']

let blackFigures = ['img/t2-z.png', 'img/t2-z.png', 'img/t2-z.png', 'img/t2-z.png', 'img/t2-z.png', 'img/t2-z.png', 'img/t2-z.png', 'img/t2-z.png',
    'img/t2-n.png', 'img/t2-d.png', 'img/t2-p.png', 'img/t2-a.png', 'img/t2-t.png', 'img/t2-p.png', 'img/t2-d.png', 'img/t2-n.png',
]
let x = 0;
let y = 0;
let color = 'rgb(200, 196, 40)'
let whoNext = true

let playBtn = document.querySelector('.play-btn')
let whoNextText = document.querySelector('.say-who-next')
let gameName = document.querySelector('.gameName')
let score1 = document.querySelectorAll('.score')[0]
let score2 = document.querySelectorAll('.score')[5]
let val1 = document.querySelector('.val1')
let val2 = document.querySelector('.val2')

let arqaSteps = 0
let arqaSteps2 = 0

playBtn.addEventListener('click', function () {
    this.style.display = 'none'
    table.style.display = 'block'
    gameName.style.display = 'none'
    score1.style.display = 'block'
    score2.style.display = 'block'
    a.style.display = 'flex'
    whoNextText.style.display = 'block'

    let timer = setTimeout(() => {
        whoNextText.innerHTML = "It's Time for Player 1"
    }, 300)
})

//==============================================================================================================================
for (let i = 1; i < 65; i++) {
    x++
    if ((i - 1) % 8 == 0) {
        x = 0;
        y++
    }
    if (i == 1) y = 0
    let newBlock = document.createElement('div')
    newBlock.classList.add('block')
    if (count % 2 == 0) newBlock.classList.add('black')
    else newBlock.classList.add('white')
    count++
    newBlock.setAttribute('x', x)
    newBlock.setAttribute('y', y)
    newBlock.setAttribute('color', newBlock.style.backgroundColor)
    if (i % 8 == 0) {
        count++

    }

    if (i < whiteFigures.length + 1) {
        let newFigure = document.createElement('img')
        newFigure.src = whiteFigures[i - 1]
        newFigure.style.width = '90%'
        newFigure.classList.add('figure')
        newFigure.setAttribute('x', x)
        newFigure.setAttribute('y', y)
        newFigure.setAttribute('teamNum', 1)
        newFigure.setAttribute('team', 1)
        newBlock.appendChild(newFigure)
    }

    if (i > 48) {
        let newFigure = document.createElement('img')
        newFigure.src = blackFigures[i - 49]
        newFigure.style.width = '90%'
        newFigure.classList.add('figure')
        newFigure.setAttribute('x', x)
        newFigure.setAttribute('y', y)
        newFigure.setAttribute('teamNum', 2)
        newFigure.setAttribute('team', 2)
        newBlock.appendChild(newFigure)
    }

    allB.appendChild(newBlock)
}

function giveClassWhite(name) {
    let allF = document.querySelectorAll(`.${name}`)
    for (let j = 0; j < allF.length; j++) {
        if (allF[j].childNodes.length == 1) {
            if (allF[j].childNodes[0].src.slice(-8) == 't1-z.png') allF[j].childNodes[0].setAttribute('type', 'z')
            else if (allF[j].childNodes[0].src.slice(-8) == 't1-n.png') allF[j].childNodes[0].setAttribute('type', 'n')
            else if (allF[j].childNodes[0].src.slice(-8) == 't1-d.png') allF[j].childNodes[0].setAttribute('type', 'd')
            else if (allF[j].childNodes[0].src.slice(-8) == 't1-p.png') allF[j].childNodes[0].setAttribute('type', 'p')
            else if (allF[j].childNodes[0].src.slice(-8) == 't1-t.png') allF[j].childNodes[0].setAttribute('type', 't')
            else if (allF[j].childNodes[0].src.slice(-8) == 't1-a.png') allF[j].childNodes[0].setAttribute('type', 'a')
            else if (allF[j].childNodes[0].src.slice(-8) == 't2-z.png') allF[j].childNodes[0].setAttribute('type', 'z')
            else if (allF[j].childNodes[0].src.slice(-8) == 't2-n.png') allF[j].childNodes[0].setAttribute('type', 'n')
            else if (allF[j].childNodes[0].src.slice(-8) == 't2-d.png') allF[j].childNodes[0].setAttribute('type', 'd')
            else if (allF[j].childNodes[0].src.slice(-8) == 't2-p.png') allF[j].childNodes[0].setAttribute('type', 'p')
            else if (allF[j].childNodes[0].src.slice(-8) == 't2-t.png') allF[j].childNodes[0].setAttribute('type', 't')
            else if (allF[j].childNodes[0].src.slice(-8) == 't2-a.png') allF[j].childNodes[0].setAttribute('type', 'a')
        }
    }
}

giveClassWhite('black')
giveClassWhite('white')

//================================================================================ MOVING
let allBlocks = document.querySelectorAll('.block')
let fig = document.querySelectorAll('.figure')
let fig2 = [...fig]

for (let i = 0; i < fig.length; i++) {
    let el = fig[i]
    fig[i].addEventListener('click', function () {
        let el = fig[i]
        if (el.getAttribute('team') == 1 && whoNext == true || el.getAttribute('team') == 2 && whoNext == false) {
            let myX = Number(this.getAttribute('x'))
            let myY = Number(this.getAttribute('y'))
            for (let i = 0; i < fig.length; i++) {
                fig[i].classList.remove('active')
            }
            this.classList.add('active')

            nextStep(el, myX, myY)
        }
    })

    function nextStep(el, myX, myY) {
        //================================================================================================================= ZINVOR ======================================
        if (el.getAttribute('type') == 'z') {
            if (el.getAttribute('team') == '1') {
                for (let j = 0; j < allBlocks.length; j++) {
                    if (allBlocks[j].style.backgroundColor == color) allBlocks[j].style.backgroundColor = allBlocks[j].getAttribute('color')
                    if (allBlocks[j].getAttribute('x') == myX + 1 && allBlocks[j].getAttribute('y') == myY + 1 && allBlocks[j].childNodes.length == 1
                        && allBlocks[j].childNodes[0].getAttribute('team') != el.getAttribute('team')) allBlocks[j].style.backgroundColor = color
                    else if (allBlocks[j].getAttribute('x') == myX - 1 && allBlocks[j].getAttribute('y') == myY + 1 && allBlocks[j].childNodes.length == 1
                        && allBlocks[j].childNodes[0].getAttribute('team') != el.getAttribute('team')) allBlocks[j].style.backgroundColor = color
                    else if (allBlocks[j].getAttribute('x') == myX && allBlocks[j].getAttribute('y') == myY + 2 && allBlocks[j].childNodes.length == 0 && el.getAttribute('y') == 1) {
                        if (allBlocks[j - 8].childNodes.length == 0) allBlocks[j].style.backgroundColor = color
                    }
                    else if (allBlocks[j].getAttribute('x') == myX && allBlocks[j].getAttribute('y') == myY + 1 && allBlocks[j].childNodes.length == 0) allBlocks[j].style.backgroundColor = color
                    else allBlocks[j].style.backgroundColor = allBlocks[j].getAttribute('color')
                }
            }
            else {
                for (let j = 0; j < allBlocks.length; j++) {
                    if (allBlocks[j].getAttribute('x') == myX + 1 && allBlocks[j].getAttribute('y') == myY - 1 && allBlocks[j].childNodes.length == 1
                        && allBlocks[j].childNodes[0].getAttribute('team') != el.getAttribute('team')) allBlocks[j].style.backgroundColor = color
                    else if (allBlocks[j].getAttribute('x') == myX - 1 && allBlocks[j].getAttribute('y') == myY - 1 && allBlocks[j].childNodes.length == 1
                        && allBlocks[j].childNodes[0].getAttribute('team') != el.getAttribute('team')) allBlocks[j].style.backgroundColor = color
                    else if (allBlocks[j].getAttribute('x') == myX && allBlocks[j].getAttribute('y') == myY - 2 && allBlocks[j].childNodes.length == 0 && el.getAttribute('y') == 6) {
                        if (allBlocks[j + 8].childNodes.length == 0) allBlocks[j].style.backgroundColor = color
                    }
                    else if (allBlocks[j].getAttribute('x') == myX && allBlocks[j].getAttribute('y') == myY - 1 && allBlocks[j].childNodes.length == 0) allBlocks[j].style.backgroundColor = color
                    else allBlocks[j].style.backgroundColor = allBlocks[j].getAttribute('color')
                }
            }
            check2(el)
        }
        //================================================================================================================= TAGUHI ======================================

        if (el.getAttribute('type') == 't') {
            for (let j = 0; j < allBlocks.length; j++) {
                if (allBlocks[j].style.backgroundColor == color) allBlocks[j].style.backgroundColor = allBlocks[j].getAttribute('color')
            }
            for (let t = 1; t < 8; t++) {
                for (let j = 0; j < allBlocks.length; j++) {
                    if (allBlocks[j].getAttribute('x') == myX && allBlocks[j].getAttribute('y') == myY + t && allBlocks[j].childNodes.length == 0) allBlocks[j].style.backgroundColor = color
                    else if (allBlocks[j].getAttribute('x') == myX && allBlocks[j].getAttribute('y') == myY + t && allBlocks[j].childNodes.length != 0) {
                        if (allBlocks[j].childNodes[0].getAttribute('team') != el.getAttribute('team')) allBlocks[j].style.backgroundColor = color
                        t = 8
                    }
                }
            }
            for (let t = 1; t < 8; t++) {
                for (let j = 0; j < allBlocks.length; j++) {
                    if (allBlocks[j].getAttribute('x') == myX + t && allBlocks[j].getAttribute('y') == myY && allBlocks[j].childNodes.length == 0) allBlocks[j].style.backgroundColor = color
                    else if (allBlocks[j].getAttribute('x') == myX + t && allBlocks[j].getAttribute('y') == myY && allBlocks[j].childNodes.length != 0) {
                        if (allBlocks[j].childNodes[0].getAttribute('team') != el.getAttribute('team')) allBlocks[j].style.backgroundColor = color
                        t = 8
                    }
                }
            }
            for (let t = 1; t < 8; t++) {
                for (let j = 0; j < allBlocks.length; j++) {
                    if (allBlocks[j].getAttribute('x') == myX && allBlocks[j].getAttribute('y') == myY - t && allBlocks[j].childNodes.length == 0) allBlocks[j].style.backgroundColor = color
                    else if (allBlocks[j].getAttribute('x') == myX && allBlocks[j].getAttribute('y') == myY - t && allBlocks[j].childNodes.length != 0) {
                        if (allBlocks[j].childNodes[0].getAttribute('team') != el.getAttribute('team')) allBlocks[j].style.backgroundColor = color
                        t = 8
                    }
                }
            }
            for (let t = 1; t < 8; t++) {
                for (let j = 0; j < allBlocks.length; j++) {
                    if (allBlocks[j].getAttribute('x') == myX - t && allBlocks[j].getAttribute('y') == myY && allBlocks[j].childNodes.length == 0) allBlocks[j].style.backgroundColor = color
                    else if (allBlocks[j].getAttribute('x') == myX - t && allBlocks[j].getAttribute('y') == myY && allBlocks[j].childNodes.length != 0) {
                        if (allBlocks[j].childNodes[0].getAttribute('team') != el.getAttribute('team')) allBlocks[j].style.backgroundColor = color
                        t = 8
                    }
                }
            }

            for (let t = 1; t < 8; t++) {
                for (let j = 0; j < allBlocks.length; j++) {
                    if (allBlocks[j].getAttribute('x') == myX + t && allBlocks[j].getAttribute('y') == myY + t && allBlocks[j].childNodes.length == 0) allBlocks[j].style.backgroundColor = color
                    else if (allBlocks[j].getAttribute('x') == myX + t && allBlocks[j].getAttribute('y') == myY + t && allBlocks[j].childNodes.length != 0) {
                        if (allBlocks[j].childNodes[0].getAttribute('team') != el.getAttribute('team')) allBlocks[j].style.backgroundColor = color
                        t = 8
                    }
                }
            }
            for (let t = 1; t < 8; t++) {
                for (let j = 0; j < allBlocks.length; j++) {
                    if (allBlocks[j].getAttribute('x') == myX - t && allBlocks[j].getAttribute('y') == myY - t && allBlocks[j].childNodes.length == 0) allBlocks[j].style.backgroundColor = color
                    else if (allBlocks[j].getAttribute('x') == myX - t && allBlocks[j].getAttribute('y') == myY - t && allBlocks[j].childNodes.length != 0) {
                        if (allBlocks[j].childNodes[0].getAttribute('team') != el.getAttribute('team')) allBlocks[j].style.backgroundColor = color
                        t = 8
                    }
                }
            }
            for (let t = 1; t < 8; t++) {
                for (let j = 0; j < allBlocks.length; j++) {
                    if (allBlocks[j].getAttribute('x') == myX + t && allBlocks[j].getAttribute('y') == myY - t && allBlocks[j].childNodes.length == 0) allBlocks[j].style.backgroundColor = color
                    else if (allBlocks[j].getAttribute('x') == myX + t && allBlocks[j].getAttribute('y') == myY - t && allBlocks[j].childNodes.length != 0) {
                        if (allBlocks[j].childNodes[0].getAttribute('team') != el.getAttribute('team')) allBlocks[j].style.backgroundColor = color
                        t = 8
                    }
                }
            }
            for (let t = 1; t < 8; t++) {
                for (let j = 0; j < allBlocks.length; j++) {
                    if (allBlocks[j].getAttribute('x') == myX - t && allBlocks[j].getAttribute('y') == myY + t && allBlocks[j].childNodes.length == 0) allBlocks[j].style.backgroundColor = color
                    else if (allBlocks[j].getAttribute('x') == myX - t && allBlocks[j].getAttribute('y') == myY + t && allBlocks[j].childNodes.length != 0) {
                        if (allBlocks[j].childNodes[0].getAttribute('team') != el.getAttribute('team')) allBlocks[j].style.backgroundColor = color
                        t = 8
                    }
                }
            }

            check2(el)
        }
        //================================================================================================================= NAVAK ======================================

        if (el.getAttribute('type') == 'n') {
            for (let j = 0; j < allBlocks.length; j++) {
                if (allBlocks[j].style.backgroundColor == color) allBlocks[j].style.backgroundColor = allBlocks[j].getAttribute('color')
            }
            for (let t = 1; t < 8; t++) {
                for (let j = 0; j < allBlocks.length; j++) {
                    if (allBlocks[j].getAttribute('x') == myX && allBlocks[j].getAttribute('y') == myY + t && allBlocks[j].childNodes.length == 0) allBlocks[j].style.backgroundColor = color
                    else if (allBlocks[j].getAttribute('x') == myX && allBlocks[j].getAttribute('y') == myY + t && allBlocks[j].childNodes.length != 0) {
                        if (allBlocks[j].childNodes[0].getAttribute('team') != el.getAttribute('team')) allBlocks[j].style.backgroundColor = color
                        t = 8
                    }
                }
            }
            for (let t = 1; t < 8; t++) {
                for (let j = 0; j < allBlocks.length; j++) {
                    if (allBlocks[j].getAttribute('x') == myX + t && allBlocks[j].getAttribute('y') == myY && allBlocks[j].childNodes.length == 0) allBlocks[j].style.backgroundColor = color
                    else if (allBlocks[j].getAttribute('x') == myX + t && allBlocks[j].getAttribute('y') == myY && allBlocks[j].childNodes.length != 0) {
                        if (allBlocks[j].childNodes[0].getAttribute('team') != el.getAttribute('team')) allBlocks[j].style.backgroundColor = color
                        t = 8
                    }
                }
            }
            for (let t = 1; t < 8; t++) {
                for (let j = 0; j < allBlocks.length; j++) {
                    if (allBlocks[j].getAttribute('x') == myX && allBlocks[j].getAttribute('y') == myY - t && allBlocks[j].childNodes.length == 0) allBlocks[j].style.backgroundColor = color
                    else if (allBlocks[j].getAttribute('x') == myX && allBlocks[j].getAttribute('y') == myY - t && allBlocks[j].childNodes.length != 0) {
                        if (allBlocks[j].childNodes[0].getAttribute('team') != el.getAttribute('team')) allBlocks[j].style.backgroundColor = color
                        t = 8
                    }
                }
            }
            for (let t = 1; t < 8; t++) {
                for (let j = 0; j < allBlocks.length; j++) {
                    if (allBlocks[j].getAttribute('x') == myX - t && allBlocks[j].getAttribute('y') == myY && allBlocks[j].childNodes.length == 0) allBlocks[j].style.backgroundColor = color
                    else if (allBlocks[j].getAttribute('x') == myX - t && allBlocks[j].getAttribute('y') == myY && allBlocks[j].childNodes.length != 0) {
                        if (allBlocks[j].childNodes[0].getAttribute('team') != el.getAttribute('team')) allBlocks[j].style.backgroundColor = color
                        t = 8
                    }
                }
            }
            check2(el)
        }
        //================================================================================================================= PIX ======================================

        if (el.getAttribute('type') == 'p') {
            for (let j = 0; j < allBlocks.length; j++) {
                if (allBlocks[j].style.backgroundColor == color) allBlocks[j].style.backgroundColor = allBlocks[j].getAttribute('color')
            }
            for (let t = 1; t < 8; t++) {
                for (let j = 0; j < allBlocks.length; j++) {
                    if (allBlocks[j].getAttribute('x') == myX + t && allBlocks[j].getAttribute('y') == myY + t && allBlocks[j].childNodes.length == 0) allBlocks[j].style.backgroundColor = color
                    else if (allBlocks[j].getAttribute('x') == myX + t && allBlocks[j].getAttribute('y') == myY + t && allBlocks[j].childNodes.length != 0) {
                        if (allBlocks[j].childNodes[0].getAttribute('team') != el.getAttribute('team')) allBlocks[j].style.backgroundColor = color
                        t = 8
                    }
                }
            }
            for (let t = 1; t < 8; t++) {
                for (let j = 0; j < allBlocks.length; j++) {
                    if (allBlocks[j].getAttribute('x') == myX - t && allBlocks[j].getAttribute('y') == myY - t && allBlocks[j].childNodes.length == 0) allBlocks[j].style.backgroundColor = color
                    else if (allBlocks[j].getAttribute('x') == myX - t && allBlocks[j].getAttribute('y') == myY - t && allBlocks[j].childNodes.length != 0) {
                        if (allBlocks[j].childNodes[0].getAttribute('team') != el.getAttribute('team')) allBlocks[j].style.backgroundColor = color
                        t = 8
                    }
                }
            }
            for (let t = 1; t < 8; t++) {
                for (let j = 0; j < allBlocks.length; j++) {
                    if (allBlocks[j].getAttribute('x') == myX + t && allBlocks[j].getAttribute('y') == myY - t && allBlocks[j].childNodes.length == 0) allBlocks[j].style.backgroundColor = color
                    else if (allBlocks[j].getAttribute('x') == myX + t && allBlocks[j].getAttribute('y') == myY - t && allBlocks[j].childNodes.length != 0) {
                        if (allBlocks[j].childNodes[0].getAttribute('team') != el.getAttribute('team')) allBlocks[j].style.backgroundColor = color
                        t = 8
                    }
                }
            }
            for (let t = 1; t < 8; t++) {
                for (let j = 0; j < allBlocks.length; j++) {
                    if (allBlocks[j].getAttribute('x') == myX - t && allBlocks[j].getAttribute('y') == myY + t && allBlocks[j].childNodes.length == 0) allBlocks[j].style.backgroundColor = color
                    else if (allBlocks[j].getAttribute('x') == myX - t && allBlocks[j].getAttribute('y') == myY + t && allBlocks[j].childNodes.length != 0) {
                        if (allBlocks[j].childNodes[0].getAttribute('team') != el.getAttribute('team')) allBlocks[j].style.backgroundColor = color
                        t = 8
                    }
                }
            }
            check2(el)

        }
        //================================================================================================================= ARQA ======================================

        if (el.getAttribute('type') == 'a') {
            reset()
            checkMat()
            let teamNum = el.getAttribute('teamNum')
            if (teamNum == 1) teamNum = 2
            else teamNum = 1
            for (let j = 0; j < allBlocks.length; j++) {
                if (allBlocks[j].style.backgroundColor == color) allBlocks[j].style.backgroundColor = allBlocks[j].getAttribute('color')
            }
            for (let j = 0; j < allBlocks.length; j++) {
                if (allBlocks[j].getAttribute('x') == myX + 1 && allBlocks[j].getAttribute('y') == myY && allBlocks[j].childNodes.length == 0 && !allBlocks[j].classList.contains(`attack+${teamNum}`)) allBlocks[j].style.backgroundColor = color
                else if (allBlocks[j].getAttribute('x') == myX + 1 && allBlocks[j].getAttribute('y') == myY && allBlocks[j].childNodes.length != 0 && !allBlocks[j].classList.contains(`attack+${teamNum}`)) {
                    if (allBlocks[j].childNodes[0].getAttribute('team') != el.getAttribute('team')) allBlocks[j].style.backgroundColor = color
                }

                if (allBlocks[j].getAttribute('x') == myX + 1 && allBlocks[j].getAttribute('y') == myY + 1 && allBlocks[j].childNodes.length == 0 && !allBlocks[j].classList.contains(`attack+${teamNum}`)) allBlocks[j].style.backgroundColor = color
                else if (allBlocks[j].getAttribute('x') == myX + 1 && allBlocks[j].getAttribute('y') == myY + 1 && allBlocks[j].childNodes.length != 0 && !allBlocks[j].classList.contains(`attack+${teamNum}`)) {
                    if (allBlocks[j].childNodes[0].getAttribute('team') != el.getAttribute('team')) allBlocks[j].style.backgroundColor = color
                }

                if (allBlocks[j].getAttribute('x') == myX + 1 && allBlocks[j].getAttribute('y') == myY - 1 && allBlocks[j].childNodes.length == 0 && !allBlocks[j].classList.contains(`attack+${teamNum}`)) allBlocks[j].style.backgroundColor = color
                else if (allBlocks[j].getAttribute('x') == myX + 1 && allBlocks[j].getAttribute('y') == myY - 1 && allBlocks[j].childNodes.length != 0 && !allBlocks[j].classList.contains(`attack+${teamNum}`)) {
                    if (allBlocks[j].childNodes[0].getAttribute('team') != el.getAttribute('team')) allBlocks[j].style.backgroundColor = color
                }

                if (allBlocks[j].getAttribute('x') == myX - 1 && allBlocks[j].getAttribute('y') == myY && allBlocks[j].childNodes.length == 0 && !allBlocks[j].classList.contains(`attack+${teamNum}`)) allBlocks[j].style.backgroundColor = color
                else if (allBlocks[j].getAttribute('x') == myX - 1 && allBlocks[j].getAttribute('y') == myY && allBlocks[j].childNodes.length != 0 && !allBlocks[j].classList.contains(`attack+${teamNum}`)) {
                    if (allBlocks[j].childNodes[0].getAttribute('team') != el.getAttribute('team')) allBlocks[j].style.backgroundColor = color
                }

                if (allBlocks[j].getAttribute('x') == myX - 1 && allBlocks[j].getAttribute('y') == myY + 1 && allBlocks[j].childNodes.length == 0 && !allBlocks[j].classList.contains(`attack+${teamNum}`)) allBlocks[j].style.backgroundColor = color
                else if (allBlocks[j].getAttribute('x') == myX - 1 && allBlocks[j].getAttribute('y') == myY + 1 && allBlocks[j].childNodes.length != 0 && !allBlocks[j].classList.contains(`attack+${teamNum}`)) {
                    if (allBlocks[j].childNodes[0].getAttribute('team') != el.getAttribute('team')) allBlocks[j].style.backgroundColor = color
                }

                if (allBlocks[j].getAttribute('x') == myX - 1 && allBlocks[j].getAttribute('y') == myY - 1 && allBlocks[j].childNodes.length == 0 && !allBlocks[j].classList.contains(`attack+${teamNum}`)) allBlocks[j].style.backgroundColor = color
                else if (allBlocks[j].getAttribute('x') == myX - 1 && allBlocks[j].getAttribute('y') == myY - 1 && allBlocks[j].childNodes.length != 0 && !allBlocks[j].classList.contains(`attack+${teamNum}`)) {
                    if (allBlocks[j].childNodes[0].getAttribute('team') != el.getAttribute('team')) allBlocks[j].style.backgroundColor = color
                }

                if (allBlocks[j].getAttribute('x') == myX && allBlocks[j].getAttribute('y') == myY + 1 && allBlocks[j].childNodes.length == 0 && !allBlocks[j].classList.contains(`attack+${teamNum}`)) allBlocks[j].style.backgroundColor = color
                else if (allBlocks[j].getAttribute('x') == myX && allBlocks[j].getAttribute('y') == myY + 1 && allBlocks[j].childNodes.length != 0 && !allBlocks[j].classList.contains(`attack+${teamNum}`)) {
                    if (allBlocks[j].childNodes[0].getAttribute('team') != el.getAttribute('team')) allBlocks[j].style.backgroundColor = color
                }

                if (allBlocks[j].getAttribute('x') == myX && allBlocks[j].getAttribute('y') == myY - 1 && allBlocks[j].childNodes.length == 0 && !allBlocks[j].classList.contains(`attack+${teamNum}`)) allBlocks[j].style.backgroundColor = color
                else if (allBlocks[j].getAttribute('x') == myX && allBlocks[j].getAttribute('y') == myY - 1 && allBlocks[j].childNodes.length != 0 && !allBlocks[j].classList.contains(`attack+${teamNum}`)) {
                    if (allBlocks[j].childNodes[0].getAttribute('team') != el.getAttribute('team')) allBlocks[j].style.backgroundColor = color
                }
            }
            if (el.getAttribute('team') == 1) {
                if (allBlocks[0].childNodes[0].getAttribute('team') == el.getAttribute('team') && allBlocks[0].childNodes[0].getAttribute('type') == 'n' && allBlocks[1].childNodes.length == 0 &&
                    allBlocks[2].childNodes.length == 0 && allBlocks[3].childNodes.length == 0 && allBlocks[4].childNodes[0].getAttribute('team') == el.getAttribute('team') &&
                    allBlocks[4].childNodes[0].getAttribute('type') == 'a' && !el.parentNode.classList.contains(`attack+2`) && arqaSteps == 0) {
                    allBlocks[1].style.backgroundColor = color
                }
                if (allBlocks[7].childNodes[0].getAttribute('team') == el.getAttribute('team') && allBlocks[7].childNodes[0].getAttribute('type') == 'n' && allBlocks[6].childNodes.length == 0 &&
                    allBlocks[5].childNodes.length == 0 && allBlocks[4].childNodes[0].getAttribute('team') == el.getAttribute('team')
                    && allBlocks[4].childNodes[0].getAttribute('type') == 'a' && !el.parentNode.classList.contains(`attack+2`) && arqaSteps == 0) {
                    allBlocks[6].style.backgroundColor = color
                }
            }
            else {
                if (allBlocks[63].childNodes[0].getAttribute('team') == el.getAttribute('team') && allBlocks[63].childNodes[0].getAttribute('type') == 'n' && allBlocks[62].childNodes.length == 0 &&
                    allBlocks[61].childNodes.length == 0 && allBlocks[60].childNodes.length == 0 && allBlocks[59].childNodes[0].getAttribute('team') == el.getAttribute('team') &&
                    allBlocks[59].childNodes[0].getAttribute('type') == 'a' && !el.parentNode.classList.contains(`attack+1`) && arqaSteps2 == 0) {
                    allBlocks[62].style.backgroundColor = color
                }
                if (allBlocks[56].childNodes[0].getAttribute('team') == el.getAttribute('team') && allBlocks[56].childNodes[0].getAttribute('type') == 'n' && allBlocks[57].childNodes.length == 0 &&
                    allBlocks[58].childNodes.length == 0 && allBlocks[59].childNodes[0].getAttribute('team') == el.getAttribute('team')
                    && allBlocks[59].childNodes[0].getAttribute('type') == 'a' && !el.parentNode.classList.contains(`attack+1`) && arqaSteps2 == 0) {
                    allBlocks[57].style.backgroundColor = color
                }
            }
            check2(el)
        }

        //================================================================================================================= DZI ======================================

        if (el.getAttribute('type') == 'd') {
            for (let j = 0; j < allBlocks.length; j++) {
                if (allBlocks[j].style.backgroundColor == color) allBlocks[j].style.backgroundColor = allBlocks[j].getAttribute('color')
            }
            for (let j = 0; j < allBlocks.length; j++) {
                if (allBlocks[j].getAttribute('x') == myX + 1 && allBlocks[j].getAttribute('y') == myY + 2 && allBlocks[j].childNodes.length == 0) allBlocks[j].style.backgroundColor = color
                else if (allBlocks[j].getAttribute('x') == myX + 1 && allBlocks[j].getAttribute('y') == myY + 2 && allBlocks[j].childNodes.length != 0) {
                    if (allBlocks[j].childNodes[0].getAttribute('team') != el.getAttribute('team')) allBlocks[j].style.backgroundColor = color
                }

                if (allBlocks[j].getAttribute('x') == myX - 1 && allBlocks[j].getAttribute('y') == myY + 2 && allBlocks[j].childNodes.length == 0) allBlocks[j].style.backgroundColor = color
                else if (allBlocks[j].getAttribute('x') == myX - 1 && allBlocks[j].getAttribute('y') == myY + 2 && allBlocks[j].childNodes.length != 0) {
                    if (allBlocks[j].childNodes[0].getAttribute('team') != el.getAttribute('team')) allBlocks[j].style.backgroundColor = color
                }

                if (allBlocks[j].getAttribute('x') == myX + 1 && allBlocks[j].getAttribute('y') == myY - 2 && allBlocks[j].childNodes.length == 0) allBlocks[j].style.backgroundColor = color
                else if (allBlocks[j].getAttribute('x') == myX + 1 && allBlocks[j].getAttribute('y') == myY - 2 && allBlocks[j].childNodes.length != 0) {
                    if (allBlocks[j].childNodes[0].getAttribute('team') != el.getAttribute('team')) allBlocks[j].style.backgroundColor = color
                }

                if (allBlocks[j].getAttribute('x') == myX - 1 && allBlocks[j].getAttribute('y') == myY - 2 && allBlocks[j].childNodes.length == 0) allBlocks[j].style.backgroundColor = color
                else if (allBlocks[j].getAttribute('x') == myX - 1 && allBlocks[j].getAttribute('y') == myY - 2 && allBlocks[j].childNodes.length != 0) {
                    if (allBlocks[j].childNodes[0].getAttribute('team') != el.getAttribute('team')) allBlocks[j].style.backgroundColor = color
                }

                if (allBlocks[j].getAttribute('x') == myX + 2 && allBlocks[j].getAttribute('y') == myY + 1 && allBlocks[j].childNodes.length == 0) allBlocks[j].style.backgroundColor = color
                else if (allBlocks[j].getAttribute('x') == myX + 2 && allBlocks[j].getAttribute('y') == myY + 1 && allBlocks[j].childNodes.length != 0) {
                    if (allBlocks[j].childNodes[0].getAttribute('team') != el.getAttribute('team')) allBlocks[j].style.backgroundColor = color
                }

                if (allBlocks[j].getAttribute('x') == myX + 2 && allBlocks[j].getAttribute('y') == myY - 1 && allBlocks[j].childNodes.length == 0) allBlocks[j].style.backgroundColor = color
                else if (allBlocks[j].getAttribute('x') == myX + 2 && allBlocks[j].getAttribute('y') == myY - 1 && allBlocks[j].childNodes.length != 0) {
                    if (allBlocks[j].childNodes[0].getAttribute('team') != el.getAttribute('team')) allBlocks[j].style.backgroundColor = color
                }

                if (allBlocks[j].getAttribute('x') == myX - 2 && allBlocks[j].getAttribute('y') == myY + 1 && allBlocks[j].childNodes.length == 0) allBlocks[j].style.backgroundColor = color
                else if (allBlocks[j].getAttribute('x') == myX - 2 && allBlocks[j].getAttribute('y') == myY + 1 && allBlocks[j].childNodes.length != 0) {
                    if (allBlocks[j].childNodes[0].getAttribute('team') != el.getAttribute('team')) allBlocks[j].style.backgroundColor = color
                }

                if (allBlocks[j].getAttribute('x') == myX - 2 && allBlocks[j].getAttribute('y') == myY - 1 && allBlocks[j].childNodes.length == 0) allBlocks[j].style.backgroundColor = color
                else if (allBlocks[j].getAttribute('x') == myX - 2 && allBlocks[j].getAttribute('y') == myY - 1 && allBlocks[j].childNodes.length != 0) {
                    if (allBlocks[j].childNodes[0].getAttribute('team') != el.getAttribute('team')) allBlocks[j].style.backgroundColor = color
                }
            }
            check2(el)

        }



    }
}

checkMat()


function checkMat() {
    for (let i = 0; i < fig.length; i++) {
        let el = fig[i]
        // console.log(el)
        let myY = Number(el.getAttribute('y'))
        let myX = Number(el.getAttribute('x'))
        teamNum = el.getAttribute('teamNum')
        // else teamNum = 'blue'
        //================================================================================================================= ZINVOR ======================================
        if (el.getAttribute('type') == 'z' && !el.parentNode.classList.contains('ate')) {
            if (el.getAttribute('team') == '1') {
                for (let j = 0; j < allBlocks.length; j++) {
                    if (allBlocks[j].getAttribute('x') == myX + 1 && allBlocks[j].getAttribute('y') == myY + 1) allBlocks[j].classList.add(`attack+${teamNum}`)
                    else if (allBlocks[j].getAttribute('x') == myX - 1 && allBlocks[j].getAttribute('y') == myY + 1) allBlocks[j].classList.add(`attack+${teamNum}`)
                }
            }
            else {
                for (let j = 0; j < allBlocks.length; j++) {
                    if (allBlocks[j].getAttribute('x') == myX + 1 && allBlocks[j].getAttribute('y') == myY - 1) allBlocks[j].classList.add(`attack+${teamNum}`)
                    else if (allBlocks[j].getAttribute('x') == myX - 1 && allBlocks[j].getAttribute('y') == myY - 1) allBlocks[j].classList.add(`attack+${teamNum}`)
                }
            }
        }
        //================================================================================================================= TAGUHI ======================================

        if (el.getAttribute('type') == 't' && !el.parentNode.classList.contains('ate')) {

            for (let t = 1; t < 8; t++) {
                for (let j = 0; j < allBlocks.length; j++) {
                    if (allBlocks[j].getAttribute('x') == myX && allBlocks[j].getAttribute('y') == myY + t && allBlocks[j].childNodes.length == 0) allBlocks[j].classList.add(`attack+${teamNum}`)
                    else if (allBlocks[j].getAttribute('x') == myX && allBlocks[j].getAttribute('y') == myY + t && allBlocks[j].childNodes.length != 0) {
                        allBlocks[j].classList.add(`attack+${teamNum}`)
                        t = 8
                    }
                }
            }
            for (let t = 1; t < 8; t++) {
                for (let j = 0; j < allBlocks.length; j++) {
                    if (allBlocks[j].getAttribute('x') == myX + t && allBlocks[j].getAttribute('y') == myY && allBlocks[j].childNodes.length == 0) allBlocks[j].classList.add(`attack+${teamNum}`)
                    else if (allBlocks[j].getAttribute('x') == myX + t && allBlocks[j].getAttribute('y') == myY && allBlocks[j].childNodes.length != 0) {
                        allBlocks[j].classList.add(`attack+${teamNum}`)
                        t = 8
                    }
                }
            }
            for (let t = 1; t < 8; t++) {
                for (let j = 0; j < allBlocks.length; j++) {
                    if (allBlocks[j].getAttribute('x') == myX && allBlocks[j].getAttribute('y') == myY - t && allBlocks[j].childNodes.length == 0) allBlocks[j].classList.add(`attack+${teamNum}`)
                    else if (allBlocks[j].getAttribute('x') == myX && allBlocks[j].getAttribute('y') == myY - t && allBlocks[j].childNodes.length != 0) {
                        allBlocks[j].classList.add(`attack+${teamNum}`)
                        t = 8
                    }
                }
            }
            for (let t = 1; t < 8; t++) {
                for (let j = 0; j < allBlocks.length; j++) {
                    if (allBlocks[j].getAttribute('x') == myX - t && allBlocks[j].getAttribute('y') == myY && allBlocks[j].childNodes.length == 0) allBlocks[j].classList.add(`attack+${teamNum}`)
                    else if (allBlocks[j].getAttribute('x') == myX - t && allBlocks[j].getAttribute('y') == myY && allBlocks[j].childNodes.length != 0) {
                        allBlocks[j].classList.add(`attack+${teamNum}`)
                        t = 8
                    }
                }
            }

            for (let t = 1; t < 8; t++) {
                for (let j = 0; j < allBlocks.length; j++) {
                    if (allBlocks[j].getAttribute('x') == myX + t && allBlocks[j].getAttribute('y') == myY + t && allBlocks[j].childNodes.length == 0) allBlocks[j].classList.add(`attack+${teamNum}`)
                    else if (allBlocks[j].getAttribute('x') == myX + t && allBlocks[j].getAttribute('y') == myY + t && allBlocks[j].childNodes.length != 0) {
                        allBlocks[j].classList.add(`attack+${teamNum}`)
                        t = 8
                    }
                }
            }
            for (let t = 1; t < 8; t++) {
                for (let j = 0; j < allBlocks.length; j++) {
                    if (allBlocks[j].getAttribute('x') == myX - t && allBlocks[j].getAttribute('y') == myY - t && allBlocks[j].childNodes.length == 0) allBlocks[j].classList.add(`attack+${teamNum}`)
                    else if (allBlocks[j].getAttribute('x') == myX - t && allBlocks[j].getAttribute('y') == myY - t && allBlocks[j].childNodes.length != 0) {
                        allBlocks[j].classList.add(`attack+${teamNum}`)
                        t = 8
                    }
                }
            }
            for (let t = 1; t < 8; t++) {
                for (let j = 0; j < allBlocks.length; j++) {
                    if (allBlocks[j].getAttribute('x') == myX + t && allBlocks[j].getAttribute('y') == myY - t && allBlocks[j].childNodes.length == 0) allBlocks[j].classList.add(`attack+${teamNum}`)
                    else if (allBlocks[j].getAttribute('x') == myX + t && allBlocks[j].getAttribute('y') == myY - t && allBlocks[j].childNodes.length != 0) {
                        allBlocks[j].classList.add(`attack+${teamNum}`)
                        t = 8
                    }
                }
            }
            for (let t = 1; t < 8; t++) {
                for (let j = 0; j < allBlocks.length; j++) {
                    if (allBlocks[j].getAttribute('x') == myX - t && allBlocks[j].getAttribute('y') == myY + t && allBlocks[j].childNodes.length == 0) allBlocks[j].classList.add(`attack+${teamNum}`)
                    else if (allBlocks[j].getAttribute('x') == myX - t && allBlocks[j].getAttribute('y') == myY + t && allBlocks[j].childNodes.length != 0) {
                        allBlocks[j].classList.add(`attack+${teamNum}`)
                        t = 8
                    }
                }
            }
            el.parentNode.classList.remove(`attack+${teamNum}`)
        }

        //================================================================================================================= NAVAK ======================================
        if (el.getAttribute('type') == 'n' && !el.parentNode.classList.contains('ate')) {

            for (let t = 1; t < 8; t++) {
                for (let j = 0; j < allBlocks.length; j++) {
                    if (allBlocks[j].getAttribute('x') == myX && allBlocks[j].getAttribute('y') == myY + t && allBlocks[j].childNodes.length == 0) allBlocks[j].classList.add(`attack+${teamNum}`)
                    else if (allBlocks[j].getAttribute('x') == myX && allBlocks[j].getAttribute('y') == myY + t && allBlocks[j].childNodes.length != 0) {
                        allBlocks[j].classList.add(`attack+${teamNum}`)
                        t = 8
                    }
                }
            }
            for (let t = 1; t < 8; t++) {
                for (let j = 0; j < allBlocks.length; j++) {
                    if (allBlocks[j].getAttribute('x') == myX + t && allBlocks[j].getAttribute('y') == myY && allBlocks[j].childNodes.length == 0) allBlocks[j].classList.add(`attack+${teamNum}`)
                    else if (allBlocks[j].getAttribute('x') == myX + t && allBlocks[j].getAttribute('y') == myY && allBlocks[j].childNodes.length != 0) {
                        allBlocks[j].classList.add(`attack+${teamNum}`)
                        t = 8
                    }
                }
            }
            for (let t = 1; t < 8; t++) {
                for (let j = 0; j < allBlocks.length; j++) {
                    if (allBlocks[j].getAttribute('x') == myX && allBlocks[j].getAttribute('y') == myY - t && allBlocks[j].childNodes.length == 0) allBlocks[j].classList.add(`attack+${teamNum}`)
                    else if (allBlocks[j].getAttribute('x') == myX && allBlocks[j].getAttribute('y') == myY - t && allBlocks[j].childNodes.length != 0) {
                        allBlocks[j].classList.add(`attack+${teamNum}`)
                        t = 8
                    }
                }
            }
            for (let t = 1; t < 8; t++) {
                for (let j = 0; j < allBlocks.length; j++) {
                    if (allBlocks[j].getAttribute('x') == myX - t && allBlocks[j].getAttribute('y') == myY && allBlocks[j].childNodes.length == 0) allBlocks[j].classList.add(`attack+${teamNum}`)
                    else if (allBlocks[j].getAttribute('x') == myX - t && allBlocks[j].getAttribute('y') == myY && allBlocks[j].childNodes.length != 0) {
                        allBlocks[j].classList.add(`attack+${teamNum}`)
                        t = 8
                    }
                }
            }
        }
        //================================================================================================================= PIX ======================================

        if (el.getAttribute('type') == 'p' && !el.parentNode.classList.contains('ate')) {

            for (let t = 1; t < 8; t++) {
                for (let j = 0; j < allBlocks.length; j++) {
                    if (allBlocks[j].getAttribute('x') == myX + t && allBlocks[j].getAttribute('y') == myY + t && allBlocks[j].childNodes.length == 0) allBlocks[j].classList.add(`attack+${teamNum}`)
                    else if (allBlocks[j].getAttribute('x') == myX + t && allBlocks[j].getAttribute('y') == myY + t && allBlocks[j].childNodes.length != 0) {
                        allBlocks[j].classList.add(`attack+${teamNum}`)
                        t = 8
                    }
                }
            }
            for (let t = 1; t < 8; t++) {
                for (let j = 0; j < allBlocks.length; j++) {
                    if (allBlocks[j].getAttribute('x') == myX - t && allBlocks[j].getAttribute('y') == myY - t && allBlocks[j].childNodes.length == 0) allBlocks[j].classList.add(`attack+${teamNum}`)
                    else if (allBlocks[j].getAttribute('x') == myX - t && allBlocks[j].getAttribute('y') == myY - t && allBlocks[j].childNodes.length != 0) {
                        allBlocks[j].classList.add(`attack+${teamNum}`)
                        t = 8
                    }
                }
            }
            for (let t = 1; t < 8; t++) {
                for (let j = 0; j < allBlocks.length; j++) {
                    if (allBlocks[j].getAttribute('x') == myX + t && allBlocks[j].getAttribute('y') == myY - t && allBlocks[j].childNodes.length == 0) allBlocks[j].classList.add(`attack+${teamNum}`)
                    else if (allBlocks[j].getAttribute('x') == myX + t && allBlocks[j].getAttribute('y') == myY - t && allBlocks[j].childNodes.length != 0) {
                        allBlocks[j].classList.add(`attack+${teamNum}`)
                        t = 8
                    }
                }
            }
            for (let t = 1; t < 8; t++) {
                for (let j = 0; j < allBlocks.length; j++) {
                    if (allBlocks[j].getAttribute('x') == myX - t && allBlocks[j].getAttribute('y') == myY + t && allBlocks[j].childNodes.length == 0) allBlocks[j].classList.add(`attack+${teamNum}`)
                    else if (allBlocks[j].getAttribute('x') == myX - t && allBlocks[j].getAttribute('y') == myY + t && allBlocks[j].childNodes.length != 0) {
                        allBlocks[j].classList.add(`attack+${teamNum}`)
                        t = 8
                    }
                }
            }
        }

        //================================================================================================================= ARQA ======================================

        if (el.getAttribute('type') == 'a' && !el.parentNode.classList.contains('ate')) {
            for (let j = 0; j < allBlocks.length; j++) {
                let teamNum2 = el.getAttribute('teamNum')
                // if(teamNum2 == 1) teamNum2 = 2
                // else teamNum2 = 1

                if (allBlocks[j].getAttribute('x') == myX + 1 && allBlocks[j].getAttribute('y') == myY && allBlocks[j].childNodes.length == 0 && !allBlocks[j].classList.contains(`attack+${teamNum}`)) allBlocks[j].classList.add(`attack+${teamNum}`)
                else if (allBlocks[j].getAttribute('x') == myX + 1 && allBlocks[j].getAttribute('y') == myY && allBlocks[j].childNodes.length != 0) allBlocks[j].classList.add(`attack+${teamNum2}`)

                if (allBlocks[j].getAttribute('x') == myX + 1 && allBlocks[j].getAttribute('y') == myY + 1 && allBlocks[j].childNodes.length == 0 && !allBlocks[j].classList.contains(`attack+${teamNum}`)) allBlocks[j].classList.add(`attack+${teamNum}`)
                else if (allBlocks[j].getAttribute('x') == myX + 1 && allBlocks[j].getAttribute('y') == myY + 1 && allBlocks[j].childNodes.length != 0) allBlocks[j].classList.add(`attack+${teamNum2}`)

                if (allBlocks[j].getAttribute('x') == myX + 1 && allBlocks[j].getAttribute('y') == myY - 1 && allBlocks[j].childNodes.length == 0 && !allBlocks[j].classList.contains(`attack+${teamNum}`)) allBlocks[j].classList.add(`attack+${teamNum}`)
                else if (allBlocks[j].getAttribute('x') == myX + 1 && allBlocks[j].getAttribute('y') == myY - 1 && allBlocks[j].childNodes.length != 0) allBlocks[j].classList.add(`attack+${teamNum2}`)

                if (allBlocks[j].getAttribute('x') == myX - 1 && allBlocks[j].getAttribute('y') == myY && allBlocks[j].childNodes.length == 0 && !allBlocks[j].classList.contains(`attack+${teamNum}`)) allBlocks[j].classList.add(`attack+${teamNum}`)
                else if (allBlocks[j].getAttribute('x') == myX - 1 && allBlocks[j].getAttribute('y') == myY && allBlocks[j].childNodes.length != 0) allBlocks[j].classList.add(`attack+${teamNum2}`)

                if (allBlocks[j].getAttribute('x') == myX - 1 && allBlocks[j].getAttribute('y') == myY + 1 && allBlocks[j].childNodes.length == 0 && !allBlocks[j].classList.contains(`attack+${teamNum}`)) allBlocks[j].classList.add(`attack+${teamNum}`)
                else if (allBlocks[j].getAttribute('x') == myX - 1 && allBlocks[j].getAttribute('y') == myY + 1 && allBlocks[j].childNodes.length != 0) allBlocks[j].classList.add(`attack+${teamNum2}`)

                if (allBlocks[j].getAttribute('x') == myX - 1 && allBlocks[j].getAttribute('y') == myY - 1 && allBlocks[j].childNodes.length == 0 && !allBlocks[j].classList.contains(`attack+${teamNum}`)) allBlocks[j].classList.add(`attack+${teamNum}`)
                else if (allBlocks[j].getAttribute('x') == myX - 1 && allBlocks[j].getAttribute('y') == myY - 1 && allBlocks[j].childNodes.length != 0) allBlocks[j].classList.add(`attack+${teamNum2}`)

                if (allBlocks[j].getAttribute('x') == myX && allBlocks[j].getAttribute('y') == myY + 1 && allBlocks[j].childNodes.length == 0 && !allBlocks[j].classList.contains(`attack+${teamNum}`)) allBlocks[j].classList.add(`attack+${teamNum}`)
                else if (allBlocks[j].getAttribute('x') == myX && allBlocks[j].getAttribute('y') == myY + 1 && allBlocks[j].childNodes.length != 0) allBlocks[j].classList.add(`attack+${teamNum2}`)

                if (allBlocks[j].getAttribute('x') == myX && allBlocks[j].getAttribute('y') == myY - 1 && allBlocks[j].childNodes.length == 0 && !allBlocks[j].classList.contains(`attack+${teamNum}`)) allBlocks[j].classList.add(`attack+${teamNum}`)
                else if (allBlocks[j].getAttribute('x') == myX && allBlocks[j].getAttribute('y') == myY - 1 && allBlocks[j].childNodes.length != 0) allBlocks[j].classList.add(`attack+${teamNum2}`)
            }

        }


        //================================================================================================================= DZI ======================================


        if (el.getAttribute('type') == 'd' && !el.parentNode.classList.contains('ate')) {

            for (let j = 0; j < allBlocks.length; j++) {
                if (allBlocks[j].getAttribute('x') == myX + 1 && allBlocks[j].getAttribute('y') == myY + 2 && allBlocks[j].childNodes.length == 0) allBlocks[j].classList.add(`attack+${teamNum}`)
                else if (allBlocks[j].getAttribute('x') == myX + 1 && allBlocks[j].getAttribute('y') == myY + 2 && allBlocks[j].childNodes.length != 0) allBlocks[j].classList.add(`attack+${teamNum}`)

                if (allBlocks[j].getAttribute('x') == myX - 1 && allBlocks[j].getAttribute('y') == myY + 2 && allBlocks[j].childNodes.length == 0) allBlocks[j].classList.add(`attack+${teamNum}`)
                else if (allBlocks[j].getAttribute('x') == myX - 1 && allBlocks[j].getAttribute('y') == myY + 2 && allBlocks[j].childNodes.length != 0) allBlocks[j].classList.add(`attack+${teamNum}`)

                if (allBlocks[j].getAttribute('x') == myX + 1 && allBlocks[j].getAttribute('y') == myY - 2 && allBlocks[j].childNodes.length == 0) allBlocks[j].classList.add(`attack+${teamNum}`)
                else if (allBlocks[j].getAttribute('x') == myX + 1 && allBlocks[j].getAttribute('y') == myY - 2 && allBlocks[j].childNodes.length != 0) allBlocks[j].classList.add(`attack+${teamNum}`)

                if (allBlocks[j].getAttribute('x') == myX - 1 && allBlocks[j].getAttribute('y') == myY - 2 && allBlocks[j].childNodes.length == 0) allBlocks[j].classList.add(`attack+${teamNum}`)
                else if (allBlocks[j].getAttribute('x') == myX - 1 && allBlocks[j].getAttribute('y') == myY - 2 && allBlocks[j].childNodes.length != 0) allBlocks[j].classList.add(`attack+${teamNum}`)

                if (allBlocks[j].getAttribute('x') == myX + 2 && allBlocks[j].getAttribute('y') == myY + 1 && allBlocks[j].childNodes.length == 0) allBlocks[j].classList.add(`attack+${teamNum}`)
                else if (allBlocks[j].getAttribute('x') == myX + 2 && allBlocks[j].getAttribute('y') == myY + 1 && allBlocks[j].childNodes.length != 0) allBlocks[j].classList.add(`attack+${teamNum}`)

                if (allBlocks[j].getAttribute('x') == myX + 2 && allBlocks[j].getAttribute('y') == myY - 1 && allBlocks[j].childNodes.length == 0) allBlocks[j].classList.add(`attack+${teamNum}`)
                else if (allBlocks[j].getAttribute('x') == myX + 2 && allBlocks[j].getAttribute('y') == myY - 1 && allBlocks[j].childNodes.length != 0) {
                    allBlocks[j].classList.add(`attack+${teamNum}`)

                    if (allBlocks[j].getAttribute('x') == myX - 2 && allBlocks[j].getAttribute('y') == myY + 1 && allBlocks[j].childNodes.length == 0) allBlocks[j].classList.add(`attack+${teamNum}`)
                    else if (allBlocks[j].getAttribute('x') == myX - 2 && allBlocks[j].getAttribute('y') == myY + 1 && allBlocks[j].childNodes.length != 0) allBlocks[j].classList.add(`attack+${teamNum}`)

                    if (allBlocks[j].getAttribute('x') == myX - 2 && allBlocks[j].getAttribute('y') == myY - 1 && allBlocks[j].childNodes.length == 0) allBlocks[j].classList.add(`attack+${teamNum}`)
                    else if (allBlocks[j].getAttribute('x') == myX - 2 && allBlocks[j].getAttribute('y') == myY - 1 && allBlocks[j].childNodes.length != 0) allBlocks[j].classList.add(`attack+${teamNum}`)
                }
            }
        }
    }
}

function reset() {
    for (let j = 0; j < allBlocks.length; j++) {
        allBlocks[j].classList.remove('attack+1')
        allBlocks[j].classList.remove('attack+2')
    }
}

let FiguresScore = {
    't': 9,
    'n': 5,
    'p': 3,
    'd': 3,
    'z': 1,
}


function check2(el2) {
    for (let i = 0; i < allBlocks.length; i++) {
        allBlocks[i].addEventListener('click', function () {
            if (allBlocks[i].style.backgroundColor == color) {
                let el2 = document.getElementsByClassName('active')[0]
                if (allBlocks[i].childNodes.length == 0 || allBlocks[i].childNodes.length == 1 && allBlocks[i].childNodes[0].getAttribute('team') != el2.getAttribute('team')) {

                    let newX = el2.getAttribute('x')
                    let newY = el2.getAttribute('y')
                    let lastPos = el2.parentNode
                    let atedEl = allBlocks[i].childNodes[0]
                    let isElem = false

                    if (allBlocks[i].childNodes.length == 1 && allBlocks[i].childNodes[0].getAttribute('team') != el2.getAttribute('team')) {
                        allBlocks[i].childNodes[0].style.width = '6%'
                        allBlocks[i].childNodes[0].style.height = '30%'
                        if (el2.getAttribute('team') == 1) val1.innerHTML = Number(val1.innerHTML) + FiguresScore[allBlocks[i].childNodes[0].getAttribute('type')]
                        else if (el2.getAttribute('team') == 2) val2.innerHTML = Number(val2.innerHTML) + FiguresScore[allBlocks[i].childNodes[0].getAttribute('type')]
                        a.appendChild(allBlocks[i].childNodes[0])
                        // allBlocks[i].childNodes[0].setAttribute('x','-10')
                        // allBlocks[i].childNodes[0].setAttribute('y','-10')
                        // atedEl = allBlocks[i].childNodes[0]
                        isElem = true
                    }
                    //----------------------------------------------------------------------------------
                    if (el2.getAttribute('type') == 'a') {
                        if (el2.getAttribute('team') == 1) {
                            if (i == 1 && allBlocks[0].childNodes[0].getAttribute('team') == el2.getAttribute('team') && allBlocks[0].childNodes[0].getAttribute('type') == 'n' && allBlocks[1].childNodes.length == 0 &&
                                allBlocks[2].childNodes.length == 0 && allBlocks[3].childNodes.length == 0 && allBlocks[4].childNodes[0].getAttribute('team') == el2.getAttribute('team') &&
                                allBlocks[4].childNodes[0].getAttribute('type') == 'a' && !el2.parentNode.classList.contains(`attack+2`) && arqaSteps == 0) {
                                navakMove(2)
                            }
                            if (i == 6 && allBlocks[7].childNodes[0].getAttribute('team') == el2.getAttribute('team') && allBlocks[7].childNodes[0].getAttribute('type') == 'n' && allBlocks[6].childNodes.length == 0 &&
                                allBlocks[5].childNodes.length == 0 && allBlocks[4].childNodes[0].getAttribute('team') == el2.getAttribute('team')
                                && allBlocks[4].childNodes[0].getAttribute('type') == 'a' && !el2.parentNode.classList.contains(`attack+2`) && arqaSteps == 0) {
                                navakMove(1)
                            }
                        }
                        else {
                            if (i == 62 && allBlocks[63].childNodes[0].getAttribute('team') == el2.getAttribute('team') && allBlocks[63].childNodes[0].getAttribute('type') == 'n' && allBlocks[62].childNodes.length == 0 &&
                                allBlocks[61].childNodes.length == 0 && allBlocks[60].childNodes.length == 0 && allBlocks[59].childNodes[0].getAttribute('team') == el2.getAttribute('team') &&
                                allBlocks[59].childNodes[0].getAttribute('type') == 'a' && !el2.parentNode.classList.contains(`attack+1`) && arqaSteps2 == 0) {
                                navakMove(4)
                            }
                            if (i == 57 && allBlocks[56].childNodes[0].getAttribute('team') == el2.getAttribute('team') && allBlocks[56].childNodes[0].getAttribute('type') == 'n' && allBlocks[57].childNodes.length == 0 &&
                                allBlocks[58].childNodes.length == 0 && allBlocks[59].childNodes[0].getAttribute('team') == el2.getAttribute('team')
                                && allBlocks[59].childNodes[0].getAttribute('type') == 'a' && !el2.parentNode.classList.contains(`attack+1`) && arqaSteps2 == 0) {
                                navakMove(3)
                            }
                        }
                    }
                    if (el2.getAttribute('team') == 1 && el2.getAttribute('type') == 'a' && arqaSteps == 0) arqaSteps++
                    if (el2.getAttribute('team') == 2 && el2.getAttribute('type') == 'a' && arqaSteps2 == 0) arqaSteps2++

                    allBlocks[i].appendChild(el2)
                    el2.setAttribute('x', allBlocks[i].getAttribute('x'))
                    el2.setAttribute('y', allBlocks[i].getAttribute('y'))

                    checkMat()
                    if (whoNext && fig[4].parentNode.classList.contains('attack+2')) {
                        lastPos.appendChild(el2)
                        el2.setAttribute('x', newX)
                        el2.setAttribute('y', newY)
                        if (isElem == true) {
                            atedEl.style.width = '90%'
                            atedEl.style.height = ''
                            allBlocks[i].appendChild(atedEl)
                            val1.innerHTML = Number(val1.innerHTML) - FiguresScore[allBlocks[i].childNodes[0].getAttribute('type')]
                        }
                        if (el2.getAttribute('team') == 1 && el2.getAttribute('type') == 'a' && arqaSteps == 1) arqaSteps--
                        if (el2.getAttribute('team') == 2 && el2.getAttribute('type') == 'a' && arqaSteps2 == 1) arqaSteps2--
                        if (el2.getAttribute('type') == 'a') {
                            activeNavak.setAttribute('x', activeNavakCord.x)
                            activeNavak.setAttribute('y', activeNavakCord.y)
                            for (let b = 0; b < allBlocks.length; b++) {
                                let current = allBlocks[b]
                                if (current.getAttribute('x') == activeNavakCord.x && current.getAttribute('y') == activeNavakCord.y)
                                    current.appendChild(activeNavak)
                            }
                            // navakLastPos.appendChild(activeNavak)
                        }
                        whoNext = !whoNext
                    }
                    else if (!whoNext && fig[27].parentNode.classList.contains('attack+1')) {
                        lastPos.appendChild(el2)
                        el2.setAttribute('x', newX)
                        el2.setAttribute('y', newY)
                        if (isElem == true) {
                            atedEl.style.width = '90%'
                            atedEl.style.height = ''
                            allBlocks[i].appendChild(atedEl)
                            val2.innerHTML = Number(val2.innerHTML) - FiguresScore[allBlocks[i].childNodes[0].getAttribute('type')]
                        }
                        if (el2.getAttribute('team') == 1 && el2.getAttribute('type') == 'a' && arqaSteps == 1) arqaSteps--
                        if (el2.getAttribute('team') == 2 && el2.getAttribute('type') == 'a' && arqaSteps2 == 1) arqaSteps2--
                        if (el2.getAttribute('type') == 'a') {
                            activeNavak.setAttribute('x', activeNavakCord.x)
                            activeNavak.setAttribute('y', activeNavakCord.y)
                            for (let b = 0; b < allBlocks.length; b++) {
                                let current = allBlocks[b]
                                if (current.getAttribute('x') == activeNavakCord.x && current.getAttribute('y') == activeNavakCord.y)
                                    current.appendChild(activeNavak)
                            }
                        }
                        // whoNext
                        whoNext = !whoNext
                    }
                    activeNavak = undefined

                    if (el2.getAttribute('type') == 'z' && el2.getAttribute('y') == 0 && el2.getAttribute('team') == 2) {
                        let changedEl = document.querySelectorAll('.changeEl2')
                        for (let l = 0; l < changedEl.length; l++) {
                            changedEl[l].style.display = 'block'
                            changedEl[l].addEventListener('click', function () {
                                if (this.classList.contains('t')) {
                                    el2.setAttribute('type', 't')
                                    el2.src = 'img/t2-t.png'

                                }
                                else if (this.classList.contains('n')) {
                                    el2.setAttribute('type', 'n')
                                    el2.src = 'img/t2-n.png'

                                }
                                else if (this.classList.contains('p')) {
                                    el2.setAttribute('type', 'p')
                                    el2.src = 'img/t2-p.png'

                                }
                                else if (this.classList.contains('d')) {
                                    el2.setAttribute('type', 'd')
                                    el2.src = 'img/t2-d.png'

                                }
                                for (let b = 0; b < changedEl.length; b++) {
                                    changedEl[b].style.display = 'none'
                                }

                            })
                        }
                    }
                    else if (el2.getAttribute('type') == 'z' && el2.getAttribute('y') == 7 && el2.getAttribute('team') == 1) {
                        let changedEl = document.querySelectorAll('.changeEl')
                        for (let l = 0; l < changedEl.length; l++) {
                            changedEl[l].style.display = 'block'
                            changedEl[l].addEventListener('click', function () {
                                if (this.classList.contains('t')) {
                                    el2.setAttribute('type', 't')
                                    el2.src = 'img/t1-t.png'

                                }
                                else if (this.classList.contains('n')) {
                                    el2.setAttribute('type', 'n')
                                    el2.src = 'img/t1-n.png'

                                }
                                else if (this.classList.contains('p')) {
                                    el2.setAttribute('type', 'p')
                                    el2.src = 'img/t1-p.png'

                                }
                                else if (this.classList.contains('d')) {
                                    el2.setAttribute('type', 'd')
                                    el2.src = 'img/t1-d.png'

                                }
                                for (let b = 0; b < changedEl.length; b++) {
                                    changedEl[b].style.display = 'none'
                                }

                            })
                        }
                    }

                    for (let j = 0; j < allBlocks.length; j++) {
                        allBlocks[j].style.backgroundColor = allBlocks[j].getAttribute('color')
                    }
                    if (fig[4].parentNode.classList.contains('attack+2')) fig[4].parentNode.style.backgroundColor = 'red'
                    if (fig[27].parentNode.classList.contains('attack+1')) fig[27].parentNode.style.backgroundColor = 'red'
                    whoNext = !whoNext
                    if (whoNext == true) whoNextText.innerHTML = "It's Time for Player 1"
                    else whoNextText.innerHTML = "It's Time for Player 2"
                    el2.classList.remove('active')
                    reset()
                }

            }
        })
    }
}
let activeNavak;
let navakLastPos;
let activeNavakCord = {
    x: 0,
    y: 0
}

function navakMove(id) {
    if (id == 1) {
        allBlocks[5].appendChild(fig[7])
        activeNavak = fig[7]
        navakLastPos = activeNavak.parentNode
        activeNavakCord.x = fig[7].getAttribute('x')
        activeNavakCord.y = fig[7].getAttribute('y')
        fig[7].setAttribute('x', 5)
    }
    if (id == 2) {
        allBlocks[2].appendChild(fig[0])
        activeNavak = fig[0]
        navakLastPos = activeNavak.parentNode
        activeNavakCord.x = fig[0].getAttribute('x')
        activeNavakCord.y = fig[0].getAttribute('y')
        fig[0].setAttribute('x', 2)
    }
    if (id == 3) {
        allBlocks[58].appendChild(fig[24])
        activeNavak = fig[24]
        navakLastPos = activeNavak.parentNode
        activeNavakCord.x = fig[24].getAttribute('x')
        activeNavakCord.y = fig[24].getAttribute('y')
        fig[24].setAttribute('x', 2)
    }
    if (id == 4) {
        allBlocks[61].appendChild(fig[31])
        activeNavak = fig[31]
        navakLastPos = activeNavak.parentNode
        activeNavakCord.x = fig[31].getAttribute('x')
        activeNavakCord.y = fig[31].getAttribute('y')
        fig[31].setAttribute('x', 5)
    }
}

