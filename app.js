function reverseString(str){
    var charList=str.split("");
    var reverseChar=charList.reverse();
    var reverseString=reverseChar.join('');
    return reverseString;
}

function checkPalindrome(str){
    var reverse=reverseString(str);
    return str===reverse;
}

function convertDateToString(date){
    var dateStr={day:"",month:"",year:""};
    if(date.day<10){
        dateStr.day='0'+date.day;
    }
    else
    {
        dateStr.day=date.day.toString();
    }
    if(date.month<10){
        dateStr.month='0'+date.month;
    }
    else
    {
        dateStr.month=date.month.toString();
    }
    dateStr.year=date.year.toString();
    console.log(dateStr);
    return dateStr;

}
