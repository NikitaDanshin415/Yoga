window.addEventListener('DOMContentLoaded', function(){
    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a){
        for(let i = a; i < tabContent.length; i++){
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');

        }
    }
    hideTabContent(1);

    function showTabContent(b){
        if(tabContent[b].classList.contains('hide')){
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function(event){
        let target = event.target;
        if(target && target.classList.contains('info-header-tab')){
            for(let i = 0; i < tab.length; i++){
                if(target == tab[i]){
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });


    //timer

    let deadline = '2020-12-09';

    function getTimeRemaining(endTime){
        let t = Date.parse(endTime) - Date.parse(new Date()),
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor((t/(1000*60*60)));

        return {
            'total':t,
            'seconds':seconds,
            'minutes':minutes,
            'hours':hours,
        };        
    }

    function setClock(id, endTime){
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);
            

        function updateClock(){
            let t = getTimeRemaining(endTime);
            
            function addZero(num){
                if(num <= 9) {
                    return '0' + num;
                } else return num;
            }

            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);
            
            if(t.total <=0){
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }
    }

    setClock('timer', deadline);


    //modal 

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        infoBlock = document.querySelector('.info');

    function popUpShow(target){
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    }

    function popUpHide(target){
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    }


    more.addEventListener('click',function(){
        popUpShow(this);
    });

    close.addEventListener('click',function(){
        popUpHide(this);
        
    });

    infoBlock.addEventListener('click',function(e){      
        if(e.target.classList.contains('description-btn')){
            popUpShow(this);
        }
    });

    //slider
    
    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');
    
    showSlides(slideIndex);
    function showSlides(n){
        if(n > slides.length){
            slideIndex = 1;
        }
        if(n < 1){
            slideIndex = slides.length;
        }
                slides.forEach((item)=> item.style.display='none');
        dots.forEach((item)=> item.classList.remove('dot-active'));
        slides[slideIndex-1].style.display='block';
        dots[slideIndex-1].classList.add('dot-active');
    } 

    function plusSlides(n){
        showSlides(slideIndex +=n);
    }
    function currentSlide(n){
        showSlides(slideIndex = n);
    }

    prev.addEventListener('click',function(){
        plusSlides(-1);
    });

    next.addEventListener('click',function(){
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', function(event){
        for(let i = 0 ; i < dots.length + 1; i++){
            if(event.target.classList.contains('dot') && event.target == dots[i-1]){
                currentSlide(i);
            }
        }
    });


    //calculator
    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;

        totalValue.innerHTML = 0;

        persons.addEventListener('change',function(){
            personsSum = +this.value;
            total = (daysSum += personsSum) * 4000;

            if(restDays.value == ''){
                totalValue.innerHTML = 0;
            }else if(persons.value == ''){
                totalValue.innerHTML = 0;
            }else{
                totalValue.innerHTML = total;
            }
        });

        restDays.addEventListener('change',function(){
            daysSum = +this.value;
            total = (daysSum += personsSum) * 4000;

            if(persons.value == ''){
                totalValue.innerHTML = 0;
            }else if(restDays.value == ''){
                totalValue.innerHTML = 0;
            }else{
                totalValue.innerHTML = total;
            }
        });

        place.addEventListener('change',function(){
            if(restDays.value == '' || persons.value == ''){
                totalValue.innerHTML = 0;
            }else{
                let a = total;
                totalValue.innerHTML = a * this.options[this.selectedIndex].value;
            }
        });


});