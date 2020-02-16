set -eu

WEB_DIR="$(dirname $( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P ))"

build() {
  rm -rf "${WEB_DIR}"/dist

  export HASH_OUTPUT="true"
  export SOURCE_MAP="true"
  export WEBPACK_MODE="production"

  webpack --config="${WEB_DIR}"/conf/webpack/webpack.config.js
}

webpack_dev_server() {
  export HASH_OUTPUT="false"
  export SOURCE_MAP="true"
  export WEBPACK_MODE="development"

  webpack-dev-server --config="${WEB_DIR}"/conf/webpack/webpack.config.js
}

main () {
  local cmd="$1"
  shift

  case "${cmd}" in
    build) build ;;
    serve) webpack_dev_server ;;
    *) error "unknown command: ${cmd}" ;;
  esac
}

main "$@"