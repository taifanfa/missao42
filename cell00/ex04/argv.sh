#!/bin/bash

if [ $# -eq 0 ]; then
	echo "Você nao digitou nada"
else
	count=0
	for arg in "$@"; do
		if [ $count -ge 3 ]; then
 			break
		fi
		echo "$arg"
		count=$((count + 1))
	done
fi

