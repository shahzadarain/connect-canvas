(function(exports) {
  "use strict";
  /*! @gera2ld/jsx-dom v2.2.2 | ISC License */
  const VTYPE_ELEMENT = 1;
  const VTYPE_FUNCTION = 2;
  const SVG_NS = "http://www.w3.org/2000/svg";
  const XLINK_NS = "http://www.w3.org/1999/xlink";
  const NS_ATTRS = {
    show: XLINK_NS,
    actuate: XLINK_NS,
    href: XLINK_NS
  };
  const isLeaf = (c) => typeof c === "string" || typeof c === "number";
  const isElement = (c) => (c == null ? void 0 : c.vtype) === VTYPE_ELEMENT;
  const isRenderFunction = (c) => (c == null ? void 0 : c.vtype) === VTYPE_FUNCTION;
  function jsx(type, props) {
    let vtype;
    if (typeof type === "string") vtype = VTYPE_ELEMENT;
    else if (typeof type === "function") vtype = VTYPE_FUNCTION;
    else throw new Error("Invalid VNode type");
    return {
      vtype,
      type,
      props
    };
  }
  const jsxs = jsx;
  function Fragment(props) {
    return props.children;
  }
  const DEFAULT_ENV = {
    isSvg: false
  };
  function insertDom(parent, nodes) {
    if (!Array.isArray(nodes)) nodes = [nodes];
    nodes = nodes.filter(Boolean);
    if (nodes.length) parent.append(...nodes);
  }
  function mountAttributes(domElement, props, env) {
    for (const key in props) {
      if (key === "key" || key === "children" || key === "ref") continue;
      if (key === "dangerouslySetInnerHTML") {
        domElement.innerHTML = props[key].__html;
      } else if (key === "innerHTML" || key === "textContent" || key === "innerText" || key === "value" && ["textarea", "select"].includes(domElement.tagName)) {
        const value = props[key];
        if (value != null) domElement[key] = value;
      } else if (key.startsWith("on")) {
        domElement[key.toLowerCase()] = props[key];
      } else {
        setDOMAttribute(domElement, key, props[key], env.isSvg);
      }
    }
  }
  const attrMap = {
    className: "class",
    labelFor: "for"
  };
  function setDOMAttribute(el, attr, value, isSVG) {
    attr = attrMap[attr] || attr;
    if (value === true) {
      el.setAttribute(attr, "");
    } else if (value === false) {
      el.removeAttribute(attr);
    } else {
      const namespace = isSVG ? NS_ATTRS[attr] : void 0;
      if (namespace !== void 0) {
        el.setAttributeNS(namespace, attr, value);
      } else {
        el.setAttribute(attr, value);
      }
    }
  }
  function flatten(arr) {
    return arr.reduce((prev, item) => prev.concat(item), []);
  }
  function mountChildren(children, env) {
    return Array.isArray(children) ? flatten(children.map((child) => mountChildren(child, env))) : mount(children, env);
  }
  function mount(vnode, env = DEFAULT_ENV) {
    if (vnode == null || typeof vnode === "boolean") {
      return null;
    }
    if (vnode instanceof Node) {
      return vnode;
    }
    if (isRenderFunction(vnode)) {
      const {
        type,
        props
      } = vnode;
      if (type === Fragment) {
        const node = document.createDocumentFragment();
        if (props.children) {
          const children = mountChildren(props.children, env);
          insertDom(node, children);
        }
        return node;
      }
      const childVNode = type(props);
      return mount(childVNode, env);
    }
    if (isLeaf(vnode)) {
      return document.createTextNode(`${vnode}`);
    }
    if (isElement(vnode)) {
      let node;
      const {
        type,
        props
      } = vnode;
      if (!env.isSvg && type === "svg") {
        env = Object.assign({}, env, {
          isSvg: true
        });
      }
      if (!env.isSvg) {
        node = document.createElement(type);
      } else {
        node = document.createElementNS(SVG_NS, type);
      }
      mountAttributes(node, props, env);
      if (props.children) {
        let childEnv = env;
        if (env.isSvg && type === "foreignObject") {
          childEnv = Object.assign({}, childEnv, {
            isSvg: false
          });
        }
        const children = mountChildren(props.children, childEnv);
        if (children != null) insertDom(node, children);
      }
      const {
        ref
      } = props;
      if (typeof ref === "function") ref(node);
      return node;
    }
    throw new Error("mount: Invalid Vnode!");
  }
  function mountDom(vnode) {
    return mount(vnode);
  }
  const clsToolbarItem = "mm-toolbar-item";
  const clsActive = "active";
  function renderBrand() {
    return /* @__PURE__ */ jsxs("a", { className: "mm-toolbar-brand", href: "https://jordanapps.unhcr.org/", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          alt: "markmap",
          src: "data:image/jpeg;base64,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"
        }
      ),
      /* @__PURE__ */ jsx("span", { children: "markmap" })
    ] });
  }
  function renderItem({ title, content, onClick }) {
    return /* @__PURE__ */ jsx("div", { className: clsToolbarItem, title, onClick, children: content });
  }
  let promise;
  function safeCaller(fn) {
    return async (...args) => {
      if (promise) return;
      promise = fn(...args);
      try {
        await promise;
      } finally {
        promise = void 0;
      }
    };
  }
  const _Toolbar = class _Toolbar {
    constructor() {
      this.showBrand = true;
      this.registry = {};
      this.el = mountDom(/* @__PURE__ */ jsx("div", { className: "mm-toolbar" }));
      this.items = [..._Toolbar.defaultItems];
      this.register({
        id: "zoomIn",
        title: "Zoom in",
        content: _Toolbar.icon("M9 5v4h-4v2h4v4h2v-4h4v-2h-4v-4z"),
        onClick: this.getHandler((mm) => mm.rescale(1.25))
      });
      this.register({
        id: "zoomOut",
        title: "Zoom out",
        content: _Toolbar.icon("M5 9h10v2h-10z"),
        onClick: this.getHandler((mm) => mm.rescale(0.8))
      });
      this.register({
        id: "fit",
        title: "Fit window size",
        content: _Toolbar.icon(
          "M4 7h2v-2h2v4h-4zM4 13h2v2h2v-4h-4zM16 7h-2v-2h-2v4h4zM16 13h-2v2h-2v-4h4z"
        ),
        onClick: this.getHandler((mm) => mm.fit())
      });
      this.register({
        id: "recurse",
        title: "Toggle recursively",
        content: _Toolbar.icon("M16 4h-12v12h12v-8h-8v4h2v-2h4v4h-8v-8h10z"),
        onClick: (e) => {
          var _a;
          const button = e.target.closest(
            `.${clsToolbarItem}`
          );
          const active = button == null ? void 0 : button.classList.toggle(clsActive);
          (_a = this.markmap) == null ? void 0 : _a.setOptions({
            toggleRecursively: active
          });
        }
      });
      this.render();
    }
    static create(mm) {
      const toolbar = new _Toolbar();
      toolbar.attach(mm);
      return toolbar;
    }
    static icon(path, attrs = {}) {
      attrs = {
        stroke: "none",
        fill: "currentColor",
        "fill-rule": "evenodd",
        ...attrs
      };
      return /* @__PURE__ */ jsx("svg", { width: "20", height: "20", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { ...attrs, d: path }) });
    }
    setBrand(show) {
      this.showBrand = show;
      return this.render();
    }
    register(data) {
      this.registry[data.id] = data;
    }
    getHandler(handle) {
      handle = safeCaller(handle);
      return () => {
        if (this.markmap) handle(this.markmap);
      };
    }
    setItems(items) {
      this.items = [...items];
      return this.render();
    }
    attach(mm) {
      this.markmap = mm;
    }
    render() {
      const items = this.items.map((item) => {
        if (typeof item === "string") {
          const data = this.registry[item];
          if (!data) console.warn(`[markmap-toolbar] ${item} not found`);
          return data;
        }
        return item;
      }).filter(Boolean);
      while (this.el.firstChild) {
        this.el.firstChild.remove();
      }
      this.el.append(
        mountDom(
          /* @__PURE__ */ jsxs(Fragment, { children: [
            this.showBrand && renderBrand(),
            items.map(renderItem)
          ] })
        )
      );
      return this.el;
    }
  };
  _Toolbar.defaultItems = [
    "zoomIn",
    "zoomOut",
    "fit",
    "recurse"
  ];
  let Toolbar = _Toolbar;
  exports.Toolbar = Toolbar;
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
})(this.markmap = this.markmap || {});

