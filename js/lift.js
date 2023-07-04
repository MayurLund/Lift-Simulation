class PriorityQueue {
    constructor() {
      this.queue = [];
    }
  
    enqueue(item, priority) {
      this.queue.push({ item, priority });
      this.sort();
    }
  
    dequeue() {
      if (this.isEmpty()) {
        return null;
      }
      return this.queue.shift().item;
    }
  
    isEmpty() {
      return this.queue.length === 0;
    }
  
    sort() {
      this.queue.sort((a, b) => a.priority - b.priority);
    }
  }
  
const liftData=[];

const floors = (floors) =>{
    const slab=document.getElementById("building");
    for(let i=floors;i>0;i--){
        
        const floor=document.createElement('div');
        const liftButton = document.createElement('div');
        const up = document.createElement('button');
        const down = document.createElement('button');
        const floorInfo=document.createElement('p');

        slab.appendChild(floor);
        floor.appendChild(floorInfo);
        floor.appendChild(liftButton);
        liftButton.appendChild(up);
        liftButton.appendChild(down);
        if(i==1){
            floor.setAttribute('id','groundFloor');
        }
        floor.setAttribute('class','floor');
        floorInfo.setAttribute('class','floorInfo');
        liftButton.setAttribute('class','liftButton');
        up.setAttribute('class','up');
        down.setAttribute('class','down');

        floorInfo.innerHTML=`${i}`;
        up.innerHTML="up";
        down.innerHTML="down";

        up.setAttribute("data-floor",i);
        down.setAttribute("data-floor",i);

        up.addEventListener('click',function(event){
            const liftNeededAt = parseInt(event.target.getAttribute('data-floor'));
            console.log("up button for floor: ",liftNeededAt);
            const liftNumber = LiftToBeCalled(liftNeededAt);
            moveLift(liftNumber,liftNeededAt);
        })

        down.addEventListener('click',function(event){
            const liftNeededAt = parseInt(event.target.getAttribute('data-floor'));

            console.log("down button for floor:",liftNeededAt);
            const liftNumber = LiftToBeCalled(liftNeededAt);
            moveLift(liftNumber,liftNeededAt);
        })

    }
}
//Lifts
const lifts = (numLifts)=>{
    const groundFloor = document.getElementById('groundFloor');
    
    const liftsContainer=document.createElement('div');
    liftsContainer.setAttribute('class','lifts-container');
    groundFloor.appendChild(liftsContainer);
    for(let i=0;i<numLifts;i++){
    const lift=document.createElement('div');
    const liftLeftDoor = document.createElement('div');
    const liftRightDoor = document.createElement('div');


    lift.setAttribute('class','lift');
    lift.setAttribute('id',i);
    liftLeftDoor.setAttribute('class','liftLeftDoor');
    liftRightDoor.setAttribute('class','liftRightDoor');
    lift.appendChild(liftLeftDoor);
    lift.appendChild(liftRightDoor);
    liftsContainer.appendChild(lift);

    liftData.push({
        id:i,
        isMoving: false, //Not moving
        currentFloor:1,
        position:0 //ground floor
    });

}};



  //function to calculate nearest available lift using a priority queue
  const LiftToBeCalled = (calledFloor) => {
    const priorityQueue = new PriorityQueue();
  
    for (let i = 0; i < liftData.length; i++) {
      const lift = liftData[i];
      if (!lift.isMoving) {
        const diff = Math.abs(calledFloor - lift.currentFloor);
        priorityQueue.enqueue(i, diff);
      } else if (lift.currentFloor === calledFloor) {
        // If the lift is already at the requested floor, directly return the lift number
        return i;
      }
    }
  
    // If no available lift is found, return the lift number with the minimum distance
    return priorityQueue.dequeue();
  };
  
  const openDoors = function(lift,liftElement) {
    console.log(`Lift ${lift.id} opening doors at floor ${lift.currentFloor}`);
    //const liftElement = document.getElementById(lift.id);
    liftElement.classList.add("opening");
    setTimeout(() => closeDoors(lift,liftElement), 2500); // 2.5 seconds for opening
  };
  
  const closeDoors = function(lift,liftElement) {
    console.log(`Lift ${lift.id} closing doors at ${lift.currentFloor}`);
    //const liftElement = document.getElementById(lift.id);
    liftElement.classList.remove("opening");
    liftElement.classList.add("closing");
    setTimeout(() => {
      liftElement.classList.remove("closing");
      lift.isMoving = false;
      console.log("I am inside closeDoors",lift);
    }, 2500); 
    
  };
  

const moveLift = function (liftNumber, liftNeededAt) {
    const lift = liftData[liftNumber];
  
    if (lift.isMoving) {
      return;
    }
  
    //const currentFloor = lift.currentFloor;
    const liftElement = document.getElementById(liftNumber);
  
    const floorsToMove = Math.abs(liftNeededAt - lift.currentFloor);
    const distance = 100 * floorsToMove;
    const timeToReach = 2 * floorsToMove * 1000; 
  
    const newPosition = (liftNeededAt * 100)-100;
    lift.isMoving = true;
    liftElement.style.transform = `translateY(${-newPosition}px)`;
    liftElement.style.transition = `transform ${timeToReach}ms`;
    lift.currentFloor = liftNeededAt;
    lift.position = newPosition;
    console.log("I am printing Lift element",liftElement);
    

    // After the transition is completed, reset isMoving to false
    setTimeout(() => {
    openDoors(lift,liftElement);
      
    }, timeToReach);
    
}

/* document.getElementById("inputForm").addEventListener('submit',function(event){
    event.preventDefault();

    const numFloors=document.getElementById("numFloors").value;
    const numLifts=document.getElementById("numLifts").value;
    console.log(numFloors);
    console.log(numLifts);

    if(isNaN(numFloors)||isNaN(numLifts)||numFloors<2||numLifts<1){
        alert("Please enter valid numbers for floors and simulation");
    }

    floors(numFloors);
    lifts(numLifts);
}); */
document.getElementById("inputForm").addEventListener('submit', function(event) {
    event.preventDefault();

    const numFloors = document.getElementById("numFloors").value;
    const numLifts = document.getElementById("numLifts").value;



    if (isNaN(numFloors) || isNaN(numLifts) || numFloors < 2 || numLifts < 1) {
        alert("Please enter valid numbers for floors and simulation");
        return;
    }

/*     if(numFloors>20){
        alert("Please enter floor upto 20")
    }else if(numLifts>numFloors){
        alert("No. of Lifts cannot be greater than floors")
    }else(numLifts>15){
        alert("lifts cannot be 20");
    } */
    // Mobile responsiveness
    const windowWidth = window.innerWidth;

    if (windowWidth < 300 && numLifts > 2) {
        alert('Number of lifts cannot be greater than 2 for extra small screens!');
        return;
    } else if (windowWidth < 500 && numLifts > 4) {
        alert('Number of lifts cannot be greater than 4 for mobile screens!');
        return;
    } else if (windowWidth < 850 && numLifts > 8) {
        alert('Number of lifts cannot be greater than 8 for tab screens!');
        return;
    }
    else if (windowWidth < 1000 && numLifts > 12) {
        alert('Number of lifts cannot be greater than 12 for large screens!');
        return;
    }

    floors(numFloors);
    lifts(numLifts);
});
