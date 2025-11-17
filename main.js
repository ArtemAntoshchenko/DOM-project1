async function getCars(){
    const respons= await fetch('/cars', {method:'GET', headers:{'Accept':'application/json'}})
    if (respons.ok === true){
        const cars=await respons.json()
        const rows=document.querySelector('tbody')
        cars.forEach(car=>rows.append(row(car)))
    }
        

}