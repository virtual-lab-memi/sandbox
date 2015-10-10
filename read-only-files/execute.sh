#!/bin/bash

source /tmp/files/env-vars
./isolate --cg --init > sandbox-name
cp /tmp/files/main /tmp/box/0/box/
cp /tmp/files/$SANDBOX_INPUT /tmp/box/0/box/
./isolate --cg -i $SANDBOX_INPUT --cg-mem=$SANDBOX_MEMORY --cg-timing -t $SANDBOX_TIME -M run-stats --run ./main
cp run-stats /tmp/files
./isolate --cg --cleanup
