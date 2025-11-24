async function getCars() {
    const respons=await fetch('/cars', {method:'GET', headers:{'Accept':'application/json'}})
    if (respons.ok === true){
        const cars=await respons.json()
        const rows=document.querySelector('#tbodyCars')
        cars.forEach(car=>rows.append(row(car)))
    }
}
    
async function get_soldCars() {
    const respons=await fetch('/soldcars',{method:'GET', headers:{'Accept':'application/json'}})
    if (respons.ok === true){
            const soldCars=await respons.json()
            const rows=document.querySelector('#tbodySoldCars')
            soldCars.forEach(car=>rows.append(soldRow(car)))
        }
        
    }
    
    async function getCar(id) {
        const respons=await fetch(`/cars/${id}`, {method:'GET', headers:{'Accept':'application/json'}})
        if (respons.ok===true){
            const car=await respons.json()
            document.querySelector('#carId').value=car.id
            document.querySelector('#carName').value=car.name
            document.querySelector('#carMark').value=car.mark
            document.querySelector('#carColor').value=car.color
        }
        else {
            const error=await respons.json()
            console.log(error.message)
        }
        
    }
    
    async function get_soldCar(id) {
        const respons=await fetch(`/soldcars/${id}`, {method:'GET', headers:{'Accept':'application/json'}})
        if (respons.ok===true){
            const car=await respons.json()
            document.querySelector('#carId').value=car.id
            document.getElementById('carName').value=car.name
            document.getElementById('carMark').value=car.mark
            document.getElementById('carColor').value=car.color
        }
        else {
            const error=await respons.json()
            console.log(error.message)
        }
        
    }
    
    async function createCar(carName,carMark,carColor) {
        let string={name:carName, mark:carMark, color:carColor}
        const respons=await fetch('/cars', {
            method:'POST', 
            headers:{'Accept':'application/json'}, 
            body: JSON.stringify(string)
        }) 
        if (respons.ok===true){
            const car=await respons.json()
            document.querySelector('#tbodyCars').append(row(car))
        }
    }
    
    async function buyCar(id,name,mark,color) {
        const respons=await fetch('/soldcars', {
            method:'POST', 
            headers:{'Accept':'application/json'},
            body: JSON.stringify({id:id,name:name, mark:mark, color:color})
        })
        if (respons.ok===true){
            const car=await respons.json()
            document.querySelector(`td[data-rowid='${car.id}']`).remove()
            document.querySelector('#tbodySoldCars').append(soldRow(car))
        }
    }
    
    async function editCar(carId,carName,carMark,carColor) {
        const respons=await fetch('/cars', {
            method:'PUT',
            headers:{'Accept':'application/json'},
            body: JSON.stringify({id:carId, name:carName, mark:carMark, color:carColor})
        })
        if (respons.ok===true){
            const car=await respons.json()
            document.querySelector(`tr[data-rowid='${car.id}']`).replaceWith(row(car))
        }
        else {
            const error=await respons.json()
            console.log(error.message)
        }
    }
    
    async function edit_soldCar(carId,carName,carMark,carColor) {
        const respons=await fetch('/soldcars', {
            method:'PUT',
            headers:{'Accept':'application/json'},
            body: JSON.stringify({id:carId, name:carName, mark:carMark, color:carColor})
        })
        if (respons.ok===true){
            const car=await respons.json()
            document.querySelector(`tr[data-rowid='${car.id}']`).replaceWith(soldRow(car))
        }
        else {
            const error=await respons.json()
            console.log(error.message)
        }
    }
    
    async function deleteCar(id) {
        const respons=await fetch(`/cars/${id}`, {
            method:'DELETE',
            headers:{'Accept':'application/json'}
        })
        if (respons.ok===true){
            const car=await respons.json()
            document.querySelector(`td[data-rowid='${car.id}']`).remove()
        }
        else {
            const error=await respons.json()
            console.log(error.message)
        }
    }
    
    async function delete_soldCar(id) {
        const respons=await fetch(`/soldcars/${id}`, {
            method:'DELETE',
            headers:{'Accept':'application/json'}
        })
        if (respons.ok===true){
            const car=await respons.json()
            document.querySelector(`td[data-rowid='${car.id}']`).remove()
        }
        else {
            const error=await respons.json()
            console.log(error.message)
        }
    }
    
    function row(car) {
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
        buyLink.addEventListener('click', async()=>await buyCar(car.id, car.name, car.mark, car.color))
        linksTd.append(buyLink)
    
        const editCar=document.createElement('button')
        editCar.append('Изменить автомобиль')
        editCar.addEventListener('click', async()=>await getCar(car.id))
        linksTd.append(editCar)
    
        const deleteLink=document.createElement('button')
        deleteLink.append('Удалить автомобиль')
        deleteLink.addEventListener('click', async()=>await deleteCar(car.id))
        linksTd.append(deleteLink)
    
        tr.appendChild(linksTd)
        return tr
    }
    
    function soldRow(car) {
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
    
        const editLink=document.createElement('button')
        editLink.append('Изменить автомобиль')
        editLink.addEventListener('click', async()=>await get_soldCar(car.id))
        linksTd.append(editLink)
    
        const deleteLink=document.createElement('button')
        deleteLink.append('Удалить автомобиль')
        deleteLink.addEventListener('click', async()=>await delete_soldCar(car.id))
        linksTd.append(deleteLink)
    
        tr.appendChild(linksTd)
        return tr
    }
    
    function reset(){
        document.getElementById('carId').value=
        document.getElementById('carName').value=''
        document.getElementById('carMark').value=''
        document.getElementById('carColor').value=''
    }
    
    document.getElementById('save').addEventListener('click', async()=>{
        const id=document.getElementById('carId').value
        const name=document.getElementById('carName').value
        const mark=document.getElementById('carMark').value
        const color=document.getElementById('carColor').value
        if (id===''){
            await createCar(name,mark,color)
        }
        else {
        //     if(id in getCars()){
        //         await editCar(id,name,mark,color)
        //     }
        //     else {
        //         await edit_soldCar(id,name,mark,color)
        //     }
            await editCar(id,name,mark,color)
        }
        reset()  
    })
    
getCars()
get_soldCars()