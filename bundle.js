(()=>{"use strict";window.util={getArrOfTextBeforeDash:function(e){const t=[],n=[];for(let o=0;o<e.length;o++)for(let r=e[o].length-1;r>=0;r--){if("-"===e[o][r]){t.reverse(),n.push(t.join("")),n.splice(0,t.length);break}t.push(e[o][r])}return n},getArrClassNameHtml:function(e){const t=[];return e.forEach((e=>{t.push(e.className)})),t},getLastItemOfString:function(e){const t=[];for(let n=e.length-1;n>0&&" "!==e[n];n--)t.push(e[n]);return t.join("")},getFirstItemOfString:function(e){const t=[];for(let n=0;n<e.length&&","!==e[n];n++)t.push(e[n]);return t.join("")},comparisonArrsAndAddClassNameHidden:function(e,t,n){for(let o=0;o<e.length;o++)for(let r=0;r<t.length;r++)n[r].classList.add("hidden"),e[o]===t[r]&&(n[r].textContent=e[o]),n[r].textContent&&n[r].classList.remove("hidden")},disabledMapFilter:function(){window.main.addMapFaded(window.card.map),window.main.addAdFormDisabled(window.filter.mapFilters),window.main.addDisabled(window.main.formFieldsets)}},window.backend={load:function(e,t){const n=new XMLHttpRequest;n.responseType="json",n.addEventListener("load",(function(){200===n.status?e(n.response):t(`Статус ответа:  ${n.status} ${n.statusText}`)})),n.addEventListener("error",(function(){t("Запрос не удался")})),n.addEventListener("timeout",(function(){t("Запрос не успел выполниться за "+n.timeout+"мс")})),n.timeout=1e4,n.open("GET","https://21.javascript.pages.academy/keksobooking/data"),n.send()},save:function(e,t,n){const o=new XMLHttpRequest;o.responseType="json",o.addEventListener("load",(function(){200===o.status?t():n()})),o.addEventListener("timeout",(function(){n()})),o.addEventListener("error",(function(){n()})),o.timeout=1e4,o.open("POST","https://21.javascript.pages.academy/keksobooking"),o.send(e)}},(()=>{const e="\n1 комната — «для 1 гостя»;\n2 комнаты — «для 2 гостей» или «для 1 гостя»;\n3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»;\n100 комнат — «не для гостей».",t=function(){if(m.reset(),window.filter.mapFilters.reset(),window.main.addAdFormDisabled(m),window.main.addMapFaded(window.card.map),window.main.addDisabled(window.main.formFieldsets),window.card.map.querySelector(".map__card")&&window.card.map.removeChild(window.card.map.querySelector(".map__card")),window.card.map.classList.contains("map--faded")&&(window.movePin.mapPinMain.style.top=window.movePin.MAP_PIN_MAIN_TOP,window.movePin.mapPinMain.style.left=window.movePin.MAP_PIN_MAIN_LEFT),"img/muffin-grey.svg"!==window.foto.previewAvatar.querySelector("img").src){window.foto.previewAvatar.replaceChildren(),window.foto.previewAvatar.style.display="flex",window.foto.previewAvatar.style.alignItems="center",window.foto.previewAvatar.style.justifyContent="center";const e=document.createElement("img");e.style.width="40px",e.style.height="44px",window.foto.previewAvatar.appendChild(e),e.src="img/muffin-grey.svg"}window.foto.previewFotoFlat.querySelector("img")&&window.foto.previewFotoFlat.querySelector("img").remove(),v(),window.main.mapPinMain.addEventListener("mousedown",window.main.onMapPinMainMousedown)},n=document.querySelector("#capacity"),o=n.querySelectorAll("option");o.forEach((e=>{e.removeAttribute("disabled")})),document.querySelector("#title").setAttribute("minlength",30);const r=document.querySelector("#price");r.setAttribute("max",1e6);const i=document.querySelector("#type"),d=function(e){const t=[];return e.forEach((e=>{t.push(e.value)})),t}(i.querySelectorAll("option")),c=[0,1e3,5e3,1e4],a=function(){const e=i.value;for(let t=0;t<d.length;t++)e===d[t]&&(r.setAttribute("placeholder","от "+c[t]),r.setAttribute("min",""+c[t]))};i.addEventListener("change",a),r.setAttribute("required","required"),r.setAttribute("type","number"),r.setAttribute("max","1000000"),document.querySelector("#avatar").setAttribute("accept","image/*"),document.querySelector("#images").setAttribute("accept","image/*");const s=document.querySelector("#timein"),u=s.querySelectorAll("option"),l=document.querySelector("#timeout"),f=l.querySelectorAll("option"),p=document.querySelector(".map__pins"),m=document.querySelector(".ad-form");m.addEventListener("submit",(function(e){e.preventDefault(),window.backend.save(new FormData(m),y,S)}));const w=document.querySelector("#success").content.querySelector(".success").cloneNode(!0),y=function(){p.appendChild(w),document.addEventListener("keydown",h),document.addEventListener("click",_),t()},v=function(){p.querySelectorAll("button").forEach((e=>{e.classList.contains("map__pin--main")||e.remove()}))},h=function(e){27===e.keyCode&&(w.remove(),document.removeEventListener("keydown",h),document.removeEventListener("click",_))},_=function(){w.remove(),document.removeEventListener("click",_),document.removeEventListener("keydown",h)},L=document.querySelector("#error").content.querySelector(".error").cloneNode(!0);let g;const S=function(){document.querySelector("main").appendChild(L),g=document.querySelector(".error__button"),document.addEventListener("click",q),document.addEventListener("keydown",E),g.addEventListener("click",A)},q=function(){L.remove(),document.removeEventListener("click",q),document.removeEventListener("keydown",E),g.removeEventListener("click",A)},E=function(e){27===e.keyCode&&(L.remove(),document.removeEventListener("keydown",E),document.removeEventListener("click",q),g.removeEventListener("click",A))},A=function(){L.remove(),g.removeEventListener("click",A),document.removeEventListener("keydown",E),document.removeEventListener("click",q)},k=document.querySelector(".ad-form__reset");k.addEventListener("click",(function(){t()})),k.addEventListener("keydown",(function(e){13===e.keyCode&&t()})),window.form={setTimeinAndTimeout:function(){s.addEventListener("change",(function(){u.forEach((e=>{e.value===s.value&&(l.value=e.value)}))})),l.addEventListener("change",(function(){f.forEach((e=>{e.value===l.value&&(s.value=e.value)}))}))},capacityOptions:o,capacity:n,checkRoomAndGuest:function(){const t=document.querySelector("#room_number");let o=t.value,r=n.value,i=o-1;const d=[["1"],["1","2"],["1","2","3"],["0"]];!1===(d[i].includes(o)&&d[i].includes(r))?t.setCustomValidity(e):t.setCustomValidity(""),t.addEventListener("change",(function(){const n=t.value;o=n,o>3?(o="0",i=d.length-1):i=o-1,!1===(d[i].includes(o)&&d[i].includes(r))?t.setCustomValidity(e):t.setCustomValidity("")})),n.addEventListener("change",(function(){const c=n.value;r=c,!1===(d[i].includes(o)&&d[i].includes(r))?t.setCustomValidity(e):t.setCustomValidity("")}))},onTypeChange:a,KEY_CODE_ENTER:13}})(),(()=>{const e=document.querySelector("#card").content.querySelector(".map__card"),t=document.querySelector(".map__filters-container"),n=document.querySelector(".map");window.card={createCard:function(t){const n=e.cloneNode(!0);t.offer?(t.offer.title?n.querySelector(".popup__title").textContent=t.offer.title:n.querySelector(".popup__title").classList.add("hidden"),t.offer.address[0]&&t.offer.address[1]?n.querySelector(".popup__text--address").textContent=`${window.util.getFirstItemOfString(t.offer.address)} Tōkyō-to, Chiyoda-ku, Ichibanchō, ${window.util.getLastItemOfString(t.offer.address)}`:n.querySelector(".popup__text--address").classList.add("hidden"),t.offer.price?n.querySelector(".popup__text--price").textContent=t.offer.price:n.querySelector(".popup__text--price").classList.add("hidden"),t.offer.type?n.querySelector(".popup__type").textContent=t.offer.type:n.querySelector(".popup__type").classList.add("hidden"),t.offer.rooms&&t.offer.guests?n.querySelector(".popup__text--capacity").textContent=`${t.offer.rooms} комнатa(ы) для ${t.offer.guests} гостя(ей)`:n.querySelector(".popup__text--capacity").classList.add("hidden"),t.offer.checkin&&t.offer.checkout?n.querySelector(".popup__text--time").textContent=`Заезд после ${t.offer.checkin}, выезд до ${t.offer.checkout}`:n.querySelector(".popup__text--time").classList.add("hidden")):t.remove();const o=n.querySelector(".popup__features").querySelectorAll("li"),r=window.util.getArrClassNameHtml(o).slice(),i=window.util.getArrOfTextBeforeDash(r);window.util.comparisonArrsAndAddClassNameHidden(t.offer.features,i,o),t.offer.description?n.querySelector(".popup__description").textContent=""+t.offer.description:n.querySelector(".popup__description").classList.add("hidden");const d=n.querySelector(".popup__photos"),c=n.querySelector(".popup__photos").querySelector("img");if(t.offer.photos){for(let e=0;e<t.offer.photos.length;e++){const n=c.cloneNode();n.src=t.offer.photos[e],n.textContent="clone",d.appendChild(n)}d.removeChild(c)}else d.classList.add("hidden");return t.author.avatar?n.querySelector(".popup__avatar").src=t.author.avatar:n.querySelector(".popup__avatar").classList.add("hidden"),n},mapFiltersContainer:t,card:e,renderCard:function(e,t){n.insertBefore(e,t)},map:n}})(),(()=>{const e=document.querySelector("#pin").content.querySelector(".map__pin");window.pin={pin:e,MAX_PIN:5,createPin:function(t){const n=e.cloneNode(!0);return n.querySelector("img").src=t.author.avatar,n.querySelector("img").alt=t.offer.title,n.style.left=t.location.x+"px",n.style.top=t.location.y+"px",n}}})(),(()=>{window.card.map.addEventListener("click",(function(e){let t=e.target;"IMG"===t.tagName&&(t=t.parentNode);const n=function(n){window.card.renderCard(window.card.createCard(n[t.dataset.index]),window.card.mapFiltersContainer);const o=document.querySelector(".popup__close"),r=window.card.map.querySelector(".map__card"),i=function(){window.card.map.removeChild(r)};o.addEventListener("click",(function(){i()})),o.addEventListener("keydown",(function(){e.target.code===window.card.KEY_CODE_ENTER&&i()}))};t.classList.contains("map__pin")&&!t.classList.contains("map__pin--main")&&(window.card.map.querySelector(".map__card")?(window.card.map.removeChild(window.card.map.querySelector(".map__card")),window.backend.load(n,window.pin.onError)):window.backend.load(n,window.pin.onError))})),window.card.map.addEventListener("keydown",(function(e){"Escape"===e.key&&window.card.map.querySelector(".map__card")&&window.card.map.removeChild(window.card.map.querySelector(".map__card"))}));const e=document.querySelector(".map__pin--main"),t=document.querySelectorAll("fieldset"),n=document.querySelector(".map__filters"),o=function(e){e.classList.add("map--faded")};o(window.card.map);const r=function(e){e.forEach((e=>{e.setAttribute("disabled","true")}))};r(t);const i=function(e){e.classList.remove("ad-form--disabled")},d=function(){t.forEach((e=>{e.removeAttribute("disabled")}))},c=document.querySelector(".ad-form"),a=function(t){1===t.which&&(window.card.map.classList.remove("map--faded"),window.backend.load(window.filter.filterPin,window.error.onError)),i(c),d(),window.form.checkRoomAndGuest(),window.form.onTypeChange(),window.form.setTimeinAndTimeout(),e.removeEventListener("mousedown",a),e.removeEventListener("keydown",s)};window.card.map.classList.contains("map--faded")&&e.addEventListener("mousedown",a);const s=function(t){"Enter"===t.code&&window.card.map.classList.remove("map--faded"),i(c),d(),window.form.checkRoomAndGuest(),window.form.onTypeChange(),window.form.setTimeinAndTimeout(),e.removeEventListener("keydown",s),e.removeEventListener("mousedown",a)};window.card.map.classList.contains("map--faded")&&e.addEventListener("keydown",s),window.main={addMapFaded:o,addAdFormDisabled:function(e){e.classList.add("ad-form--disabled")},mapFilter:n,mapPinMain:e,onMapPinMainMousedown:a,addDisabled:r,formFieldsets:t}})(),(()=>{const e="375px",t="570px",n=document.querySelector(".map__pin--main"),o=document.querySelector("#address"),r=document.querySelector(".map__pins"),i=n.offsetHeight+22;function d(e,t,n){e.setAttribute("value",`${t}, ${n}`)}n.addEventListener("mousedown",(function(c){c.preventDefault(),window.card.map.classList.contains("map--faded")&&(n.style.top=e,n.style.left=t);let a={x:c.clientX,y:c.clientY},s=Math.round(n.offsetLeft+n.offsetWidth/2),u=Math.round(n.offsetTop+i);function l(e){e.preventDefault();const t=a.x-e.clientX,c=a.y-e.clientY,l=s-t,f=u-c;s=Math.round(n.offsetLeft+n.offsetWidth/2),u=Math.round(n.offsetTop+i),a={x:e.clientX,y:e.clientY},n.style.left=n.offsetLeft-t+"px",n.style.top=n.offsetTop-c+"px",d(o,l,f),l<=0&&(n.style.left=-n.offsetWidth/2+"px",d(o,0,f)),l>=r.offsetWidth&&(n.style.left=r.offsetWidth-n.offsetWidth/2+"px",d(o,r.offsetWidth,f)),f<=130&&(n.style.top=130-i+"px",d(o,l,130)),f>=760&&(n.style.top=760-i+"px",d(o,l,760))}o.setAttribute("value",`${s}, ${u}`),document.addEventListener("mousemove",l),document.addEventListener("mouseup",(function e(t){t.preventDefault(),document.removeEventListener("mousemove",l),document.removeEventListener("mouseup",e)}))})),window.movePin={mapPinMain:n,MAP_PIN_MAIN_TOP:e,MAP_PIN_MAIN_LEFT:t}})(),(()=>{const e="any",t=["wifi","dishwasher","parking","washer","elevator","conditioner"],n=1e4,o=5e4,r="any",i="middle",d="high",c=document.querySelector(".map__filters"),a=function(){s.querySelectorAll(".map__pin").forEach((e=>{e.classList.contains("map__pin--main")||e.remove()}))},s=document.querySelector(".map__pins"),u=document.createDocumentFragment(),l=function(){s.appendChild(u)},f=function(e){if(a(),e.length<window.pin.MAX_PIN)for(let t=0;t<e.length;t++){const n=window.pin.createPin(e[t]);n.setAttribute("data-index",t),u.appendChild(n),l()}else if(e.length>window.pin.MAX_PIN)for(let t=0;t<window.pin.MAX_PIN;t++){const n=window.pin.createPin(e[t]);n.setAttribute("data-index",t),u.appendChild(n),l()}};let p;window.filter={mapFilters:c,filterPin:function(s){const u=s;let l="any",m="any",w="any",y="any";const v=document.querySelector("#housing-type");v.addEventListener("change",(function(){a(),l=v.value}));const h=document.querySelector("#housing-price");h.addEventListener("change",(function(){a(),m=h.value}));const _=document.querySelector("#housing-rooms");_.addEventListener("change",(function(){a(),w=_.value}));const L=document.querySelector("#housing-guests");L.addEventListener("change",(function(){a(),y=L.value})),c.addEventListener("change",(function(){window.card.map.querySelector(".map__card")&&document.querySelector(".map__card").remove();const c=u.filter((function(t){return t.offer.type===l?t.offer.type===l:l===e&&t.offer.type})),a=u.filter((function(e){return m===i&&e.offer.price>=n&&e.offer.price<o?e.offer.price>=n&&e.offer.price<o:"low"===m?e.offer.price<1e4:m===d?e.offer.price>=5e4:m===r&&e.offer.price})),s=u.filter((function(t){if(w!==e){const e=parseInt(w,10);return t.offer.rooms===e}return t.offer.rooms})),v=u.filter((function(t){if(y!==e){const e=parseInt(y,10);return t.offer.guests===e}return t.offer.guests})),h=c.concat(a).concat(s).concat(v),_=h.filter((function(e,t){return h.indexOf(e)===t})).filter((function(t){if(l!==e&&t.offer.type!==l)return!1;if(m===i){if(m!==r&&t.offer.price<n)return!1;if(m!==r&&t.offer.price>=o)return!1}return!("low"===m&&m!==r&&t.offer.price>1e4||m===d&&m!==r&&t.offer.price<=5e4||w!==e&&t.offer.rooms!==parseInt(w,10)||y!==e&&t.offer.guests!==parseInt(y,10))})),L=document.querySelectorAll(".map__checkbox"),g=[];L.forEach(((e,n)=>{e.checked&&g.push(t[n])}));const S=_.filter((function(e){let t=0;for(let n=0;n<g.length;n++)for(let o=0;o<e.offer.features.length;o++)g[n]===e.offer.features[o]&&t++;return t===g.length}));p&&clearTimeout(p),p=setTimeout((function(){f(S)}),500)})),f(u)}}})(),(()=>{const e=["gif","jpg","jpeg","png"],t=document.querySelector(".ad-form__field input[type=file]"),n=document.querySelector(".ad-form-header__preview"),o=function(e,t,n){e.addEventListener("change",(()=>{const o=e.files[0],r=o.name.toLowerCase();if(n.some((function(e){return r.endsWith(e)}))){const e=new FileReader;e.addEventListener("load",(()=>{t.replaceChildren(),t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center";const n=document.createElement("img");n.style.width="40px",n.style.height="44px",t.appendChild(n),n.src=e.result})),e.readAsDataURL(o)}}))};o(t,n,e);const r=document.querySelector(".ad-form__upload input[type=file]"),i=document.querySelector(".ad-form__photo");o(r,i,e),window.foto={previewAvatar:n,previewFotoFlat:i}})()})();