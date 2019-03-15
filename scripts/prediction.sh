#!/bin/bash
date=$1
hour=$2

#echo $(echo $date | sed "s/-//g") $(echo $hour | sed "s/://g")
echo "Prediciendo velocidades medias."
spark-submit --class Prediction ../jars/sparkvmedprediction_2.11-0.4.1.jar $date $hour
echo "Terminado"
