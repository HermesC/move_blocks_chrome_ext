//*************** ВХОДНАЯ ТОЧКА ДЛЯ ОБРАБОТКИ НАЖАТИЙ КЛАВИШ  ********
function handleKeyBoardInput(){
    $(document).keydown(function (e){
        //* ЗАПОМИНАЕТ НАЖАТУЮ КЛАВИШУ, СДЕЛАНО ДЛЯ ОБРАБОТКИ СОЧЕТАНИЙ КЛАВИШ
        keys[e.which] = true    
        dispatchKeyBindEvent(keys, $(e.target), 1)
    })
    $(document).keyup(function (e){
        //* ЗАБЫВАЕМ ОТПУЩЕННУЮ КЛАВИШУ
        delete keys[e.which]
    })
}
//*************** ВХОДНАЯ ТОЧКА ДЛЯ ОБРАБОТКИ НАЖАТИЙ КЛАВИШ  ********

const keys = {}
const actionsDispather = {
    'activateControlPanel': activateControlPanel,
    'moveUp' : moveUp,
    'moveDown': moveDown,
    'moveLeft': moveLeft,
    'moveRight': moveRight
}
const keyBindings= {
    'activateControlPanel' : [19, 77],
    'moveUp' :[87],
    'moveLeft': [65],
    'moveDown': [83],
    'moveRight': [68]
}

function dispatchKeyBindEvent(pressedKeys, $elem, step){
    const pressedKeyBind = getFirstPressedKeybind(Object.keys(pressedKeys), keyBindings)
    if (pressedKeyBind){
        
        actionsDispather[pressedKeyBind].call(this, $elem, step)

    }else{
    }
}
function getFirstPressedKeybind(pressedKeys, keyBinds) {
    const keyBindsIterable = Object.values(keyBinds)
    for(let i =0; i < keyBindsIterable.length; i++){
        if (keyBindsIterable[i].every(keyCode => pressedKeys.some(pressedKey => Number(pressedKey) === keyCode))){
            return Object.keys(keyBinds)[i]
        }
    }
    return null
}
function activateControlPanel(){
    const panelId = 'autofocus-control-panel'
    const controlPanelHtml = createControlPanel(panelId)
    insertControlPanel(controlPanelHtml, 'body')
    addListenersToControlPanel(panelId)   
}
function createControlPanel(id){
    let controlPanelHtml = `<div id="${id}">
    </div>`
}
function insertControlPanel(html, whereToInsert){
    $(whereToInsert).html(html)
}

function addListenersToControlPanel(id){
    const panel = $(`#${id}`)
    if (panel){

    }
}
function moveUp($element, step){
    moveElement($element, 0, -step)
}
function moveLeft($element, step){
    moveElement($element, -step, 0)
}
function moveDown($element, step){
    moveElement($element, 0, step)
}
function moveRight($element,step){
    moveElement($element, 0, -step)
}
function moveElement($elem, x_offset, y_offset){
    x_prev = parseInt(localStorage.getItem('prev_x') ? localStorage.getItem('prev_x') : 0)
    y_prev = parseInt(localStorage.getItem('prev_y') ? localStorage.getItem('prev_y') : 0)
    $elem.css('transform',  `translate3d(${x_offset + x_prev}px, ${y_offset + y_prev}px, 0px)`)
    localStorage.setItem('prev_x', Number(x_offset + x_prev))
    localStorage.setItem('prev_y', Number(y_offset + y_prev))
}