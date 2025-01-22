const {
  createRoot
} = ReactDOM;
const {
  useState,
  useEffect
} = React;
function NavigationBar() {
  // TODO: Actually implement a navigation bar
  return /*#__PURE__*/React.createElement("h1", null, "Hello from React!");
}
document.addEventListener('DOMContentLoaded', function () {
  const root = createRoot(document.getElementById('test-react'));
  root.render( /*#__PURE__*/React.createElement(NavigationBar, null));
});