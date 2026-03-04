




// use a script tag or an external JS file
 document.addEventListener("DOMContentLoaded", (event) => {
  
gsap.registerPlugin(DrawSVGPlugin,ScrollTrigger,ScrollSmoother,ScrollToPlugin)
    


const start = gsap.timeline({efaults:{opacity:0, ease:"back"}});

function init() {
   start.from(".scene1-BG", {ease:"linear", autoAlpha:0})
    .from(".stagger1", {scale:0, transformOrigin:"50% 50%", stagger:0.1}, "-=0.5")
    .from("#le_tren", {yPercent:-30, duration:1}, "-=0.5")
    .from("#name_sign", {yPercent:30, duration:1}, "<")
    .from("#giayVo", {xPercent:30}, "-=0.6")
    .from("#vong1_trai", {xPercent:30}, "<")
    .from("#vong2_phai", {xPercent:-30}, "<")
    .from(".gach_cheo", {opacity:0,scale:2,
       onComplete: function() {
          gsap.set(".gach_cheo", { clearProps: "transform" });
          // Hoặc set lại transform gốc
          // gsap.set(".gach_cheo", { transform: "translate(-45%, -50%)" });
        }
          }, "-=0.5");
}

  init(); //do stuff

// window.addEventListener("load", function(event) { 
//   init(); //do stuff
// //  GSDevTools.create({animation:start})
// });


// tạo hover
const giayVo = document.getElementById("giayVo");

  const giayVoTLenter = gsap.timeline();
  
    giayVoTLenter.set("#star1", { opacity:1 })
    .to(giayVo, {scale: 1.5, duration: 0.2, ease: "power1.out",overwrite: "auto" })
    .from("#star1", { duration: 2, drawSVG: 0 }, "<")
    .to("#vong2_phai>ellipse", {skewX: 10, yoyo: true, repeat: -1, duration: 0.5, ease: "sine.inOut" }, "<")
    .to("#vong1_trai>ellipse", {skewX: -10, yoyo: true, repeat: -1, duration: 0.5, ease: "sine.inOut" }, "<");

    const  giayVoTLleave = gsap.timeline();
  
    giayVoTLleave.to(giayVo, {scale: 1,duration: 0.5,ease: "power1.out",overwrite: "auto"})
    .to("#star1", { opacity:0, duration: 0.5 }, "<");
    


giayVo.addEventListener("mouseenter", () => { 
   // Dừng timeline leave nếu đang chạy
  giayVoTLleave.pause();
  giayVoTLleave.progress(0); // Reset về đầu
  
  // Reset và play timeline enter
  giayVoTLenter.restart(); // restart() = progress(0) + play()
});

giayVo.addEventListener("mouseleave", () => { 

      giayVoTLenter.pause();
  giayVoTLenter.progress(0); // Reset về đầu
  
  // Reset và play timeline leave
  giayVoTLleave.restart();
    
});


const nameSign = document.getElementById("name_sign");

const nameSignTLenter = gsap.timeline();
  
    nameSignTLenter.set("#group_heart", { opacity:1 })
    .to(nameSign, {scale: 1.1, duration: 0.2, ease: "power1.out",overwrite: "auto" })
    .fromTo("#group_heart path", { opacity:0 }, { duration: 0.5, opacity:1, stagger:0.1,repeat: -1, yoyo: true}, "<");

  const nameSignTLleave = gsap.timeline();
  
    nameSignTLleave.to(nameSign, {scale: 1,duration: 0.5,ease: "power1.out",overwrite: "auto"})
    .to("#group_heart", { opacity:0, duration: 0.5 }, "<");


nameSign.addEventListener("mouseenter", () => { 
  nameSignTLleave.pause();
  nameSignTLleave.progress(0);
  nameSignTLenter.restart();
    
});

nameSign.addEventListener("mouseleave", () => { 
  nameSignTLenter.pause();
  nameSignTLenter.progress(0);
  nameSignTLleave.restart();
    
});




// const ngay_cuoi = document.getElementById("ngay_cuoi");
// ngay_cuoi.addEventListener("mouseenter", () => {
//     gsap.to(ngay_cuoi, {
//       scale: 1.1,
//       duration: 0.2,
//       ease: "power1.out",
//       overwrite: true, // quan trọng: tránh ghi đè timeline khác
//       transformOrigin: "100% 50%",
//     });
//   });

//   ngay_cuoi.addEventListener("mouseleave", () => {
//     gsap.to(ngay_cuoi, {
//       scale: 1,
//       duration: 0.5,
//       ease: "power1.out",
//       overwrite: true,
//       transformOrigin: "100% 50%",
//     });
//   });

// const la1 = document.getElementById("la1");
// la1.addEventListener("mouseenter", () => {
//     gsap.to(la1, {
//       scale: 1.1,
//       duration: 0.2,
//       ease: "power1.out",
//       overwrite: true, // quan trọng: tránh ghi đè timeline khác
//       transformOrigin: "0% 100%",
//     });
//   });

//   la1.addEventListener("mouseleave", () => {
//     gsap.to(la1, {
//       scale: 1,
//       duration: 0.5,
//       ease: "power1.out",
//       overwrite: true,
//       transformOrigin: "0% 100%",
//     });
//   });



const objects = document.querySelectorAll( '.scene1-BG img.scene1:not(#name_sign):not(#giayVo), svg.scene1:not(#name_sign):not(#giayVo)');


objects.forEach(obj => {
  const hoverScale = parseFloat(obj.dataset.hover) || 1.1;
const transformOrigin1 = obj.dataset.transformOrigin || 
                           obj.dataset.transformorigin || 
                           "50% 50%";
  
  // console.log(obj.id, "transformOrigin:", transformOrigin1);

  obj.addEventListener("mouseenter", () => {
    gsap.to(obj, {
      scale: hoverScale,
      duration: 0.2,
      ease: "power1.out",
      transformOrigin: transformOrigin1,
      overwrite: "auto" // quan trọng: tránh ghi đè timeline khác
    });
  });

  obj.addEventListener("mouseleave", () => {
    gsap.to(obj, {
      scale: 1,
      duration: 0.5,
      ease: "power1.out",
      overwrite: "auto"
    });
  });
});



// scroll trigger Ở đây nè
  

   
  // gsap code here!
        gsap.to(".scene1-BG", {
                "--mask-end": "0%",
                "--mask-trans": "80%",
              ease: "none",
              scrollTrigger: {
                trigger: ".scene2-BG",
                start: "top bottom",
                end: "top center",
                scrub: true,
                 
                //
              },
        //       onUpdate: function () {
        // const bg = document.querySelector(".scene1-BG");
        // const demo = document.querySelector(".demo");

        // // Lấy giá trị biến CSS hiện tại
        // const val = getComputedStyle(bg).getPropertyValue("--mask-end");

        // // Update vào p.demo
        // demo.textContent = val.trim();

        //     }

          
        });


        gsap.fromTo(".anh",
            { y: 0 },        // trạng thái ban đầu rõ ràng
            {
              y: 500,        // trạng thái sau cùng
              ease: "none",
              scrollTrigger: {
                trigger: ".scene2-BG",
                start: "top bottom",
                end: "top center",
                scrub: 2
                // 
              }
            }
          );


  gsap.from('.backHoa1', {
      scrollTrigger: {
        trigger: '.scene2-BG',
        scrub: 2,
        start: 'top 60%', // when the top of the trigger hits the bottom of the viewport
        end: "top middle", // when the bottom of the trigger hits the top of the viewport
      
        onEnter: () => {
                document.querySelector(".scene2-BG").style.overflow = "visible";
              },

         onLeave: () => {
          document.querySelector(".scene2-BG").style.overflow = "hidden";
        },

        // Khi kéo ngược trở lại
        onLeaveBack: () => {
          document.querySelector(".scene2-BG").style.overflow = "hidden";
        },

        onEnterBack: () => {
          document.querySelector(".scene2-BG").style.overflow = "visible";
        }

        

      } , // start the animation when ".box" enters the viewport (once)
      y: "-150%",
      x:"-150%",
      opacity: 0
    });


    const sway1 = gsap.to(".hoa1--a, .backHoa2", {
      rotation: 2,
      yoyo: true,
      repeat: -1,
      duration: 0.6,
      ease: "sine.inOut",
      paused: true
    });

    const sway2 = gsap.to(".hoa2--a, .backHoa1, .backHoa3", {
      rotation: -2,
      yoyo: true,
      repeat: -1,
      duration: 0.7,
      ease: "sine.inOut",
      paused: true
    });


  ScrollTrigger.create({
  trigger: ".scene2-BG",
  start: "top bottom",
  end: "bottom bottom",
  scrub: 1,
    // markers: true,
    // id: "scne2",
  snap: {
    snapTo: 1,        // 0 = top, 1 = bottom
    duration: 0.6,   // thời gian snap
    ease: "power2.out",
    //  onComplete: () => {
    //         // ✅ chạy NGAY khi snap xong (đúng điểm end)
    //         sway1.play();
    //         sway2.play();
    //     }

  },

    onEnter: () => {
        sway1.play();
        sway2.play();
    },

    onLeaveBack: () => {
        sway1.pause().progress(0);
        sway2.pause().progress(0);
    },
  });



     gsap.from('.backHoa3', {
      scrollTrigger: {
        trigger: '.scene2-BG',
        scrub: 2,
        start: 'top 40%', 
        end: "top middle", // when the bottom of the trigger hits the top of the viewport
        
        

      } , // start the animation when ".box" enters the viewport (once)
      y: "-150%",
      opacity: 0
    });



    


     gsap.from('.backHoa2', {
      scrollTrigger: {
        trigger: '.scene2-BG',
        scrub: 2,
        start: 'top 60%', // when the top of the trigger hits the bottom of the viewport
        end: "top middle", // when the bottom of the trigger hits the top of the viewport
        

      } , // start the animation when ".box" enters the viewport (once)
      y: "-150%",
      x:"150%",
      opacity: 0
    });

//animation các hoa phía trước

      gsap.from('.hoa1--a', {
      scrollTrigger: {
        trigger: '.scene2-BG',
        start: '90% bottom', // when the top of the trigger hits the bottom of the viewport
         // when the bottom of the trigger hits the top of the viewport
       
        toggleActions: "restart none none reverse",
      } , // start the animation when ".box" enters the viewport (once)
      y: "100%",
      duration:1
    });

         gsap.from('.hoa2--a', {
      scrollTrigger: {
        trigger: '.scene2-BG',
        start: '90% bottom', // when the top of the trigger hits the bottom of the viewport
         // when the bottom of the trigger hits the top of the viewport
       
        toggleActions: "restart none none reverse",
      } , // start the animation when ".box" enters the viewport (once)
      y: "80%",
      duration:1.5
    });



    
     gsap.from('.track-wrapper', {
      scrollTrigger: {
        trigger: '.scene2-BG',
        scrub: 2,
        start: 'top 50%', 
        end: "top middle", // when the bottom of the trigger hits the top of the viewport
            

      } , // start the animation when ".box" enters the viewport (once)
      y: "-100%",
      opacity: 0
    });
    

    // Tạo animation sway nhưng tạm dừng
    
// ScrollTrigger điều khiển bật/tắt
// ScrollTrigger.create({
//   trigger: ".scene2-BG",
//   start: "95% 95%",       // khi bottom của trigger = bottom viewport
//       // giữ vùng rất nhỏ để "hold"
//   end: "95% 95%",       // khi bottom của trigger = bottom viewport
//    id: "scene2-sway", 
//   markers: {
//         startColor: "green",
//         endColor: "red",
//         fontSize: "12px",
//         indent: 150   // ⚠️ CHỈ hoạt động trên GSAP mới (3.12+)
//     },
//   onEnter: () => {
//     sway1.play();
//     sway2.play();
//   },
//   // onLeave: () => {
//   //   sway1.pause().progress(0);
//   //   sway2.pause().progress(0);
//   // },
//   // onEnterBack: () => {
//   //   sway1.play();
//   //   sway2.play();
//   // },
//   onLeaveBack: () => {
//     sway1.pause().progress(0);
//     sway2.pause().progress(0);
//   }
// });


   });

    //bật video
    
      document.addEventListener("click", function(e) {

    const container = document.querySelector(".video-container");
    const iframe = container.querySelector("iframe");
    const originalSrc = iframe.dataset.src;

    const isVisible = container.style.display !== "none";

    // Nếu container đang mở
    if (isVisible) {
        // Click bên ngoài container → đóng
        if (!e.target.closest(".video-container")) {
            container.style.display = "none";
            iframe.src = originalSrc;

        }
    } 
    // Nếu container đang đóng
    else {
        if (e.target.closest("#video")) {
            let newSrc = originalSrc;
            if (!newSrc.includes("autoplay=1")) {
                newSrc += (newSrc.includes("?") ? "&" : "?") + "autoplay=1";
            }

            iframe.src = newSrc;
            container.style.display = "block";

            // Điều chỉnh CSS các element khác
          
        }
    }
});



     


 const urls = `
https://i.postimg.cc/5tScRnsD/C-309.jpg
https://i.postimg.cc/xd3r4tsn/C-313.jpg
https://i.postimg.cc/YqTwG4GK/C-123.jpg
https://i.postimg.cc/7YjyGCGv/C-134.jpg
https://i.postimg.cc/FHcXj93h/C-142.jpg
https://i.postimg.cc/K8LhnZBy/C-146.jpg
https://i.postimg.cc/zBprV0Wp/A-108.jpg
https://i.postimg.cc/bJLhs3bV/A-102.jpg
https://i.postimg.cc/63zXyYR0/A-128.jpg
https://i.postimg.cc/SRvbGRgp/A-255.jpg
https://i.postimg.cc/vZ9wWQfs/C-137.jpg
https://i.postimg.cc/d3xc935Z/A-352.jpg
https://i.postimg.cc/2y6fvh7m/A-224.jpg
https://i.postimg.cc/KjHh5j08/A-335.jpg
https://i.postimg.cc/MHFJYH9T/A-312.jpg
https://i.postimg.cc/J0nWJZcS/A-154.jpg
https://i.postimg.cc/Hnh1tn6m/A-284.jpg
https://i.postimg.cc/qqRdnyxk/A-201.jpg
https://i.postimg.cc/dQHFFNJK/A-359.jpg
https://i.postimg.cc/mZX44pT4/A-385.jpg
https://i.postimg.cc/NGJttCQK/A-391.jpg
https://i.postimg.cc/RCsmmpv6/A-397.jpg
https://i.postimg.cc/VLJ8k9Nt/A-403.jpg
https://i.postimg.cc/L6Jp8ksf/A-406.jpg
https://i.postimg.cc/3JkTxjwn/A-408.jpg
https://i.postimg.cc/15bZnggG/A-431.jpg
https://i.postimg.cc/L6GMYqqW/A-437.jpg
https://i.postimg.cc/tTDjY2Pr/A-84.jpg
https://i.postimg.cc/W4vL8Qw7/C-185.jpg
https://i.postimg.cc/DzTk6tP4/C-177.jpg
https://i.postimg.cc/g2RbvY8h/C-155.jpg
https://i.postimg.cc/JhLVx95X/C-182.jpg
https://i.postimg.cc/FK45p2VZ/C-207.jpg
https://i.postimg.cc/hGBWsH1M/C-211.jpg
https://i.postimg.cc/cJBqbXDL/C-345.jpg
https://i.postimg.cc/VNWyVDKG/C-295.jpg
https://i.postimg.cc/d0YP6zjN/C-231.jpg
https://i.postimg.cc/1zQhBLrj/C-253.jpg
https://i.postimg.cc/5tScRnsn/C-284.jpg
https://i.postimg.cc/DzPVMBxx/C-302.jpg
https://i.postimg.cc/DZfVkLDT/C-321.jpg
https://i.postimg.cc/mDZxfCqL/C-355.jpg
https://i.postimg.cc/sXfFd78x/C-370.jpg
https://i.postimg.cc/pTVNbz75/C-385.jpg
https://i.postimg.cc/XJNMSdhd/C-395.jpg
https://i.postimg.cc/SsgByjFY/C-428.jpg
https://i.postimg.cc/4dWDJnkK/C-405.jpg
https://i.postimg.cc/85Z21sQX/C-455.jpg
https://i.postimg.cc/fL8Gwknc/C-434.jpg
https://i.postimg.cc/TwtzRhMC/C-442.jpg
https://i.postimg.cc/Qtf2XVGb/C-447.jpg
https://i.postimg.cc/SRjwjqmb/C-560.jpg
https://i.postimg.cc/WztQtjTB/C-540.jpg
https://i.postimg.cc/j2CGCKt1/C-529.jpg
https://i.postimg.cc/mkh0hRBX/C-509.jpg
https://i.postimg.cc/HnjfjHdf/C-522.jpg
https://i.postimg.cc/VvT2CTN5/C-667.jpg
https://i.postimg.cc/XqhtChvF/C-688.jpg
https://i.postimg.cc/T1SBDSPD/C-693.jpg
https://i.postimg.cc/kGZLbZ5v/C-699.jpg
https://i.postimg.cc/brM4tMvL/C-700.jpg
https://i.postimg.cc/Y2y5Z4x2/C-703.jpg
https://i.postimg.cc/xjFwhkPT/C-727.jpg
https://i.postimg.cc/SQtB3XGj/C-749.jpg
https://i.postimg.cc/ncjyJHds/C-1083.jpg
https://i.postimg.cc/yYgMHVfn/C-1093.jpg
https://i.postimg.cc/J4DfL1Tc/C-1106.jpg
https://i.postimg.cc/CLB3gFvt/C-1118.jpg
https://i.postimg.cc/jdpGqG9g/C-1149.jpg
https://i.postimg.cc/L6cr4r7W/C-1164.jpg
https://i.postimg.cc/SNBwQw5w/C-1182.jpg
https://i.postimg.cc/4NDr4rqT/C-1194.jpg
https://i.postimg.cc/vHJp8pkQ/C-1204.jpg
https://i.postimg.cc/3JsPrPVJ/C-1213.jpg
https://i.postimg.cc/MKChZhNT/C-1217.jpg
https://i.postimg.cc/NFLWLYQY/C-593.jpg
https://i.postimg.cc/NFLWLYQy/C-596.jpg
https://i.postimg.cc/3NWPW73k/C-644.jpg
https://i.postimg.cc/661kg7h8/C-952.jpg
https://i.postimg.cc/yYgMHVfx/C-978.jpg
https://i.postimg.cc/t49ZMs6n/DC-(1002).jpg
https://i.postimg.cc/pLPh6mjF/DC-(1011).jpg
https://i.postimg.cc/13ynj8FF/DC-(1021).jpg
https://i.postimg.cc/7ZqGW5z7/DC-(1026).jpg
https://i.postimg.cc/6pB2m8ZC/DC-(1034).jpg
https://i.postimg.cc/52fYRXz5/DC-(1041).jpg
https://i.postimg.cc/Qdj9yF7q/DC-(1042).jpg
https://i.postimg.cc/9QcRnD9b/DC-(1046).jpg
https://i.postimg.cc/sg3QNMWK/DC-(1061).jpg
https://i.postimg.cc/Dw7JMSGN/DC-(1065).jpg
https://i.postimg.cc/K8mkH1Tw/DC-(1078).jpg
https://i.postimg.cc/vZGgN4nC/DC-(1112).jpg
https://i.postimg.cc/vZGgN49F/DC-(1124).jpg
https://i.postimg.cc/2STbRCdt/DC-(1131).jpg
https://i.postimg.cc/RZG65v1p/DC-(1132).jpg
https://i.postimg.cc/52pYdf5h/DC-(1135).jpg
https://i.postimg.cc/FHGd5hg5/DC-(1137).jpg
https://i.postimg.cc/3x9453Ch/DC-(1138).jpg
https://i.postimg.cc/vZXgFGLM/DC-(1139).jpg
https://i.postimg.cc/yx9gw9vH/DC-(612).jpg
https://i.postimg.cc/d3dkzd4K/DC-(613).jpg
https://i.postimg.cc/Hn5cf5B1/DC-(623).jpg
https://i.postimg.cc/mkMz0M8f/DC-(631).jpg
https://i.postimg.cc/CMfqBTY1/DC-(845).jpg
https://i.postimg.cc/8kr6JQDf/DC-(857).jpg
https://i.postimg.cc/h47dzWgx/DC-(867).jpg
https://i.postimg.cc/9F5qy8Fb/DC-(874).jpg
https://i.postimg.cc/Ghwsv7hZ/DC-(884).jpg
https://i.postimg.cc/dtPTGHVc/DC-(889).jpg
https://i.postimg.cc/CLTfbPx0/DC-(892).jpg
https://i.postimg.cc/CLTfbPxS/DC-(899).jpg
https://i.postimg.cc/zXCH7Cy5/DC-(910).jpg
https://i.postimg.cc/L6tgDtJ4/DC-(917).jpg
https://i.postimg.cc/QxQKmQFV/DC-(929).jpg
https://i.postimg.cc/15GVBG8f/DC-(932).jpg
https://i.postimg.cc/4N6HP6Y7/DC-(944).jpg
https://i.postimg.cc/hPLQsLXd/DC-(956).jpg
https://i.postimg.cc/WbGq8GdG/DC-(966).jpg
https://i.postimg.cc/vHrxhr4v/DC-(989).jpg
https://i.postimg.cc/Z5JBMWNB/DC-(994).jpg
`.trim().split("\n");

    const VongXoay = document.querySelector(".anh-container");
     

    const HoverIMG = document.getElementById("where-to-hover");
    const hoverTlenter = gsap.timeline({ paused: true });
  
  hoverTlenter
    // .to(VongXoay, {
    //   scale: 1.1,
    //   yPercent: 30,
    //   duration: 0.2,
    //   ease: "power1.out",
    //   overwrite: "auto"
    // })
    .to(".hoa2--a", {
      xPercent: -30,
      duration: 0.2,
      ease: "power1.out",
      overwrite: "auto"
    }, "<") // "<" = cùng lúc với animation trên
    .to(".hoa1--a", {
      xPercent: 30,
      duration: 0.2,
      ease: "power1.out",
      overwrite: "auto"
    }, "<");


  

  HoverIMG.addEventListener("mouseenter", () => {
    // Reset về đầu
  
  // Reset và play timeline enter
  // console.log("hover enter");
  hoverTlenter.restart(); // restart() = progress(0) + play()

  });

  HoverIMG.addEventListener("mouseleave", () => {
        hoverTlenter.reverse();
 
   
  });



    urls.forEach(url => {
        const li = document.createElement("div");
        li.className = "box-img";
        li.innerHTML = `<img class="anh-item" src="${url}" alt="">`;

        VongXoay.appendChild(li);
    });

///////////////// ======phần để tạo scroll trigger cho phần ảnh 2 bên========
  const panels = gsap.utils.toArray(".box-img");

const tl = gsap.timeline({});
panels.forEach((panel, i) => {
    // gsap.set(panel, { yPercent: -100*i }); // panel đầu tiên có zIndex cao nhất
    // Set tất cả panel ở cùng vị trí
    gsap.set(panels, {
        position: "absolute",
        top: 0,
        left: 0,

        });


        // thông qua các if để add thêm cho timeline
      const prev = panels[i - 1];

    if (i===0)return;
   
    if (i % 4 === 1) {
    // trái → phải
    tl.fromTo(panel, {xPercent: -100}, {xPercent: 0, ease: "none", duration: 1})
    .to(prev,{ xPercent: 100, duration: 1, ease: "none" },"<"); // panel hiện tại di chuyển lên
    };

    if (i % 4 === 2) {
    // dưới → lên
    tl.fromTo(panel, {yPercent: 100}, {yPercent: 0, ease: "none", duration: 1})
    .to(prev,{ yPercent: -100, duration: 1, ease: "none" },"<");
    };

    if (i % 4 === 3) {
    // phải → trái
    tl.fromTo(panel, {xPercent: 100}, {xPercent: 0, ease: "none", duration: 1})
    .to(prev,{ xPercent: -100, duration: 1, ease: "none" },"<");
    };

    if (i % 4 === 0 && i !== 0) {
    // trên → xuống (tránh i = 0)
    tl.fromTo(panel, {yPercent: -100}, {yPercent: 0, ease: "none", duration: 1})
    .to(prev,{ yPercent: 100, duration: 1, ease: "none" },"<");
    };
    
});



// tl.play();
const scrollPerPanel = 3000;
const totalScroll = (panels.length - 1) * scrollPerPanel;


const contentDuration = tl.duration();
 const progressBar = gsap.timeline({});


        progressBar
        .fromTo(
        "#moving-rect",
         { xPercent: -100},
        {
            xPercent: 0,
            ease: "none",
            duration:  contentDuration,
        }// chạy song song chữ
        );



const svgTen = document.getElementById("chay-ten");




  const master = gsap.timeline({})
.add(tl, 0)
.add(progressBar, 0);

// dùng scroll trigger để điều khiển timeline
const st = ScrollTrigger.create({
    trigger: ".scene2-BG",
    start: "bottom 100%",
    end: "+=" + totalScroll, 
    pin: true,
    pinSpacing: true,
    scrub: true,
   animation: master,
  // markers: true, // bật markers để debug
    snap: {
    snapTo: 1 / (panels.length - 1),
    duration: 0.5,        // thời gian snap
    
  },
   

});         

svgTen.addEventListener("click", (e) => {
  const svgTenBox = svgTen.getBoundingClientRect();

  // vị trí click theo trục X
  const clickX = e.clientX 

  console.log("Click X: " + clickX);
  console.log("svg left: " + svgTenBox.left);
  console.log("svg width: " + svgTenBox.width);

  const progress = (clickX - svgTenBox.left)/svgTenBox.width;
  console.log("percent: " + progress);
  
  const targetScroll =
    st.start + (st.end - st.start) * progress;

  // scroll tới vị trí tương ứng
  gsap.to(window, {
    scrollTo: targetScroll,
    duration: 0.8,
    ease: "power2.out",
    autoKill: true
  });
  // st.scroll(
  //   st.start + (st.end - st.start) * progress
  // );
});







//fake thumb


// Hoặc nếu muốn kéo từ bất kỳ đâu trong container:
// thumb.addEventListener('mousedown', e => { ... });

// document.addEventListener('mousemove', e => {
//   if (!dragging) return;

//   const dx = e.clientX - startX;
//   let newLeft = startLeft + dx;

//   // Giới hạn di chuyển
//   newLeft = Math.min(limitStart + maxThumb, Math.max(limitStart, newLeft));

//   thumb.style.left = newLeft + "px";

//   // Cập nhật scroll
//   const maxScroll = track.scrollWidth - track.clientWidth;
//   const ratio = (newLeft - limitStart) / maxThumb;
//   track.scrollLeft = ratio * maxScroll;
// });

// document.addEventListener('mouseup', () => {
//   dragging = false;
//   thumb.style.cursor = 'grab';
// });

// /* ---- THÊM: Click vào dấu < > để điều khiển ---- */
// const leftArrow = thumb.querySelector('p:nth-child(1)');
// const rightArrow = thumb.querySelector('p:nth-child(3)');

// if (leftArrow && rightArrow) {
//   leftArrow.addEventListener('click', () => {
//     const scrollAmount = track.clientWidth * 0.8; // Scroll 80% chiều rộng
//     track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
//   });

//   rightArrow.addEventListener('click', () => {
//     const scrollAmount = track.clientWidth * 0.8;
//     track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//   });
// };


// const lightbox = document.getElementById("lightbox");
// const lightboxImg = document.querySelector(".lightbox-img");
// const closeBtn = document.querySelector(".lightbox-close");
// const items = document.querySelectorAll(".track__item img");

// items.forEach(img => {
//   img.addEventListener("click", () => {
//   lightbox.classList.add("show"); // hiện lightbox
//   lightboxImg.src = img.src;
// });
// });


// closeBtn.addEventListener("click", () => {
  
//   lightbox.classList.remove("show"); // ẩn lightbox
// });

// lightbox.addEventListener("click", e => {
//   if (e.target === lightbox) {
    
//     lightbox.classList.remove("show");
//   }
// });