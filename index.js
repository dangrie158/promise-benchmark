var q = require('q');

require('./libraries').then(function(libraries) {

	var runSerialPerformanceBenchmark = function(library, numIterations, async) {

		//console.log('now testing library ', library.name, ' with ', numIterations, ' iterations in serial mode');
		var resolver = async ? library.resolvers.asyncResolver : library.resolvers.syncResolver;

		var startTime = process.hrtime();
		var startMemoryUsage = process.memoryUsage();
		var currentPromise = q(true);
		for (i = 0; i < numIterations; i++) {
			currentPromise = currentPromise.then(function() {
				return resolver();
			});
		}

		return currentPromise.then(function() {
			var runTime = process.hrtime(startTime);
			var runTimeNanoseconds = runTime[0] * 1e9 + runTime[1];
			var endMemoryUsage = process.memoryUsage();
			var rssUsed = endMemoryUsage.rss - startMemoryUsage.rss;
			var heapTotalUsed = endMemoryUsage.heapTotal - startMemoryUsage.heapTotal;
			var heapInUse = endMemoryUsage.heapUsed - startMemoryUsage.heapUsed;

			return {
				runTime: runTimeNanoseconds,
				rss: rssUsed,
				heapTotal: heapTotalUsed,
				heapInUse: heapInUse
			}
		});
	};

	var runParallelPerformanceBenchmark = function(library, numJobs, async){
		//console.log('now testing library ', library.name, ' with ', numJobs, ' jobs in parallel mode');
		var resolver = async ? library.resolvers.asyncResolver : library.resolvers.syncResolver;

		var startTime = process.hrtime();
		var startMemoryUsage = process.memoryUsage();
		var promises = [];
		for (i = 0; i < numJobs; i++) {
			promises.push(function(){
				return resolver();
			});
		}

		return q.all(promises).then(function() {
			var runTime = process.hrtime(startTime);
			var runTimeNanoseconds = runTime[0] * 1e9 + runTime[1];
			var endMemoryUsage = process.memoryUsage();
			var rssUsed = endMemoryUsage.rss - startMemoryUsage.rss;
			var heapTotalUsed = endMemoryUsage.heapTotal - startMemoryUsage.heapTotal;
			var heapInUse = endMemoryUsage.heapUsed - startMemoryUsage.heapUsed;

			return {
				runTime: runTimeNanoseconds,
				rss: rssUsed,
				heapTotal: heapTotalUsed,
				heapInUse: heapInUse
			}
		});
	};

	var runParallel = process.argv[2] === 'parallel';
	var library = libraries.all[process.argv[3]];
	var numJobs = process.argv[4];
	var runAsync = process.argv[5] === 'async';


	var task;
	if(runParallel){
		task = runParallelPerformanceBenchmark(library, numJobs, runAsync)
	}else{
		task = runSerialPerformanceBenchmark(library, numJobs, runAsync)
	}

	task
		.then(function(results){
			console.log(library.name + ',' + numJobs + ',' + results.runTime + ',' + results.rss + ',' + results.heapTotal + ',' + results.heapInUse);
		})

}).catch(function(e){
	console.error(e)
}).done();