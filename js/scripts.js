var elForm = $_('.modal__js-form');
var elInputTitle = $_('.modal__js-title-input');
var elInputCompany = $_('.modal__js-company-input');
var elInputTech = $_('.modal__js-tech-input');
var elInputTelegram = $_('.modal__js-telegram-input');
var elInputPhone = $_('.modal__js-phone-input');
var elLocation = $_('.modal__js-location');
var elInputResponsible = $_('.modal__js-responsible');
var elWrokingTime = $_('.modal__js-time');
var elSalary = $_('.modal__js-salary');
var elMoreInfo = $_('.modal__js-more');
var elResultTemplate = $_('.result-template').content;
var templateFragment = document.createDocumentFragment();
var elResultList = $_('.site-main__list');
var userInfoArray = JSON.parse(localStorage.getItem('list')) || [];
var count = Number(localStorage.getItem('count')) || 0;

var clearInputFunction = function () {
  elInputTitle.value = '';
  elInputCompany.value = '';
  elInputTech.value = '';
  elInputTelegram.value = '';
  elInputPhone.value = '';
  elLocation.value = '';
  elSalary.value = '';
  elWrokingTime.value = '';
  elInputResponsible.value = '';
  elMoreInfo.value = '';
}

var counterTime = $_('.site-main__js-time');
var seconds = $_('.seconds');
var totalSeconds = 0;
setInterval(setTime, 1000);

function setTime() {
  ++totalSeconds;
  // counterTime.innerHTML = interActiveTime(totalSeconds % 60);
  // seconds.innerHTML = interActiveTime(parseInt(totalSeconds / 60));
}

function interActiveTime(val) {
  var valString = val + '';
  if (valString.length < 2) {
    return '0' + valString;
  } else {
    return valString
  }
}

var showResultList = function (evt) {
  elResultList.innerHTML = '';
  evt.forEach(info => {
    var elTemplateClone = elResultTemplate.cloneNode(true);

    $_('.site-main__js-link', elTemplateClone).textContent = info.title;
    $_('.site-main__js-link', elTemplateClone).dataset.target = info.id;
    $_('.site-main__js-company', elTemplateClone).textContent = info.companyName;
    $_('.site-main__js-location', elTemplateClone).textContent = info.location;

    templateFragment.appendChild(elTemplateClone);
  });

  elResultList.appendChild(templateFragment);
}

elForm.addEventListener('submit', function (evt) {
  evt.preventDefault();

  count++;
  localStorage.setItem('count', JSON.stringify(count));

  var generalInfoArray = [
    {
      id: count,
      title: elInputTitle.value,
      companyName: elInputCompany.value,
      technologies: elInputTech.value,
      telegram: elInputTelegram.value,
      phone: elInputPhone.value,
      location: elLocation.value,
      responsible: elInputResponsible.value,
      workingTime: elWrokingTime.value,
      salary: elSalary.value,
      moreInfo: elMoreInfo.value
    }
  ]

  if (!userInfoArray.includes(generalInfoArray[0])) {
    userInfoArray.unshift(generalInfoArray[0]);
    localStorage.setItem('list', JSON.stringify(userInfoArray));
  }

  console.log(userInfoArray);

  showResultList(userInfoArray);

  clearInputFunction();

})

showResultList(userInfoArray);

var jsModalInfo = $_('.js-modal-info');

elResultList.addEventListener('click', evt => {
  if (evt.target.matches('.site-main__link')) {
    var findElement = userInfoArray.find(function (number) {
      return Number(evt.target.dataset.target) === number.id;
    });


    $_('.modal__js-title-result', jsModalInfo).textContent = findElement.title;
    $_('.modal__js-company-name', jsModalInfo).textContent = findElement.companyName;
    $_('.modal__js-location-result', jsModalInfo).textContent = findElement.location;
    $_('.modal__js-tech-result', jsModalInfo).textContent = findElement.technologies;
    $_('.modal__js-telegram-link', jsModalInfo).textContent = findElement.telegram;
    $_('.modal__js-phone-number', jsModalInfo).textContent = findElement.phone;
    $_('.modal__js-phone-number', jsModalInfo).href = `tel:${findElement.phone}`;
    $_('.modal__js-responsible-person', jsModalInfo).textContent = findElement.responsible;
    $_('.modal__js-working-time', jsModalInfo).textContent = findElement.workingTime;
    $_('.modal__js-more-info', jsModalInfo).textContent = findElement.moreInfo;
    $_('.modal__js-salary', jsModalInfo).textContent = findElement.salary;
  }
})


var elHeaderForm = $_('.site-header__js-form');
var elFilterInput = $_('.site-header__js-input');
var elFilterLocation = $_('.form__js-location');
var elFilterTime = $_('.form__working-time');
var elFilterSalary = $_('.form__js-salary');

var checkRegexp = function (evt) {
  return new RegExp(evt, 'gi');
}

elHeaderForm.addEventListener('submit', evt => {
  evt.preventDefault();

  var checkLettersOfWords = checkRegexp(elFilterInput.value);
  var checkLettersOfTechs = checkRegexp(elFilterInput.value);
  var checkSalary = checkRegexp(elFilterSalary.value);

  var filterWithName = userInfoArray.filter(info => {
    var checkLocation = info.location.includes(elFilterLocation.value) || elFilterLocation.value === 'All';
    var checkWowrkingHours = info.workingTime.includes(elFilterTime.value) || elFilterTime.value === 'All';
    var checkFirstInput = info.title.match(checkLettersOfWords) || info.technologies.match(checkLettersOfTechs)
    return info.salary.match(checkSalary) && checkFirstInput && checkLocation && checkWowrkingHours;
  });

  if (filterWithName.length === 0) alert('Nothing found');

  showResultList(filterWithName);
});



// var onlineTime = function () {
//   var currentDate = new Date();
//   var dateTime = currentDate.getMinutes();
//   return dateTime
// }

