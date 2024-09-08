let car=!1;function rand(e,t){return Math.floor(Math.random()*(t-e+1))+e}function roundNumber(e){const t=Math.floor(e);return e-t<.5?t:t+1}function updateInfo(){const e=document.querySelector("#mileage"),t=document.querySelector("#money"),a=document.querySelector("#bitcoin"),i=document.querySelector("#gasolinePrice"),o=document.querySelector("#dieselPrice"),r=(document.querySelector("#electricityPrice"),document.querySelector("#bitcoinRate")),n=document.querySelector("#gameDays");e.innerHTML=e&&car?`Mileage: ${car.allmileage} KM`:"Mileage: 0  KM",t&&(t.innerHTML=`Money: ${player.money}$`),a&&(a.innerHTML=`Bitcoin: ${player.bitcoin}`),i&&(i.innerHTML=`Gasoline price: ${world.gasolinePrice}$ / 1L`),o&&(o.innerHTML=`Diesel price: ${world.dieselPrice}$ / 1L`),r&&(r.innerHTML=`Bitcoin rate: ${world.bitcoinRate}$`),n&&(n.innerHTML=`Game Days: ${world.day}`)}class World{constructor(){this.day=0,this.bitcoinRate=rand(1e4,95e3),this.previousDay=0,this.gasolinePrice=17,this.dieselPrice=25,this.electricityPrice=1}}class Player{constructor(){this.isDriving=!1,this.allTravelTime=0,this.isMiningFarm=!1,this.bitcoin=0,this.money=0,this.hasWork=!1,this.hasCar=!1,this.dayWitoutFood=0,this.drunkenness=0,this.location="In world",this.expectation=0,this.waitingForTranslitomHana=10}goSleep(){let e;alert("The day is over."),world.previousDay=world.day,world.day++,world.bitcoinRate=rand(1e4,5e4),car&&car.open&&e<=0&&(alert("You forgot to close the car! In the future, we recommend closing it at night."),e=rand(0,100));let t=rand(1,100);t<40?world.gasolinePrice+=1:t>=60&&(world.gasolinePrice-=1);let a=rand(1,100);a<40?world.dieselPrice+=1:a>=60&&(world.dieselPrice-=1);let i=rand(1,100);if(i<40?world.electricityPrice+=.1:i>=60&&(world.electricityPrice-=.1),this.drunkenness=0,this.isMiningFarm&&!this.isDriving?(this.bitcoin+=.2,alert(`Mining farm produced 0.2 bitcoins. Total bitcoins: ${this.bitcoin}`)):this.isDriving&&alert("You are driving a car."),world.day-world.previousDay==1&&this.money>=20&&this.money>=455){let e=this.money;this.money-=rand(20,455),alert("Spent on food today: "+(e-this.money))}else if(world.day-world.previousDay==1&&this.money>=20&&this.money<455){let e=this.money;this.money-=rand(20,this.money),alert("Spent on food today: "+(e-this.money))}else this.dayWitoutFood++,this.dayWitoutFood>=4?(alert("You didn't eat for 4 days, that's why you ended up in the hospital"),this.dayWitoutFood=0,world.day++):this.dayWitoutFood>=2?(alert(`You haven't eaten in ${this.dayWitoutFood} days, better find money to eat.`),this.hasWork?alert("Go to work!"):alert("Go find a job!")):alert("You didn't have money for food, we advise you to find money as soon as possible");car&&car.ignition&&!this.isDriving&&car.accumCapacity>0&&car.checkBattery(),!this.hasCar&&this.money>45e3&&alert("You can buy a car!")}goParty(){if(this.money>50){alert("You came to the party.");let e,t=prompt("What will you drink? Water - 50, Tequila - 160, Cognac - 700, Decide randomly"),a=0,i=!0,o=!0,r=0;for(;;){if(this.drunkenness>=100){alert(`You're drunk. Your costs ${r}`);break}if("Decide randomly"===t){let t=rand(1,3);1===t?e=rand(50,800):2===t?e=480:3===t&&(e=rand(1400,1700)),r+=e,this.money;break}if("Water"===t)a=50;else if("Tequila"===t)a=160,this.drunkenness+=70;else{if("Cognac"!==t){if(t){alert("Invalid choice. Please choose a valid drink."),t=prompt("What will you drink? Water - 50, Tequila - 160, Cognac - 700, Decide randomly");continue}break}a=700,this.drunkenness+=100}if(this.money>=a&&"Decide randomly"!=t){if(alert(`You have spent ${a} money`),this.money-=a,a+=a,this.drunkenness>=160){alert("You're drunk.");break}if(i=confirm("Repeat?"),!i){if(o=confirm("Choose another drink?"),!o)break;t=prompt("What will you drink? Water - 50, Tequila - 160, Cognac - 700, Decide randomly")}}else if(this.money<a){alert("You don't have enough money for this drink.");break}}r>=1?alert(`You went home. Your costs ${r}`):alert("You went home."),this.goSleep()}else alert("You have no money, what will you do there?")}AFOUHelp(){if(this.money>10){let e=prompt("How much to donate to the Armed Forces of Ukraine?");if(null===e)return;for(e=parseInt(e);isNaN(e)||e>this.money;){if(isNaN(e)?alert("Only numbers!"):e>this.money&&alert("You don't have that much money, enter a smaller amount."),e=prompt("How much to donate to the Armed Forces of Ukraine?"),null===e)return;e=parseInt(e)}this.money-=e}else alert("You have no money. Go to work!")}sellBitcoin(){if(this.bitcoin>0&&!this.isDriving){let e=prompt(`You have ${this.bitcoin} bitcoins. Bitcoin rate ${world.bitcoinRate}. How many would you like to sell?`);isNaN(e)||e<0||e>this.bitcoin?alert("Invalid number of bitcoins to sell."):(this.bitcoin-=e,this.money+=e*world.bitcoinRate,alert(`You sold ${e} bitcoins or ${e*world.bitcoinRate} money units. You now have ${this.money} money units and ${this.bitcoin} bitcoins left.`))}else player.isDriving?alert("You are driving a car."):alert("You don't have any bitcoins to sell.")}work(){if(this.hasWork&&!this.isDriving){let e=0;for(let t=0;t<24;t++){let t=rand(1,10),a=rand(1,10),i=t+a,o=parseInt(prompt(`What is ${t} + ${a}? Your balance: ${this.money}`),10);if(o===i)e++,this.money+=42;else if(isNaN(o))break}}else player.isDriving?alert("You are driving a car."):alert("You don't have a job.")}liberationFromWork(){this.hasWork&&!this.isDriving?(player.hasWork=!1,alert("You quit your job")):player.isDriving?alert("You are driving a car."):alert("You don't have a job.")}buyCar(){this.hasCar?alert("You have a car"):this.money>45e3&&!this.isDriving?(this.hasCar=!0,this.money-=45e3,car=new Car("Mazda","Rx-7"),console.log(car),alert("You bought a car.")):this.money<45e3&&alert(`You don't have 45000 dollars! Your balance is ${this.money}`)}buyMiningFarm(){this.isMiningFarm||this.isDriving?alert("You already have a mining farm"):this.money>=18e3?(this.isMiningFarm=!0,this.money-=18e3,alert("You bought a mining farm.")):alert("You don't have enough money to buy a mining farm.")}findWork(){if(this.hasWork||this.isDriving)this.hasWork?alert("You already have a job."):this.isDriving&&alert("You are driving a car.");else{rand(0,100)>50?(this.hasWork=!0,alert("You found a job!")):alert("You haven't found a job. Try again later."),this.goSleep()}}getIntoACar(){this.hasCar&&!this.isDriving&&"car"!==this.location&&car.open?this.location="car":"car"===this.location?alert("You are in the car."):car.open&&alert("Open the car!")}getOutACar(){this.hasCar&&!this.isDriving&&"car"==this.location?this.location="In world":"car"!==this.location&&alert("You are not in the car.")}}class Car{constructor(e,t){this.mark=e,this.model=t,this.yearOfManufacture=2001,this.accumCapacity=60,this.fuelType="gasoline",this.fuel=10,this.key=!1,this.ignition=!1,this.isEngineStart=!1,this.engineSwear=0,this.fuelConsumption100km=12,this.fuelConsumption1km=.123,this.mileage=0,this.allmileage=0,this.previousmileage=this.allmileage,this.maxSpeed=257,this.speedCoefficient=0,this.kmSinceLastEngineSwearUpdate,this.fuelTank=30,this.open=!1,player.expectation=!0}ignitionOn(e){e.hasCar&&!e.isDriving&&"car"===e.location?this.accumCapacity>1&&!0===this.key?(alert("Ignition is on"),this.ignition=!0):this.accumCapacity<1?alert("The accumulator is discharged. Use a 'repairCar'"):!1===this.key&&alert("You have not inserted the key"):e.hasCar?e.isDriving?alert("You are driving a car."):"car"!==e.location&&alert("You are not in the car."):alert("You don't have a car! You need to buy it!")}startDrive(e){if(e.hasCar&&this.isEngineStart&&this.fuel>1&&"car"===e.location){this.speedCoefficient=rand(1.1,1.9);let t=prompt("Choose the maximum speed");for(;null!==t&&(t=parseInt(t),isNaN(t)||t>this.maxSpeed||t<=0);)alert(`The maximum speed of this car is ${this.maxSpeed} km/h!`),t=prompt("Choose the maximum speed");if(t>this.maxSpeed-43)return alert("You burned the engine."),e.hasCar=!1,this.engineSwear=100,this.isEngineStart=!1,this.ignition=!1,void(this.accumCapacity=0);if(t&&e.hasCar&&this.isEngineStart){let a=(this.fuel/this.fuelConsumption1km).toFixed(3);this.previousmileage=this.allmileage,e.isDriving=!0,alert("You are driving. Please wait for messages...");let i=setInterval((()=>{if(e.hasCar&&this.isEngineStart&&(console.clear(),this.addKM(),console.log(`Accumulator capacity: ${this.accumCapacity}`),console.log(`Fuel type: ${this.fuelType}`),console.log(`Fuel: ${this.fuel.toFixed(0)} L`),console.log(`Trevel mileage: ${this.mileage.toFixed(0)} KM`),console.log(`AllMileage: ${this.allmileage.toFixed(0)} KM`),console.log(`Engine swear: ${this.engineSwear}%`)),this.fuel<=1){clearInterval(i),e.isDriving=!1;let o=rand(0,12),r=a/t*this.speedCoefficient*60;if(e.allTravelTime+=r,e.allTravelTime>1){for(let t=0;t<roundNumber(e.travelTime);t++)e.goSleep();e.allTravelTime=0}o>8&&e.money>500?alert("You need to get a can of gasoline at the gas station."):o<8?alert("Fuel is running out. Go to the gas station."):o>8&&alert("You don't have enough fuel to get to the gas station. Collect enough money to buy fuel, then use go to the gasoline station."),this.isEngineStart=!1,this.ignition=!1}}),1e3);this.mileage=0}}else e.hasCar?this.isEngineStart?this.fuel<=1?alert("You need to refuel the car."):"car"!==e.location?alert("You are not in he car."):this.accumCapacity<1?alert("The accumulator is discharged. Use a 'repairCar'"):alert("Something went wrong."):alert("You didn't turn on the car."):alert("You don't have a car! You need to buy it!")}engineOff(e){e.hasCar&&e.isEngineStart&&"car"===e.location?(this.isEngineStart=!1,this.ignition=!1,e.isDriving=!1):e.hasCar?this.isEngineStart?alert("Your engine is not started."):"car"!==e.location&&alert("You are not in the car."):alert("You don't have a car! You need to buy it!")}insertKey(e){e.hasCar&&!e.isDriving&&"car"===e.location?(this.key=!0,alert("Key inserted")):e.hasCar?e.isDriving?alert("You are driving a car."):"car"!==e.location&&alert("You are not in the car."):alert("You don't have a car! You need to buy it!")}startEngine(e){e.hasCar&&this.engineSwear<100&&!e.isDriving&&"car"===e.location?this.fuel>0&&!0===this.ignition?(alert("Engine started successfully"),this.isEngineStart=!0):alert("The engine isn't turned on"):e.hasCar?this.engineSwear>100&&!e.isDriving?alert("The car is almost completely defective. It will not work to turn it on."):"car"!==e.location&&alert("You are not in the car."):alert("You don't have a car! Go to work!")}refuel(e){if(!e.hasCar)return void alert("You don't have a car! You need to buy it!");if(e.isDriving)return void alert("You are driving the car. Stop driving to refuel.");if("car"==e.location)return void alert("You must get out of the car before refueling");if(this.fuel===this.fuelTank)return void alert("Your fuel tank is full!");if(e.money<world.gasolinePrice)return void alert("You don't have enough money");let t=parseInt(prompt(`How much to fill up the car? ${this.fuelType} costs ${world.gasolinePrice} per liter`));for(;isNaN(t)||t<=0||t+this.fuel>this.fuelTank;)isNaN(t)||t<=0?alert("Enter a positive number"):t+this.fuel>this.fuelTank&&alert(`Fuel tank is ${this.fuelTank} liters. You can add only ${this.fuelTank-this.fuel} liters more.`),t=parseInt(prompt(`How much to fill up the car? ${this.fuelType} costs ${world.gasolinePrice} per liter`));let a=t*world.gasolinePrice;e.money<a?alert("You don't have enough money to refuel this amount"):(this.fuel+=t,this.fuel>this.fuelTank&&(this.fuel=this.fuelTank),e.money-=a,alert(`The fuel tank is filled with ${this.fuel} liters`))}checkBattery(){this.ignition&&!player.isDriving&&this.accumCapacity>0&&!player.isDriving&&"car"!==player.location&&world.day-world.previousDay>=1&&(this.accumCapacity-=30,this.accumCapacity=0,this.ignition=!1)}repairCar(e){if(e.hasCar&&!e.isDriving&&this.engineSwear>0||this.accumCapacity>100&&"car"!==e.location){let t=(1e3*this.engineSwear/3.5).toFixed(0);e.money>t?(this.engineSwear=0,this.accumCapacity=100,alert("The car has been repaired. The repair was expensive: "+t)):alert("You don't have enough funds. Repair price: "+t)}else e.hasCar?e.isDriving?alert("You are driving a car."):"car"===e.location?alert("Get out of the car."):car.engineSwear<=0&&100===this.accumCapacity&&alert("Your car is in perfect condition"):alert("You don't have a car! You need to buy it!")}addKM(){this.fuel-=this.fuelConsumption1km,this.mileage+=1,this.allmileage+=1,this.kmSinceLastEngineSwearUpdate+=1,this.kmSinceLastEngineSwearUpdate>=500&&(this.engineSwear+=1,this.kmSinceLastEngineSwearUpdate=0),this.accumCapacity<100&&(this.accumCapacity+=1)}openCar(){!player.hasCar||player.isDriving||"car"===player.location||this.open||(this.open=!0,alert("Car is open!"))}closeCar(){player.hasCar&&!player.isDriving&&"car"!==player.location&&this.open&&(this.open=!1,alert("Car is close!"))}}let world=new World,player=new Player,fuelScale=document.getElementById("indicatorScaleFuel");function updateIndicatorsPanel(){if(player.hasCar){let e=document.getElementById("indicators");e?e.style.display="block":console.log('Element with ID "indicators" not found')}else{let e=document.getElementById("indicators");e?e.style.display="none":console.log('Element with ID "indicators" not found')}}function updateIndicatorFuelScale(){const e=car.fuel,t=document.getElementById("indicatorScale-bar-fuel"),a=car.fuelTank;if(t){const i=e/a*345;t.style.height=`${i}px`,car.fuel===car.fuelTank&&(t.style.borderRadius="20px")}else console.log('Element with ID "indicatorScale-bar-fuel" not found')}function updateIndicatorAccumCapacityScale(){const e=car.accumCapacity,t=document.getElementById("indicatorScale-bar-accum");if(t){const a=e/100*245;t.style.height=`${a}px`,94===car.accumCapacity?t.style.borderRadius="5px":car.accumCapacity>95&&car.accumCapacity<=97?t.style.borderRadius="15px":t.style.borderRadius="20px"}else console.log('Element with ID "indicatorScale-bar-accum" not found')}function updateIndicatorEngineSwearScale(){const e=car.engineSwear,t=document.getElementById("indicatorScale-bar-EngineSwear");if(t){const a=e/100*106;t.style.height=`${a}px`,85===car.engineSwear?t.style.borderRadius="5px":car.engineSwear>=90&&car.engineSwear<97?t.style.borderRadius="15px":car.engineSwear>=97&&(t.style.borderRadius="20px")}else console.log('Element with ID "indicatorScale-bar-EngineSwear" not found')}function hideButtons(e,t){let a=document.getElementById(e),i=document.getElementById(t);a?a.style.display="none":console.log(`Element with ID '${e}' not found`),i?i.style.display="flex":console.log(`Element with ID '${t}' not found`)}function showCar(){document.getElementById("car").classList.add("active"),document.getElementById("player").classList.remove("active")}function changebg(){let e=document.getElementById("bg");car&&!player.isDriving?e.src="img/bg.jpg":player.isDriving?e.src="img/ride.gif":e.src="img/bg-none-car.jpg"}function interval(){changebg(),updateInfo(),updateIndicatorsPanel(),updateIndicatorFuelScale(),updateIndicatorAccumCapacityScale(),updateIndicatorEngineSwearScale()}interval(),setInterval(interval,1e3),document.addEventListener("DOMContentLoaded",(e=>{localStorage.getItem("day")&&(world.day=localStorage.getItem("day"),world.bitcoinRate=localStorage.getItem("bitcoinRate"),world.previousDay=localStorage.getItem("previousDay"),world.gasolinePrice=localStorage.getItem("gasolinePrice"),world.dieselPrice=localStorage.getItem("dieselPrice"),world.electricityPrice=localStorage.getItem("electricityPrice")),localStorage.getItem("isDriving")&&(player.isDriving="true"===localStorage.getItem("isDriving"),player.allTravelTime=localStorage.getItem("allTravelTime"),player.isMiningFarm="true"===localStorage.getItem("isMiningFarm"),player.bitcoin=localStorage.getItem("bitcoin"),player.money=localStorage.getItem("money"),player.hasWork="true"===localStorage.getItem("hasWork"),player.hasCar="true"===localStorage.getItem("hasCar"),player.dayWitoutFood=localStorage.getItem("dayWitoutFood"),player.drunkenness=localStorage.getItem("drunkenness"),player.location=localStorage.getItem("location"),player.expectation=localStorage.getItem("expectation"),player.waitingForTranslitomHana="true"===localStorage.getItem("waitingForTranslitomHana")),localStorage.getItem("mark")&&(car.mark=localStorage.getItem("mark"),car.model=localStorage.getItem("model"),car.yearOfManufacture=localStorage.getItem("yearOfManufacture"),car.accumCapacity=localStorage.getItem("accumCapacity"),car.fuel=localStorage.getItem("fuel"),car.key="true"===localStorage.getItem("key"),car.ignition="true"===localStorage.getItem("ignition"),car.isEngineStart="true"===localStorage.getItem("isEngineStart"),car.engineSwear=localStorage.getItem("engineSwear"),car.fuelConsumption100km=localStorage.getItem("fuelConsumption100km"),car.fuelConsumption1km=localStorage.getItem("fuelConsumption1km"),car.mileage=localStorage.getItem("mileage"),car.allmileage=localStorage.getItem("allmileage"),car.previousmileage=localStorage.getItem("previousmileage"),car.maxSpeed=localStorage.getItem("maxSpeed"),car.speedCoefficient=localStorage.getItem("speedCoefficient"),car.kmSinceLastEngineSwearUpdate=localStorage.getItem("kmSinceLastEngineSwearUpdate"),car.fuelTank=localStorage.getItem("fuelTank"),car.open="true"===localStorage.getItem("open"))}));let save=setInterval((e=>{localStorage.setItem("day",world.day),localStorage.setItem("bitcoinRate",world.bitcoinRate),localStorage.setItem("previousDay",world.previousDay),localStorage.setItem("gasolinePrice",world.gasolinePrice),localStorage.setItem("dieselPrice",world.dieselPrice),localStorage.setItem("electricityPrice",world.electricityPrice),localStorage.setItem("isDriving",player.isDriving),localStorage.setItem("allTravelTime",player.allTravelTime),localStorage.setItem("isMiningFarm",player.isMiningFarm),localStorage.setItem("bitcoin",player.bitcoin),localStorage.setItem("money",player.money),localStorage.setItem("hasWork",player.hasWork),localStorage.setItem("hasCar",player.hasCar),localStorage.setItem("dayWitoutFood",player.dayWitoutFood),localStorage.setItem("drunkenness",player.drunkenness),localStorage.setItem("location",player.location),localStorage.setItem("expectation",player.expectation),localStorage.setItem("waitingForTranslitomHana",player.waitingForTranslitomHana),localStorage.setItem("mark",car.mark),localStorage.setItem("model",car.model),localStorage.setItem("yearOfManufacture",car.yearOfManufacture),localStorage.setItem("accumCapacity",car.accumCapacity),localStorage.setItem("fuel",car.fuel),localStorage.setItem("key",car.key),localStorage.setItem("ignition",car.ignition),localStorage.setItem("isEngineStart",car.isEngineStart),localStorage.setItem("engineSwear",car.engineSwear),localStorage.setItem("fuelConsumption100km",car.fuelConsumption100km),localStorage.setItem("fuelConsumption1km",car.fuelConsumption1km),localStorage.setItem("mileage",car.mileage),localStorage.setItem("allmileage",car.allmileage),localStorage.setItem("previousmileage",car.previousmileage),localStorage.setItem("maxSpeed",car.maxSpeed),localStorage.setItem("speedCoefficient",car.speedCoefficient),localStorage.setItem("kmSinceLastEngineSwearUpdate",car.kmSinceLastEngineSwearUpdate),localStorage.setItem("fuelTank",car.fuelTank),localStorage.setItem("open",car.open),console.log("Game saved!")}),1e4);