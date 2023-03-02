var now = moment() //current time
var DayStart = 9 //start of day in 24hr format 9am
var DayEnd = 18 //End of day in 24hr format 18 / 6pm

var TodaysDate = now.format("LLLL"); //Variable of todays date with the current time parsed in the desired format LLLL is shorthand for dddd, MMMM D, YYYY h:mm A in DayJS displaing, day, date and time
$("#currentDay").text(TodaysDate);

const container = document.getElementById("Timeblocks") // selects the container that is to hold the timeblocks 
var timeListEl = document.createElement('ul') //creates a list in the container to add the timeblocks as list elements 

var classSort = function(hour,cHour,inputEl){ //asigns class based on if timeslot is .. 
  if(hour == cHour){ //the current hour - applies current class
    inputEl.classList.add("current");
  } else if (hour < cHour){ //in the past - removes current & applies past
    inputEl.classList.remove("current");
    inputEl.classList.add("past");
  } else { //or in the future - removes other classes and adds future
    inputEl.classList.remove("past");
    inputEl.classList.remove("current");
    inputEl.classList.add("future");
  }
}

var saveNotes = function(event){ // When function is called, save value entered into local storage
  var value = $(this).siblings('.input').val(); // User input 
  var time = $(this).parent().attr('id'); //keep the ID to make sure the time slot is kept the same
  localStorage.setItem(time,value);
}

for(let i=DayStart;i <= DayEnd;i++){ //repeats from the time start to time end to create a timeblock for each hour between the 2 times 
  var timeBlockEl = document.createElement('li') //list item creation with name timeBlockEl 
  timeBlockEl.classList.add("time-block") //applies class to list items for styling

  var timeEl = document.createElement('p') //creates P element to display time
  timeEl.classList.add("hour") //applies class to P element for styling

  var timeInput = document.createElement('input') //creates input element to add user info in schedule
  timeInput.type = "text" //sets the input to be text
  timeInput.classList.add("input") // assigns class to help styling

  var timeSaveButton = document.createElement('button') //creates the save button
  timeSaveButton.classList.add("saveBtn") //applies class to save button for styling
  timeSaveButton.textContent ="Save" //labels save button

  timeSaveButton.addEventListener("click",saveNotes) //when button is clicked, run saveNotes function to put user info in local storage - added inside the loop so each button has an event listner

  var cHour = moment().format('HH') //Finds the current time in an Hour format
  timeEl.textContent=i+":00"; //Adds :00 minutes to make the display timeslots line up on the O'Clock
  
  classSort(i,cHour,timeInput) // runs my class sort function to find if timeslot is in the past,present or future

  //spawn new object for each hour
  timeBlockEl.appendChild(timeEl) //append time element to list item 
  timeBlockEl.appendChild(timeInput) // append input element to list item
  timeBlockEl.appendChild(timeSaveButton) //appends save button to list item 
  timeBlockEl.id="Hour-"+i // id of the timeblock is the word "Hour" plus the index in the for loop, which should line up with the hour d
  timeListEl.appendChild(timeBlockEl) //appends list item to list 
}


container.appendChild(timeListEl) //appends list to container

for(let i=DayStart;i <= DayEnd;i++){ //looks for data in local storage and displays 
  var item = "Hour-"+i //generates time key for searching local storage
  var id = "#"+item //generates the input box's ID based that is to receive the data

  $(id+" .input").val(localStorage.getItem(item))//gets the info from local storage on page load based on the IDs above
}
  



