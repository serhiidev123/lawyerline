
var mobile_menu_enable = 0;

var testimonial_info = ["As a small firm, having the ability to let lawyerline answer, screen, and forward my calls to wherever I may be, has been invaluable. I consider this team of virtual receptionists to be part of my own.",
            "I just want to say that I am loving the answering service so far! Your team is doing a great job. Each legal representative sounds very professional and fit well with my law firm!",
            "LawyerLine has been invaluable for our firm. It has allowed us to conduct business on the fly and has enabled our clients and other important parties to contact us wherever we are."];

var testimonial_author = ["Jamison Mark, Mark Law Firm", "Molly Koontz Sand, Sand Law", "Paul Janzen, Janzen Legal Services, LLC"];
var testimonial_index = 0;

$( ".mobile-menu" ).click(function() {
    mobile_menu_enable = (mobile_menu_enable + 1) % 2;
    if (mobile_menu_enable) {
        $(".mobile-menu-items").css("display", "block");
    } else {
        $(".mobile-menu-items").css("display", "none");
    }
});

$( ".testimonial-left" ).click(function() {
    testimonial_index = testimonial_index - 1;
    if (testimonial_index < 0)
        testimonial_index = 2;
        
    $(".testimonial-item-info").text(testimonial_info[testimonial_index]);
    $(".testimonial-item-author").text(testimonial_author[testimonial_index]);
});

$( ".testimonial-right" ).click(function() {
    testimonial_index = testimonial_index + 1;
    if (testimonial_index > 2)
        testimonial_index = 0;

    $(".testimonial-item-info").text(testimonial_info[testimonial_index]);
    $(".testimonial-item-author").text(testimonial_author[testimonial_index]);
});

var listem_members = document.querySelectorAll('.listen-member');
listem_members.forEach(member => {

    var audioPlayer = member.querySelector('.green-audio-player');
    var playPause = member.querySelector('.playPause');
    var playpauseBtn = member.querySelector('.play-pause-btn');
    var progress = audioPlayer.querySelector('.progress');
    var sliders = audioPlayer.querySelectorAll('.slider');
    var player = audioPlayer.querySelector('audio');
    var currentTime = audioPlayer.querySelector('.current-time');
    var totalTime = audioPlayer.querySelector('.total-time');

    var draggableClasses = ['pin'];
    var currentlyDragged = null;

    playpauseBtn.addEventListener('click', togglePlay);
    player.addEventListener('timeupdate', updateProgress);
    player.addEventListener('loadedmetadata', () => {
    totalTime.textContent = formatTime(player.duration);
    });
    player.addEventListener('ended', function(){
    playPause.attributes.d.value = "M18 12L0 24V0";
    player.currentTime = 0;
    });

    sliders.forEach(slider => {
    let pin = slider.querySelector('.pin');
    slider.addEventListener('click', window[pin.dataset.method]);
    });

    function isDraggable(el) {
    let canDrag = false;
    let classes = Array.from(el.classList);
    draggableClasses.forEach(draggable => {
        if(classes.indexOf(draggable) !== -1)
        canDrag = true;
    })
    return canDrag;
    }

    function inRange(event) {
    let rangeBox = getRangeBox(event);
    let rect = rangeBox.getBoundingClientRect();
    let direction = rangeBox.dataset.direction;
    if(direction == 'horizontal') {
        var min = rangeBox.offsetLeft;
        var max = min + rangeBox.offsetWidth;   
        if(event.clientX < min || event.clientX > max) return false;
    } else {
        var min = rect.top;
        var max = min + rangeBox.offsetHeight; 
        if(event.clientY < min || event.clientY > max) return false;  
    }
    return true;
    }

    function updateProgress() {
    var current = player.currentTime;
    var percent = (current / player.duration) * 100;
    progress.style.width = percent + '%';
    
    currentTime.textContent = formatTime(current);
    if (current == 0) {
        $(playpauseBtn).css("background-color", "#deebf3");
        $(playpauseBtn).find("p").css("color", "#4c8fc4");
        $(playpauseBtn).find("p").text("PLAY");
    }
    }

    function getRangeBox(event) {
    let rangeBox = event.target;
    let el = currentlyDragged;
    if(event.type == 'click' && isDraggable(event.target)) {
        rangeBox = event.target.parentElement.parentElement;
    }
    if(event.type == 'mousemove') {
        rangeBox = el.parentElement.parentElement;
    }
    return rangeBox;
    }

    function getCoefficient(event) {
    let slider = getRangeBox(event);
    let rect = slider.getBoundingClientRect();
    let K = 0;
    if(slider.dataset.direction == 'horizontal') {
        
        let offsetX = event.clientX - slider.offsetLeft;
        let width = slider.clientWidth;
        K = offsetX / width;    
        
    } else if(slider.dataset.direction == 'vertical') {
        
        let height = slider.clientHeight;
        var offsetY = event.clientY - rect.top;
        K = 1 - offsetY / height;
        
    }
    return K;
    }

    function rewind(event) {
    if(inRange(event)) {
        player.currentTime = player.duration * getCoefficient(event);
    }
    }

    function formatTime(time) {
    var min = Math.floor(time / 60);
    var sec = Math.floor(time % 60);
    return min + ':' + ((sec<10) ? ('0' + sec) : sec);
    }

    function togglePlay() {
    if(player.paused) {
        playPause.attributes.d.value = "M0 0h6v24H0zM12 0h6v24h-6z";
        player.play();
        $(playpauseBtn).css("background-color", "#0c4685");
        $(playpauseBtn).find("p").css("color", "#ffffff");
        $(playpauseBtn).find("p").text("STOP");
    } else {
        playPause.attributes.d.value = "M18 12L0 24V0";
        player.pause();
        $(playpauseBtn).css("background-color", "#deebf3");
        $(playpauseBtn).find("p").css("color", "#4c8fc4");
        $(playpauseBtn).find("p").text("PLAY");
    }  
    }
})

var faq_items = document.querySelectorAll('.faq-item');
faq_items.forEach(item => {
    var faq_question = item.querySelector('.faq-question');
    var faq_answer = item.querySelector('.faq-answer');
    var faq_state = 0;
    faq_question.addEventListener('click', faqSetSstate);

    function faqSetSstate() {
        if (faq_state == 0) {
            faq_state = 1;
            $(faq_answer).css("display", "block");
            $(faq_question).css("background-color", "#255991");
            $(faq_question).find("i").removeClass("fa-plus");
            $(faq_question).find("i").addClass("fa-minus");
        } else {
            faq_state = 0;
            $(faq_answer).css("display", "none");
            $(faq_question).css("background-color", "unset");
            $(faq_question).find("i").addClass("fa-plus");
            $(faq_question).find("i").removeClass("fa-minus");
        }
    }
})

function onClickMenu(element) {
    var href = $(element).attr('href');
    
    if ($( window ).width() > 767) {
         $([document.documentElement, document.body]).animate({
                scrollTop: $(href).offset().top
            }, 500);
    } else {
        $(".mobile-menu-items").css("display", "none");
        mobile_menu_enable = 0;
        $([document.documentElement, document.body]).animate({
                scrollTop: $(href).offset().top
            }, 500);
    }
};

$( document ).ready(function() {
    var width = $(window).width();

    if (width < 768) {
        $(".feature-image").attr("src", "images/feature-mobile-image.png");
        $(".testimonial-image").attr("src", "images/testimonial--mobile-image.png");
        $(".footer-image").attr("src", "images/footer-mobile-image.png");
        $(".about-us-image").attr("src", "images/about-us-mobile.png");
        $(".objective-items .right-point .objective-item-background").attr("src", "images/right-point.png");
        $(".objective-items .left-point .objective-item-background").attr("src", "images/left-point.png");
        $(".first-position .division-background").attr("src", "images/division-background-mobile.png");
        $(".division-photo").attr("src", "images/division-photo-mobile.png");
    }
});