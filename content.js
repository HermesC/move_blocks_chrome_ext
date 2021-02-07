const movedClassName = 'elem-being-moved'
const keys = {}
const keyBindings= [
    {'activateControlPanel' : [19, 77]},
    {'moveUp' :[87]},
    {'moveDown': [83]},
    {'moveLeft': [65]},
    {'moveRight': [68]}
]
const actionsDispather = {
    'activateControlPanel' : activateControlPanel,
    'moveUp' : moveUp,
    'moveDown': moveDown,
    'moveLeft': moveLeft,
    'moveRight': moveRight
}
document.addEventListener('click', function (e){       
    highlightSelectedElement($(e.target))
    initializeLocalStorage()
    rememberCurrentElement($(e.target))
    
    $(document).keydown(function (e){
        //* ЗАПОМИНАЕТ НАЖАТУЮ КЛАВИШУ, СДЕЛАНО ДЛЯ ОБРАБОТКИ СОЧЕТАНИЙ КЛАВИШ
        keys[e.which] = true
        dispatchKeyBindEvent(keys, e.target.pageX, e.target.pageY)
        handleKeyPress($('.' + movedClassName), e.key, 1)
    })
    $(document).keyup(function (e){
        delete keys[e.which]
        forgetCurrentElement('.' + movedClassName)
    })

})
function dispatchKeyBindEvent(pressedKeys, args){
    let event = null;
    Object.keys(pressedKeys).some(key => keyBindings.every(keyBindData => Object.values(keyBindData).some(keyCode => keyCode === key) ? event = Object.keys(keyBindData)[0] : false));
    if (event !== null && actionsDispather.hasOwnProperty(event)){
        actionsDispather[event].call(this, ...args)
    }
}
function findElementUnderMouse(x, y, $root){
    if (iscursorWithinElement(x, y, $root)){
        const children = $root.children()
        if (children.length !== 0 ){
            children.each(index => {
                const test = children[index]
                if (iscursorWithinElement(x,y,$(children[index]))){
                    return findElementUnderMouse(x,y, $(children[index]))
                }
            })                       
        }else{
            return $root
        }
    }
}
function moveElement($elem, x_offset, y_offset){
    x_prev = parseInt(localStorage.getItem('prev_x') ? localStorage.getItem('prev_x') : 0)
    y_prev = parseInt(localStorage.getItem('prev_y') ? localStorage.getItem('prev_y') : 0)

    $elem.css('transform',  `translate3d(${x_offset + x_prev}px, ${y_offset + y_prev}px, 0px)`)
    localStorage.setItem('prev_x', Number(x_offset + x_prev))
    localStorage.setItem('prev_y', Number(y_offset + y_prev))
}
function handleKeyPress($element, keyCode, step){
    switch(keyCode){
        case 'w':
            moveElement($element, 0, -step)
                break
        case 's':
            moveElement($element, 0, step)
                break
        case 'a':
            moveElement($element, -step, 0)
                break
        case 'd':
            moveElement($element, step, 0)
                break
    }
}
function iscursorWithinElement(mouse_x, mouse_y, $elem){
    if ($elem){

        const x = $elem.offset().top
        const y = $elem.offset().left
        const x_top = $elem.offset().top + $elem.width()
        const y_top = $elem.offset().left + $elem.height()
        if ((mouse_x <= x_top && mouse_x >= x) && (mouse_y <= y_top && mouse_y >= y)){
            return true
        }
    }
    return false
}
function initializeLocalStorage(x = 0, y = 0){
    localStorage.setItem('prev_x', Number(x))
    localStorage.setItem('prev_y', Number(y))
}
function updateLocalStorage(x, y){
    localStorage.setItem('prev_x', Number(x))
    localStorage.setItem('prev_y', Number(y))
}
function highlightSelectedElement($element){
    $element.css({'background-color': 'orange'})
}
function rememberCurrentElement($element){
    $element.addClass(movedClassName)
}
function forgetCurrentElement(identifier){
    $(identifier).removeClass(identifier)
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