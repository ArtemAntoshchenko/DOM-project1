async function getCars(){
    const respons= await fetch('/cars', {method:'GET', headers:{'Accept':'application/json'}})
    if (respons.ok === true){
        const cars=await respons.json()
        const rows=document.querySelector('tbody')
        cars.forEach(car=>rows.append(row(car)))
    }
}

async function getCar(id){
    const respons=await fetch(`/cars/${id}`, {method:'GET', headers:{'Accept':'application/json'}})
    if (respons.ok===true){
        const car=await respons.json()
        document.getElementById('carId').value=car.id
        document.getElementById('carName').value=car.name
        document.getElementById('carMark').value=car.mark
        document.getElementById('carColor').value=car.color
    }
    else {
        const error=await respons.json()
        console.log(error.message)
    }
    
}

async function createCar(carName,carMark,carColor){
    const respons=await fetch('cars', {
        method:'Get', 
        headers:{'Accept':'application/json'}, 
        body:JSON.stringify({name:carName, mark:carMark, clolor:carColor})
    }) 
    if (respons.ok===true){
        const car=await respons.json()
        document.querySelector('tbody').append(row(car))
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

    const linksTd=document.createElement('td')

    const buyLink=document.createElement('button')
    buyLink.append('Купить автомобиль')
    buyLink.addEventListener('click', async()=>await getCar(car.id))

    linksTd.append(buyLink)
    tr.appendChild(linksTd)
    return tr

}