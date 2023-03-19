$(document).ready(function(){

    // Save the user input when the save button is clicked
    $(document).on("click",".saveBtn",function(){
        // Get the value from the text area and the ID of the parent element
        var input = $(this).parent().find("textarea").val()
        var elementId = $(this).parent().attr("id")

        // Save the user input to localStorage
        localStorage.setItem(elementId, input)
    });

    // Dynamically create time blocks
    // Define the start and end hours for the loop
    var startHour = 9;
    var endHour = 17;
  
    // Loop through each hour
    for (var hour = startHour; hour <= endHour; hour++) {
        // Create a new time-block element for the hour
        var timeBlockEl = $("<div>")
            .attr("id", "hour-" + hour)
            .addClass("row time-block");

        // Create the hour element and add it to the time-block element
        var hourEl = $("<div>")
            .addClass("col-2 col-md-1 hour text-center py-3")
            .text(hour<=12? hour + "AM": hour-12 + "PM");
        
        timeBlockEl.append(hourEl);

        // Create the textarea element and add it to the time-block element
        var textareaEl = $("<textarea>")
            .addClass("col-8 col-md-10 description")
            .attr("rows", "3");

        timeBlockEl.append(textareaEl);

        // Create the save button element and add it to the time-block element
        var saveBtnEl = $("<button>")
            .addClass("btn saveBtn col-2 col-md-1")
            .attr("aria-label", "save");
        var saveIconEl = $("<i>")
            .addClass("fas fa-save")
            .attr("aria-hidden", "true");
        
        saveBtnEl.append(saveIconEl);
        timeBlockEl.append(saveBtnEl);

        // Add the time-block element to the page
        $("#time-blocks").append(timeBlockEl);
    }

    // Get the current hour as a number (0-23)
    var currentHour = dayjs().hour();
    
    // Loop through each time-block element
    $(".time-block").each(function() {
        
        // Get the hour represented by the time-block element as a number (0-23)
        var timeBlockHour = parseInt($(this).attr("id").replace("hour-", ""));
        
        // Add the "past" class if the time-block hour is less than the current hour
        if (timeBlockHour < currentHour) {
            $(this).addClass("past");
        }
        // Add the "present" class if the time-block hour is equal to the current hour
        else if (timeBlockHour === currentHour) {
            $(this).addClass("present");
        }
        // Add the "future" class if the time-block hour is greater than the current hour
        else {
            $(this).addClass("future");
        }
    });
    
    // Loop through each time-block element
    $(".time-block").each(function() {
        // Get the ID of the time-block element (e.g. "hour-9")
        var timeBlockId = $(this).attr("id");
    
        // Get the user input from localStorage for this time-block
        var userInput = localStorage.getItem(timeBlockId);
    
        // If there is user input saved for this time-block, set the value of the textarea element
        if (userInput) {
            $(this).find(".description").val(userInput);
        }
    }); 

    // Get the current date using day.js
    var currentDate = dayjs().format("D MMMM YYYY");
    
    // Set the text of the header element to the current date
    $("#currentDay").text(currentDate);

});