//Initialzing gsap
let tl = gsap.timeline()

//Adding animations to section1 of page
tl.from('.section1 h2',{
    opacity:0,
    y:150,
    
    duration:1,
})
tl.from('.section1 .content',{
    opacity:0,
    y:100,
    duration:1,
})

gsap.from('.section2',{
    opacity:0,
    transform:"Scale(.95)",
    y:200,
    scrollTrigger:{
        trigger:'.section2',
        start:"top 60%",
        end:'top 40%',
        markers:true,
        scrub:true
    },

})