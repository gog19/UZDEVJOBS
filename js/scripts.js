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


var showResultList = function (data) {
  elResultList.innerHTML = '';
  data.forEach(info => {
    var elTemplateClone = elResultTemplate.cloneNode(true);

    $_('.site-main__js-link', elTemplateClone).textContent = info.title;
    $_('.site-main__js-link', elTemplateClone).dataset.id = info.companyName;
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

  showResultList(userInfoArray);

  clearInputFunction();

});

if (userInfoArray.length === 0) {
  document.querySelector('.info-alert').classList.remove('d-none');
}

showResultList(userInfoArray);

function showModalInfo(info) {
  let modalInfo = $_('.js-modal-info');

  $_('.modal__js-title-result', modalInfo).textContent = info.title;
  $_('.modal__js-company-name', modalInfo).textContent = info.companyName;
  $_('.modal__js-location-result', modalInfo).textContent = info.location;
  $_('.modal__js-tech-result', modalInfo).textContent = info.technologies;
  $_('.modal__js-telegram-link', modalInfo).textContent = info.telegram;
  $_('.modal__js-phone-number', modalInfo).textContent = info.phone;
  $_('.modal__js-phone-number', modalInfo).href = `tel:${info.phone}`;
  $_('.modal__js-responsible-person', modalInfo).textContent = info.responsible;
  $_('.modal__js-working-time', modalInfo).textContent = info.workingTime;
  $_('.modal__js-more-info', modalInfo).textContent = info.moreInfo;
  $_('.modal__js-salary', modalInfo).textContent = info.salary;

  return modalInfo;
}

elResultList.addEventListener('click', evt => {
  if (evt.target.matches('.site-main__link')) {
    var findElement = userInfoArray.find(function (number) {
      return evt.target.dataset.id === number.companyName;
    });

    showModalInfo(findElement);
  }
});


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

var theme = localStorage.getItem('theme') || 'light';
var customInput = $_('.custom-control-input');

if (theme === 'dark') {
  document.body.classList.add('page-body--theme');
  customInput.checked = true;
} else if (theme === 'light') {
  document.body.classList.remove('page-body--theme');
  customInput.checked = false;
}


customInput.addEventListener('click', () => {
  if (!customInput.checked) {
    if (theme === 'dark') {
      theme = 'light';
      document.body.classList.remove('page-body--theme');
      localStorage.setItem('theme', theme);
    }
  } else if (customInput.checked) {
    if (theme === 'light') {
      theme = 'dark';
      document.body.classList.add('page-body--theme');
      localStorage.setItem('theme', theme);
    }
  }
})
