function reverseString(str){
    var charList=str.split("");
    console.log(charList);
    var reverseChar=charList.reverse();
    console.log(reverseChar)
    var reverseString=reverseChar.join('');
    console.log(reverseString)
    return reverseString;
}

console.log(reverseString('hello'))