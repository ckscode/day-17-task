
function element(tag, classname, id, text) {
    let tags = document.createElement(tag);
    tags.classList=classname;
    tags.id = id;
    tags.innerHTML = text;
    return tags;
  }
const Cont = element("div","container","","");
const title = element("h1","text-center","title","");
const Row = element("div","row" ,"rows","");
title.innerHTML="Weather of countries"
const res = fetch("https://restcountries.com/v3.1/all");

document.body.classList="bg-secondary"
res.then((e)=>e.json()).then((item)=>{

for(let i=0;i<item.length;i++){
const Col = document.createElement("div");
Col.classList = "col-sm-6 col-md-4 col-lg-4 col-xl-4 my-2"
  Col.innerHTML=`
  <div class="card h-100 text-center text-white bg-dark border-secondary">
  <div class="card-header border-bottom border-secondary">
  <h2 class="card-title">${item[i].name.common}</h2></div>
  <div class="image-card p-3">
  <img src="${item[i].flags.png}" class="card-img-top rounded-2 " alt="card image"/></div>
  <div class="card-body pt-1">
  <div class="card-text py-1 text-center">Region: ${item[i].region}</div>
  <div class="card-text py-1 text-center">Capital: ${item[i].capital}</div>
  <div class="card-text py-1 text-center">Country Code: ${item[i].cca3}</div>
  <p id="weather" class="mb-0 weather">&nbsp;</p>
  <button class="btn btn-primary mt-2 buttons" id="button">Click for Weather</button>
  </div>
  </div>
  `
   Row.append(Col);
}

const Button1 = document.querySelectorAll(".buttons");

Button1.forEach((e,index)=>{
    e.addEventListener("click",()=>{
      const Lati = Math.round(item[index].latlng[0]);
      const Longi = Math.round(item[index].latlng[1]);
      const Temp = document.querySelectorAll(".weather")
      const rest = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${Lati}&lon=${Longi}&appid=fb764be4bfdca6671a8d9f259680c56e&units=metric`);
      rest.then((e)=>e.json()).then((ele)=>{
        if(Temp[index].innerHTML === "&nbsp;"){
          Temp[index].innerHTML=`Temperature: ${ele.main.temp}°C`
        }else{
          Temp[index].innerHTML="&nbsp;";
        }
      }).catch(err=>console.log(err))
    })
})

}).catch((error)=>console.log(error))
Cont.append(title,Row);

document.body.append(Cont)
