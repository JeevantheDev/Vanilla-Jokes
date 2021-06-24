(()=>{"use strict";const e="https://tattijokes.herokuapp.com",t=new class{async get(e){const t=await fetch(e);return await t.json()}async post(e,t){const i=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});return await i.json()}async put(e,t){const i=await fetch(e,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});return await i.json()}async delete(e){return await fetch(e,{method:"DELETE"}),"Resource Deleted..."}},i=async i=>await t.post(`${e}/addReview`,i),n={storeItems:function(e){let t;null===localStorage.getItem("jokes")?(t=[],t.push(e),localStorage.setItem("jokes",JSON.stringify(t))):(t=JSON.parse(localStorage.getItem("jokes")),t.push(e),localStorage.setItem("jokes",JSON.stringify(t)))},getItems:function(){let e;return e=null===localStorage.getItem("jokes")?[]:JSON.parse(localStorage.getItem("jokes")),e},deleteItems:function(e){let t=JSON.parse(localStorage.getItem("jokes"));t.forEach((function(i,n){e===i.id&&t.splice(n,1)})),localStorage.setItem("jokes",JSON.stringify(t))},clearAllItems:function(){localStorage.removeItem("jokes")}};(function(e,t,i){const n={page:null},s=function(){const e=t.getSelectors();n.page.includes("index.html")?document.querySelector(e.jokesList).addEventListener("click",o):n.page.includes("archive.html")&&document.querySelector(e.jokesArchiveList).addEventListener("click",o),document.querySelector(e.paginate).addEventListener("click",r),document.querySelector(e.searhInput).addEventListener("keyup",a)},a=function(i){const s=t.getSearchInput(),a=e.updateJokesBySearch(s.toLowerCase(),n.page);t.populateJokeList(a,n.page),t.updatePagination(e.getTotalPage(),e.getCurrentOffset())},o=function(s){if(s.stopPropagation(),s.target.classList.contains("like-btn")){const i=s.target.parentNode.id.split("-")[2];e.setCurrentJoke(i),e.likeJoke(i).then((i=>{t.updateJokeItem(i,n.page),e.resetCurrentJoke()}))}else if(s.target.classList.contains("dislike-btn")){const i=s.target.parentNode.id.split("-")[2];e.setCurrentJoke(i),e.dislikeJoke(i).then((i=>{t.updateJokeItem(i,n.page),e.resetCurrentJoke()}))}else if(s.target.classList.contains("archive-btn")){const a=s.target.parentNode.id.split("-")[2],o=e.isArchieveJoke(a,n.page);o.archive?i.storeItems(o):i.deleteItems(o.id),n.page.includes("index.html")?t.updateJokeItem(o,n.page):t.deleteArchiveJoke(o.id),e.resetCurrentJoke()}},r=i=>{i.stopPropagation();const s=i.target.id.split("-")[1];e.updateOffset(parseInt(s));const a=e.updateJokesByOffset(n.page);t.populateJokeList(a,n.page),t.updatePagination(e.getTotalPage(),e.getCurrentOffset())};return{init:function(){n.page=window.location.pathname;let i=[];if(n.page.includes("index.html"))e.getJokes().then((a=>{i.push(...a),i.length>0&&(t.populateJokeList(i,n.page),t.updatePagination(e.getTotalPage(),e.getCurrentOffset()),s())}));else if(n.page.includes("archive.html")){const a=e.getArchiveJokes();if(i.push(...a),!(i.length>0))return;t.populateJokeList(i,n.page),t.updatePagination(e.getTotalPage(),e.getCurrentOffset()),s()}}}})(function(){const s={jokes:[],limit:10,offset:1,totalPage:0,currentJoke:null,archiveJokes:n.getItems()};return{getJokes:async()=>{const i=await(async()=>await t.get(`${e}/allJokes`))();return s.jokes.push(...i.jokes),s.totalPage=Math.ceil(s.jokes.length/s.limit),_.chunk(s.jokes,s.limit)[s.offset-1]},getTotalPage:()=>s.totalPage,getCurrentOffset:()=>s.offset,updateOffset:e=>{s.offset=e},updateJokesByOffset:e=>e.includes("index.html")?_.chunk(s.jokes,s.limit)[s.offset-1]:e.includes("archive.html")?_.chunk(s.archiveJokes,s.limit)[s.offset-1]:void 0,updateJokesBySearch:(e,t)=>{if(t.includes("index.html")){const t=_.chunk(s.jokes,s.limit)[s.offset-1];return _.filter(t,(t=>!t.title.toLowerCase().search(e)))}if(t.includes("archive.html")){const t=_.chunk(s.archiveJokes,s.limit)[s.offset-1];return _.filter(t,(t=>!t.title.toLowerCase().search(e)))}},getArchiveJokes:()=>(s.totalPage=Math.ceil(s.archiveJokes.length/s.limit),_.chunk(s.archiveJokes,s.limit)[s.offset-1]),setCurrentJoke:e=>{let t=null;s.jokes.forEach((i=>{i.id===parseInt(e)&&(t=i)})),s.currentJoke=t},resetCurrentJoke:()=>{s.currentJoke=null},likeJoke:async()=>{let e=null;return await i({id:s.currentJoke.id,like:"true"}).then((({success:t})=>t?(s.jokes.forEach((t=>{t.id===s.currentJoke.id&&(t.like=t.like+1,e=t)})),e):void 0))},dislikeJoke:async()=>{let e=null;return await i({id:s.currentJoke.id,dislike:"true"}).then((({success:t})=>t?(s.jokes.forEach((t=>{t.id===s.currentJoke.id&&(t.dislike+=1,e=t)})),e):void 0))},isArchieveJoke:(e,t)=>{let i=null;return t.includes("index.html")?(console.log("steppe here = 1"),s.jokes.forEach((t=>{t.id===parseInt(e)&&(t.archive=!t.archive,i=t)}))):t.includes("archive.html")&&(console.log("steppe here = 2"),s.archiveJokes.forEach((t=>{t.id===parseInt(e)&&(t.archive=!t.archive,i=t)}))),i}}}(),function(){const e={jokesList:"#joke-list",listJokesItem:"#joke-list .joke-card",jokesArchiveList:"#joke-archive-list",listJokesArchiveItem:"#joke-archive-list .joke-card",paginate:"#paginate",searhInput:"#search"};return{getSelectors:function(){return e},populateJokeList:function(t,i){let n="";t.forEach((e=>{n+=`\n                    <div id="joke-${e.id}" class="col s12 m6 joke-card">\n                        <div class="card blue-grey darken-1">\n                            <div class="card-content white-text">\n                                <span class="card-title">${e.title}</span>\n                                <p>${e.jokes}</p>\n                            </div>\n                            <div class="card-action review-container">\n                                ${i.includes("index.html")?`<div class="review-container">\n                                    <a id="joke-like-${e.id}" class="flex-review curser-pointer">\n                                        <i class="material-icons like-btn ${e.like>0?"lime-text":"white-text"} text-darken-2">thumb_up</i>\n                                        <span class="white-text">${e.like}</span>\n                                    </a>\n                                    <a id="joke-dislike-${e.id}" class="flex-review curser-pointer">\n                                        <i class="material-icons dislike-btn ${e.dislike>0?"":"white-text"}">thumb_down_alt</i>\n                                        <span class="white-text">${e.dislike}</span>\n                                    </a>\n                                </div>`:""}\n                                <a id="joke-like-${e.id}" class="flex-review ml-auto curser-pointer">\n                                    <i \n                                        class="material-icons archive-btn ${e.archive?"yellow-text":"white-text"}">\n                                        ${e.archive?"unarchive":"archive"}\n                                    </i>\n                                </a>\n                            </div>\n                        </div>\n                    </div>\n                `})),i.includes("index.html")?document.querySelector(e.jokesList).innerHTML=n:i.includes("archive.html")&&(document.querySelector(e.jokesArchiveList).innerHTML=n)},updateJokeItem:function(t,i){let n=i.includes("index.html")?document.querySelectorAll(e.listJokesItem):i.includes("archive.html")?document.querySelectorAll(e.listJokesArchiveItem):null;n=Array.from(n),n.forEach((e=>{const n=e.getAttribute("id");n===`joke-${t.id}`&&(document.querySelector(`#${n}`).innerHTML=`\n                        <div class="card blue-grey darken-1">\n                            <div class="card-content white-text">\n                                <span class="card-title">${t.title}</span>\n                                <p>${t.jokes}</p>\n                            </div>\n                            <div class="card-action review-container">\n                                ${i.includes("index.html")?`<div class="review-container">\n                                    <a id="joke-like-${t.id}" class="flex-review curser-pointer">\n                                        <i class="material-icons like-btn ${t.like>0?"lime-text":"white-text"} text-darken-2">thumb_up</i>\n                                        <span class="white-text">${t.like}</span>\n                                    </a>\n                                    <a id="joke-dislike-${t.id}" class="flex-review curser-pointer">\n                                        <i class="material-icons dislike-btn ${t.dislike>0?"":"white-text"}">thumb_down_alt</i>\n                                        <span class="white-text">${t.dislike}</span>\n                                    </a>\n                                </div>`:""}\n                                <a id="joke-like-${t.id}" class="flex-review ml-auto curser-pointer">\n                                    <i \n                                        class="material-icons archive-btn ${t.archive?"yellow-text":"white-text"}">\n                                        ${t.archive?"unarchive":"archive"}\n                                    </i>\n                                </a>\n                            </div>\n                        </div>\n                    `)}))},deleteArchiveJoke:function(e){const t=`#joke-${e}`;document.querySelector(t).remove()},updatePagination:function(t,i){let n="";for(let e=1;e<=t;e++)n+=`\n                    <li class="${e===i?"active":"waves-effect"}"><a id="page-${e}">${e}</a></li>\n                `;document.querySelector(e.paginate).innerHTML=n},getSearchInput:function(){return document.querySelector(e.searhInput).value}}}(),n).init()})();