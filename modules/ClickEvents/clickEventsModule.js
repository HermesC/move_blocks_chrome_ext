const movedClassName = 'elem-being-moved'


//*********************** ВХОДНАЯ ТОЧКА ДЛЯ ОБРАБОТКА КЛИКОВ МЫШИ****************
function handleMouseClick(){
    document.addEventListener('click', function (e){
        reset()       
        highlightSelectedElement($(e.target))
        initializeLocalStorage()
        rememberCurrentElement($(e.target))    
    })
}
//*********************** ВХОДНАЯ ТОЧКА ДЛЯ ОБРАБОТКА КЛИКОВ МЫШИ****************


function initializeLocalStorage(x = 0, y = 0){
    updateLocalStorage(x, y)
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
function reset(){
    
}
//! DEPRECATED
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
//! DEPRECATED
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
