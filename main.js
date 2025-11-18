async function getCars(){
    const respons= await fetch('/cars', {method:'GET', headers:{'Accept':'application/json'}})
    if (respons.ok === true){
        const cars=await respons.json()
        const rows=document.querySelector('tbody')
        cars.forEach(car=>rows.append(row(car)))
    }
}
function row(car){
    const tr=document.createElement('tr')
    tr.setAttribute('data-rowid', car.id)

    const nameTd=document.createElement('td')
    nameTd.append(car.name)
    tr.append(nameTd)

    const markTd=document.createElement('td')
    markTd.append(car.mark)
    tr.append(markTd)

    const colorTd=document.createElement('td')
    colorTd.append(car.color)
    tr.append(colorTd)
}