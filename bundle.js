(()=>{"use strict";window.util={getArrOfTextBeforeDash:function(e){const t=[],n=[];for(let o=0;o<e.length;o++)for(let r=e[o].length-1;r>0;r--){if("-"===e[o][r]){t.reverse(),n.push(t.join("")),t.splice(0,t.length);break}t.push(e[o][r])}return n},getArrClassNameHtml:function(e){const t=[];return e.forEach((e=>{t.push(e.className)})),t},comparisonArrsAndAddClassNameHidden:function(e,t,n){if(e.length>0)for(let o=0;o<e.length;o++)for(let r=0;r<t.length;r++)e[o]===t[r]&&(n[r].textContent=e[o]),n[r].textContent?n[r].classList.remove("hidden"):n[r].classList.add("hidden");else for(let e=0;e<t.length;e++)n[e].classList.add("hidden")},disabledMapFilter:function(){window.util.hideMap(window.card.map),window.main.addAdFormDisabled(window.filter.mapFilters),window.main.disableNodeElement(window.main.formFieldsets)},removeToArrDisabled:function(e){e.forEach((e=>{e.removeAttribute("disabled")}))},getArrValueFromHtml:function(e){const t=[];return e.forEach((e=>{t.push(e.value)})),t},hideMap:function(e){e.classList.add("map--faded")},disableNodeElement:function(e){e.forEach((e=>{e.setAttribute("disabled","true")}))}},window.error={showError:function(e){const t=document.createElement("div");t.style="\n    position: absolute;\n    left: 0;\n    right: 0;\n    color: red;\n    font-size: 50px;\n    z-index: 100; \n    margin: 0 auto; \n    text-align: center; \n    background-color: white; \n    height: 130px;\n    display: flex; \n    justify-content: center; \n    align-items: center  \n  ",t.textContent=e,window.card.map.appendChild(t)}},window.backend={load:function(e,t){const n=new XMLHttpRequest;n.responseType="json",n.addEventListener("load",(function(){200===n.status?e(n.response):t(`Статус ответа:  ${n.status} ${n.statusText}`)})),n.addEventListener("error",(function(){t("Запрос не удался")})),n.addEventListener("timeout",(function(){t("Запрос не успел выполниться за "+n.timeout+"мс")})),n.timeout=1e4,n.open("GET","https://21.javascript.pages.academy/keksobooking/data"),n.send()},save:function(e,t,n){const o=new XMLHttpRequest;o.responseType="json",o.addEventListener("load",(function(){200===o.status?t():n()})),o.addEventListener("timeout",(function(){n()})),o.addEventListener("error",(function(){n()})),o.timeout=1e4,o.open("POST","https://21.javascript.pages.academy/keksobooking"),o.send(e)}},(()=>{const e=130,t=document.querySelector(".map__pin--main"),n=t.offsetTop+"px",o=Math.round(t.offsetLeft)+"px",r=document.querySelector("#address"),i=document.querySelector(".map__pins"),d=t.offsetHeight+22,a=function(e,t,n){e.setAttribute("value",`${t}, ${n}`)};!function(){let e=Math.round(t.offsetLeft+t.offsetWidth/2),n=Math.round(t.offsetTop+t.offsetHeight/2);a(r,e,n)}(),t.addEventListener("mousedown",(function(c){if(c.which===window.main.LEFT_KEY_MOUSE_CODE){c.preventDefault(),window.card.map.classList.contains("map--faded")&&(t.style.top=n,t.style.left=o);let s={x:c.clientX,y:c.clientY},l=Math.round(t.offsetLeft+t.offsetWidth/2),u=Math.round(t.offsetTop+d);r.setAttribute("value",`${l}, ${u}`);const f=function(n){n.preventDefault();const o=s.x-n.clientX,c=s.y-n.clientY,f=l-o,m=u-c;l=Math.round(t.offsetLeft+t.offsetWidth/2),u=Math.round(t.offsetTop+d),s={x:n.clientX,y:n.clientY},t.style.left=t.offsetLeft-o+"px",t.style.top=t.offsetTop-c+"px",a(r,f,m),f<=0?(t.style.left=-t.offsetWidth/2+"px",a(r,0,m)):f>=i.offsetWidth&&(t.style.left=i.offsetWidth-t.offsetWidth/2+"px",a(r,i.offsetWidth,m)),m<=e?(t.style.top=e-d+"px",console.log("устанавливаю ограничение топ мин",e-d+"px"),a(r,f,e)):m>=630&&(t.style.top=630-d+"px",a(r,f,630))},m=function(e){e.preventDefault(),document.removeEventListener("mousemove",f),document.removeEventListener("mouseup",m)};document.addEventListener("mousemove",f),document.addEventListener("mouseup",m)}})),window.movePin={mapPinMain:t,MAP_PIN_MAIN_TOP:n,MAP_PIN_MAIN_LEFT:o,fillAddress:a,address:r,mainPinHeight:d,mapPin:i}})(),(()=>{const e=document.querySelector(".ad-form__upload input[type=file]"),t=document.querySelector(".ad-form__photo"),n=["gif","jpg","jpeg","png"],o=document.querySelector(".ad-form__field input[type=file]"),r=document.querySelector(".ad-form-header__preview"),i=function(e,t,n){e.addEventListener("change",(()=>{const o=e.files[0],r=o.name.toLowerCase();if(n.some((function(e){return r.endsWith(e)}))){const e=new FileReader;e.addEventListener("load",(()=>{t.replaceChildren(),t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center";const n=document.createElement("img");n.style.width="40px",n.style.height="44px",t.appendChild(n),n.src=e.result})),e.readAsDataURL(o)}}))};i(o,r,n),i(e,t,n),window.photo={previewAvatar:r,previewPhotoFlat:t}})(),(()=>{const e=Math.round(parseInt(window.movePin.MAP_PIN_MAIN_LEFT,10)+window.movePin.mapPinMain.offsetWidth/2),t=Math.round(parseInt(window.movePin.MAP_PIN_MAIN_TOP,10)+window.movePin.mainPinHeight),n=[[0,1,3],[0,3],[3],[0,1,2]],o=[0,1e3,5e3,1e4],r=document.querySelector("#capacity"),i=r.querySelectorAll("option"),d=document.querySelector("#avatar"),a=document.querySelector("#images"),c=document.querySelector("#timein"),s=c.querySelectorAll("option"),l=document.querySelector("#timeout"),u=l.querySelectorAll("option"),f=document.querySelector(".map__pins"),m=document.querySelector("#success").content.querySelector(".success").cloneNode(!0),p=document.querySelector("#error").content.querySelector(".error").cloneNode(!0),w=document.querySelector("#type"),y=w.querySelectorAll("option"),v=document.querySelector("#title"),h=window.util.getArrValueFromHtml(y),_=document.querySelector("#price"),E=document.querySelector(".ad-form"),g=document.querySelector(".ad-form__reset");let S;const L=function(){E.reset(),window.filter.mapFilters.reset(),window.main.addAdFormDisabled(E),window.util.hideMap(window.card.map),window.util.disableNodeElement(window.main.formFieldsets),window.util.disableNodeElement(window.main.mapFilterSelects),window.card.map.querySelector(".map__card")&&window.card.map.removeChild(window.card.map.querySelector(".map__card")),window.card.map.classList.contains("map--faded")&&(window.movePin.mapPinMain.style.top=window.movePin.MAP_PIN_MAIN_TOP,window.movePin.mapPinMain.style.left=window.movePin.MAP_PIN_MAIN_LEFT),function(){if("img/muffin-grey.svg"!==window.photo.previewAvatar.querySelector("img").src){window.photo.previewAvatar.replaceChildren(),window.photo.previewAvatar.style.display="flex",window.photo.previewAvatar.style.alignItems="center",window.photo.previewAvatar.style.justifyContent="center";const e=document.createElement("img");e.style.width="40px",e.style.height="44px",window.photo.previewAvatar.appendChild(e),e.src="img/muffin-grey.svg"}}(),function(){const e=window.photo.previewPhotoFlat.querySelector("img");e&&e.remove()}(),P(),window.movePin.fillAddress(window.movePin.address,e,t),q(),C(),g.removeEventListener("click",O),g.removeEventListener("click",H),window.main.mapPinMain.addEventListener("mousedown",window.main.onMapPinMainMousedown),window.main.mapPinMain.addEventListener("keydown",window.main.onMapPinMainKeydown)};window.util.removeToArrDisabled(i);const q=function(){for(let e=0;e<n[0].length;e++)i[n[0][e]].setAttribute("disabled","true");i[2].selected=!0};q();const A=function(e,t,n,o){for(let o=0;o<t[e].length;o++)n[t[e][o]].setAttribute("disabled","true");n[o].selected=!0};v.setAttribute("minlength",30),_.setAttribute("max",1e6);const P=function(){const e=w.value;for(let t=0;t<h.length;t++)e===h[t]&&(_.setAttribute("placeholder","от "+o[t]),_.setAttribute("min",""+o[t]))};P(),w.addEventListener("change",P),_.setAttribute("required","required"),_.setAttribute("type","number"),_.setAttribute("max","1000000"),d.setAttribute("accept","image/*"),a.setAttribute("accept","image/*"),E.addEventListener("submit",(function(e){e.preventDefault(),window.backend.save(new FormData(E),b,N)}));const b=function(){f.appendChild(m),document.addEventListener("keydown",M),document.addEventListener("click",x),L()},C=function(){f.querySelectorAll("button").forEach((e=>{e.classList.contains("map__pin--main")||e.remove()}))},k=function(){m.remove(),document.removeEventListener("keydown",M),document.removeEventListener("click",x)},M=function(e){27===e.keyCode&&k()},x=function(){k()},N=function(){document.querySelector("main").appendChild(p),S=document.querySelector(".error__button"),document.addEventListener("click",T),document.addEventListener("keydown",D),S.addEventListener("click",I)},F=function(){p.remove(),document.removeEventListener("click",T),document.removeEventListener("keydown",D),S.removeEventListener("click",I)},T=function(){F()},D=function(e){27===e.keyCode&&F()},I=function(){F()},O=function(){L()},H=function(e){13===e.keyCode&&L()};window.form={setTimeinAndTimeout:function(){c.addEventListener("change",(function(){for(let e=0;e<s.length;e++)if(s[e].value===c.value){l.value=s[e].value;break}})),l.addEventListener("change",(function(){for(let e=0;e<u.length;e++)if(u[e].value===l.value){c.value=u[e].value;break}}))},capacityOptions:i,capacity:r,checkRoomAndGuest:function(){const e=document.querySelector("#room_number");e.addEventListener("change",(function(){window.main.removeAddDisabled(i);const t=e.value;"1"===t?A(0,n,i,2):"2"===t?A(1,n,i,1):"3"===t?A(2,n,i,0):t>n.length-1&&A(3,n,i,3)}))},onTypeChange:P,KEY_CODE_ENTER:13,adFormReset:g,onFormClick:O,onFormPressEnter:H,mapPins:f,KEY_CODE_ESC:27}})(),(()=>{const e=document.querySelector("#card").content.querySelector(".map__card"),t=document.querySelector(".map__filters-container"),n=document.querySelector(".map"),o=function(e){e.classList.add("hidden")},r=function(e,t){e?t.textContent=e:o(t)};window.card={createCard:function(t){const n=e.cloneNode(!0);if(t&&t.offer){const e=n.querySelector(".popup__title"),i=n.querySelector(".popup__text--address"),d=n.querySelector(".popup__text--price"),a=n.querySelector(".popup__type"),c=n.querySelector(".popup__text--capacity"),s=n.querySelector(".popup__text--time"),l=n.querySelector(".popup__description");if(r(t.offer.title,e),r(t.offer.address,i),r(t.offer.price,d),r(t.offer.type,a),t.offer.rooms&&t.offer.guests){const e=`${t.offer.rooms} комнатa(ы) для ${t.offer.guests} гостя(ей)`;r(e,c)}if(t.offer.checkin&&t.offer.checkout){const e=`Заезд после ${t.offer.checkin}, выезд до ${t.offer.checkout}`;r(e,s)}const u=n.querySelector(".popup__features").querySelectorAll("li"),f=window.util.getArrClassNameHtml(u),m=window.util.getArrOfTextBeforeDash(f);window.util.comparisonArrsAndAddClassNameHidden(t.offer.features,m,u),r(t.offer.description,l);const p=n.querySelector(".popup__photos"),w=p.querySelector("img");if(t.offer.photos){for(let e=0;e<t.offer.photos.length;e++){const n=w.cloneNode();n.src=t.offer.photos[e],p.appendChild(n)}p.removeChild(w)}else p.removeChild(w);const y=n.querySelector(".popup__avatar");t.author.avatar?y.src=t.author.avatar:o(y)}return n},mapFiltersContainer:t,renderCard:function(e,t){n.insertBefore(e,t)},map:n,delCard:function(){const e=window.card.map.querySelector(".map__card");e&&e.remove()}}})(),(()=>{const e=document.querySelector("#pin").content.querySelector(".map__pin");let t;const n=function(e){e.forEach((e=>{e.classList.contains("map__pin--active")&&e.classList.remove("map__pin--active")}))};window.card.map.addEventListener("keydown",(function(e){e.keyCode===window.form.KEY_CODE_ESC&&window.card.map.querySelector(".map__pin--active")&&n(t)})),window.pin={MAX_PIN:5,createPin:function(o){const r=e.cloneNode(!0),i=r.querySelector("img");return i.src=o.author.avatar,i.alt=o.offer.title,r.style.left=o.location.x+"px",r.style.top=o.location.y+"px",r.addEventListener("click",(e=>{let r=e.target;"IMG"===r.tagName&&(r=r.parentNode),t=document.querySelectorAll(".map__pin");const i=function(){r.classList.add("map__pin--active")};n(t),i(),r.classList.contains("map__pin")&&!r.classList.contains("map__pin--main")&&(window.card.map.querySelector(".map__card")&&window.card.map.removeChild(window.card.map.querySelector(".map__card")),n(t),i(),window.card.renderCard(window.card.createCard(o),window.card.mapFiltersContainer));const d=window.card.map.querySelector(".popup__close"),a=window.card.map.querySelector(".map__card"),c=function(){window.card.map.removeChild(a)};d.addEventListener("click",(function(){c(),n(t)})),d.addEventListener("keydown",(function(){e.target.code===window.form.KEY_CODE_ENTER&&(c(),n(t))}))})),r},delPin:function(){window.form.mapPins.querySelectorAll(".map__pin").forEach((function(e){e.classList.contains("map__pin--main")||e.remove()}))},renderPin:function(e){window.form.mapPins.appendChild(e)},renderNewPin:function(e){const t=document.createDocumentFragment(),n=e.filter((function(e){return!!e.offer}));window.pin.delPin();const o=n.length<window.pin.MAX_PIN?n.length:window.pin.MAX_PIN;for(let e=0;e<o;e++){const o=window.pin.createPin(n[e]);t.appendChild(o),window.pin.renderPin(t)}}}})(),(()=>{const e=document.querySelector(".map__pin--main"),t=document.querySelectorAll("fieldset"),n=document.querySelector(".map__filters"),o=n.querySelectorAll("select"),r=document.querySelector(".ad-form");window.card.map.addEventListener("keydown",(function(e){"Escape"===e.key&&window.card.map.querySelector(".map__card")&&window.card.map.removeChild(window.card.map.querySelector(".map__card"))})),window.util.hideMap(window.card.map),window.util.disableNodeElement(t),window.util.disableNodeElement(o);const i=function(){window.card.map.classList.remove("map--faded"),window.backend.load(window.filter.filterPin,window.error.showError),r.classList.remove("ad-form--disabled"),t.forEach((e=>{e.removeAttribute("disabled")})),window.form.checkRoomAndGuest(),window.form.onTypeChange(),window.form.setTimeinAndTimeout(),e.removeEventListener("mousedown",d),e.removeEventListener("keydown",a),window.form.adFormReset.addEventListener("click",window.form.onFormClick),window.form.adFormReset.addEventListener("keydown",window.form.onFormPressEnter)},d=function(e){1===e.which&&i()};window.card.map.classList.contains("map--faded")&&e.addEventListener("mousedown",d);const a=function(e){e.keyCode===window.form.KEY_CODE_ENTER&&i()};window.card.map.classList.contains("map--faded")&&e.addEventListener("keydown",a),window.main={addAdFormDisabled:function(e){e.classList.add("ad-form--disabled")},mapFilter:n,mapPinMain:e,onMapPinMainMousedown:d,formFieldsets:t,mapFilterSelects:o,LEFT_KEY_MOUSE_CODE:1,removeAddDisabled:function(e){e.forEach((e=>{e.removeAttribute("disabled")}))},onMapPinMainKeydown:a}})(),(()=>{const e="any",t=["wifi","dishwasher","parking","washer","elevator","conditioner"],n=1e4,o=5e4,r="any",i="middle",d="high",a=document.querySelector(".map__filters");let c;window.filter={mapFilters:a,filterPin:function(s){window.main.removeAddDisabled(window.main.mapFilterSelects);const l=s;let u="any",f="any",m="any",p="any";document.querySelector("#housing-type").addEventListener("change",(function(e){u=e.target.value})),document.querySelector("#housing-price").addEventListener("change",(function(e){f=e.target.value})),document.querySelector("#housing-rooms").addEventListener("change",(function(e){m=e.target.value})),document.querySelector("#housing-guests").addEventListener("change",(function(e){p=e.target.value})),a.addEventListener("change",(function(){window.pin.delPin(),window.card.delCard();const a=l.filter((function(e){return e.offer.type!==u||e.offer.type===u})),s=l.filter((function(e){return f===i&&e.offer.price>=n&&e.offer.price<o?e.offer.price>=n&&e.offer.price<o:"low"===f?e.offer.price<1e4:f!==d||e.offer.price>=5e4})),w=l.filter((function(t){if(m!==e){const e=parseInt(m,10);return t.offer.rooms===e}return!0})),y=l.filter((function(t){if(p!==e){const e=parseInt(p,10);return t.offer.guests===e}return!0})),v=a.concat(s).concat(w).concat(y),h=v.filter((function(e,t){return v.indexOf(e)===t})).filter((function(t){return!(u!==e&&t.offer.type!==u||f===i&&f!==r&&t.offer.price<n||f===i&&f!==r&&t.offer.price>=o||"low"===f&&f!==r&&t.offer.price>=1e4||f===d&&f!==r&&t.offer.price<=5e4||m!==e&&t.offer.rooms!==parseInt(m,10)||p!==e&&t.offer.guests!==parseInt(p,10))})),_=document.querySelectorAll(".map__checkbox"),E=[];_.forEach(((e,n)=>{e.checked&&E.push(t[n])}));const g=h.filter((function(e){let t=0;for(let n=0;n<E.length;n++)for(let o=0;o<e.offer.features.length;o++)E[n]===e.offer.features[o]&&t++;return t===E.length}));c&&clearTimeout(c),c=setTimeout((function(){window.pin.renderNewPin(g)}),500)})),window.pin.renderNewPin(l)}}})()})();