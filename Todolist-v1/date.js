exports.getDate = function () {
    const today = new Date();
    //get day as "Monday, Tuesday, etc..."
    const options = {
         weekday: "long",
         day: "numeric",
         month: "long"
    };
    
    return today.toLocaleDateString("en-US", options);
}


exports.getDay = function getDay(){
    const today = new Date();
    //get day as "Monday, Tuesday, etc..."
    const options = {
         weekday: "long"
    };
    
    return today.toLocaleDateString("en-US", options);
}
