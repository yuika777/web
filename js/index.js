        let arrowPrev = document.querySelector(".prev");//上、下箭头
        let arrowNext = document.querySelector(".next");
        let imgList = document.querySelector(".img-list");//轮播图列表
        let img = imgList.children[0].children[0]; //获取图片
        const MOVE_SPACE = img.width;//移动距离（图片宽度）
        let index = 0;//图片下标
        let firstLi = imgList.firstElementChild.cloneNode(true);
        imgList.appendChild(firstLi);
        let listLength = imgList.children.length;//图片素组长度
        imgList.style.width = listLength * 100 + "%";
        let circles = document.querySelectorAll(".circle");//获取轮播图全部小圆点
        let circleBox = document.querySelector(".circle-list");//获取圆点容器
        let bannerBox=document.querySelector("#banner");//获取轮播图容器
        let lock=true;
 
        arrowPrev.addEventListener("click", function () {
            if(!lock) return;
            index--;
            console.log(index);
            if (index === -1) {
                index = listLength - 1;
                imgList.style.left = index * (-MOVE_SPACE) + "px";
                imgList.style.transition = "none";
                setTimeout(() => {
                    index = listLength - 2;
                    imgList.style.left = index * (-MOVE_SPACE) + "px";
                    imgList.style.transition = "0.5s ease";
                }, 0)
            } else {
                imgList.style.left = index * (-MOVE_SPACE) + "px";
            }
 
            setCircleHighlight();
            lock=false;
            setTimeout(()=>{
                lock=true;
            },500)
        })
        function handleNext() {
            if(!lock) return;
            index++;
            imgList.style.left = index * (-MOVE_SPACE) + "px";
            imgList.style.transition = "0.5s ease";
            if (index === listLength - 1) {
                index = 0;
                setTimeout(() => {
                    index = 0;
                    imgList.style.left = 0;
                    // 取消过渡 500毫秒之后切换第一张
                    imgList.style.transition = "none";
                }, 500);
            }
            setCircleHighlight();
            lock=false;
            setTimeout(()=>{
                lock=true;
            },500)
        }
 
        arrowNext.addEventListener("click",handleNext)
        //圆点高亮
        function setCircleHighlight() {
            circles.forEach((el, idx) => {
                if (idx === index) {
                    circles[idx].classList.add("active");
                }
                else {
                    circles[idx].classList.remove("active");
                }
            });
        }
 
        for (var i = 0; i < circles.length; i++) {
            circles[i].index = i;//设置标签属性，效果同setAttribute
            //圆点点击切换-方法1
            circles[i].onclick = function () {
                for (var i = 0; i < circles.length; i++) {
                    circles[i].classList.remove("active");
                }
                this.classList.add("active");
                index = this.index;
                imgList.style.left = index * (-MOVE_SPACE) + "px";
            }
        }
        let autoPlay = setInterval(handleNext,1500);
        bannerBox.addEventListener("mouseenter",function(){
            clearInterval(autoPlay);
        });
        bannerBox.addEventListener("mouseleave",function(){
            //设表先关——防止移入移出多次创建
            clearInterval(autoPlay);
            autoPlay = setInterval(handleNext,1500);
        });