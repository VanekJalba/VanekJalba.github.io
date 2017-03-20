$(function() {

// Инициализируем плагин, передаем количество слайдов для одновременного показа
// Карусель резиновая, так что можно передавать любое необходимое количество,
// ширина задается в процентах. Задав один слайд для показа получаем слайдер
// Максимальная и минимальная задается в CSS

  $('.jcarousel').jcarousel({showItems: 3});

// Шаблонизатор Резига

  var info = {
    name: 'Jalba Ion',
    photo: 'photo.png',
    occupation: 'Журналист, аудио-продюссер,',
    question: 'Лучшая работа - это Хобби:',
    answers: ['СТИВ ДЖОБС'],
    phone: '+380637648434',
    socialName: 'vk.com',
    socialLink: 'https://vk.com/jonsnowua',
    feedback: 'Те кто читает книги, всегда будут управлять теми кто смотрит телевизор'
  };
    var html = $('#profile').html();
    var content = tmplR(html, info); // tmpl переименован в tmplR из-за конфликта имен с Lodash
    $('.template-content').append(content);

  // Шаблонизатор lodash

  var tmpl = _.template($('#profile-lodash').html());
  var html2 = tmpl(info);
  $('.template-content').append(html2);
});
