const { createRoot } = ReactDOM
const { useState, useEffect } = React


function NavigationBar() {
  // TODO: Actually implement a navigation bar
  return <h1>Hello from React!</h1>;
}

document.addEventListener('DOMContentLoaded', function(){
    const root = createRoot(document.getElementById('test-react'));
    root.render(<NavigationBar />);
    
})
