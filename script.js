var swiper = new Swiper(".featured-swiper", {
  grabCursor: true,
  centeredSlides: true,  
  spaceBetween: 20,
  loop:true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable:true,
    dynamicBullets: true
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});


var swiper2 = new Swiper(".review-swiper", {
  grabCursor: true,
  centeredSlides: true,  
  spaceBetween: 20,
  loop:true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable:true,
    dynamicBullets: true
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

const close = document.getElementById('close');
const modal = document.getElementById('modal');
const close_login = document.getElementById('close-login');
const modal_login = document.getElementById('modal-login');
const sign_up = document.getElementById('sign-up');
const login_sign_up = document.getElementById('login-sign-up');
const search = document.getElementById('search');
const search_form  = document.getElementById('search-div');
const search_icon  = document.getElementById('search-icon');
const search_box  = document.getElementById('search-box');
const booksCards = document.getElementById('books-searched');
//elememt to hide:
const home = document.getElementById('Home');
const services = document.getElementById('Services');
const about = document.getElementById('About');
const featured = document.getElementById('Featured');
const nouveau = document.getElementById('Nouveau');
//refresh
const accueil = document.getElementsByClassName('accueil');

//on acceil clicked
accueil[0].addEventListener('click', ()=>{
  window.location.reload();
});

accueil[1].addEventListener('click', ()=>{
  window.location.reload();
});


search.addEventListener('click', ()=>{
   search_form.classList.toggle('active');
});

window.onscroll = ()=>{
 search_form.classList.remove('active');
};

search_icon.addEventListener('click', ()=>{
  booksCards.innerHTML="";
  home.style.display='none';
  services.style.display='none';
  about.style.display='none';
  featured.style.display='none';
  nouveau.style.display='none';
  booksCards.style.display='flex';
  getBooks(search_box.value);
});

// Show modal
sign_up.addEventListener('click', () => modal_login.classList.add('show-modal'));

// Hide modal
close_login.addEventListener('click', () => modal_login.classList.remove('show-modal'));
close.addEventListener('click', () => modal.classList.remove('show-modal'));


login_sign_up.addEventListener('click', ()=>{
 modal_login.classList.remove('show-modal'); 
 modal.classList.add('show-modal'); 
});

/****books*/
const placeHldr = "book_icon.png";


function getCard(bookImg, title, author, publisher, viewUrl){
    var htmlCard = `<div class="card-book">
             <div class="card-img">
               <img src="${bookImg}" class="card-img" alt="erreur">
             </div>
               <div class="card-body">
                 <h5 class="card-title">${title}</h5>
                 <p class="card-text">Author: ${author}</p>
                 <p class="card-text">Publisher: ${publisher}</p>
                 <a target="_blank" href="${viewUrl}" >Lire Livre</a>
               </div>
           </div>`
 
    return htmlCard;
 }  

function displayBooks(items){
       for(let i=0; i<items.length; i++){
         bookImg= items[i].volumeInfo.imageLinks ? 
            items[i].volumeInfo.imageLinks.thumbnail : placeHldr;
         title = items[i].volumeInfo.title; 
         author = items[i].volumeInfo.authors; 
         publisher= items[i].volumeInfo.publisher;
         viewUrl = items[i].volumeInfo.infoLink+"&pg=PR5";
         var card = getCard(bookImg, title, author, publisher, viewUrl);
         booksCards.innerHTML += card;
       }      
}

function getBooks(query){
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&orderBy=newest`).then(res=>{
        res.json().then(data=>{
          displayBooks(data.items);
       })
    });
}


