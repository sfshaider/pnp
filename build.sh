#!/bin/bash

docker build -t pnp .
docker run -dp 8888:8888 pnp