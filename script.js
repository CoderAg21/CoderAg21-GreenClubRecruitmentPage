//Initialzing gsap
let tl = gsap.timeline()

//Adding animations to section1 of page
tl.from('.section1 h2',{
    opacity:0,
    y:100,
    duration:1,
})
tl.from('.section1 .content',{
    opacity:0,
    y:100,
    duration:1,
})