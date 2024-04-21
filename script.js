
function element(tag, classname, id, text) {
    let tags = document.createElement(tag);
    tags.classList=classname;
    tags.id = id;
    tags.innerHTML = text;
    return tags;
  }
const Cont = element("div","container","","");
const title = element("h1","text-center","title","");
const Row = element("div","row","rows","");

const res = fetch("https://restcountries.com/v3.1/all");

title.innerHTML="Weather of countries"





res.then((e)=>e.json()).then((item)=>{

for(let i=0;i<=item.length;i++){
   let lati;
   let longi;
 if(item[i].capitalInfo.latlng){
   lati =item[i].capitalInfo.latlng[0];
  longi =item[i].capitalInfo.latlng[1];
 }
   // console.log(lati,longi)
   const Temp =element("div","temp","temp","");
const Col = element("div","col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 g-2 text-center","","");
const Card = element("div","card","","")
const Cardtitle = element("div","card-header","name","");
const Cardbody = element("div","card-body","","");
const Image1 = element("img","card-img-top p-3","image","");
const Weather = element("p","h-25","weather","&nbsp;");
const Button = element("button","btn btn-primary","","Click for Weather");
Button.addEventListener("click",()=>{
  if(Weather.innerHTML === "&nbsp;"){
    const location = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&units=metric&appid=fb764be4bfdca6671a8d9f259680c56e`);
    location.then((e)=>e.json()).then((ele)=>{Weather.innerHTML=`${ele.main.temp}°C`}).catch((error)=>console.log(error))
  }else{
    Weather.innerHTML="&nbsp;";
  }
 })
// const latLong = (lat,long) 

   Image1.src=item[i].flags.png
   Cardtitle.innerHTML=`${item[i].name.common}`;
   Cardbody.innerHTML = `
   <p>Capital: ${item[i].capital}</p>
   <p>Region: ${item[i].region}</p>
   <p>Country Code: ${item[i].cca3}</p>`
   Cardbody.append(Weather,Button);
   Card.append(Cardtitle,Image1,Cardbody)
   Col.append(Card);
   Row.append(Col);

}
}).catch((error)=>console.log(error))
Cont.append(title,Row);

document.body.append(Cont)
