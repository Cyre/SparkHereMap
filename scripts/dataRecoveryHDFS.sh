#!/bin/bash
echo "Recuperando json..."
hdfs dfs -get /results/result$(echo $1 | sed "s/-//g")$(echo $2 | sed "s/://g")/*.json .
echo "Formateando json."
sed -i  '1s/{/[{/' *.json
sed -i 's/}/},/g' *.json
sed -i '$s/},/}]/' *.json
echo "Terminado el formateo."
mv part-00000-* ../data/result.json
echo "Recuperado"
