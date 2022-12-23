(() => {
    var __webpack_modules__ = {
        557: module => {
            module.exports = function(options) {
                var forEach = [].forEach;
                var some = [].some;
                var body = document.body;
                var tocElement;
                var currentlyHighlighting = true;
                var SPACE_CHAR = " ";
                function createEl(d, container) {
                    var link = container.appendChild(createLink(d));
                    if (d.children.length) {
                        var list = createList(d.isCollapsed);
                        d.children.forEach((function(child) {
                            createEl(child, list);
                        }));
                        link.appendChild(list);
                    }
                }
                function render(parent, data) {
                    var collapsed = false;
                    var container = createList(collapsed);
                    data.forEach((function(d) {
                        createEl(d, container);
                    }));
                    tocElement = parent || tocElement;
                    if (null === tocElement) return;
                    if (tocElement.firstChild) tocElement.removeChild(tocElement.firstChild);
                    if (0 === data.length) return tocElement;
                    return tocElement.appendChild(container);
                }
                function createLink(data) {
                    var item = document.createElement("li");
                    var a = document.createElement("a");
                    if (options.listItemClass) item.setAttribute("class", options.listItemClass);
                    if (options.onClick) a.onclick = options.onClick;
                    if (options.includeTitleTags) a.setAttribute("title", data.textContent);
                    if (options.includeHtml && data.childNodes.length) forEach.call(data.childNodes, (function(node) {
                        a.appendChild(node.cloneNode(true));
                    })); else a.textContent = data.textContent;
                    a.setAttribute("href", options.basePath + "#" + data.id);
                    a.setAttribute("class", options.linkClass + SPACE_CHAR + "node-name--" + data.nodeName + SPACE_CHAR + options.extraLinkClasses);
                    item.appendChild(a);
                    return item;
                }
                function createList(isCollapsed) {
                    var listElement = options.orderedList ? "ol" : "ul";
                    var list = document.createElement(listElement);
                    var classes = options.listClass + SPACE_CHAR + options.extraListClasses;
                    if (isCollapsed) {
                        classes += SPACE_CHAR + options.collapsibleClass;
                        classes += SPACE_CHAR + options.isCollapsedClass;
                    }
                    list.setAttribute("class", classes);
                    return list;
                }
                function updateFixedSidebarClass() {
                    if (options.scrollContainer && document.querySelector(options.scrollContainer)) {
                        var top;
                        top = document.querySelector(options.scrollContainer).scrollTop;
                    } else top = document.documentElement.scrollTop || body.scrollTop;
                    var posFixedEl = document.querySelector(options.positionFixedSelector);
                    if ("auto" === options.fixedSidebarOffset) options.fixedSidebarOffset = tocElement.offsetTop;
                    if (top > options.fixedSidebarOffset) {
                        if (-1 === posFixedEl.className.indexOf(options.positionFixedClass)) posFixedEl.className += SPACE_CHAR + options.positionFixedClass;
                    } else posFixedEl.className = posFixedEl.className.split(SPACE_CHAR + options.positionFixedClass).join("");
                }
                function getHeadingTopPos(obj) {
                    var position = 0;
                    if (null !== obj) {
                        position = obj.offsetTop;
                        if (options.hasInnerContainers) position += getHeadingTopPos(obj.offsetParent);
                    }
                    return position;
                }
                function updateToc(headingsArray) {
                    if (options.scrollContainer && document.querySelector(options.scrollContainer)) {
                        var top;
                        top = document.querySelector(options.scrollContainer).scrollTop;
                    } else top = document.documentElement.scrollTop || body.scrollTop;
                    if (options.positionFixedSelector) updateFixedSidebarClass();
                    var headings = headingsArray;
                    var topHeader;
                    if (currentlyHighlighting && null !== tocElement && headings.length > 0) {
                        some.call(headings, (function(heading, i) {
                            if (getHeadingTopPos(heading) > top + options.headingsOffset + 10) {
                                var index = 0 === i ? i : i - 1;
                                topHeader = headings[index];
                                return true;
                            } else if (i === headings.length - 1) {
                                topHeader = headings[headings.length - 1];
                                return true;
                            }
                        }));
                        var tocLinks = tocElement.querySelectorAll("." + options.linkClass);
                        forEach.call(tocLinks, (function(tocLink) {
                            tocLink.className = tocLink.className.split(SPACE_CHAR + options.activeLinkClass).join("");
                        }));
                        var tocLis = tocElement.querySelectorAll("." + options.listItemClass);
                        forEach.call(tocLis, (function(tocLi) {
                            tocLi.className = tocLi.className.split(SPACE_CHAR + options.activeListItemClass).join("");
                        }));
                        var activeTocLink = tocElement.querySelector("." + options.linkClass + ".node-name--" + topHeader.nodeName + '[href="' + options.basePath + "#" + topHeader.id.replace(/([ #;&,.+*~':"!^$[\]()=>|/@])/g, "\\$1") + '"]');
                        if (activeTocLink && -1 === activeTocLink.className.indexOf(options.activeLinkClass)) activeTocLink.className += SPACE_CHAR + options.activeLinkClass;
                        var li = activeTocLink && activeTocLink.parentNode;
                        if (li && -1 === li.className.indexOf(options.activeListItemClass)) li.className += SPACE_CHAR + options.activeListItemClass;
                        var tocLists = tocElement.querySelectorAll("." + options.listClass + "." + options.collapsibleClass);
                        forEach.call(tocLists, (function(list) {
                            if (-1 === list.className.indexOf(options.isCollapsedClass)) list.className += SPACE_CHAR + options.isCollapsedClass;
                        }));
                        if (activeTocLink && activeTocLink.nextSibling && -1 !== activeTocLink.nextSibling.className.indexOf(options.isCollapsedClass)) activeTocLink.nextSibling.className = activeTocLink.nextSibling.className.split(SPACE_CHAR + options.isCollapsedClass).join("");
                        removeCollapsedFromParents(activeTocLink && activeTocLink.parentNode.parentNode);
                    }
                }
                function removeCollapsedFromParents(element) {
                    if (element && -1 !== element.className.indexOf(options.collapsibleClass) && -1 !== element.className.indexOf(options.isCollapsedClass)) {
                        element.className = element.className.split(SPACE_CHAR + options.isCollapsedClass).join("");
                        return removeCollapsedFromParents(element.parentNode.parentNode);
                    }
                    return element;
                }
                function disableTocAnimation(event) {
                    var target = event.target || event.srcElement;
                    if ("string" !== typeof target.className || -1 === target.className.indexOf(options.linkClass)) return;
                    currentlyHighlighting = false;
                }
                function enableTocAnimation() {
                    currentlyHighlighting = true;
                }
                return {
                    enableTocAnimation,
                    disableTocAnimation,
                    render,
                    updateToc
                };
            };
        },
        340: module => {
            module.exports = {
                tocSelector: ".js-toc",
                contentSelector: ".js-toc-content",
                headingSelector: "h1, h2, h3",
                ignoreSelector: ".js-toc-ignore",
                hasInnerContainers: false,
                linkClass: "toc-link",
                extraLinkClasses: "",
                activeLinkClass: "is-active-link",
                listClass: "toc-list",
                extraListClasses: "",
                isCollapsedClass: "is-collapsed",
                collapsibleClass: "is-collapsible",
                listItemClass: "toc-list-item",
                activeListItemClass: "is-active-li",
                collapseDepth: 0,
                scrollSmooth: true,
                scrollSmoothDuration: 420,
                scrollSmoothOffset: 0,
                scrollEndCallback: function(e) {},
                headingsOffset: 1,
                throttleTimeout: 50,
                positionFixedSelector: null,
                positionFixedClass: "is-position-fixed",
                fixedSidebarOffset: "auto",
                includeHtml: false,
                includeTitleTags: false,
                onClick: function(e) {},
                orderedList: true,
                scrollContainer: null,
                skipRendering: false,
                headingLabelCallback: false,
                ignoreHiddenElements: false,
                headingObjectCallback: null,
                basePath: "",
                disableTocScrollSync: false
            };
        },
        866: (module, exports, __webpack_require__) => {
            var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
            (function(root, factory) {
                if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = factory(root), 
                __WEBPACK_AMD_DEFINE_RESULT__ = "function" === typeof __WEBPACK_AMD_DEFINE_FACTORY__ ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, 
                void 0 !== __WEBPACK_AMD_DEFINE_RESULT__ && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
            })("undefined" !== typeof __webpack_require__.g ? __webpack_require__.g : window || __webpack_require__.g, (function(root) {
                "use strict";
                var defaultOptions = __webpack_require__(340);
                var options = {};
                var tocbot = {};
                var BuildHtml = __webpack_require__(557);
                var ParseContent = __webpack_require__(620);
                var updateTocScroll = __webpack_require__(693);
                var buildHtml;
                var parseContent;
                var supports = !!root && !!root.document && !!root.document.querySelector && !!root.addEventListener;
                if ("undefined" === typeof window && !supports) return;
                var headingsArray;
                var hasOwnProperty = Object.prototype.hasOwnProperty;
                function extend() {
                    var target = {};
                    for (var i = 0; i < arguments.length; i++) {
                        var source = arguments[i];
                        for (var key in source) if (hasOwnProperty.call(source, key)) target[key] = source[key];
                    }
                    return target;
                }
                function throttle(fn, threshhold, scope) {
                    threshhold || (threshhold = 250);
                    var last;
                    var deferTimer;
                    return function() {
                        var context = scope || this;
                        var now = +new Date;
                        var args = arguments;
                        if (last && now < last + threshhold) {
                            clearTimeout(deferTimer);
                            deferTimer = setTimeout((function() {
                                last = now;
                                fn.apply(context, args);
                            }), threshhold);
                        } else {
                            last = now;
                            fn.apply(context, args);
                        }
                    };
                }
                function getContentElement(options) {
                    try {
                        return options.contentElement || document.querySelector(options.contentSelector);
                    } catch (e) {
                        console.warn("Contents element not found: " + options.contentSelector);
                        return null;
                    }
                }
                function getTocElement(options) {
                    try {
                        return options.tocElement || document.querySelector(options.tocSelector);
                    } catch (e) {
                        console.warn("TOC element not found: " + options.tocSelector);
                        return null;
                    }
                }
                tocbot.destroy = function() {
                    var tocElement = getTocElement(options);
                    if (null === tocElement) return;
                    if (!options.skipRendering) if (tocElement) tocElement.innerHTML = "";
                    if (options.scrollContainer && document.querySelector(options.scrollContainer)) {
                        document.querySelector(options.scrollContainer).removeEventListener("scroll", this._scrollListener, false);
                        document.querySelector(options.scrollContainer).removeEventListener("resize", this._scrollListener, false);
                        if (buildHtml) document.querySelector(options.scrollContainer).removeEventListener("click", this._clickListener, false);
                    } else {
                        document.removeEventListener("scroll", this._scrollListener, false);
                        document.removeEventListener("resize", this._scrollListener, false);
                        if (buildHtml) document.removeEventListener("click", this._clickListener, false);
                    }
                };
                tocbot.init = function(customOptions) {
                    if (!supports) return;
                    options = extend(defaultOptions, customOptions || {});
                    this.options = options;
                    this.state = {};
                    if (options.scrollSmooth) {
                        options.duration = options.scrollSmoothDuration;
                        options.offset = options.scrollSmoothOffset;
                        tocbot.scrollSmooth = __webpack_require__(764).initSmoothScrolling(options);
                    }
                    buildHtml = BuildHtml(options);
                    parseContent = ParseContent(options);
                    this._buildHtml = buildHtml;
                    this._parseContent = parseContent;
                    this._headingsArray = headingsArray;
                    tocbot.destroy();
                    var contentElement = getContentElement(options);
                    if (null === contentElement) return;
                    var tocElement = getTocElement(options);
                    if (null === tocElement) return;
                    headingsArray = parseContent.selectHeadings(contentElement, options.headingSelector);
                    if (null === headingsArray) return;
                    var nestedHeadingsObj = parseContent.nestHeadingsArray(headingsArray);
                    var nestedHeadings = nestedHeadingsObj.nest;
                    if (!options.skipRendering) buildHtml.render(tocElement, nestedHeadings);
                    this._scrollListener = throttle((function(e) {
                        buildHtml.updateToc(headingsArray);
                        !options.disableTocScrollSync && updateTocScroll(options);
                        var isTop = e && e.target && e.target.scrollingElement && 0 === e.target.scrollingElement.scrollTop;
                        if (e && (0 === e.eventPhase || null === e.currentTarget) || isTop) {
                            buildHtml.updateToc(headingsArray);
                            if (options.scrollEndCallback) options.scrollEndCallback(e);
                        }
                    }), options.throttleTimeout);
                    this._scrollListener();
                    if (options.scrollContainer && document.querySelector(options.scrollContainer)) {
                        document.querySelector(options.scrollContainer).addEventListener("scroll", this._scrollListener, false);
                        document.querySelector(options.scrollContainer).addEventListener("resize", this._scrollListener, false);
                    } else {
                        document.addEventListener("scroll", this._scrollListener, false);
                        document.addEventListener("resize", this._scrollListener, false);
                    }
                    var timeout = null;
                    this._clickListener = throttle((function(event) {
                        if (options.scrollSmooth) buildHtml.disableTocAnimation(event);
                        buildHtml.updateToc(headingsArray);
                        timeout && clearTimeout(timeout);
                        timeout = setTimeout((function() {
                            buildHtml.enableTocAnimation();
                        }), options.scrollSmoothDuration);
                    }), options.throttleTimeout);
                    if (options.scrollContainer && document.querySelector(options.scrollContainer)) document.querySelector(options.scrollContainer).addEventListener("click", this._clickListener, false); else document.addEventListener("click", this._clickListener, false);
                    return this;
                };
                tocbot.refresh = function(customOptions) {
                    tocbot.destroy();
                    tocbot.init(customOptions || this.options);
                };
                root.tocbot = tocbot;
                return tocbot;
            }));
        },
        620: module => {
            module.exports = function parseContent(options) {
                var reduce = [].reduce;
                function getLastItem(array) {
                    return array[array.length - 1];
                }
                function getHeadingLevel(heading) {
                    return +heading.nodeName.toUpperCase().replace("H", "");
                }
                function getHeadingObject(heading) {
                    if (!(heading instanceof window.HTMLElement)) return heading;
                    if (options.ignoreHiddenElements && (!heading.offsetHeight || !heading.offsetParent)) return null;
                    const headingLabel = heading.getAttribute("data-heading-label") || (options.headingLabelCallback ? String(options.headingLabelCallback(heading.textContent)) : heading.textContent.trim());
                    var obj = {
                        id: heading.id,
                        children: [],
                        nodeName: heading.nodeName,
                        headingLevel: getHeadingLevel(heading),
                        textContent: headingLabel
                    };
                    if (options.includeHtml) obj.childNodes = heading.childNodes;
                    if (options.headingObjectCallback) return options.headingObjectCallback(obj, heading);
                    return obj;
                }
                function addNode(node, nest) {
                    var obj = getHeadingObject(node);
                    var level = obj.headingLevel;
                    var array = nest;
                    var lastItem = getLastItem(array);
                    var lastItemLevel = lastItem ? lastItem.headingLevel : 0;
                    var counter = level - lastItemLevel;
                    while (counter > 0) {
                        lastItem = getLastItem(array);
                        if (lastItem && level === lastItem.headingLevel) break; else if (lastItem && void 0 !== lastItem.children) array = lastItem.children;
                        counter--;
                    }
                    if (level >= options.collapseDepth) obj.isCollapsed = true;
                    array.push(obj);
                    return array;
                }
                function selectHeadings(contentElement, headingSelector) {
                    var selectors = headingSelector;
                    if (options.ignoreSelector) selectors = headingSelector.split(",").map((function mapSelectors(selector) {
                        return selector.trim() + ":not(" + options.ignoreSelector + ")";
                    }));
                    try {
                        return contentElement.querySelectorAll(selectors);
                    } catch (e) {
                        console.warn("Headers not found with selector: " + selectors);
                        return null;
                    }
                }
                function nestHeadingsArray(headingsArray) {
                    return reduce.call(headingsArray, (function reducer(prev, curr) {
                        var currentHeading = getHeadingObject(curr);
                        if (currentHeading) addNode(currentHeading, prev.nest);
                        return prev;
                    }), {
                        nest: []
                    });
                }
                return {
                    nestHeadingsArray,
                    selectHeadings
                };
            };
        },
        764: (__unused_webpack_module, exports) => {
            exports.initSmoothScrolling = initSmoothScrolling;
            function initSmoothScrolling(options) {
                var duration = options.duration;
                var offset = options.offset;
                var pageUrl = location.hash ? stripHash(location.href) : location.href;
                delegatedLinkHijacking();
                function delegatedLinkHijacking() {
                    document.body.addEventListener("click", onClick, false);
                    function onClick(e) {
                        if (!isInPageLink(e.target) || e.target.className.indexOf("no-smooth-scroll") > -1 || "#" === e.target.href.charAt(e.target.href.length - 2) && "!" === e.target.href.charAt(e.target.href.length - 1) || -1 === e.target.className.indexOf(options.linkClass)) return;
                        jump(e.target.hash, {
                            duration,
                            offset,
                            callback: function() {
                                setFocus(e.target.hash);
                            }
                        });
                    }
                }
                function isInPageLink(n) {
                    return "a" === n.tagName.toLowerCase() && (n.hash.length > 0 || "#" === n.href.charAt(n.href.length - 1)) && (stripHash(n.href) === pageUrl || stripHash(n.href) + "#" === pageUrl);
                }
                function stripHash(url) {
                    return url.slice(0, url.lastIndexOf("#"));
                }
                function setFocus(hash) {
                    var element = document.getElementById(hash.substring(1));
                    if (element) {
                        if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) element.tabIndex = -1;
                        element.focus();
                    }
                }
            }
            function jump(target, options) {
                var start = window.pageYOffset;
                var opt = {
                    duration: options.duration,
                    offset: options.offset || 0,
                    callback: options.callback,
                    easing: options.easing || easeInOutQuad
                };
                var tgt = document.querySelector('[id="' + decodeURI(target).split("#").join("") + '"]') || document.querySelector('[id="' + target.split("#").join("") + '"]');
                var distance = "string" === typeof target ? opt.offset + (target ? tgt && tgt.getBoundingClientRect().top || 0 : -(document.documentElement.scrollTop || document.body.scrollTop)) : target;
                var duration = "function" === typeof opt.duration ? opt.duration(distance) : opt.duration;
                var timeStart;
                var timeElapsed;
                requestAnimationFrame((function(time) {
                    timeStart = time;
                    loop(time);
                }));
                function loop(time) {
                    timeElapsed = time - timeStart;
                    window.scrollTo(0, opt.easing(timeElapsed, start, distance, duration));
                    if (timeElapsed < duration) requestAnimationFrame(loop); else end();
                }
                function end() {
                    window.scrollTo(0, start + distance);
                    if ("function" === typeof opt.callback) opt.callback();
                }
                function easeInOutQuad(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                }
            }
        },
        693: module => {
            module.exports = function updateTocScroll(options) {
                var toc = options.tocElement || document.querySelector(options.tocSelector);
                if (toc && toc.scrollHeight > toc.clientHeight) {
                    var activeItem = toc.querySelector("." + options.activeListItemClass);
                    if (activeItem) toc.scrollTop = activeItem.offsetTop;
                }
            };
        }
    };
    var __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (void 0 !== cachedModule) return cachedModule.exports;
        var module = __webpack_module_cache__[moduleId] = {
            exports: {}
        };
        __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
        return module.exports;
    }
    (() => {
        __webpack_require__.g = function() {
            if ("object" === typeof globalThis) return globalThis;
            try {
                return this || new Function("return this")();
            } catch (e) {
                if ("object" === typeof window) return window;
            }
        }();
    })();
    (() => {
        "use strict";
        function isWebp() {
            function testWebP(callback) {
                let webP = new Image;
                webP.onload = webP.onerror = function() {
                    callback(2 == webP.height);
                };
                webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
            }
            testWebP((function(support) {
                let className = true === support ? "webp" : "no-webp";
                document.documentElement.classList.add(className);
            }));
        }
        function formRating() {
            const ratings = document.querySelectorAll(".rating");
            if (ratings.length > 0) initRatings();
            function initRatings() {
                let ratingActive, ratingValue;
                for (let index = 0; index < ratings.length; index++) {
                    const rating = ratings[index];
                    initRating(rating);
                }
                function initRating(rating) {
                    initRatingVars(rating);
                    setRatingActiveWidth();
                    if (rating.classList.contains("rating_set")) setRating(rating);
                }
                function initRatingVars(rating) {
                    ratingActive = rating.querySelector(".rating__active");
                    ratingValue = rating.querySelector(".rating__value");
                }
                function setRatingActiveWidth(index = ratingValue.innerHTML) {
                    const ratingActiveWidth = index / .05;
                    ratingActive.style.width = `${ratingActiveWidth}%`;
                }
                function setRating(rating) {
                    const ratingItems = rating.querySelectorAll(".rating__item");
                    for (let index = 0; index < ratingItems.length; index++) {
                        const ratingItem = ratingItems[index];
                        ratingItem.addEventListener("mouseenter", (function(e) {
                            initRatingVars(rating);
                            setRatingActiveWidth(ratingItem.value);
                        }));
                        ratingItem.addEventListener("mouseleave", (function(e) {
                            setRatingActiveWidth();
                        }));
                        ratingItem.addEventListener("click", (function(e) {
                            initRatingVars(rating);
                            if (rating.dataset.ajax) setRatingValue(ratingItem.value, rating); else {
                                ratingValue.innerHTML = index + 1;
                                setRatingActiveWidth();
                            }
                        }));
                    }
                }
                async function setRatingValue(value, rating) {
                    if (!rating.classList.contains("rating_sending")) {
                        rating.classList.add("rating_sending");
                        let response = await fetch("rating.json", {
                            method: "GET"
                        });
                        if (response.ok) {
                            const result = await response.json();
                            const newRating = result.newRating;
                            ratingValue.innerHTML = newRating;
                            setRatingActiveWidth();
                            rating.classList.remove("rating_sending");
                        } else {
                            alert("Помилка");
                            rating.classList.remove("rating_sending");
                        }
                    }
                }
            }
        }
        let addWindowScrollEvent = false;
        function headerScroll() {
            addWindowScrollEvent = true;
            const header = document.querySelector("header.header");
            const headerShow = header.hasAttribute("data-scroll-show");
            const headerShowTimer = header.dataset.scrollShow ? header.dataset.scrollShow : 500;
            const startPoint = header.dataset.scroll ? header.dataset.scroll : 1;
            let scrollDirection = 0;
            let timer;
            document.addEventListener("windowScroll", (function(e) {
                const scrollTop = window.scrollY;
                clearTimeout(timer);
                if (scrollTop >= startPoint) {
                    !header.classList.contains("_header-scroll") ? header.classList.add("_header-scroll") : null;
                    if (headerShow) {
                        if (scrollTop > scrollDirection) header.classList.contains("_header-show") ? header.classList.remove("_header-show") : null; else !header.classList.contains("_header-show") ? header.classList.add("_header-show") : null;
                        timer = setTimeout((() => {
                            !header.classList.contains("_header-show") ? header.classList.add("_header-show") : null;
                        }), headerShowTimer);
                    }
                } else {
                    header.classList.contains("_header-scroll") ? header.classList.remove("_header-scroll") : null;
                    if (headerShow) header.classList.contains("_header-show") ? header.classList.remove("_header-show") : null;
                }
                scrollDirection = scrollTop <= 0 ? 0 : scrollTop;
            }));
        }
        setTimeout((() => {
            if (addWindowScrollEvent) {
                let windowScroll = new Event("windowScroll");
                window.addEventListener("scroll", (function(e) {
                    document.dispatchEvent(windowScroll);
                }));
            }
        }), 0);
        var js = __webpack_require__(866);
        function makeIds() {
            const content = document.querySelector(".post__content");
            if (!content) return;
            const headings = content.querySelectorAll("h2");
            let headingMap = {};
            Array.prototype.forEach.call(headings, (function(heading) {
                let id = heading.id ? heading.id : heading.textContent.trim().toLowerCase().split(" ").join("-").replace(/[!@#$%^&*():]/gi, "").replace(/\//gi, "-");
                headingMap[id] = !isNaN(headingMap[id]) ? ++headingMap[id] : 0;
                if (headingMap[id]) heading.id = id + "-" + headingMap[id]; else heading.id = id;
            }));
        }
        makeIds();
        js.init({
            tocSelector: ".post__navigation",
            contentSelector: ".post__content",
            headingSelector: "h2",
            hasInnerContainers: true,
            headingsOffset: 90,
            scrollSmoothOffset: -90
        });
        js.refresh();
        window["FLS"] = true;
        isWebp();
        formRating();
        headerScroll();
    })();
})();