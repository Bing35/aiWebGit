const { useState, useEffect } = React
const { createRoot } = ReactDOM

function Nav(props) {
    const [viewport, setViewport] = useState('sm')

    function render() {
        if (viewport === 'sm') {
            return (
                <div>
                    <md-fab aria-label='Menu' id='menu' onClick={toggleNav}>
                        <span class="material-symbols-outlined">menu</span>
                    </md-fab>
                    <div id="toggle-nav">
                    <span id='logo'>
                        <a class="navbar-brand" href="/">MHWG</a></span>
                        <ul>
                            <li><a href="/narrative">narrative</a></li>
                            <li>hi2</li>
                            <li>hi3</li>
d                       </ul>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div id="nav-desktop">
                    <span id='logo'><a class="navbar-brand" href="/">MHWG</a></span>
                    <ul>
                        <li class="nav-item"><a href="/narrative">narrative</a></li>
                        <li class="nav-item">Hi2</li>
                        <li class="nav-item">Hi3</li>
                    </ul>
                    <div></div>
                </div>
            )
        }

    }

    // to change 
    // initialize display
    useEffect(function () {
        if (viewport === 'sm') {
            document.querySelector('nav>div>div').style.display = 'none';
        }
        else{
            document.querySelector('nav>div>div').style.display = 'block';
        }
    }, [viewport])

    // viewport changes
    useEffect(function () {
        changeViewport()
        document.querySelector('body').onresize = changeViewport
    }, [viewport])


    function changeViewport() {
        if (window.innerWidth < 768) {
            console.log(`changeviewport sm: ${viewport}`);
            if (viewport !== 'sm') {
                setViewport('sm')
            }
        }
        else {
            console.log(`changeviewport lg: ${viewport}`);
            if (viewport !== 'lg') {
                setViewport('lg')
            }
        }
    }

    return render()
}


function toggleNav() {
    const style = document.querySelector('#toggle-nav').style
    if (style.display !== 'none') {
        style.display = 'none'
    }
    else {
        style.display = 'block'
    }
}

document.addEventListener('DOMContentLoaded', function(){

    const root = createRoot(document.querySelector('#nav'));
    root.render(<Nav />);
})