let tabs = document.querySelectorAll('.tabheader_item'),
  tabsContent = document.querySelectorAll('.tabcontent'),
  tabsParent = document.querySelector('.tabheader');

function hideTabContent() {

  tabsContent.forEach(item => {
    item.classList.add('hide');
    item.classList.remove('show');
  });

  tabs.forEach(item => {
    item.classList.remove('tabheader_item_active');
  });
}

function showTabContent(i = 0) {
  tabsContent[i].classList.add('show');
  tabsContent[i].classList.remove('hide');
  tabs[i].classList.add('tabheader_item_active');
}

hideTabContent();
showTabContent();

tabsParent.addEventListener('click', function (event) {
  const target = event.target;
  if (target && target.classList.contains('tabheader_item')) {
    tabs.forEach((item, i) => {
      if (target == item) {
        hideTabContent();
        showTabContent(i);
      }
    });
  }
});

let text = 'ABOUT ME';
let content = document.querySelector('.title_about');

function emergence() {
  for (let i in [...text]) {
    let letter = document.createElement('span');
    letter.textContent = [...text][i];
    if (letter.textContent.match(/\s/)) {
      letter.style.margin = 'auto 3px'
    }
    letter.style.animationDelay = i / 10 + 's';
    content.appendChild(letter);
  }
}

let timerId = setTimeout(() => emergence(), 3000);

const theme = document.querySelector('.slider');

theme.addEventListener('click', function () {
  document.body.classList.toggle('dark_theme');
  console.log("переключило");
})


// находим конопку "связаться со мной"
let aboutButton = document.querySelector('.about_button');
// кнопка закрыть окно
let closeButton = document.querySelector('.modal_close');

// Если она есть создаем слушатель события клик
if (aboutButton) {
  aboutButton.addEventListener('click', (e) => {
    e.preventDefault(); // отменяем действие по умолчанию "переход по ссылке"
    document.body.classList.toggle('modal-open'); // body добавляем класс open modal

    if (closeButton) {
      closeButton.addEventListener('click', (e) => {
        e.preventDefault(); // отменяем действие по умолчанию "переход по ссылке"
        document.body.classList.remove('modal-open'); // у body убираем класс open modal
      });
    }
  }
  );
}

