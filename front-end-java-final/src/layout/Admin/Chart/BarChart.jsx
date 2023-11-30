import React, { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const labels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7'];

const data = {
    labels,
    datasets: [
        {
            label: '7 tháng',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(255, 159, 64, 0.7)',
                'rgba(255, 205, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(153, 102, 255, 0.7)',
                'rgba(201, 203, 207, 0.7)',
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)',
            ],
            borderWidth: 0.5,
        },
    ],
};

function BarChart({ height = '25rem' }) {
    const chartRef = useRef(null);
    const wrapperRef = useRef(null);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Đơn hàng trong 7 tháng gần đây',
            },
        },
    };

    useEffect(() => {
        const handleResize = () => {
            const wrapper = wrapperRef.current;
            const chart = chartRef.current.chartInstance;

            if (wrapper && chart) {
                const wrapperWidth = wrapper.offsetWidth;
                const wrapperHeight = wrapper.offsetHeight;

                chart.resize({
                    width: wrapperWidth,
                    height: wrapperHeight,
                });
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div
            style={{
                height: height,
            }}
            ref={wrapperRef}
            className={` w-full   bg-light dark:bg-dark rounded-md p-2`}
        >
            <Bar ref={chartRef} data={data} options={options} />
        </div>
    );
}

export default BarChart;
