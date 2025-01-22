const {
  useState,
  useEffect
} = React;
const {
  createRoot
} = ReactDOM;
function Nav(props) {
  const [viewport, setViewport] = useState('sm');
  function render() {
    if (viewport === 'sm') {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("md-fab", {
        "aria-label": "Menu",
        id: "menu",
        onClick: toggleNav
      }, /*#__PURE__*/React.createElement("span", {
        class: "material-symbols-outlined"
      }, "menu")), /*#__PURE__*/React.createElement("div", {
        id: "toggle-nav"
      }, /*#__PURE__*/React.createElement("span", {
        id: "logo"
      }, /*#__PURE__*/React.createElement("a", {
        class: "navbar-brand",
        href: "/"
      }, "MHWG")), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
        href: "/narrative"
      }, "narrative")), /*#__PURE__*/React.createElement("li", null, "hi2"), /*#__PURE__*/React.createElement("li", null, "hi3"), "d                       ")));
    } else {
      return /*#__PURE__*/React.createElement("div", {
        id: "nav-desktop"
      }, /*#__PURE__*/React.createElement("span", {
        id: "logo"
      }, /*#__PURE__*/React.createElement("a", {
        class: "navbar-brand",
        href: "/"
      }, "MHWG")), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", {
        class: "nav-item"
      }, /*#__PURE__*/React.createElement("a", {
        href: "/narrative"
      }, "narrative")), /*#__PURE__*/React.createElement("li", {
        class: "nav-item"
      }, "Hi2"), /*#__PURE__*/React.createElement("li", {
        class: "nav-item"
      }, "Hi3")), /*#__PURE__*/React.createElement("div", null));
    }
  }

  // to change 
  // initialize display
  useEffect(function () {
    if (viewport === 'sm') {
      document.querySelector('nav>div>div').style.display = 'none';
    } else {
      document.querySelector('nav>div>div').style.display = 'block';
    }
  }, [viewport]);

  // viewport changes
  useEffect(function () {
    changeViewport();
    document.querySelector('body').onresize = changeViewport;
  }, [viewport]);
  function changeViewport() {
    if (window.innerWidth < 768) {
      console.log(`changeviewport sm: ${viewport}`);
      if (viewport !== 'sm') {
        setViewport('sm');
      }
    } else {
      console.log(`changeviewport lg: ${viewport}`);
      if (viewport !== 'lg') {
        setViewport('lg');
      }
    }
  }
  return render();
}
function toggleNav() {
  const style = document.querySelector('#toggle-nav').style;
  if (style.display !== 'none') {
    style.display = 'none';
  } else {
    style.display = 'block';
  }
}
document.addEventListener('DOMContentLoaded', function () {
  const root = createRoot(document.querySelector('#nav'));
  root.render( /*#__PURE__*/React.createElement(Nav, null));
});