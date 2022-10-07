/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

addEventListener('DOMContentLoaded', () => {
  async function getResource(url) {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  }

  const wrapper = document.querySelectorAll('.wrapper');
  wrapper.forEach(i => i.style.display = 'none');

  function selectDataBase(url, btns, index) {
    const bigBtns = document.querySelector('.selectDB');
    const btn = document.querySelector(btns);
    btn.addEventListener('click', () => {
      bigBtns.style.display = 'none';
      wrapper.forEach(i => i.style.display = 'flex');
      getResource(url).then(data => {
        createCard(data, 0);
        filterBy('.btn1', 'id', data);
        filterBy('.btn2', 'firstName', data);
        filterBy('.btn3', 'lastName', data);
        filterBy('.btn4', 'email', data);
        filterBy('.btn5', 'phone', data);
        findPerson('.find-person', '.find-btn', data);
        postPerson(url, data);

        if (index) {
          nextPrevBtns.style.display = 'flex';
          throughPages(".btn-prev", ".btn-next", data);
        }
      });
    });
  }

  let personWrapper = document.createElement('div');
  personWrapper.classList.add('wrapper_person');
  let nextPrevBtns = document.createElement('div');
  nextPrevBtns.classList.add('nextPrevBtns');
  nextPrevBtns.innerHTML = `
            <button class="btn-prev">Назад</button>
            <button class="btn-next">Вперед</button>
        `;
  document.body.append(nextPrevBtns);

  function createCard(data, index) {
    let filterByTag = document.querySelectorAll('.person');
    filterByTag.forEach(item => {
      item.remove();
    });
    let x = 50;

    if (data.length < 50) {
      x = data.length;
    }

    try {
      for (let i = index; i < index + x; i++) {
        let element = document.createElement('div');
        element.classList.add('person', 'wrapper');
        element.innerHTML = `
                        <div class="filter id">${data[i].id} <button class='circle-btn '>${Number(i)}</button></div>
                        <div class="filter firstName">${data[i].firstName}</div>
                        <div class="filter lastName">${data[i].lastName}</div>
                        <div class="filter email">${data[i].email}</div>
                        <div class="filter phone">${data[i].phone}</div> 
                    `;
        nextPrevBtns.before(personWrapper);
        personWrapper.append(element);
      }
    } catch {}

    moreInfo(data);
  }

  function filterBy(btns, filterBy, data) {
    let btn = document.querySelector(btns);
    let allBtns = document.querySelectorAll('.main');
    btn.addEventListener('click', () => {
      if (btn.classList.contains('active')) {
        data.reverse();
      } else {
        data.sort((a, b) => {
          if (filterBy === '.id') {
            let x = Number(a[filterBy]);
            let z = Number(b[filterBy]);
            return x - z;
          }

          if (a[filterBy] > b[filterBy]) {
            return 1;
          }

          if (a[filterBy] < b[filterBy]) {
            return -1;
          }

          return 0;
        });
      }

      allBtns.forEach(i => {
        i.classList.remove('active');
        btn.classList.add('active');
      });
      createCard(data, 0);
      pageIndex = 0;
    });
  }

  let pageIndex = 0;

  function throughPages(prevBtn, nextBtn, data) {
    let prev = document.querySelector(prevBtn),
        next = document.querySelector(nextBtn);
    next.classList.add('active-btn');
    next.addEventListener('click', () => {
      if (pageIndex < data.length - 50) {
        createCard(data, pageIndex + 50);
        pageIndex += 50;
        console.log(pageIndex);
      }

      activeBtns(next, prev, data);
    });
    prev.addEventListener('click', () => {
      if (pageIndex > 0) {
        pageIndex = pageIndex - 50;
        createCard(data, pageIndex);
      }

      activeBtns(next, prev, data);
    });
  }

  function activeBtns(nextBtn, prevBtn, data) {
    if (pageIndex > 0) {
      prevBtn.classList.add('active-btn');
    } else {
      prevBtn.classList.remove('active-btn');
    }

    if (pageIndex < data.length - 50) {
      nextBtn.classList.add('active-btn');
    } else {
      nextBtn.classList.remove('active-btn');
    }
  }

  function findPerson(input, btn, data) {
    let mainInput = document.querySelector(input);
    let mainBtn = document.querySelector(btn);
    let mes = document.createElement('div');
    mes.classList.add('wrapper');
    mes.textContent = 'Совпадений не найдено';
    mes.style.cssText = `
        font-size: 30px;
        `;
    let resetBtn = document.createElement('button');
    resetBtn.classList.add('reset-btn');
    resetBtn.textContent = 'НАЗАД';
    let btns = document.querySelector('.nextPrevBtns');
    mainBtn.addEventListener('click', () => {
      if (btns) {
        btns.remove();
      }

      let filterByTag = document.querySelectorAll('.person');
      filterByTag.forEach(item => {
        item.remove();
      });

      for (let i = 0; i < data.length; i++) {
        if (mainInput.value == data[i].id || mainInput.value == data[i].firstName || mainInput.value == data[i].lastName || mainInput.value == data[i].email || mainInput.value == data[i].phone) {
          let element = document.createElement('div');
          element.classList.add('person', 'wrapper');
          element.innerHTML = `
                        <div class="filter id">${data[i].id} <button class='circle-btn '>${Number(i)}</button></div>
                        <div class="filter firstName">${data[i].firstName}</div>
                        <div class="filter lastName">${data[i].lastName}</div>
                        <div class="filter email">${data[i].email}</div>
                        <div class="filter phone">${data[i].phone}</div> 
                    `;
          nextPrevBtns.before(personWrapper);
          personWrapper.append(element);
          mes.remove();
        }

        if (personWrapper.children.length === 0) {
          resetBtn.after(mes);
        }

        personWrapper.after(resetBtn);
      }
    });
    resetBtn.addEventListener('click', () => {
      createCard(data, 0);
      mes.remove();
      resetBtn.remove();
      document.body.append(btns);
    });
  }

  const shadow = document.querySelector('.modal_shadow');

  function moreInfo(data) {
    const modal = document.querySelector('.modal');
    const btns = document.querySelectorAll('.circle-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        modal.style.display = 'block';
        shadow.style.cssText = `opacity: 0.7;
                                    pointer-events: all`;
        modal.innerHTML = `
            ID: <span>${data[btn.textContent].id}</span> </br>
            FIRST NAME: <span>${data[btn.textContent].firstName}</span> </br>
            LAST NAME: <span>${data[btn.textContent].lastName}</span> </br>
            EMAIL: <span>${data[btn.textContent].email}</span> </br>
            PHONE: <span>${data[btn.textContent].phone}</span> </br>
            ADRESS: </br>
            street: <span>${data[btn.textContent].address.streetAddress}</span> </br>
            city: <span>${data[btn.textContent].address.city}</span> </br>
            zip: <span>${data[btn.textContent].address.zip}</span> </br> </br>
            DESCRIPTION: <span>${data[btn.textContent].description}</span>
            
            <button class="modal-btn">закрыть</button>
        `;
        closeModal('.modal');
      });
    });
  }

  function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    const closeBtn = document.querySelector('.modal-btn');
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
      shadow.style.cssText = `opacity: 0;
                                pointer-events: none`;
    });
    shadow.addEventListener('click', () => {
      modal.style.display = 'none';
      shadow.style.cssText = `opacity: 0;
                                pointer-events: none`;
    });
  }

  function postPerson(url) {
    const postBtn = document.querySelector('.post-btn');
    const modal = document.querySelector('.modal-post');
    const postInputs = document.querySelectorAll('.modal-post-wrapper input');
    const labels = document.querySelectorAll('.modal-post-label');
    let emailInput = document.querySelector('.input-email');
    let IdInput = document.querySelector('.input-id');
    let firstnameInput = document.querySelector('.input-firstname');
    let lastnameInput = document.querySelector('.input-lastname');
    let phoneInput = document.querySelector('.input-phone');
    let streetaddresInput = document.querySelector('.input-streetaddres');
    let cityInput = document.querySelector('.input-city');
    let zipInput = document.querySelector('.input-zip');
    let descriptionInput = document.querySelector('.input-description');
    postBtn.addEventListener('click', () => {
      shadow.style.cssText = `opacity: 0.7;
                                    pointer-events: all;
                                    `;
      modal.style.display = 'flex';
    });
    postInputs.forEach(item => {
      item.addEventListener('focus', () => {
        labels.forEach(i => i.classList.remove('post-focus'));
        item.closest('div').firstElementChild.classList.add('post-focus');
      });
    });
    postInputs.forEach(item => {
      item.addEventListener('focusout', () => {
        if (item.value.length > 0) {
          item.closest('div').firstElementChild.style.display = 'none';
        } else {
          item.closest('div').firstElementChild.style.display = 'block';
        }
      });
    });
    modal.addEventListener('submit', e => {
      e.preventDefault();
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          id: Number(IdInput.value),
          firstName: firstnameInput.value,
          lastName: lastnameInput.value,
          email: emailInput.value,
          phone: phoneInput.value,
          address: {
            streetAddress: streetaddresInput.value,
            city: cityInput.value,
            zip: zipInput.value
          },
          description: descriptionInput.value
        })
      }).then(() => {
        window.location.reload();
      });
    });
    closeModal('.modal-post');
  }

  selectDataBase('http://localhost:3000/data', '.selectDB-big', true);
  selectDataBase('http://localhost:3000/data2', '.selectDB-small');
});

/***/ })

/******/ });
//# sourceMappingURL=script.js.map