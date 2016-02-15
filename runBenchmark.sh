#!/bin/zsh

libraries=(q bluebird bluebirdDeferred rsvp native lie when jQuery)

#dont use the 100000 iterations for serial, because it will take 1ms 
#for each request when run serial async
batchSizeSerial=(100 1000 10000)

#for parallel we can go up to 100000 requests, because 
#we wait 100000ms in parallel wich results in ~1ms 
batchSizeParalell=(100 1000 10000 100000)

echo "now running the sync serial benchmark"
echo "name,batchsize,runTime,rss,heapTotal,heapInUse" > "serialSync.csv"
for i in {0..7}
do
	for size in $batchSizeSerial; do
		echo "testing " $libraries[$i+1] "with size" $size
		node index.js serial $i $size sync >> "serialSync.csv"
	done
done

echo "now running the async serial benchmark"
echo "name,batchsize,runTime,rss,heapTotal,heapInUse" > "serialAsync.csv"
for i in {0..7}
do
	for size in $batchSizeSerial; do
		echo "testing " $libraries[$i+1] "with size" $size
		node index.js serial $i $size async >> "serialAsync.csv"
	done
done

echo "now running the sync parallel benchmark"
echo "name,batchsize,runTime,rss,heapTotal,heapInUse" > "parallelSync.csv"
for i in {0..7}
do
	for size in $batchSizeParalell; do
		echo "testing " $libraries[$i+1] "with size" $size
		node index.js parallel $i $size sync >> "parallelSync.csv"
	done
done

echo "now running the async parallel benchmark"
echo "name,batchsize,runTime,rss,heapTotal,heapInUse" > "parallelAsync.csv"
for i in {0..7}
do
	for size in $batchSizeParalell; do
		echo "testing " $libraries[$i+1] "with size" $size
		node index.js parallel $i $size async >> "parallelAsync.csv"
	done
done