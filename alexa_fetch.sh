#!/bin/bash

export ALEXA_KEY=YOUR_API_KEY
export YEAR=2017
for start in {"0101","0201","0301","0401","0501","0601","0701","0801","0901","1001","1101","1201"}; do 
curl -H "Accept: application/json" -H "x-api-key: ${ALEXA_KEY}" 'https://awis.api.alexa.com/api?Action=TrafficHistory&Start=${YEAR}${start}&ResponseGroup=History&Url=patch.com' > "/tmp/patch_${YEAR}${start}.xml";  
done

