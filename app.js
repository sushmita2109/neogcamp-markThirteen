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


