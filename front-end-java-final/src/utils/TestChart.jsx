import React from 'react';
import PropTypes from 'prop-types';
import RangeDatePicker from '../common/RangeDatePicker';
import Chart from '../../utils/chart';

class TestChart extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    componentDidMount() {
        const chartOptions = {
            ...{
                responsive: true,
                legend: {
                    position: 'top',
                },
                elements: {
                    line: {
                        // A higher value makes the line look skewed at this ratio.
                        tension: 0.3,
                    },
                    point: {
                        radius: 0,
                    },
                },
                scales: {
                    xAxes: [
                        {
                            gridLines: false,
                            ticks: {
                                callback(tick, index) {
                                    // Jump every 7 values on the X axis labels to avoid clutter.
                                    return index % 7 !== 0 ? '' : tick;
                                },
                            },
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                suggestedMax: 45,
                                callback(tick) {
                                    if (tick === 0) {
                                        return tick;
                                    }
                                    // Format the amounts using Ks for thousands.
                                    return tick > 999 ? `${(tick / 1000).toFixed(1)}K` : tick;
                                },
                            },
                        },
                    ],
                },
                hover: {
                    mode: 'nearest',
                    intersect: false,
                },
                tooltips: {
                    custom: false,
                    mode: 'nearest',
                    intersect: false,
                },
            },
            ...this.props.chartOptions,
        };

        const BlogUsersOverview = new Chart(this.canvasRef.current, {
            type: 'LineWithLine',
            data: this.props.chartData,
            options: chartOptions,
        });

        // They can still be triggered on hover.
        const buoMeta = BlogUsersOverview.getDatasetMeta(0);
        buoMeta.data[0]._model.radius = 0;
        buoMeta.data[this.props.chartData.datasets[0].data.length - 1]._model.radius = 0;

        // Render the chart.
        BlogUsersOverview.render();
    }

    render() {
        const { title } = this.props;
        return (
            <div className="h-100 bg-white shadow-sm rounded p-4">
                <h6 className="text-xl mb-4">{title}</h6>
                <div className="border-b border-gray-300 pb-2 bg-gray-100">
                    <div className="sm:flex">
                        <div className="w-full mb-2 sm:mb-0">
                            <RangeDatePicker />
                        </div>
                        <div className="w-full sm:w-auto">
                            <button className="btn btn-white mx-auto sm:mx-0 mt-3 sm:mt-0">
                                View Full Report &rarr;
                            </button>
                        </div>
                    </div>
                </div>
                <canvas height="120" ref={this.canvasRef} style={{ maxWidth: '100% !important' }} />
            </div>
        );
    }
}

// PropTypes and defaultProps remain the same.

export default TestChart;
