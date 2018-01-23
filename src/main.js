import React from 'react';
import ReactDOM from 'react-dom';
import Bar from './BarGraph';

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    React.createElement(Bar),
    document.getElementById('mount')
  );
});
