#!/bin/bash

FUNCTION=$1
BRANCH=$(git rev-parse --abbrev-ref HEAD)

faas-cli build --tag branch -f $FUNCTION.yml && \
faas-cli push --tag branch -f $FUNCTION.yml && \
faas-cli generate -n "" --tag branch --yaml $FUNCTION.yml > $FUNCTION-k8s.yaml && \
kubectl -n openfaas-prod-fn replace --force -f $FUNCTION-k8s.yaml
