function clearEntities() {
    $.post('/clearEntities');
}
$.post('/clearEntities');
window.onload = clearEntities;