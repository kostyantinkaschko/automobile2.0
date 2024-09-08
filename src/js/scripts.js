let car = false,
    save = false

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}



function roundNumber(number) {
    const integerPart = Math.floor(number)
    const fractionalPart = number - integerPart

    if (fractionalPart < 0.5) {
        return integerPart
    } else {
        return integerPart + 1
    }
}

function updateInfo() {
    const mileageEl = document.querySelector('#mileage')
    const moneyEl = document.querySelector('#money')
    const bitcoinEl = document.querySelector('#bitcoin')
    const gasolinePriceEl = document.querySelector('#gasolinePrice')
    const dieselPriceEl = document.querySelector('#dieselPrice')
    const electricityPriceEl = document.querySelector('#electricityPrice')
    const bitcoinRateEl = document.querySelector('#bitcoinRate')
    const gameDaysEl = document.querySelector('#gameDays')

    if (mileageEl && car) {
        mileageEl.innerHTML = `Mileage: ${car.allmileage} KM`
    } else {
        mileageEl.innerHTML = `Mileage: 0  KM`
    }
    if (moneyEl) moneyEl.innerHTML = `Money: ${player.money}$`
    if (bitcoinEl) bitcoinEl.innerHTML = `Bitcoin: ${player.bitcoin}`
    if (gasolinePriceEl) gasolinePriceEl.innerHTML = `Gasoline price: ${world.gasolinePrice}$ / 1L`
    if (dieselPriceEl) dieselPriceEl.innerHTML = `Diesel price: ${world.dieselPrice}$ / 1L`
    // if (electricityPriceEl) electricityPriceEl.innerHTML = `Electricity price: ${world.electricityPrice.toFixed(1)}$ / kW`
    if (bitcoinRateEl) bitcoinRateEl.innerHTML = `Bitcoin rate: ${world.bitcoinRate}$`
    if (gameDaysEl) gameDaysEl.innerHTML = `Game Days: ${world.day}`
}



class Game {
    constructor() {
        this.saveIntervalTime = 10000
    }
    gameSave() {
        save = setInterval(event => {
            localStorage.setItem("day", world.day)
            localStorage.setItem("bitcoinRate", world.bitcoinRate)
            localStorage.setItem("previousDay", world.previousDay)
            localStorage.setItem("gasolinePrice", world.gasolinePrice)
            localStorage.setItem("dieselPrice", world.dieselPrice)
            localStorage.setItem("electricityPrice", world.electricityPrice)
            localStorage.setItem("isDriving", player.isDriving)
            localStorage.setItem("allTravelTime", player.allTravelTime)
            localStorage.setItem("isMiningFarm", player.isMiningFarm)
            localStorage.setItem("bitcoin", player.bitcoin)
            localStorage.setItem("money", player.money)
            localStorage.setItem("hasWork", player.hasWork)
            localStorage.setItem("hasCar", player.hasCar)
            localStorage.setItem("dayWitoutFood", player.dayWitoutFood)
            localStorage.setItem("drunkenness", player.drunkenness)
            localStorage.setItem("location", player.location)
            localStorage.setItem("expectation", player.expectation)
            localStorage.setItem("waitingForTranslitomHana", player.waitingForTranslitomHana)
            localStorage.setItem("mark", car.mark)
            localStorage.setItem("model", car.model)
            localStorage.setItem("yearOfManufacture", car.yearOfManufacture)
            localStorage.setItem("accumCapacity", car.accumCapacity)
            localStorage.setItem("fuel", car.fuel)
            localStorage.setItem("key", car.key)
            localStorage.setItem("ignition", car.ignition)
            localStorage.setItem("isEngineStart", car.isEngineStart)
            localStorage.setItem("engineSwear", car.engineSwear)
            localStorage.setItem("fuelConsumption100km", car.fuelConsumption100km)
            localStorage.setItem("fuelConsumption1km", car.fuelConsumption1km)
            localStorage.setItem("mileage", car.mileage)
            localStorage.setItem("allmileage", car.allmileage)
            localStorage.setItem("previousmileage", car.previousmileage)
            localStorage.setItem("maxSpeed", car.maxSpeed)
            localStorage.setItem("speedCoefficient", car.speedCoefficient)
            localStorage.setItem("kmSinceLastEngineSwearUpdate", car.kmSinceLastEngineSwearUpdate)
            localStorage.setItem("fuelTank", car.fuelTank)
            localStorage.setItem("open", car.open)
            console.log("Game saved!")
        }, this.saveIntervalTime)
    }
    saveIntervalTimeChange() {
        this.saveIntervalTime = parseInt(prompt("Specify the time interval after which the game will be saved in seconds.")) * 1000
        if(isNaN(this.saveIntervalTime)){
            this.saveIntervalTime = 10000
        }
        clearInterval(save)
        this.gameSave()
    }
}


class World {
    constructor() {
        this.day = 0
        this.bitcoinRate = rand(10000, 95000)
        this.previousDay = 0
        this.gasolinePrice = 17
        this.dieselPrice = 25
        this.electricityPrice = 1
    }
}



class Player {
    constructor() {
        this.isDriving = false
        this.allTravelTime = 0
        this.isMiningFarm = false
        this.bitcoin = 0
        this.money = 0
        this.hasWork = false
        this.hasCar = false
        this.dayWitoutFood = 0
        this.drunkenness = 0
        this.location = "In world"
        this.expectation = 0
        this.waitingForTranslitomHana = 10
    }

    goSleep() {
        let carStole
        alert("The day is over.")
        world.previousDay = world.day
        world.day++
        world.bitcoinRate = rand(10000, 50000)

        if (car && car.open && carStole <= 0) {
            alert("You forgot to close the car! In the future, we recommend closing it at night.")
            carStole = rand(0, 100)
        }

        let gasolinePriceRandom = rand(1, 100)
        if (gasolinePriceRandom < 40) {
            world.gasolinePrice += 1
        } else if (gasolinePriceRandom >= 60) {
            world.gasolinePrice -= 1
        }
        let dieselPriceRandom = rand(1, 100)
        if (dieselPriceRandom < 40) {
            world.dieselPrice += 1
        } else if (dieselPriceRandom >= 60) {
            world.dieselPrice -= 1
        }
        let electroPriceRandom = rand(1, 100)
        if (electroPriceRandom < 40) {
            world.electricityPrice += 0.10000000000000
        } else if (electroPriceRandom >= 60) {
            world.electricityPrice -= 0.10000000000000
        }
        this.drunkenness = 0
        if (this.isMiningFarm && !this.isDriving) {
            this.bitcoin += 0.2
            alert(`Mining farm produced 0.2 bitcoins. Total bitcoins: ${this.bitcoin}`)
        } else if (this.isDriving) {
            alert("You are driving a car.")
        }

        if (world.day - world.previousDay === 1 && this.money >= 20 && this.money >= 455) {
            let previousMoney = this.money
            this.money -= rand(20, 455)
            alert(`Spent on food today: ${previousMoney - this.money}`)
        } else if (world.day - world.previousDay === 1 && this.money >= 20 && this.money < 455) {
            let previousMoney = this.money
            this.money -= rand(20, this.money)
            alert(`Spent on food today: ${previousMoney - this.money}`)
        } else {
            this.dayWitoutFood++
            if (this.dayWitoutFood >= 4) {
                alert("You didn't eat for 4 days, that's why you ended up in the hospital")
                this.dayWitoutFood = 0
                world.day++
            } else if (this.dayWitoutFood >= 2) {
                alert(`You haven't eaten in ${this.dayWitoutFood} days, better find money to eat.`)
                if (this.hasWork) {
                    alert("Go to work!")
                } else {
                    alert("Go find a job!")
                }
            } else {
                alert("You didn't have money for food, we advise you to find money as soon as possible")
            }
        }

        if (car && car.ignition && !this.isDriving && car.accumCapacity > 0) {
            car.checkBattery()
        }

        if (!this.hasCar && this.money > 45000) {
            alert("You can buy a car!")
        }
    }

    goParty() {
        if (this.money > 50) {
            alert("You came to the party.")
            let beverage = prompt("What will you drink? Water - 50, Tequila - 160, Cognac - 700, Decide randomly"),
                costsMoney = 0,
                repeat = true,
                takeANewBeverage = true,
                allCosts = 0,
                costs

            while (true) {
                if (this.drunkenness >= 100) {
                    alert(`You're drunk. Your costs ${allCosts}`)
                    break
                }

                if (beverage === "Decide randomly") {
                    let costsRand = rand(1, 3)
                    if (costsRand === 1) {
                        costs = rand(50, 800)
                    } else if (costsRand === 2) {
                        costs = 480
                    } else if (costsRand === 3) {
                        costs = rand(1400, 1700)
                    }
                    allCosts += costs
                    this.money - costs
                    break
                }

                if (beverage === "Water") {
                    costsMoney = 50
                } else if (beverage === "Tequila") {
                    costsMoney = 160
                    this.drunkenness += 70
                } else if (beverage === "Cognac") {
                    costsMoney = 700
                    this.drunkenness += 100
                } else if (!beverage) {
                    break
                } else {
                    alert("Invalid choice. Please choose a valid drink.")
                    beverage = prompt("What will you drink? Water - 50, Tequila - 160, Cognac - 700, Decide randomly")
                    continue
                }

                if (this.money >= costsMoney && beverage != "Decide randomly") {
                    alert(`You have spent ${costsMoney} money`)
                    this.money -= costsMoney
                    costsMoney += costsMoney

                    if (this.drunkenness >= 160) {
                        alert(`You're drunk.`)
                        break
                    }

                    repeat = confirm("Repeat?")
                    if (!repeat) {
                        takeANewBeverage = confirm("Choose another drink?")
                        if (takeANewBeverage) {
                            beverage = prompt("What will you drink? Water - 50, Tequila - 160, Cognac - 700, Decide randomly")
                        } else {
                            break
                        }
                    }
                } else if (this.money < costsMoney) {
                    alert("You don't have enough money for this drink.")
                    break
                }
            }

            if (allCosts >= 1) {
                alert(`You went home. Your costs ${allCosts}`)
            } else {
                alert(`You went home.`)
            }

            this.goSleep()
        } else {
            alert("You have no money, what will you do there?")
        }
    }

    AFOUHelp() {
        if (this.money > 10) {
            let donat = prompt("How much to donate to the Armed Forces of Ukraine?")
            if (donat === null) {
                return
            }
            donat = parseInt(donat)
            while (isNaN(donat) || donat > this.money) {
                if (isNaN(donat)) {
                    alert("Only numbers!")
                } else if (donat > this.money) {
                    alert("You don't have that much money, enter a smaller amount.")
                }
                donat = prompt("How much to donate to the Armed Forces of Ukraine?")
                if (donat === null) {
                    return
                }
                donat = parseInt(donat)
            }
            this.money -= donat
        } else {
            alert("You have no money. Go to work!")
        }
    }


    sellBitcoin() {
        if (this.bitcoin > 0 && !this.isDriving) {
            let bitcoinsToSell = prompt(`You have ${this.bitcoin} bitcoins. Bitcoin rate ${world.bitcoinRate}. How many would you like to sell?`)
            if (isNaN(bitcoinsToSell) || bitcoinsToSell < 0 || bitcoinsToSell > this.bitcoin) {
                alert("Invalid number of bitcoins to sell.")
            } else {
                this.bitcoin -= bitcoinsToSell
                this.money += bitcoinsToSell * world.bitcoinRate
                alert(`You sold ${bitcoinsToSell} bitcoins or ${bitcoinsToSell * world.bitcoinRate} money units. You now have ${this.money} money units and ${this.bitcoin} bitcoins left.`)
            }
        } else if (player.isDriving) {
            alert("You are driving a car.")
        } else {
            alert("You don't have any bitcoins to sell.")
        }
    }

    work() {
        if (this.hasWork && !this.isDriving) {
            let correctAnswers = 0
            for (let i = 0; i < 24; i++) {
                let num1 = rand(1, 10)
                let num2 = rand(1, 10)
                let correctAnswer = num1 + num2
                let userAnswer = parseInt(prompt(`What is ${num1} + ${num2}? Your balance: ${this.money}`), 10)
                if (userAnswer === correctAnswer) {
                    correctAnswers++
                    this.money += 42
                } else if (isNaN(userAnswer)) {
                    break
                }
            }
        } else if (player.isDriving) {
            alert("You are driving a car.")
        } else {
            alert("You don't have a job.")
        }
    }

    liberationFromWork() {
        if (this.hasWork && !this.isDriving) {
            player.hasWork = false
            alert("You quit your job")
        } else if (player.isDriving) {
            alert("You are driving a car.")
        } else {
            alert("You don't have a job.")
        }
    }

    buyCar() {
        if (!this.hasCar) {
            if (this.money > 45000 && !this.isDriving) {
                this.hasCar = true
                this.money -= 45000
                car = new Car("Mazda", "Rx-7")
                console.log(car)
                alert("You bought a car.")
            } else if (this.money < 45000) {
                alert(`You don't have 45000 dollars! Your balance is ${this.money}`)
            }
        } else {
            alert(`You have a car`)
        }
    }

    buyMiningFarm() {
        if (!this.isMiningFarm && !this.isDriving) {
            if (this.money >= 18000) {
                this.isMiningFarm = true
                this.money -= 18000
                alert("You bought a mining farm.")
            } else {
                alert("You don't have enough money to buy a mining farm.")
            }
        } else {
            alert("You already have a mining farm")
        }
    }

    findWork() {
        if (!this.hasWork && !this.isDriving) {
            let randomFindWork = rand(0, 100)
            if (randomFindWork > 50) {
                this.hasWork = true
                alert("You found a job!")
            } else {
                alert("You haven't found a job. Try again later.")
            }
            this.goSleep()
        } else if (this.hasWork) {
            alert("You already have a job.")
        } else if (this.isDriving) {
            alert("You are driving a car.")
        }
    }
    getIntoACar() {
        if (this.hasCar && !this.isDriving && this.location !== "car" && car.open) {
            this.location = "car"
        } else if (this.location === "car") {
            alert("You are in the car.")
        } else if (car.open) {
            alert("Open the car!")
        }
    }
    getOutACar() {
        if (this.hasCar && !this.isDriving && this.location == "car") {
            this.location = "In world"
        } else if (this.location !== "car") {
            alert("You are not in the car.")
        }
    }
}

class Car {
    constructor(mark, model) {
        this.mark = mark
        this.model = model
        this.yearOfManufacture = 2001
        this.accumCapacity = 60
        this.fuelType = "gasoline"
        this.fuel = 10
        this.key = false
        this.ignition = false
        this.isEngineStart = false
        this.engineSwear = 0
        this.fuelConsumption100km = 12
        this.fuelConsumption1km = 0.123
        this.mileage = 0
        this.allmileage = 0
        this.previousmileage = this.allmileage
        this.maxSpeed = 257
        this.speedCoefficient = 0
        this.kmSinceLastEngineSwearUpdate
        this.fuelTank = 30
        this.open = false
        player.expectation = true
    }
    ignitionOn(player) {
        if (player.hasCar && !player.isDriving && player.location === "car") {
            if (this.accumCapacity > 1 && this.key === true) {
                alert("Ignition is on")
                this.ignition = true
            } else if (this.accumCapacity < 1) {
                alert("The accumulator is discharged. Use a 'repairCar'")
            } else if (this.key === false) {
                alert("You have not inserted the key")
            }
        } else if (!player.hasCar) {
            alert("You don't have a car! You need to buy it!")
        } else if (player.isDriving) {
            alert("You are driving a car.")
        } else if (player.location !== "car") {
            alert("You are not in the car.")
        }
    }
    startDrive(player) {
        if (player.hasCar && this.isEngineStart && this.fuel > 1 && player.location === "car") {
            this.speedCoefficient = rand(1.1, 1.9)

            let maxSpeed = prompt("Choose the maximum speed")
            while (maxSpeed !== null) {
                maxSpeed = parseInt(maxSpeed)
                if (isNaN(maxSpeed) || maxSpeed > this.maxSpeed || maxSpeed <= 0) {
                    alert(`The maximum speed of this car is ${this.maxSpeed} km/h!`)
                    maxSpeed = prompt("Choose the maximum speed")
                } else {
                    break
                }
            }

            if (maxSpeed > this.maxSpeed - 43) {
                alert("You burned the engine.")
                player.hasCar = false
                this.engineSwear = 100
                this.isEngineStart = false
                this.ignition = false
                this.accumCapacity = 0
                return
            }


            if (maxSpeed && player.hasCar && this.isEngineStart) {
                let maxDistance = (this.fuel / this.fuelConsumption1km).toFixed(3)
                this.previousmileage = this.allmileage
                player.isDriving = true
                alert("You are driving. Please wait for messages...")

                let driveInterval = setInterval(() => {
                    if (player.hasCar && this.isEngineStart) {
                        console.clear()
                        this.addKM()
                        console.log(`Accumulator capacity: ${this.accumCapacity}`)
                        console.log(`Fuel type: ${this.fuelType}`)
                        console.log(`Fuel: ${this.fuel.toFixed(0)} L`)
                        console.log(`Trevel mileage: ${(this.mileage).toFixed(0)} KM`)
                        console.log(`AllMileage: ${(this.allmileage).toFixed(0)} KM`)
                        console.log(`Engine swear: ${this.engineSwear}%`)
                    }

                    if (this.fuel <= 1) {
                        clearInterval(driveInterval)
                        player.isDriving = false
                        let distanceFromGasStation = rand(0, 12)
                        let travelTime = (maxDistance / maxSpeed * this.speedCoefficient) * 60
                        player.allTravelTime += travelTime
                        if (player.allTravelTime > 1) {
                            for (let i = 0; i < roundNumber(player.travelTime); i++) {
                                player.goSleep()
                            }
                            player.allTravelTime = 0
                        }

                        if (distanceFromGasStation > 8 && player.money > 500) {
                            alert("You need to get a can of gasoline at the gas station.")
                        } else if (distanceFromGasStation < 8) {
                            alert("Fuel is running out. Go to the gas station.")
                        } else if (distanceFromGasStation > 8) {
                            alert("You don't have enough fuel to get to the gas station. Collect enough money to buy fuel, then use go to the gasoline station.")
                        }
                        this.isEngineStart = false
                        this.ignition = false
                    }

                }, 1000)
                this.mileage = 0
            }
        } else if (!player.hasCar) {
            alert("You don't have a car! You need to buy it!")
        } else if (!this.isEngineStart) {
            alert("You didn't turn on the car.")
        } else if (this.fuel <= 1) {
            alert("You need to refuel the car.")
        } else if (player.location !== "car") {
            alert("You are not in he car.")
        } else if (this.accumCapacity < 1) {
            alert("The accumulator is discharged. Use a 'repairCar'")
        } else {
            alert("Something went wrong.")
        }
    }
    engineOff(player) {
        if (player.hasCar && player.isEngineStart && player.location === "car") {
            this.isEngineStart = false
            this.ignition = false
            player.isDriving = false
        } else if (!player.hasCar) {
            alert("You don't have a car! You need to buy it!")
        } else if (this.isEngineStart) {
            alert("Your engine is not started.")
        } else if (player.location !== "car") {
            alert("You are not in the car.")
        }
    }
    insertKey(player) {
        if (player.hasCar && !player.isDriving && player.location === "car") {
            this.key = true
            alert("Key inserted")
        } else if (!player.hasCar) {
            alert("You don't have a car! You need to buy it!")
        } else if (player.isDriving) {
            alert("You are driving a car.")
        } else if (player.location !== "car") {
            alert("You are not in the car.")
        }
    }
    startEngine(player) {
        if (player.hasCar && this.engineSwear < 100 && !player.isDriving && player.location === "car") {
            if (this.fuel > 0 && this.ignition === true) {
                alert("Engine started successfully")
                this.isEngineStart = true
            } else {
                alert("The engine isn't turned on")
            }
        } else if (!player.hasCar) {
            alert("You don't have a car! Go to work!")
        } else if (this.engineSwear > 100 && !player.isDriving) {
            alert("The car is almost completely defective. It will not work to turn it on.")
        } else if (player.location !== "car") {
            alert("You are not in the car.")
        }
    }
    refuel(player) {
        if (!player.hasCar) {
            alert("You don't have a car! You need to buy it!")
            return
        }

        if (player.isDriving) {
            alert("You are driving the car. Stop driving to refuel.")
            return
        }

        if (player.location == "car") {
            alert("You must get out of the car before refueling")
            return
        }

        if (this.fuel === this.fuelTank) {
            alert("Your fuel tank is full!")
            return
        }

        if (player.money < world.gasolinePrice) {
            alert("You don't have enough money")
            return
        }

        let refuel = parseInt(prompt(`How much to fill up the car? ${this.fuelType} costs ${world.gasolinePrice} per liter`))

        while (isNaN(refuel) || refuel <= 0 || refuel + this.fuel > this.fuelTank) {
            if (isNaN(refuel) || refuel <= 0) {
                alert("Enter a positive number")
            } else if (refuel + this.fuel > this.fuelTank) {
                alert(`Fuel tank is ${this.fuelTank} liters. You can add only ${this.fuelTank - this.fuel} liters more.`)
            }
            refuel = parseInt(prompt(`How much to fill up the car? ${this.fuelType} costs ${world.gasolinePrice} per liter`))
        }

        let totalCost = refuel * world.gasolinePrice

        if (player.money < totalCost) {
            alert("You don't have enough money to refuel this amount")
            return
        }

        this.fuel += refuel
        if (this.fuel > this.fuelTank) {
            this.fuel = this.fuelTank
        }

        player.money -= totalCost
        alert(`The fuel tank is filled with ${this.fuel} liters`)
    }


    checkBattery() {
        if (this.ignition && !player.isDriving && this.accumCapacity > 0 && !player.isDriving && player.location !== "car") {
            if (world.day - world.previousDay >= 1) {
                this.accumCapacity -= 30
                this.accumCapacity = 0
                this.ignition = false
            }
        }
    }
    repairCar(player) {
        if (player.hasCar && !player.isDriving && this.engineSwear > 0 || this.accumCapacity > 100 && player.location !== "car") {
            let repairCost = (this.engineSwear * 1000 / 3.5).toFixed(0)
            if (player.money > repairCost) {
                this.engineSwear = 0
                this.accumCapacity = 100
                alert("The car has been repaired. The repair was expensive: " + repairCost)
            } else {
                alert("You don't have enough funds. Repair price: " + repairCost)
            }
        } else if (!player.hasCar) {
            alert("You don't have a car! You need to buy it!")
        } else if (player.isDriving) {
            alert("You are driving a car.")
        } else if (player.location === "car") {
            alert("Get out of the car.")
        } else if (car.engineSwear <= 0 && this.accumCapacity === 100) {
            alert("Your car is in perfect condition")
        }
    }
    addKM() {
        this.fuel -= this.fuelConsumption1km
        this.mileage += 1
        this.allmileage += 1
        this.kmSinceLastEngineSwearUpdate += 1

        if (this.kmSinceLastEngineSwearUpdate >= 500) {
            this.engineSwear += 1
            this.kmSinceLastEngineSwearUpdate = 0
        }

        if (this.accumCapacity < 100) {
            this.accumCapacity += 1
        }
    }
    openCar() {
        if (player.hasCar && !player.isDriving && player.location !== "car" && !this.open) {
            this.open = true
            alert("Car is open!")
        }
    }
    closeCar() {
        if (player.hasCar && !player.isDriving && player.location !== "car" && this.open) {
            this.open = false
            alert("Car is close!")
        }
    }
}

let game = new Game(),
    world = new World(),
    player = new Player(),
    fuelScale = document.getElementById('indicatorScaleFuel')


function updateIndicatorsPanel() {
    if (!player.hasCar) {
        let indicators = document.getElementById('indicators')
        if (indicators) {
            indicators.style.display = 'none'
        } else {
            console.log('Element with ID "indicators" not found')
        }
    } else {
        let indicators = document.getElementById('indicators')
        if (indicators) {
            indicators.style.display = 'block'
        } else {
            console.log('Element with ID "indicators" not found')
        }
    }
}

function updateIndicatorFuelScale() {
    const scaleValue = car.fuel,
        scaleBar = document.getElementById('indicatorScale-bar-fuel'),
        maxFuel = car.fuelTank,
        maxScaleHeight = 345

    if (scaleBar) {
        const height = (scaleValue / maxFuel) * maxScaleHeight
        scaleBar.style.height = `${height}px`
        if (car.fuel === car.fuelTank) {
            scaleBar.style.borderRadius = "20px"
        }
    } else {
        console.log('Element with ID "indicatorScale-bar-fuel" not found')
    }
}


function updateIndicatorAccumCapacityScale() {
    const scaleValue = car.accumCapacity,
        scaleBar = document.getElementById('indicatorScale-bar-accum'),
        maxAccum = 100,
        maxScaleHeight = 245

    if (scaleBar) {
        const height = (scaleValue / maxAccum) * maxScaleHeight
        scaleBar.style.height = `${height}px`
        if (car.accumCapacity === 94) {
            scaleBar.style.borderRadius = "5px"
        } else if (car.accumCapacity > 95 && car.accumCapacity <= 97) {
            scaleBar.style.borderRadius = "15px"
        } else {
            scaleBar.style.borderRadius = "20px"
        }
    } else {
        console.log('Element with ID "indicatorScale-bar-accum" not found')
    }
}

function updateIndicatorEngineSwearScale() {
    const scaleValue = car.engineSwear,
        scaleBar = document.getElementById('indicatorScale-bar-EngineSwear'),
        maxAccum = 100,
        maxScaleHeight = 106

    if (scaleBar) {
        const height = (scaleValue / maxAccum) * maxScaleHeight
        scaleBar.style.height = `${height}px`
        if (car.engineSwear === 85) {
            scaleBar.style.borderRadius = "5px"
        } else if (car.engineSwear >= 90 && car.engineSwear < 97) {
            scaleBar.style.borderRadius = "15px"
        } else if (car.engineSwear >= 97) {
            scaleBar.style.borderRadius = "20px"
        }
    } else {
        console.log('Element with ID "indicatorScale-bar-EngineSwear" not found')
    }
}


function hideButtons(id1, id2, id3) {
    let button = document.getElementById(id1),
    button2 = document.getElementById(id2)
    button3 = document.getElementById(id3)
    if (button) {
        button.style.display = "none"
    } else {
        console.log(`Element with ID '${id1}' not found`)
    }

    if (button2) {
        button2.style.display = "flex"
    } else {
        console.log(`Element with ID '${id2}' not found`)
    }
    if (button3) {
        button3.style.display = "none"
    } else {
        console.log(`Element with ID '${id2}' not found`)
    }
}


function showCar() {
    document.getElementById('car').classList.add('active')
    document.getElementById('player').classList.remove('active')
}

function changebg() {
    let imgElement = document.getElementById('bg')
    if (car && !player.isDriving) {
        imgElement.src = 'img/bg.jpg'
    } else if (player.isDriving) {
        imgElement.src = 'img/ride.gif'
    } else {
        imgElement.src = 'img/bg-none-car.jpg'
    }
}

function interval() {
    changebg()
    updateInfo()
    updateIndicatorsPanel()
    updateIndicatorFuelScale()
    updateIndicatorAccumCapacityScale()
    updateIndicatorEngineSwearScale()
}
interval()
setInterval(interval, 1000)
document.addEventListener("DOMContentLoaded", event => {
    if (localStorage.getItem("day")) {
        world.day = localStorage.getItem("day")
        world.bitcoinRate = localStorage.getItem("bitcoinRate")
        world.previousDay = localStorage.getItem("previousDay")
        world.gasolinePrice = localStorage.getItem("gasolinePrice")
        world.dieselPrice = localStorage.getItem("dieselPrice")
        world.electricityPrice = localStorage.getItem("electricityPrice")
    }

    if (localStorage.getItem("isDriving")) {
        player.isDriving = localStorage.getItem("isDriving") === 'true'
        player.allTravelTime = localStorage.getItem("allTravelTime")
        player.isMiningFarm = localStorage.getItem("isMiningFarm") === 'true'
        player.bitcoin = localStorage.getItem("bitcoin")
        player.money = localStorage.getItem("money")
        player.hasWork = localStorage.getItem("hasWork") === 'true'
        player.hasCar = localStorage.getItem("hasCar") === 'true'
        player.dayWitoutFood = localStorage.getItem("dayWitoutFood")
        player.drunkenness = localStorage.getItem("drunkenness")
        player.location = localStorage.getItem("location")
        player.expectation = localStorage.getItem("expectation")
        player.waitingForTranslitomHana = localStorage.getItem("waitingForTranslitomHana") === 'true'
    }

    if (localStorage.getItem("mark")) {
        car.mark = localStorage.getItem("mark")
        car.model = localStorage.getItem("model")
        car.yearOfManufacture = localStorage.getItem("yearOfManufacture")
        car.accumCapacity = localStorage.getItem("accumCapacity")
        car.fuel = localStorage.getItem("fuel")
        car.key = localStorage.getItem("key") === 'true'
        car.ignition = localStorage.getItem("ignition") === 'true'
        car.isEngineStart = localStorage.getItem("isEngineStart") === 'true'
        car.engineSwear = localStorage.getItem("engineSwear")
        car.fuelConsumption100km = localStorage.getItem("fuelConsumption100km")
        car.fuelConsumption1km = localStorage.getItem("fuelConsumption1km")
        car.mileage = localStorage.getItem("mileage")
        car.allmileage = localStorage.getItem("allmileage")
        car.previousmileage = localStorage.getItem("previousmileage")
        car.maxSpeed = localStorage.getItem("maxSpeed")
        car.speedCoefficient = localStorage.getItem("speedCoefficient")
        car.kmSinceLastEngineSwearUpdate = localStorage.getItem("kmSinceLastEngineSwearUpdate")
        car.fuelTank = localStorage.getItem("fuelTank")
        car.open = localStorage.getItem("open") === 'true'
    }
})

game.gameSave()




// Ідеї: 
// ПОступове з'явлення кнопок
// Розположити статистику належним чином
// Робота: зарплата, можливість пошуку іншої роботи. Додати текст, при помилках тобі будуть угражати дубінкою і звільненням з роботи.
// Автоматично день не закінчується, а просто функції блокуються поки день не закінчиться
// Прокачка машинки
// Додати налаштування


































// А це недопилений контент який мені впадлу доробити:
// let povidomlenna = false
// if (car && car.open && carStole > 0 && !povidomlenna) {
//     car.carStole = true
//     povidomlenna = true

//     alert("Your car was stolen. Call the police! phone.police()")
// }


// if (car && car.carStole) {
//     if (!player.expectation) {
//         this.waitingForTranslitomHana -= 1
//         if (this.waitingForTranslitomHana <= 0) {
//             car = false
//             alert("The police called today and said that your car was not found and the thief was caught dead. You need to buy a new car")
//         }
//     } else if (player.expectation) {
//         player.expectation -= 1
//         if (player.expectation <= 1) {
//             alert("Your car was found! Now you can continue using it!")
//             car.fuel = car.fuelTank
//             car.engineSwear = 0
//             car.accumCapacity = 0
//             car.maxSpeed = 280
//             car.fuelConsumption1km = 0.95
//         }
//     }
// }
// class Phone {
//     constructor() {
//         this.mark = "apple"
//         this.model = "Iphone 15 Pro Max"
//         this.maxCommunicationStandart = "5g"
//         this.screenDiagonal = 6.7
//         this.displayWidth = 2796
//         this.displayHeigth = 1290
//         this.resolution = `${this.displayWidth}x${this.displayHeigth}`
//         this.matrixType - `OLED (Super Retina XDR)`
//         this.screenRefreshRate = `120Hz`
//         this.screenMaterial = "Ceramic Shield"
//         this.SIMCards = `2`
//         this.SIMCardFormat1 = `Nano SIM`
//         this.SIMCardFormat2 = `e-SIM`
//         this.buildMemory = "256 GB"
//         this.OC = "IOS"
//         this.frontCameraMegapixels = `12 MP`
//         this.featuresFrontCamera = ["Autofocus", "Single", "Support 4K", "Stabilization", "Front flash"]
//         this.frontCameraPlacement = "Neckline"
//         this.frontFlashType = "Software"
//         this.frontCameraVideoRecording = ["4K / 3840x2160", "stereo sound"]
//         this.additionalyFrontCamera = ["12MP camera", "ƒ/1.9 aperture", "Focus Pixels autofocus", "Retina Flash", "Photonic Engine", "Deep fusion", "Smart HDR 5", "Next-gen portraits with focus assist and depth control", "Portrait Lighting with six effects", "Animoji and Memoji", "Night mode", "Photo Styles", "Apple ProRAW", "Wide color capture for photos and Live Photos", "Lens correction", "Automatic image stabilization", "Burst mode", "4K video recording at 24 fps, 25 fps, 30 fps, or 60 fps", "1080p HD video recording at 25 fps, 30 fps, or 60 fps", "Cinematic mode up to 4K HDR at 30 fps", "Dolby Vision HDR video recording up to 4K at 60 fps", "ProRes video recording up to 4K at 60 fps with external recording", "Video log", "Academy color system", "Slow motion video support for 1080p at 120 fps", "Time-lapse video with stabilization", "Night mode", "Slow motion", "QuickTake video (4K, 1080p and 720p)"]
//         this.processor = "Apple A17 Pro"
//         this.NumberOfCoresProcessor = "2 + 4"
//         this.appleSeries = "Apple Axe Series"
//         this.mainCameraMPCount = "48 MP + 12 MP + 12 MP"
//         this.mainCameraFeatures = ["Autofocus", "Flash", "Support 4K shooting", "Stabilization", "Telephoto lens", "Ultra wide angle lens"]
//         this.numbersOfMainCameras = 3
//         this.mainCameraVideoRecording = ["4K / 3840x2160", "stereo sound"]
//         this.additionalyMainCamera = ["48MP Main: 24mm, ƒ/1.78 aperture, second-generation sensor-shift OIS, 100% focus pixels, support for ultra-high-resolution photos (24MP and 48MP)", "12MP Ultra Wide: 13mm, ƒ/2.2 aperture and 120° field of view, 100% focus pixels", "12MP 2x Telephoto: 48mm, ƒ/1.78 aperture, second-generation sensor-shift OIS, 100% focus pixels, quad-pixel sensor", "12MP 5x Telephoto: 120mm, ƒ/2.8 aperture, OIS", "5x optical zoom; 2x optical zoom; 10x optical zoom range", "Digital zoom up to 25x", "Custom default lens (primary) / Sapphire crystal lens cover / True Tone adaptive flash / Photonic Engine / Deep synthesis / Smart HDR 5 / Next-generation portraits with Focus Assist and Depth Control / Portrait Lighting with six effects / Night mode portraits with LiDAR Scanner / Panorama (up to 63MP) / Photo Styles / Macro photography / Apple ProRAW / Wide color capture for photos and Live Photos / Lens correction (Ultra Wide) / Advanced red-eye correction / Automatic image stabilization / Burst mode / Geo-tagging of photos / HEIF, JPEG, and DNG image formats", "4K video recording at 24 fps, 25 fps, 30 fps, or 60 fps", "1080p HD video recording at 25, 30, or 60 fps", "720p HD video recording at 30 fps", "Cinematic mode up to 4K HDR at 30 fps", "Action mode up to 2.8K at 60 fps", "4K HDR video recording with Dolby Vision at 60 fps", "ProRes video recording up to 4K at 60 fps with external recording", "Video log", "Academy color encoding", "Macro video recording, including slow motion and time-lapse", "1080p slow motion video at 120 or 240 fps", "Time-lapse video with stabilization", "Night mode Time-lapse", "QuickTake Video", "Second-generation sensor-shift optical image stabilization for video (main)", "3D sensor-shift optical image stabilization with autofocus for video (telephoto)", "Digital zoom up to 15x (iPhone 15 Pro Max)", "Audio zoom", "True Tone flash", "Cinematic video stabilization (4K, 1080p, and 720p)", "Continuous video with autofocus", "Take 8-megapixel photos while recording 4K video", "Playback zoom", "Recorded video formats: HEVC, H.264 and ProRes", "Stereo recording"]
//     }
//     police() {
//         if (player.hasCar && !car.carStole) {
//             let chance = rand(0, 100)
//             if (player.expectation > 95) {
//                 player.expectation = false
//             } else {
//                 player.expectation = rand(7, 30)
//             }
//             alert("You called the police, and after a long discussion, you were told to wait.")
//         }
//     }
// }