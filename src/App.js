import React from 'react';
import './App.css';
import {Router, Switch, Route} from 'react-router-dom';
import {createBrowserHistory as createHistory} from 'history';
import PageMain from './pages/pageMain/pageMain';
import PageFaculty from './pages/pageFaculty/pageFaculty';
import PageGroup from './pages/pageGroup/pageGroup';
import PageScheduleGroup from './pages/pageScheduleGroup/pageScheduleGroup';
import PageDepartment from './pages/pageDepartment/pageDepartment';
import PageProfessor from './pages/pageProfessor/pageProfessor';

import AOS from 'aos';
import 'aos/dist/aos.css';
import PageScheduleProfessor from './pages/pageScheduleProfessor/pageScheduleProfessor';


const history = createHistory();


function App() {
  AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
    
  
    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 400, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
  
})

  return (
    <Router history={history}>
      <Switch>
        <Route path='/' component={PageMain} exact />
        <Route path='/schedule-faculty' component={PageFaculty} exact />
        <Route path='/schedule-group/find' component={PageGroup} />
        <Route path='/schedule-group/:group' component={PageScheduleGroup} exact />
        <Route path='/schedule-professor' component={PageDepartment} exact />
        <Route path='/schedule-professor/find' component={PageProfessor} />
        <Route path='/schedule-professor/:professor' component={PageScheduleProfessor} />
      </Switch>
    </Router>
  );
}

export default App;
