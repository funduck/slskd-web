source .env

function gen() {
  echo "Generating $GEN_MODULE API client for url $GEN_API_URL"
  
  curl -sL $GEN_API_URL -o $GEN_OPENAPI_FILE
  
  rm -rf generated/$GEN_MODULE

  docker run --rm \
  -u $(id -u):$(id -g) \
  -v ${PWD}:/local openapitools/openapi-generator-cli generate \
  -i /local/$GEN_OPENAPI_FILE \
  -g typescript-fetch \
  --additional-properties=fileNaming=kebab-case,paramNaming=snake_case,modelPropertyNaming=snake_case,supportsES6=true, \
  -o /local/generated/$GEN_MODULE

  rm $GEN_OPENAPI_FILE
}

GEN_API_URL=http://localhost:5030/swagger/v0/swagger.json
GEN_OPENAPI_FILE=slskd-api.json
GEN_MODULE=slskd-api
gen
