(()=>{"use strict";window.util={getArrOfTextBeforeDash:function(e){const t=[],n=[];for(let o=0;o<e.length;o++)for(let r=e[o].length-1;r>0;r--){if("-"===e[o][r]){t.reverse(),n.push(t.join("")),t.splice(0,t.length);break}t.push(e[o][r])}return n},getArrClassNameHtml:function(e){const t=[];return e.forEach((e=>{t.push(e.className)})),t},comparisonArrsAndAddClassNameHidden:function(e,t,n){if(e.length>0)for(let o=0;o<e.length;o++)for(let r=0;r<t.length;r++)n[r].classList.add("hidden"),e[o]===t[r]&&(n[r].textContent=e[o]),n[r].textContent&&n[r].classList.remove("hidden");else for(let e=0;e<t.length;e++)n[e].classList.add("hidden")},disabledMapFilter:function(){window.main.addMapFaded(window.card.map),window.main.addAdFormDisabled(window.filter.mapFilters),window.main.addDisabled(window.main.formFieldsets)}},window.error={showError:function(e){const t=document.createElement("div");t.style="\n    position: absolute;\n    left: 0;\n    right: 0;\n    color: red;\n    font-size: 50px;\n    z-index: 100; \n    margin: 0 auto; \n    text-align: center; \n    background-color: white; \n    height: 130px;\n    display: flex; \n    justify-content: center; \n    align-items: center  \n  ",t.textContent=e,window.card.map.appendChild(t)}},window.backend={load:function(e,t){const n=new XMLHttpRequest;n.responseType="json",n.addEventListener("load",(function(){200===n.status?e(n.response):t(`Статус ответа:  ${n.status} ${n.statusText}`)})),n.addEventListener("error",(function(){t("Запрос не удался")})),n.addEventListener("timeout",(function(){t("Запрос не успел выполниться за "+n.timeout+"мс")})),n.timeout=1e4,n.open("GET","https://21.javascript.pages.academy/keksobooking/data"),n.send()},save:function(e,t,n){const o=new XMLHttpRequest;o.responseType="json",o.addEventListener("load",(function(){200===o.status?t():n()})),o.addEventListener("timeout",(function(){n()})),o.addEventListener("error",(function(){n()})),o.timeout=1e4,o.open("POST","https://21.javascript.pages.academy/keksobooking"),o.send(e)}},(()=>{const e="375px",t="570px",n=document.querySelector(".map__pin--main"),o=document.querySelector("#address"),r=document.querySelector(".map__pins"),i=n.offsetHeight+22,d=function(e,t,n){e.setAttribute("value",`${t}, ${n}`)};!function(){let e=Math.round(n.offsetLeft+n.offsetWidth/2),t=Math.round(n.offsetTop+i);d(o,e,t)}(),n.addEventListener("mousedown",(function(a){if(a.which===window.main.LEFT_KEY_MOUSE_CODE){a.preventDefault(),window.card.map.classList.contains("map--faded")&&(n.style.top=e,n.style.left=t);let c={x:a.clientX,y:a.clientY},s=Math.round(n.offsetLeft+n.offsetWidth/2),l=Math.round(n.offsetTop+i);o.setAttribute("value",`${s}, ${l}`);const u=function(e){e.preventDefault();const t=c.x-e.clientX,a=c.y-e.clientY,u=s-t,p=l-a;s=Math.round(n.offsetLeft+n.offsetWidth/2),l=Math.round(n.offsetTop+i),c={x:e.clientX,y:e.clientY},n.style.left=n.offsetLeft-t+"px",n.style.top=n.offsetTop-a+"px",d(o,u,p),u<=0?(n.style.left=-n.offsetWidth/2+"px",d(o,0,p)):u>=r.offsetWidth&&(n.style.left=r.offsetWidth-n.offsetWidth/2+"px",d(o,r.offsetWidth,p)),p<=130?(n.style.top=130-i+"px",d(o,u,130)):p>=760&&(n.style.top=760-i+"px",d(o,u,760))},p=function(e){e.preventDefault(),document.removeEventListener("mousemove",u),document.removeEventListener("mouseup",p)};document.addEventListener("mousemove",u),document.addEventListener("mouseup",p)}})),window.movePin={mapPinMain:n,MAP_PIN_MAIN_TOP:e,MAP_PIN_MAIN_LEFT:t,fillAddress:d,address:o,mainPinHeight:i,mapPin:r}})(),(()=>{const e=document.querySelector("#capacity"),t=e.querySelectorAll("option"),n=[[0,1,3],[0,3],[3],[0,1,2]],o=document.querySelector("#avatar"),r=document.querySelector("#images"),i=document.querySelector("#timein"),d=i.querySelectorAll("option"),a=document.querySelector("#timeout"),c=a.querySelectorAll("option"),s=document.querySelector(".map__pins"),l=document.querySelector("#success").content.querySelector(".success").cloneNode(!0),u=document.querySelector("#error").content.querySelector(".error").cloneNode(!0),p=Math.round(parseInt(window.movePin.MAP_PIN_MAIN_LEFT,10)+window.movePin.mapPinMain.offsetWidth/2),f=Math.round(parseInt(window.movePin.MAP_PIN_MAIN_TOP,10)+window.movePin.mainPinHeight),m=document.querySelector("#type"),w=m.querySelectorAll("option"),y=[0,1e3,5e3,1e4];let v;const h=function(){if(A.reset(),window.filter.mapFilters.reset(),window.main.addAdFormDisabled(A),window.main.addMapFaded(window.card.map),window.main.addDisabled(window.main.formFieldsets),window.main.addDisabled(window.main.mapFilterSelects),window.card.map.querySelector(".map__card")&&window.card.map.removeChild(window.card.map.querySelector(".map__card")),window.card.map.classList.contains("map--faded")&&(window.movePin.mapPinMain.style.top=window.movePin.MAP_PIN_MAIN_TOP,window.movePin.mapPinMain.style.left=window.movePin.MAP_PIN_MAIN_LEFT),window.movePin.fillAddress(window.movePin.address,p,f),"img/muffin-grey.svg"!==window.photo.previewAvatar.querySelector("img").src){window.photo.previewAvatar.replaceChildren(),window.photo.previewAvatar.style.display="flex",window.photo.previewAvatar.style.alignItems="center",window.photo.previewAvatar.style.justifyContent="center";const e=document.createElement("img");e.style.width="40px",e.style.height="44px",window.photo.previewAvatar.appendChild(e),e.src="img/muffin-grey.svg"}window.photo.previewPhotoFlat.querySelector("img")&&window.photo.previewPhotoFlat.querySelector("img").remove(),_(),b(),window.main.mapPinMain.addEventListener("mousedown",window.main.onMapPinMainMousedown)};t.forEach((e=>{e.removeAttribute("disabled")}));const _=function(){for(let e=0;e<n[0].length;e++)t[n[0][e]].setAttribute("disabled","true");t[2].selected=!0};_();const S=function(e,t,n,o){for(let o=0;o<t[e].length;o++)n[t[e][o]].setAttribute("disabled","true");n[o].selected=!0};document.querySelector("#title").setAttribute("minlength",30);const g=document.querySelector("#price");g.setAttribute("max",1e6);const q=function(e){const t=[];return e.forEach((e=>{t.push(e.value)})),t}(w),E=function(){const e=m.value;for(let t=0;t<q.length;t++)e===q[t]&&(g.setAttribute("placeholder","от "+y[t]),g.setAttribute("min",""+y[t]))};m.addEventListener("change",E),g.setAttribute("required","required"),g.setAttribute("type","number"),g.setAttribute("max","1000000"),o.setAttribute("accept","image/*"),r.setAttribute("accept","image/*");const A=document.querySelector(".ad-form");A.addEventListener("submit",(function(e){e.preventDefault(),window.backend.save(new FormData(A),L,k)}));const L=function(){s.appendChild(l),document.addEventListener("keydown",C),document.addEventListener("click",P),h()},b=function(){s.querySelectorAll("button").forEach((e=>{e.classList.contains("map__pin--main")||e.remove()}))},x=function(){l.remove(),document.removeEventListener("keydown",C),document.removeEventListener("click",P)},C=function(e){27===e.keyCode&&x()},P=function(){x()},k=function(){document.querySelector("main").appendChild(u),v=document.querySelector(".error__button"),document.addEventListener("click",T),document.addEventListener("keydown",F),v.addEventListener("click",D)},M=function(){u.remove(),document.removeEventListener("click",T),document.removeEventListener("keydown",F),v.removeEventListener("click",D)},T=function(){M()},F=function(e){27===e.keyCode&&M()},D=function(){M()},N=document.querySelector(".ad-form__reset");N.addEventListener("click",(function(){h()})),N.addEventListener("keydown",(function(e){13===e.keyCode&&h()})),window.form={setTimeinAndTimeout:function(){i.addEventListener("change",(function(){for(let e=0;e<d.length;e++)if(d[e].value===i.value){a.value=d[e].value;break}})),a.addEventListener("change",(function(){for(let e=0;e<c.length;e++)if(c[e].value===a.value){i.value=c[e].value;break}}))},capacityOptions:t,capacity:e,checkRoomAndGuest:function(){const e=document.querySelector("#room_number");e.addEventListener("change",(function(){const o=e.value;"1"===o?(window.main.removeAddDisabled(t),S(0,n,t,2)):"2"===o?(window.main.removeAddDisabled(t),S(1,n,t,1)):"3"===o?(window.main.removeAddDisabled(t),S(2,n,t,0)):o>n.length-1&&(window.main.removeAddDisabled(t),S(3,n,t,3))}))},onTypeChange:E,KEY_CODE_ENTER:13,START_ADDRESS_X:p,START_ADDRESS_Y:f}})(),(()=>{const e=document.querySelector("#card").content.querySelector(".map__card"),t=document.querySelector(".map__filters-container"),n=document.querySelector(".map"),o=function(e){e.classList.add("hidden")};window.card={createCard:function(t){const n=e.cloneNode(!0);t.offer.title?n.querySelector(".popup__title").textContent=t.offer.title:o(n.querySelector(".popup__title")),t.offer.address[0]&&t.offer.address[1]?n.querySelector(".popup__text--address").textContent=""+t.offer.address:o(n.querySelector(".popup__text--address")),t.offer.price?n.querySelector(".popup__text--price").textContent=t.offer.price:o(n.querySelector(".popup__text--price")),t.offer.type?n.querySelector(".popup__type").textContent=t.offer.type:o(n.querySelector(".popup__type")),t.offer.rooms&&t.offer.guests?n.querySelector(".popup__text--capacity").textContent=`${t.offer.rooms} комнатa(ы) для ${t.offer.guests} гостя(ей)`:o(n.querySelector(".popup__text--capacity")),t.offer.checkin&&t.offer.checkout?n.querySelector(".popup__text--time").textContent=`Заезд после ${t.offer.checkin}, выезд до ${t.offer.checkout}`:o(n.querySelector(".popup__text--time"));const r=n.querySelector(".popup__features").querySelectorAll("li"),i=window.util.getArrClassNameHtml(r).map((function(e){return e})),d=window.util.getArrOfTextBeforeDash(i);window.util.comparisonArrsAndAddClassNameHidden(t.offer.features,d,r),t.offer.description?n.querySelector(".popup__description").textContent=""+t.offer.description:n.querySelector(".popup__description").classList.add("hidden");const a=n.querySelector(".popup__photos"),c=a.querySelector("img");if(t.offer.photos){for(let e=0;e<t.offer.photos.length;e++){const n=c.cloneNode();n.src=t.offer.photos[e],n.textContent="clone",a.appendChild(n)}a.removeChild(c)}else a.classList.add("hidden");return t.author.avatar?n.querySelector(".popup__avatar").src=t.author.avatar:n.querySelector(".popup__avatar").classList.add("hidden"),n},mapFiltersContainer:t,card:e,renderCard:function(e,t){n.insertBefore(e,t)},map:n}})(),(()=>{const e=document.querySelector("#pin").content.querySelector(".map__pin");let t;const n=function(e){e.forEach((e=>{e.classList.contains("map__pin--active")&&e.classList.remove("map__pin--active")}))};window.card.map.addEventListener("keydown",(function(e){"Escape"===e.key&&window.card.map.querySelector(".map__pin--active")&&n(t)})),window.pin={MAX_PIN:5,createPin:function(o){const r=e.cloneNode(!0);if(o.offer){const e=r.querySelector("img");e.src=o.author.avatar,e.alt=o.offer.title,r.style.left=o.location.x+"px",r.style.top=o.location.y+"px",r.addEventListener("click",(e=>{let r=e.target;"IMG"===r.tagName&&(r=r.parentNode);const i=document.querySelectorAll(".map__pin");t=i;const d=function(){r.classList.add("map__pin--active")};n(t),d(),r.classList.contains("map__pin")&&!r.classList.contains("map__pin--main")&&(window.card.map.querySelector(".map__card")?(window.card.map.removeChild(window.card.map.querySelector(".map__card")),n(t),d(),window.card.renderCard(window.card.createCard(o),window.card.mapFiltersContainer)):(n(t),d(),window.card.renderCard(window.card.createCard(o),window.card.mapFiltersContainer)));const a=window.card.map.querySelector(".popup__close"),c=window.card.map.querySelector(".map__card"),s=function(){window.card.map.removeChild(c)};a.addEventListener("click",(function(){s(),n(t)})),a.addEventListener("keydown",(function(){e.target.code===window.card.KEY_CODE_ENTER&&(s(),n(t))}))}))}return r}}})(),(()=>{const e=document.querySelector(".map__pin--main"),t=document.querySelectorAll("fieldset"),n=document.querySelector(".map__filters"),o=n.querySelectorAll("select"),r=document.querySelector(".ad-form");window.card.map.addEventListener("keydown",(function(e){"Escape"===e.key&&window.card.map.querySelector(".map__card")&&window.card.map.removeChild(window.card.map.querySelector(".map__card"))}));const i=function(e){e.classList.add("map--faded")};i(window.card.map);const d=function(e){e.forEach((e=>{e.setAttribute("disabled","true")}))};d(t),d(o);const a=function(e){e.classList.remove("ad-form--disabled")},c=function(){t.forEach((e=>{e.removeAttribute("disabled")}))},s=function(t){1===t.which&&(window.card.map.classList.remove("map--faded"),window.backend.load(window.filter.filterPin,window.error.showError),a(r),c(),window.form.checkRoomAndGuest(),window.form.onTypeChange(),window.form.setTimeinAndTimeout(),e.removeEventListener("mousedown",s),e.removeEventListener("keydown",l))};window.card.map.classList.contains("map--faded")&&e.addEventListener("mousedown",s);const l=function(t){"Enter"===t.code&&window.card.map.classList.remove("map--faded"),a(r),c(),window.form.checkRoomAndGuest(),window.form.onTypeChange(),window.form.setTimeinAndTimeout(),e.removeEventListener("keydown",l),e.removeEventListener("mousedown",s)};window.card.map.classList.contains("map--faded")&&e.addEventListener("keydown",l),window.main={addMapFaded:i,addAdFormDisabled:function(e){e.classList.add("ad-form--disabled")},mapFilter:n,mapPinMain:e,onMapPinMainMousedown:s,addDisabled:d,formFieldsets:t,mapFilterSelects:o,LEFT_KEY_MOUSE_CODE:1,removeAddDisabled:function(e){e.forEach((e=>{e.removeAttribute("disabled")}))}}})(),(()=>{const e="any",t=["wifi","dishwasher","parking","washer","elevator","conditioner"],n=1e4,o=5e4,r="any",i="middle",d="high",a=document.querySelector(".map__filters"),c=function(){s.querySelectorAll(".map__pin").forEach((e=>{e.classList.contains("map__pin--main")||e.remove()}))},s=document.querySelector(".map__pins"),l=document.createDocumentFragment(),u=function(){s.appendChild(l)},p=function(e){if(c(),e.length<window.pin.MAX_PIN)for(let t=0;t<e.length;t++){const n=window.pin.createPin(e[t]);n.setAttribute("data-index",t),l.appendChild(n),u()}else if(e.length>window.pin.MAX_PIN)for(let t=0;t<window.pin.MAX_PIN;t++){const n=window.pin.createPin(e[t]);n.setAttribute("data-index",t),l.appendChild(n),u()}};let f;window.filter={mapFilters:a,filterPin:function(s){window.main.removeAddDisabled(window.main.mapFilterSelects);const l=s;let u="any",m="any",w="any",y="any";const v=document.querySelector("#housing-type");v.addEventListener("change",(function(){c(),u=v.value}));const h=document.querySelector("#housing-price");h.addEventListener("change",(function(){c(),m=h.value}));const _=document.querySelector("#housing-rooms");_.addEventListener("change",(function(){c(),w=_.value}));const S=document.querySelector("#housing-guests");S.addEventListener("change",(function(){c(),y=S.value})),a.addEventListener("change",(function(){window.card.map.querySelector(".map__card")&&document.querySelector(".map__card").remove();const a=l.filter((function(t){return t.offer.type===u?t.offer.type===u:u===e&&t.offer.type})),c=l.filter((function(e){return m===i&&e.offer.price>=n&&e.offer.price<o?e.offer.price>=n&&e.offer.price<o:"low"===m?e.offer.price<1e4:m===d?e.offer.price>=5e4:m===r&&e.offer.price})),s=l.filter((function(t){if(w!==e){const e=parseInt(w,10);return t.offer.rooms===e}return t.offer.rooms})),v=l.filter((function(t){if(y!==e){const e=parseInt(y,10);return t.offer.guests===e}return t.offer.guests})),h=a.concat(c).concat(s).concat(v),_=h.filter((function(e,t){return h.indexOf(e)===t})).filter((function(t){return!(u!==e&&t.offer.type!==u||m===i&&m!==r&&t.offer.price<n||m===i&&m!==r&&t.offer.price>=o||"low"===m&&m!==r&&t.offer.price>=1e4||m===d&&m!==r&&t.offer.price<=5e4||w!==e&&t.offer.rooms!==parseInt(w,10)||y!==e&&t.offer.guests!==parseInt(y,10))})),S=document.querySelectorAll(".map__checkbox"),g=[];S.forEach(((e,n)=>{e.checked&&g.push(t[n])}));const q=_.filter((function(e){let t=0;for(let n=0;n<g.length;n++)for(let o=0;o<e.offer.features.length;o++)g[n]===e.offer.features[o]&&t++;return t===g.length}));f&&clearTimeout(f),f=setTimeout((function(){p(q)}),500)})),p(l)}}})(),(()=>{const e=document.querySelector(".ad-form__upload input[type=file]"),t=document.querySelector(".ad-form__photo"),n=["gif","jpg","jpeg","png"],o=document.querySelector(".ad-form__field input[type=file]"),r=document.querySelector(".ad-form-header__preview"),i=function(e,t,n){e.addEventListener("change",(()=>{const o=e.files[0],r=o.name.toLowerCase();if(n.some((function(e){return r.endsWith(e)}))){const e=new FileReader;e.addEventListener("load",(()=>{t.replaceChildren(),t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center";const n=document.createElement("img");n.style.width="40px",n.style.height="44px",t.appendChild(n),n.src=e.result})),e.readAsDataURL(o)}}))};i(o,r,n),i(e,t,n),window.photo={previewAvatar:r,previewPhotoFlat:t}})()})();