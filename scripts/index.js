$(function() {

	var convertToReadableSize = function(bytes) {
		var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
		if (bytes == 0) return '0 Byte';
		var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
		return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
	}

	var sizeData = {
		labels: ["Library Size (minified)"],
		datasets: [{
			label: "Q",
			fill: false,
			backgroundColor: "rgba(47,181,229,0.5)",
			borderColor: "rgba(47,181,229,0.5)",
			hoverBackgroundColor: "rgba(47,181,229,0.75)",
			hoverBorderColor: "rgba(47,46,229,1)",
			data: [62792]
		}, {
			label: "Bluebird",
			fill: false,
			backgroundColor: "rgba(255,101,255,0.5)",
			borderColor: "rgba(255,101,255,0.5)",
			hoverBackgroundColor: "rgba(255,101,255,0.75)",
			hoverBorderColor: "rgba(255,101,255,1)",
			data: [76476]
		}, {
			label: "RSVP.js",
			fill: false,
			backgroundColor: "rgba(254,187,49,0.5)",
			borderColor: "rgba(254,187,49,0.5)",
			hoverBackgroundColor: "rgba(254,187,49,0.75)",
			hoverBorderColor: "rgba(254,187,49,1)",
			data: [30326]
		}, {
			label: "lie",
			fill: false,
			backgroundColor: "rgba(255,69,69,0.5)",
			borderColor: "rgba(255,69,69,0.5)",
			hoverBackgroundColor: "rgba(255,69,69,0.75)",
			hoverBorderColor: "rgba(255,69,69,1)",
			data: [4563]
		}, {
			label: "When.js",
			fill: false,
			backgroundColor: "rgba(154,204,0,0.5)",
			borderColor: "rgba(154,204,0,0.5)",
			hoverBackgroundColor: "rgba(154,204,0,0.75)",
			hoverBorderColor: "rgba(154,204,0,1)",
			data: [29144]
		}, {
			label: "jQuery",
			fill: false,
			backgroundColor: "rgba(130,80,255,0.5)",
			borderColor: "rgba(130,80,255,0.5)",
			hoverBackgroundColor: "rgba(130,80,255,0.75)",
			hoverBorderColor: "rgba(130,80,255,1)",
			data: [85589]
		}]
	};

	var sizeContext = $("#size-chart").get(0).getContext("2d");
	var sizeChart = new Chart(sizeContext, {
		type: 'bar',
		data: sizeData,
		options: {
			scales: {
				yAxes: [{
					ticks: {
						callback: convertToReadableSize,
						beginAtZero: true
					}
				}]
			},
			tooltips: {
				callbacks: {
					title: function(tooltip) {
						return sizeData.datasets[tooltip[0].datasetIndex].label
					},
					label: function(tooltip) {
						return tooltip.yLabel + 'Bytes (~' + convertToReadableSize(tooltip.yLabel) + ')';
					}
				}
			},
		}
	});

	//source serialSync.csv
	var performanceData = {
		labels: ["100 Promises", "1000 Promises", "10000 Promises"],
		datasets: [{
			label: "Q",
			fill: false,
			backgroundColor: "rgba(47,181,229,0.5)",
			borderColor: "rgba(47,181,229,0.5)",
			hoverBackgroundColor: "rgba(47,181,229,0.75)",
			hoverBorderColor: "rgba(47,46,229,1)",
			data: [6909896, 47820692, 485789799]
		}, {
			label: "Bluebird",
			fill: false,
			backgroundColor: "rgba(255,101,255,0.5)",
			borderColor: "rgba(255,101,255,0.5)",
			hoverBackgroundColor: "rgba(255,101,255,0.75)",
			hoverBorderColor: "rgba(255,101,255,1)",
			data: [10699355, 12845189, 30610633]
		}, {
			label: "Bluebird Deferred",
			fill: false,
			backgroundColor: "rgba(169,202,101,0.5)",
			borderColor: "rgba(169,202,101,0.5)",
			hoverBackgroundColor: "rgba(169,202,101,0.75)",
			hoverBorderColor: "rgba(169,202,101,1)",
			data: [6350965, 13070800, 31556825]
		}, {
			label: "RSVP.js",
			fill: false,
			backgroundColor: "rgba(254,187,49,0.5)",
			borderColor: "rgba(254,187,49,0.5)",
			hoverBackgroundColor: "rgba(254,187,49,0.75)",
			hoverBorderColor: "rgba(254,187,49,1)",
			data: [4941579, 12901556, 40011476]
		}, {
			label: "Native ES6",
			fill: false,
			backgroundColor: "rgba(150,150,159,0.5)",
			borderColor: "rgba(150,150,159,0.5)",
			hoverBackgroundColor: "rgba(150,150,150,0.75)",
			hoverBorderColor: "rgba(150,150,150,1)",
			data: [3477870, 7541810, 58038249]
		}, {
			label: "lie",
			fill: false,
			backgroundColor: "rgba(255,69,69,0.5)",
			borderColor: "rgba(255,69,69,0.5)",
			hoverBackgroundColor: "rgba(255,69,69,0.75)",
			hoverBorderColor: "rgba(255,69,69,1)",
			data: [4038064, 11589943, 42662122]
		}, {
			label: "When.js",
			fill: false,
			backgroundColor: "rgba(154,204,0,0.5)",
			borderColor: "rgba(154,204,0,0.5)",
			hoverBackgroundColor: "rgba(154,204,0,0.75)",
			hoverBorderColor: "rgba(154,204,0,1)",
			data: [5562446, 7414003, 14407225]
		}, {
			label: "jQuery",
			fill: false,
			backgroundColor: "rgba(130,80,255,0.5)",
			borderColor: "rgba(130,80,255,0.5)",
			hoverBackgroundColor: "rgba(130,80,255,0.75)",
			hoverBorderColor: "rgba(130,80,255,1)",
			data: [20143349, 174330083, 1684154148]
		}]
	};

	var performaneContext = $("#performance-chart").get(0).getContext("2d");
	var performanceChart = new Chart(performaneContext, {
		type: 'line',
		data: performanceData,
		options: {
			scales: {
				yAxes: [{
					ticks: {
						callback: function(value) {
							var lastDigit = (value + '').charAt(0);
							return lastDigit == '5' || lastDigit == '1' ? (value / 1000000) + 'ms' : ''
						}
					},
					position: "left",
					display: true,
					type: 'logarithmic'
				}]
			},
			tooltips: {
				callbacks: {
					label: function(tooltip) {
						return tooltip.yLabel + 'ns';
					}
				}
			}
		}
	});


	//source serialSync.csv
	var memoryData1 = {
		labels: ["1000 Promises"],
		datasets: [{
			label: "Q",
			fill: false,
			backgroundColor: "rgba(47,181,229,0.5)",
			borderColor: "rgba(47,181,229,0.5)",
			hoverBackgroundColor: "rgba(47,181,229,0.75)",
			hoverBorderColor: "rgba(47,46,229,1)",
			data: [3899392]
		}, {
			label: "Bluebird",
			fill: false,
			backgroundColor: "rgba(255,101,255,0.5)",
			borderColor: "rgba(255,101,255,0.5)",
			hoverBackgroundColor: "rgba(255,101,255,0.75)",
			hoverBorderColor: "rgba(255,101,255,1)",
			data: [233472]
		}, {
			label: "Bluebird Deferred",
			fill: false,
			backgroundColor: "rgba(169,202,101,0.5)",
			borderColor: "rgba(169,202,101,0.5)",
			hoverBackgroundColor: "rgba(169,202,101,0.75)",
			hoverBorderColor: "rgba(169,202,101,1)",
			data: [225280]
		}, {
			label: "RSVP.js",
			fill: false,
			backgroundColor: "rgba(254,187,49,0.5)",
			borderColor: "rgba(254,187,49,0.5)",
			hoverBackgroundColor: "rgba(254,187,49,0.75)",
			hoverBorderColor: "rgba(254,187,49,1)",
			data: [589824]
		}, {
			label: "Native ES6",
			fill: false,
			backgroundColor: "rgba(150,150,159,0.5)",
			borderColor: "rgba(150,150,159,0.5)",
			hoverBackgroundColor: "rgba(150,150,150,0.75)",
			hoverBorderColor: "rgba(150,150,150,1)",
			data: [69632]
		}, {
			label: "lie",
			fill: false,
			backgroundColor: "rgba(255,69,69,0.5)",
			borderColor: "rgba(255,69,69,0.5)",
			hoverBackgroundColor: "rgba(255,69,69,0.75)",
			hoverBorderColor: "rgba(255,69,69,1)",
			data: [2301952]
		}, {
			label: "When.js",
			fill: false,
			backgroundColor: "rgba(154,204,0,0.5)",
			borderColor: "rgba(154,204,0,0.5)",
			hoverBackgroundColor: "rgba(154,204,0,0.75)",
			hoverBorderColor: "rgba(154,204,0,1)",
			data: [286720]
		}, {
			label: "jQuery",
			fill: false,
			backgroundColor: "rgba(130,80,255,0.5)",
			borderColor: "rgba(130,80,255,0.5)",
			hoverBackgroundColor: "rgba(130,80,255,0.75)",
			hoverBorderColor: "rgba(130,80,255,1)",
			data: [8556544]
		}]
	};

	var memoryData2 = {
		labels: ["10000 Promises"],
		datasets: [{
			label: "Q",
			fill: false,
			backgroundColor: "rgba(47,181,229,0.5)",
			borderColor: "rgba(47,181,229,0.5)",
			hoverBackgroundColor: "rgba(47,181,229,0.75)",
			hoverBorderColor: "rgba(47,46,229,1)",
			data: [40947712]
		}, {
			label: "Bluebird",
			fill: false,
			backgroundColor: "rgba(255,101,255,0.5)",
			borderColor: "rgba(255,101,255,0.5)",
			hoverBackgroundColor: "rgba(255,101,255,0.75)",
			hoverBorderColor: "rgba(255,101,255,1)",
			data: [2932736]
		}, {
			label: "Bluebird Deferred",
			fill: false,
			backgroundColor: "rgba(169,202,101,0.5)",
			borderColor: "rgba(169,202,101,0.5)",
			hoverBackgroundColor: "rgba(169,202,101,0.75)",
			hoverBorderColor: "rgba(169,202,101,1)",
			data: [2396160]
		}, {
			label: "RSVP.js",
			fill: false,
			backgroundColor: "rgba(254,187,49,0.5)",
			borderColor: "rgba(254,187,49,0.5)",
			hoverBackgroundColor: "rgba(254,187,49,0.75)",
			hoverBorderColor: "rgba(254,187,49,1)",
			data: [1863680]
		}, {
			label: "Native ES6",
			fill: false,
			backgroundColor: "rgba(150,150,159,0.5)",
			borderColor: "rgba(150,150,159,0.5)",
			hoverBackgroundColor: "rgba(150,150,150,0.75)",
			hoverBorderColor: "rgba(150,150,150,1)",
			data: [5525504]
		}, {
			label: "lie",
			fill: false,
			backgroundColor: "rgba(255,69,69,0.5)",
			borderColor: "rgba(255,69,69,0.5)",
			hoverBackgroundColor: "rgba(255,69,69,0.75)",
			hoverBorderColor: "rgba(255,69,69,1)",
			data: [6782976]
		}, {
			label: "When.js",
			fill: false,
			backgroundColor: "rgba(154,204,0,0.5)",
			borderColor: "rgba(154,204,0,0.5)",
			hoverBackgroundColor: "rgba(154,204,0,0.75)",
			hoverBorderColor: "rgba(154,204,0,1)",
			data: [2150400]
		}, {
			label: "jQuery",
			fill: false,
			backgroundColor: "rgba(130,80,255,0.5)",
			borderColor: "rgba(130,80,255,0.5)",
			hoverBackgroundColor: "rgba(130,80,255,0.75)",
			hoverBorderColor: "rgba(130,80,255,1)",
			data: [56147968]
		}]
	};

	var memoryContext1 = $("#memory-chart1").get(0).getContext("2d");
	var memoryChart1 = new Chart(memoryContext1, {
		type: 'bar',
		data: memoryData1,
		options: {
			scales: {
				yAxes: [{
					ticks: {
						callback: convertToReadableSize,
						beginAtZero: true
					}
				}]
			},
			tooltips: {
				callbacks: {
					title: function(tooltip) {
						return memoryData1.datasets[tooltip[0].datasetIndex].label
					},
					label: function(tooltip) {
						return tooltip.yLabel + 'Bytes (~' + convertToReadableSize(tooltip.yLabel) + ')';
					}
				}
			},
			legend: {
				display: false
			}
		}
	});

	var convertToReadableSize = function(bytes) {
		var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
		if (bytes == 0) return '0 Byte';
		var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
		return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
	}
	var memoryContext2 = $("#memory-chart2").get(0).getContext("2d");
	var memoryChart2 = new Chart(memoryContext2, {
		type: 'bar',
		data: memoryData2,
		options: {
			scales: {
				yAxes: [{
					ticks: {
						callback: convertToReadableSize,
						beginAtZero: true
					},
					position: 'right'
				}]
			},
			tooltips: {
				callbacks: {
					title: function(tooltip) {
						return memoryData1.datasets[tooltip[0].datasetIndex].label
					},
					label: function(tooltip) {
						return tooltip.yLabel + 'Bytes (~' + convertToReadableSize(tooltip.yLabel) + ')';
					}
				}
			},
			legend: {
				display: false
			}
		}
	});
});