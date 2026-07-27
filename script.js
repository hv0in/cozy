let happy = 50;
let hunger = 50;
let coin = 0;

let food = 0;
let toy = 0;


// 게임 시작
function startGame(){

    let name = document.getElementById("name").value;


    if(name === ""){

        alert("기니피그 이름을 지어주세요!");

        return;

    }


    localStorage.setItem("pigName", name);


    let lastChar = name[name.length - 1];

    let code = lastChar.charCodeAt(0);

    let particle = "와";


    if(code >= 44032 && code <= 55203){

        let finalSound = (code - 44032) % 28;


        if(finalSound !== 0){

            particle = "이와";

        }

    }



    alert(name + particle + " 만났어요! 🐹💗");



    document.body.classList.add("gameMode");


    document.getElementById("start").style.display = "none";

    document.getElementById("game").style.display = "block";



    document.getElementById("pigTitle").innerHTML =
    name + "의 방 🐹";


    updateStatus();

}





window.onload = function(){

    let savedName = localStorage.getItem("pigName");


    if(savedName){

        document.getElementById("name").value = savedName;

    }

};





function updateStatus(){

    document.getElementById("happy").innerHTML = happy;

    document.getElementById("hunger").innerHTML = hunger;

    document.getElementById("coin").innerHTML = coin;

    updateItemCount();

}





setInterval(function(){

    if(hunger > 0){

        hunger--;

    }


    updateStatus();

    checkPigStatus();


},28000);





setInterval(function(){

    if(happy > 0){

        happy--;

    }


    updateStatus();

    checkPigStatus();


},40000);







function openShop(){

    document.getElementById("game").style.display = "none";

    document.getElementById("shopScreen").style.display = "block";

    document.getElementById("shopCoin").innerHTML = coin;

}





function openWork(){

    document.getElementById("game").style.display = "none";

    document.getElementById("workScreen").style.display = "block";

}





function backRoom(){

    document.getElementById("shopScreen").style.display = "none";

    document.getElementById("workScreen").style.display = "none";

    document.getElementById("game").style.display = "block";

}





function buyFood(){

    if(coin < 50){

        alert("💰 코인이 부족해요!");

        return;

    }


    coin -= 50;

    food++;


    updateStatus();

    document.getElementById("shopCoin").innerHTML = coin;


}





function buyToy(){

    if(coin < 100){

        alert("💰 코인이 부족해요!");

        return;

    }


    coin -= 100;

    toy++;


    updateStatus();

    document.getElementById("shopCoin").innerHTML = coin;


}





function feedPig(){

    if(food <= 0){

        alert("🥕 사료가 없어요!");

        return;

    }


    food--;

    hunger += 10;


    if(hunger > 100){

        hunger = 100;

    }


    updateStatus();

    checkPigStatus();

}





function useToy(){

    if(toy <= 0){

        alert("🧸 장난감이 없어요!");

        return;

    }


    toy--;

    happy += 10;


    if(happy > 100){

        happy = 100;

    }


    updateStatus();

    checkPigStatus();

}





function updateItemCount(){

    document.getElementById("foodCount").innerHTML = food;

    document.getElementById("toyCount").innerHTML = toy;

}





function checkPigStatus(){

    let pig = document.querySelector("#game img");


    if(happy <= 0 || hunger <= 0){

        pig.classList.add("sadPig");

    } else {

        pig.classList.remove("sadPig");

    }

}





// 🥕 당근밭 열기

function openCarrotGame(){

    document.getElementById("workScreen").style.display = "none";

    document.getElementById("carrotScreen").style.display = "block";


    document.getElementById("carrotCoin").innerHTML = coin;


    document.getElementById("workGuide").innerHTML =
    "🥕 당근을 눌러 캐보세요!";


    createCarrots();

}





function backToWork(){

    document.getElementById("carrotScreen").style.display = "none";

    document.getElementById("workScreen").style.display = "block";

}





function createCarrots(){

    let field = document.getElementById("carrotField");

    field.innerHTML = "";


    let count = Math.floor(Math.random()*6)+10;

    let bugCount = Math.floor(Math.random()*3)+1;


    let items=[];


    for(let i=0;i<count-bugCount;i++){

        items.push("carrot");

    }


    for(let i=0;i<bugCount;i++){

        items.push("bug");

    }


    items.sort(()=>Math.random()-0.5);


    let bonusCarrot = 0;
    
    items.forEach(function(type){


    let item=document.createElement("div");


    item.className="carrot";


    item.innerHTML = type==="bug" ? "🐛":"🥕";


    item.dataset.bug = type==="bug";



    item.style.left=Math.random()*85+"%";


    item.style.top=(50+Math.random()*45)+"%";



    item.onclick=function(){


        let text=document.createElement("div");


        text.className="moneyText";


        text.style.left=item.style.left;

        text.style.top=item.style.top;



        if(item.dataset.bug==="true"){


            coin-=2;


            if(coin<0){

                coin=0;

            }


            text.innerHTML="-2💰";


        }else{


            let earn;


            if(bonusCarrot<4 && Math.random()<0.25){


                earn=3;

                bonusCarrot++;


            }else{


                earn=Math.floor(Math.random()*2)+1;


            }



            coin+=earn;


            text.innerHTML="+"+earn+"💰";


        }



        field.appendChild(text);



        setTimeout(function(){

            text.remove();

        },1000);



        item.remove();



        updateStatus();


        document.getElementById("carrotCoin").innerHTML=coin;



        let carrotLeft=document.querySelectorAll(
            '.carrot[data-bug="false"]'
        ).length;



        if(carrotLeft===0){


            setTimeout(function(){


                alert("🥕 당근 수확 완료!");


                backToWork();


            },500);


        }


    };



    field.appendChild(item);


});


}







// 💩 똥밭 열기

function openPoopGame(){


    document.getElementById("workScreen").style.display="none";


    document.getElementById("poopScreen").style.display="block";


    document.getElementById("poopCoin").innerHTML=coin;


    document.getElementById("poopGuide").innerHTML=
    "💩 똥을 2-3번 눌러 치워보세요!";


    createPoops();


}







// 💩 똥 생성

function createPoops(){

    let field = document.getElementById("poopField");

    field.innerHTML = "";


    let count = Math.floor(Math.random()*6)+10;
    // 똥 10~15개



    for(let i = 0; i < count; i++){


        let poop = document.createElement("div");


        poop.className = "carrot";


        poop.innerHTML = "💩";


        poop.dataset.hit = 0;


        // 똥마다 필요한 터치 횟수 (2~3)

        let need = Math.random() < 0.5 ? 2 : 3;



        // 랜덤 위치

        poop.style.left = Math.random()*85 + "%";

        poop.style.top = (50 + Math.random()*45) + "%";



        poop.onclick = function(){


            poop.dataset.hit++;



            // 아직 덜 눌렀으면 표시

            if(poop.dataset.hit < need){

                poop.style.transform = "scale(1.15)";

                setTimeout(function(){

                    poop.style.transform = "scale(1)";

                },100);


                return;

            }



            // 💰 1~3 코인 지급

            let pay;

let chance = Math.random();

if(chance < 0.7){

    pay = 3;

} else if(chance < 0.9){

    pay = 2;

} else {

    pay = 1;

}


            coin += pay;



            let text = document.createElement("div");


            text.className = "moneyText";


            text.innerHTML = "+" + pay + "💰";


            text.style.left = poop.style.left;

            text.style.top = poop.style.top;



            field.appendChild(text);



            setTimeout(function(){

                text.remove();

            },1000);




            poop.remove();



            updateStatus();


            document.getElementById("poopCoin").innerHTML = coin;




            // 남은 똥 확인

            let left = document.querySelectorAll(
                "#poopField .carrot"
            ).length;



            if(left === 0){


                setTimeout(function(){


                    alert("💩 똥 치우기 완료!");


                    backToWorkPoop();


                },500);


            }



        };



        field.appendChild(poop);


    }


}







// 💩 똥밭 돌아가기

function backToWorkPoop(){


    document.getElementById("poopScreen").style.display = "none";


    document.getElementById("workScreen").style.display = "block";


}

let pigSounds = [
    "꾸잉꾸잉꾸이익꾸잉꾸잉",
    "꾸이이잉꾸잉꾸이이",
    "꾸익꾸잉꾸잉꾸잉꾸익꾸잉꾸익",
    "꾸이잉 꾸잉",
    "꾸잉꾸잉 꾸잉 꾸꾸잉"
];


let pigTimer;


function pigSpeak(){

    let sound = pigSounds[
        Math.floor(Math.random() * pigSounds.length)
    ];


    let bubble = document.getElementById("pigBubble");


    bubble.innerHTML = sound;

    bubble.style.display = "block";


    // 기존 사라지는 예약 취소
    clearTimeout(pigTimer);


    // 새로 3초 시작
    pigTimer = setTimeout(function(){

        bubble.style.display = "none";

    },3000);

}

// 👕 옷장 열기

function openCloset(){

    document.getElementById("game").style.display="none";

    document.getElementById("closetScreen").style.display="block";

}



// 👕 옷장 돌아가기

function backClosetRoom(){

    document.getElementById("closetScreen").style.display="none";

    document.getElementById("game").style.display="block";

}

// 👕 스킨 변경

function changeSkin(image, selected){

    let pig = document.querySelector("#game img");


    pig.src = image;


    let skins = document.querySelectorAll(".skin");


    skins.forEach(function(item){

        item.style.opacity = "1";

    });


    selected.style.opacity = "0.4";

}



// 👕 옷장 돌아가기

function backClosetRoom(){

    document.getElementById("closetScreen").style.display="none";

    document.getElementById("game").style.display="block";

}
