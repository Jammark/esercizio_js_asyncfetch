
window.onload = () => {
    let button1 = document.getElementById('btn1');
    let button2 = document.getElementById('btn2');

    button1.onclick = () => {
        loadPersone();
    };

    button2.onclick = () => {
        loadDogs();
    };
};



var queryP = 'people';
const queryD = 'dogs';
const url = 'https://api.pexels.com/v1/search?query=';
const apikey = 'EuPRpBAqyXsxzrV58qILfdq8Kfxw5aYTmGOuWxlHuujN4jvK6frpR5yS';

var header = new Headers();
header.append('Authorization', apikey);

async function loadPersone(){
    try{
        let response = await fetch(`${url}${queryP}`, {
            headers: header
        });
        if(!response.ok){
            throw new Error('Errore dal server.');
        }
        let data = await response.json();
        let images = await data.photos;
        firstList(images);
    }catch(error){
        console.error(error);
    }
}

async function loadDogs(){
    try{
        let response = await fetch(`${url}${queryD}`, {
            headers: header
        });
        if(!response.ok){
            throw new Error('Errore dal server.');
        }
        let data = await response.json();
        let images = await data.photos;
        secondList(images);
    }catch(error){
        console.error(error);
    }
}

 function firstList(images){
    let container = document.querySelector('#persone > div');
    images.forEach(element => {
        let domEl = domElement(element);
        container.appendChild(domEl);
    });
}

function secondList(images){
    let container = document.querySelector('#cani > div');
    images.forEach(element => {
        let domEl = domElement(element);
        container.appendChild(domEl);
    });
}

function domElement(image){
    let col = document.createElement('div');
    col.classList = 'col-12 col-md-4 col-lg-3';
    let img = document.createElement('img');
    img.classList = 'img-fluid';
    let card = document.createElement('div');
    card.classList = 'shadow-lg card';
    col.appendChild(card);
    let container = document.createElement('div');
    container.classList = 'card-img-top';
    card.appendChild(container);
    container.appendChild(img);
    img.src = image.src.original;

    let body = document.createElement('div');
    body.classList = 'card-body';
    card.appendChild(body);
    let text = document.createElement('h4');
    text.classList = 'card-title fw-bold';
    text.innerText = "ID: "+image.id;
    body.appendChild(text);

    let footer = document.createElement('div');
    footer.classList = 'card-footer';
    card.appendChild(footer);
    let button = document.createElement('button');
    button.innerText= 'Nascondi';
    button.classList = 'align-center';
    footer.appendChild(button);
    button.onclick = () => {
        col.style = 'display: none';
    };

    return col;
}

function cerca(){
    let title = document.getElementById('top');
    let input = document.getElementById('search');
    title.innerText = input.value;
    queryP = input.value;
    let container = document.querySelector('#persone > div');
    container.innerHTML = '';
    loadPersone();
}