document.addEventListener("DOMContentLoaded", function () {
    var swiper = new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
            rotate: 10,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
        },
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        }
    });
});
