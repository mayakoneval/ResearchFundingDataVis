import React from 'react';
import PieGraph from './PieGraph';
import BarGraph from './BarGraph';
import ScatterPlot from './ScatterPlot';
import ZoomableSunburst from './ZoomableSunburst';

/**
 *  * Tryna get a fucking graph on the screen
 *  *   */

class Launchpad extends React.Component {

    render() {

        return (
            <div>
              <PieGraph/>
              <ScatterPlot/>
              <ZoomableSunburst/>
            </div>
        );
    }
}
export default Launchpad;

