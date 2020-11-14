(()=>{"use strict";window.util={getArrOfTextBeforeDash:function(e){const t=[],n=[];for(let o=0;o<e.length;o++)for(let r=e[o].length-1;r>0;r--){if("-"===e[o][r]){t.reverse(),n.push(t.join("")),t.splice(0,t.length);break}t.push(e[o][r])}return n},getArrClassNameHtml:function(e){const t=[];return e.forEach((e=>{t.push(e.className)})),t},comparisonArrsAndAddClassNameHidden:function(e,t,n){if(e.length>0)for(let o=0;o<e.length;o++)for(let r=0;r<t.length;r++)e[o]===t[r]&&(n[r].textContent=e[o]),n[r].textContent?n[r].classList.remove("hidden"):n[r].classList.add("hidden");else for(let e=0;e<t.length;e++)n[e].classList.add("hidden")},disabledMapFilter:function(){window.util.hideMap(window.propertyDescription.map),window.head.addAdFormDisabled(window.sort.mapFilters),window.head.disableNodeElement(window.head.formFieldsets)},removeToArrDisabled:function(e){e.forEach((e=>{e.removeAttribute("disabled")}))},getArrValueFromHtml:function(e){const t=[];return e.forEach((e=>{t.push(e.value)})),t},hideMap:function(e){e.classList.add("map--faded")},disableNodeElement:function(e){e.forEach((e=>{e.setAttribute("disabled","true")}))}},window.error={showProblem:function(e){const t=document.createElement("div");t.style="\n    position: absolute;\n    left: 0;\n    right: 0;\n    color: red;\n    font-size: 50px;\n    z-index: 100; \n    margin: 0 auto; \n    text-align: center; \n    background-color: white; \n    height: 130px;\n    display: flex; \n    justify-content: center; \n    align-items: center  \n  ",t.textContent=e,window.propertyDescription.map.appendChild(t)}},window.backend={load:function(e,t){const n=new XMLHttpRequest;n.responseType="json",n.addEventListener("load",(function(){200===n.status?e(n.response):t(`Статус ответа:  ${n.status} ${n.statusText}`)})),n.addEventListener("error",(function(){t("Запрос не удался")})),n.addEventListener("timeout",(function(){t("Запрос не успел выполниться за "+n.timeout+"мс")})),n.timeout=1e4,n.open("GET","https://21.javascript.pages.academy/keksobooking/data"),n.send()},save:function(e,t,n){const o=new XMLHttpRequest;o.responseType="json",o.addEventListener("load",(function(){200===o.status?t():n()})),o.addEventListener("timeout",(function(){n()})),o.addEventListener("error",(function(){n()})),o.timeout=1e4,o.open("POST","https://21.javascript.pages.academy/keksobooking"),o.send(e)}},(()=>{const e=document.querySelector(".map__pin--main"),t=e.offsetTop+"px",n=Math.round(e.offsetLeft)+"px",o=document.querySelector("#address"),r=document.querySelector(".map__pins"),i=e.offsetHeight+22,d=function(e,t,n){e.setAttribute("value",`${t}, ${n}`)};!function(){let t=Math.round(e.offsetLeft+e.offsetWidth/2),n=Math.round(e.offsetTop+e.offsetHeight/2);d(o,t,n)}(),e.addEventListener("mousedown",(function(c){if(c.which===window.head.LEFT_KEY_MOUSE_CODE){c.preventDefault(),window.propertyDescription.map.classList.contains("map--faded")&&(e.style.top=t,e.style.left=n);let a={x:c.clientX,y:c.clientY},s=Math.round(e.offsetLeft+e.offsetWidth/2),l=Math.round(e.offsetTop+i);o.setAttribute("value",`${s}, ${l}`);const p=function(t){t.preventDefault();const n=a.x-t.clientX,c=a.y-t.clientY,p=s-n,u=l-c;s=Math.round(e.offsetLeft+e.offsetWidth/2),l=Math.round(e.offsetTop+i),a={x:t.clientX,y:t.clientY},e.style.left=e.offsetLeft-n+"px",e.style.top=e.offsetTop-c+"px",d(o,p,u),p<=0?(e.style.left=-e.offsetWidth/2+"px",d(o,0,u)):p>=r.offsetWidth&&(e.style.left=r.offsetWidth-e.offsetWidth/2+"px",d(o,r.offsetWidth,u)),u<=130?(e.style.top=130-i+"px",d(o,p,130)):u>=630&&(e.style.top=630-i+"px",d(o,p,630))},u=function(e){e.preventDefault(),document.removeEventListener("mousemove",p),document.removeEventListener("mouseup",u)};document.addEventListener("mousemove",p),document.addEventListener("mouseup",u)}})),window.movePin={mapPinMain:e,MAP_PIN_MAIN_TOP:t,MAP_PIN_MAIN_LEFT:n,fillAddress:d,address:o,mainPinHeight:i,mapPin:r}})(),(()=>{const e=document.querySelector(".ad-form__upload input[type=file]"),t=document.querySelector(".ad-form__photo"),n=["gif","jpg","jpeg","png"],o=document.querySelector(".ad-form__field input[type=file]"),r=document.querySelector(".ad-form-header__preview"),i=function(e,t,n){e.addEventListener("change",(()=>{const o=e.files[0],r=o.name.toLowerCase();if(n.some((function(e){return r.endsWith(e)}))){const e=new FileReader;e.addEventListener("load",(()=>{t.replaceChildren(),t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center";const n=document.createElement("img");n.style.width="40px",n.style.height="44px",t.appendChild(n),n.src=e.result})),e.readAsDataURL(o)}}))};i(o,r,n),i(e,t,n),window.photo={previewAvatar:r,previewFlat:t}})(),(()=>{const e=Math.round(parseInt(window.movePin.MAP_PIN_MAIN_LEFT,10)+window.movePin.mapPinMain.offsetWidth/2),t=Math.round(parseInt(window.movePin.MAP_PIN_MAIN_TOP,10)+window.movePin.mapPinMain.offsetHeight/2),n=[[0,1,3],[0,3],[3],[0,1,2]],o=[0,1e3,5e3,1e4],r=document.querySelector("#capacity"),i=r.querySelectorAll("option"),d=document.querySelector("#avatar"),c=document.querySelector("#images"),a=document.querySelector("#timein"),s=a.querySelectorAll("option"),l=document.querySelector("#timeout"),p=l.querySelectorAll("option"),u=document.querySelector(".map__pins"),f=document.querySelector("#success").content.querySelector(".success").cloneNode(!0),m=document.querySelector("#error").content.querySelector(".error").cloneNode(!0),w=document.querySelector("#type"),y=w.querySelectorAll("option"),v=document.querySelector("#title"),h=window.util.getArrValueFromHtml(y),_=document.querySelector("#price"),E=document.querySelector(".ad-form"),g=document.querySelector(".ad-form__reset");let A;const S=function(){E.reset(),window.sort.mapFilters.reset(),window.head.addAdFormDisabled(E),window.util.hideMap(window.propertyDescription.map),window.util.disableNodeElement(window.head.formFieldsets),window.util.disableNodeElement(window.head.mapFilterSelects),window.propertyDescription.map.querySelector(".map__card")&&window.propertyDescription.map.removeChild(window.propertyDescription.map.querySelector(".map__card")),window.propertyDescription.map.classList.contains("map--faded")&&(window.movePin.mapPinMain.style.top=window.movePin.MAP_PIN_MAIN_TOP,window.movePin.mapPinMain.style.left=window.movePin.MAP_PIN_MAIN_LEFT),function(){if("img/muffin-grey.svg"!==window.photo.previewAvatar.querySelector("img").src){window.photo.previewAvatar.replaceChildren(),window.photo.previewAvatar.style.display="flex",window.photo.previewAvatar.style.alignItems="center",window.photo.previewAvatar.style.justifyContent="center";const e=document.createElement("img");e.style.width="40px",e.style.height="44px",window.photo.previewAvatar.appendChild(e),e.src="img/muffin-grey.svg"}}(),function(){const e=window.photo.previewFlat.querySelector("img");e&&e.remove()}(),b(),window.movePin.fillAddress(window.movePin.address,e,t),L(),D(),g.removeEventListener("click",I),g.removeEventListener("click",H),window.head.mapPinMain.addEventListener("mousedown",window.head.onMapPinMainMousedown),window.head.mapPinMain.addEventListener("keydown",window.head.onMapPinMainKeydown)};window.util.removeToArrDisabled(i);const L=function(){for(let e=0;e<n[0].length;e++)i[n[0][e]].setAttribute("disabled","true");i[2].selected=!0};L();const q=function(e,t,n,o){for(let o=0;o<t[e].length;o++)n[t[e][o]].setAttribute("disabled","true");n[o].selected=!0};v.setAttribute("minlength",30),_.setAttribute("max",1e6);const b=function(){const e=w.value;for(let t=0;t<h.length;t++)e===h[t]&&(_.setAttribute("placeholder","от "+o[t]),_.setAttribute("min",""+o[t]))};b(),w.addEventListener("change",b),_.setAttribute("required","required"),_.setAttribute("type","number"),_.setAttribute("max","1000000"),d.setAttribute("accept","image/*"),c.setAttribute("accept","image/*"),E.addEventListener("submit",(function(e){e.preventDefault(),window.backend.save(new FormData(E),P,x)}));const P=function(){u.appendChild(f),document.addEventListener("keydown",k),document.addEventListener("click",M),S()},D=function(){u.querySelectorAll("button").forEach((e=>{e.classList.contains("map__pin--main")||e.remove()}))},C=function(){f.remove(),document.removeEventListener("keydown",k),document.removeEventListener("click",M)},k=function(e){27===e.keyCode&&C()},M=function(){C()},x=function(){document.querySelector("main").appendChild(m),A=document.querySelector(".error__button"),document.addEventListener("click",F),document.addEventListener("keydown",T),A.addEventListener("click",O)},N=function(){m.remove(),document.removeEventListener("click",F),document.removeEventListener("keydown",T),A.removeEventListener("click",O)},F=function(){N()},T=function(e){27===e.keyCode&&N()},O=function(){N()},I=function(){S()},H=function(e){13===e.keyCode&&S()};window.formOfAdvert={setTimeinAndTimeout:function(){a.addEventListener("change",(function(){for(let e=0;e<s.length;e++)if(s[e].value===a.value){l.value=s[e].value;break}})),l.addEventListener("change",(function(){for(let e=0;e<p.length;e++)if(p[e].value===l.value){a.value=p[e].value;break}}))},capacityOptions:i,capacity:r,checkRoomAndGuest:function(){const e=document.querySelector("#room_number");e.addEventListener("change",(function(){window.head.removeAddDisabled(i);const t=e.value;"1"===t?q(0,n,i,2):"2"===t?q(1,n,i,1):"3"===t?q(2,n,i,0):t>n.length-1&&q(3,n,i,3)}))},onTypeChange:b,KEY_CODE_ENTER:13,adFormReset:g,onFormClick:I,onFormPressEnter:H,mapPins:u,KEY_CODE_ESC:27}})(),(()=>{const e=document.querySelector("#card").content.querySelector(".map__card"),t=document.querySelector(".map__filters-container"),n=document.querySelector(".map"),o=function(e){e.classList.add("hidden")},r=function(e,t){e?t.textContent=e:o(t)};window.propertyDescription={createCard:function(t){const n=e.cloneNode(!0);if(t&&t.offer){const e=n.querySelector(".popup__title"),i=n.querySelector(".popup__text--address"),d=n.querySelector(".popup__text--price"),c=n.querySelector(".popup__type"),a=n.querySelector(".popup__text--capacity"),s=n.querySelector(".popup__text--time"),l=n.querySelector(".popup__description");if(r(t.offer.title,e),r(t.offer.address,i),r(t.offer.price,d),r(t.offer.type,c),t.offer.rooms&&t.offer.guests){const e=`${t.offer.rooms} комнатa(ы) для ${t.offer.guests} гостя(ей)`;r(e,a)}if(t.offer.checkin&&t.offer.checkout){const e=`Заезд после ${t.offer.checkin}, выезд до ${t.offer.checkout}`;r(e,s)}const p=n.querySelector(".popup__features").querySelectorAll("li"),u=window.util.getArrClassNameHtml(p),f=window.util.getArrOfTextBeforeDash(u);window.util.comparisonArrsAndAddClassNameHidden(t.offer.features,f,p),r(t.offer.description,l);const m=n.querySelector(".popup__photos"),w=m.querySelector("img");if(t.offer.photos){for(let e=0;e<t.offer.photos.length;e++){const n=w.cloneNode();n.src=t.offer.photos[e],m.appendChild(n)}m.removeChild(w)}else m.removeChild(w);const y=n.querySelector(".popup__avatar");t.author.avatar?y.src=t.author.avatar:o(y)}return n},mapFiltersContainer:t,renderCard:function(e,t){n.insertBefore(e,t)},map:n,delCard:function(){const e=window.propertyDescription.map.querySelector(".map__card");e&&e.remove()}}})(),(()=>{const e=document.querySelector("#pin").content.querySelector(".map__pin");let t;const n=function(e){e.forEach((e=>{e.classList.contains("map__pin--active")&&e.classList.remove("map__pin--active")}))};window.propertyDescription.map.addEventListener("keydown",(function(e){e.keyCode===window.formOfAdvert.KEY_CODE_ESC&&window.propertyDescription.map.querySelector(".map__pin--active")&&n(t)})),window.label={MAX_PIN:5,createPin:function(o){const r=e.cloneNode(!0),i=r.querySelector("img");return i.src=o.author.avatar,i.alt=o.offer.title,r.style.left=o.location.x+"px",r.style.top=o.location.y+"px",r.addEventListener("click",(e=>{let r=e.target;"IMG"===r.tagName&&(r=r.parentNode),t=document.querySelectorAll(".map__pin");const i=function(){r.classList.add("map__pin--active")};n(t),i(),r.classList.contains("map__pin")&&!r.classList.contains("map__pin--main")&&(window.propertyDescription.map.querySelector(".map__card")&&window.propertyDescription.map.removeChild(window.propertyDescription.map.querySelector(".map__card")),n(t),i(),window.propertyDescription.renderCard(window.propertyDescription.createCard(o),window.propertyDescription.mapFiltersContainer));const d=window.propertyDescription.map.querySelector(".popup__close"),c=window.propertyDescription.map.querySelector(".map__card"),a=function(){window.propertyDescription.map.removeChild(c)};d.addEventListener("click",(function(){a(),n(t)})),d.addEventListener("keydown",(function(){e.target.code===window.formOfAdvert.KEY_CODE_ENTER&&(a(),n(t))}))})),r},delPin:function(){window.formOfAdvert.mapPins.querySelectorAll(".map__pin").forEach((function(e){e.classList.contains("map__pin--main")||e.remove()}))},renderPin:function(e){window.formOfAdvert.mapPins.appendChild(e)},renderNewPin:function(e){const t=document.createDocumentFragment(),n=e.filter((function(e){return!!e.offer}));window.label.delPin();const o=n.length<window.label.MAX_PIN?n.length:window.label.MAX_PIN;for(let e=0;e<o;e++){const o=window.label.createPin(n[e]);t.appendChild(o),window.label.renderPin(t)}}}})(),(()=>{const e=document.querySelector(".map__pin--main"),t=document.querySelectorAll("fieldset"),n=document.querySelector(".map__filters"),o=n.querySelectorAll("select"),r=document.querySelector(".ad-form");window.propertyDescription.map.addEventListener("keydown",(function(e){"Escape"===e.key&&window.propertyDescription.map.querySelector(".map__card")&&window.propertyDescription.map.removeChild(window.propertyDescription.map.querySelector(".map__card"))})),window.util.hideMap(window.propertyDescription.map),window.util.disableNodeElement(t),window.util.disableNodeElement(o);const i=function(){window.propertyDescription.map.classList.remove("map--faded"),window.backend.load(window.sort.filterPin,window.error.showProblem),r.classList.remove("ad-form--disabled"),t.forEach((e=>{e.removeAttribute("disabled")})),window.formOfAdvert.checkRoomAndGuest(),window.formOfAdvert.onTypeChange(),window.formOfAdvert.setTimeinAndTimeout(),e.removeEventListener("mousedown",d),e.removeEventListener("keydown",c),window.formOfAdvert.adFormReset.addEventListener("click",window.formOfAdvert.onFormClick),window.formOfAdvert.adFormReset.addEventListener("keydown",window.formOfAdvert.onFormPressEnter)},d=function(e){1===e.which&&i()};window.propertyDescription.map.classList.contains("map--faded")&&e.addEventListener("mousedown",d);const c=function(e){e.keyCode===window.formOfAdvert.KEY_CODE_ENTER&&i()};window.propertyDescription.map.classList.contains("map--faded")&&e.addEventListener("keydown",c),window.head={addAdFormDisabled:function(e){e.classList.add("ad-form--disabled")},mapFilter:n,mapPinMain:e,onMapPinMainMousedown:d,formFieldsets:t,mapFilterSelects:o,LEFT_KEY_MOUSE_CODE:1,removeAddDisabled:function(e){e.forEach((e=>{e.removeAttribute("disabled")}))},onMapPinMainKeydown:c}})(),(()=>{const e="any",t=["wifi","dishwasher","parking","washer","elevator","conditioner"],n=1e4,o=5e4,r="any",i="middle",d="high",c=document.querySelector(".map__filters");let a;window.sort={mapFilters:c,filterPin:function(s){window.head.removeAddDisabled(window.head.mapFilterSelects);const l=s;let p="any",u="any",f="any",m="any";document.querySelector("#housing-type").addEventListener("change",(function(e){p=e.target.value})),document.querySelector("#housing-price").addEventListener("change",(function(e){u=e.target.value})),document.querySelector("#housing-rooms").addEventListener("change",(function(e){f=e.target.value})),document.querySelector("#housing-guests").addEventListener("change",(function(e){m=e.target.value})),c.addEventListener("change",(function(){window.label.delPin(),window.propertyDescription.delCard();const c=l.filter((function(e){return e.offer.type!==p||e.offer.type===p})),s=l.filter((function(e){return u===i&&e.offer.price>=n&&e.offer.price<o?e.offer.price>=n&&e.offer.price<o:"low"===u?e.offer.price<1e4:u!==d||e.offer.price>=5e4})),w=l.filter((function(t){if(f!==e){const e=parseInt(f,10);return t.offer.rooms===e}return!0})),y=l.filter((function(t){if(m!==e){const e=parseInt(m,10);return t.offer.guests===e}return!0})),v=c.concat(s).concat(w).concat(y),h=v.filter((function(e,t){return v.indexOf(e)===t})).filter((function(t){return!(p!==e&&t.offer.type!==p||u===i&&u!==r&&t.offer.price<n||u===i&&u!==r&&t.offer.price>=o||"low"===u&&u!==r&&t.offer.price>=1e4||u===d&&u!==r&&t.offer.price<=5e4||f!==e&&t.offer.rooms!==parseInt(f,10)||m!==e&&t.offer.guests!==parseInt(m,10))})),_=document.querySelectorAll(".map__checkbox"),E=[];_.forEach(((e,n)=>{e.checked&&E.push(t[n])}));const g=h.filter((function(e){let t=0;for(let n=0;n<E.length;n++)for(let o=0;o<e.offer.features.length;o++)E[n]===e.offer.features[o]&&t++;return t===E.length}));a&&clearTimeout(a),a=setTimeout((function(){window.label.renderNewPin(g)}),500)})),window.label.renderNewPin(l)}}})()})();