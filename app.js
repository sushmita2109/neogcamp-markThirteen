const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function reverseStr(str) {
  return str.split("").reverse().join("");
}

function isPalindrome(str) {
  return str === reverseStr(str);
}

function convertDateToStr(date) {
  var dateStr = { day: "", month: "", year: "" };

  date.day < 10
    ? (dateStr.day = "0" + date.day)
    : (dateStr.day = date.day.toString());

  date.month < 10
    ? (dateStr.month = "0" + date.month)
    : (dateStr.month = date.month.toString());

  dateStr.year = date.year.toString();
  return dateStr;
}

function getAllDateFormats(date) {
  // console.log(date);
  var dateStr = convertDateToStr(date);

  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date) {
  var listOfPalindromes = getAllDateFormats(date);

  var flag = false;

  for (var i = 0; i < listOfPalindromes.length; i++) {
    if (isPalindrome(listOfPalindromes[i])) {
      flag = true;
      break;
    }
  }

  return flag;
}

function checkLeapYear(year) {
  if (!year % 400 || !year % 4) {
    return true;
  }
  return false;
}

function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  if (checkLeapYear(year) && month === 2) {
    if (day > 29) {
      day = 1;
      month++;
    }
  } else if (month === 12 && day === 31) {
    day = 1;
    month = 1;
    year++;
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  return {
    day,
    month,
    year,
  };
}

function getPrevDate(date) {
  var day = date.day - 1;
  var month = date.month;
  var year = date.year;

  if (day < 1) {
    month--;
    day = daysInMonth[month - 1];
  }
  if (month < 1) {
    month = 12;
    year--;
    day = 31;
  }
  if (month === 2 && checkLeapYear(year)) {
    day = 29;
  }
  return {
    day,
    month,
    year,
  };
}

function getNextPalindromeDate(date) {
  var count = 1;
  var nextDate = getNextDate(date);

  while (1) {
    // var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
    if (checkPalindromeForAllDateFormats(nextDate)) {
      break;
    }
    nextDate = getNextDate(nextDate);
    count++;
  }
  return [count, nextDate];
}

function getPrevPalindromeDate(date) {
  let count = 1;
  var prevDate = getPrevDate(date);

  while (1) {
    if (checkPalindromeForAllDateFormats(prevDate)) {
      break;
    }
    prevDate = getPrevDate(prevDate);
    count++;
  }
  return [count, prevDate];
}

var bdayRef = document.querySelector("#bday-input");
var showBtnRef = document.querySelector("#show-btn");
var resultRef = document.querySelector("#result");

function clickHandler(e) {
  var bdayStr = bdayRef.value;

  if (bdayStr) {
    var listOfDate = bdayStr.split("-");

    var date = {
      day: Number(listOfDate[2]),
      month: Number(listOfDate[1]),
      year: Number(listOfDate[0]),
    };

    var isPalindrome = checkPalindromeForAllDateFormats(date);

    if (isPalindrome) {
      resultRef.innerText = "Yay! your birthday is a palindrome!! 🥳🥳";
    } else {
      var [nextCount, nextDate] = getNextPalindromeDate(date);
      var [prevCount, prevDate] = getPrevPalindromeDate(date);
      prevCount < nextCount
        ? (resultRef.innerText = `The nearest palindrome date was ${prevDate.month}-${prevDate.day}-${prevDate.year}, you missed it by ${prevCount} days!`)
        : (resultRef.innerText = `The nearest palindrome date is ${nextDate.month}-${nextDate.day}-${nextDate.year}, you missed it by ${nextCount} days!`);
    }
  } else {
    resultRef.innerText = "Please select your birthday";
  }
}

showBtnRef.addEventListener("click", clickHandler);