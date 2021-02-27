//Validate an empty input
 function validateForm() {
 let emptyInput = document.forms["myForm"]["todo"].value;
 if (emptyInput == "" || emptyInput == null) { 
    alert("Must be filled out"); 
  return false; 
     }
} 
