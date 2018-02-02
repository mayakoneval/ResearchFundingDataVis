import React from 'react';
import ReactDOM from 'react-dom';
import Launchpad from './TransformData';
import ZoomableSunburst from './ZoomableSunburst';

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    React.createElement(Launchpad),
    document.getElementById('mount')
  );
});
