set -eu

WEB_DIR="$(dirname $( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P ))"

_parse_webpack_dev_args() {
  while [[ $# -gt 0 ]]
  do
    local arg="$1"
    case "${arg}" in
      -h|--hot)
        export HOT_MODULE_RELOAD="true"
        shift
        ;;
      -t|--ts-transpile-only)
        export TS_TRANSPILE_ONLY="true"
        shift
        ;;
      *) error "unknown args: ${arg}" ;;
    esac
  done
}

build() {
  rm -rf "${WEB_DIR}"/dist

  export HASH_OUTPUT="true"
  export SOURCE_MAP="true"
  export WEBPACK_MODE="production"
  export HOT_MODULE_RELOAD="false"
  export TS_TRANSPILE_ONLY="true"

  webpack --config="${WEB_DIR}"/conf/webpack/webpack.config.js
}

webpack_dev_server() {
  export HASH_OUTPUT="false"
  export SOURCE_MAP="true"
  export WEBPACK_MODE="development"
  _parse_webpack_dev_args "$@"

  webpack-dev-server --config="${WEB_DIR}"/conf/webpack/webpack.config.js
}

storybook() {
  export HASH_OUTPUT="false"
  export SOURCE_MAP="true"
  export WEBPACK_MODE="development"

  local pkg="${1:-null}"
  if [[ "${pkg}" != null ]]; then
    shift
  else
    pkg="src"
  fi
  _parse_webpack_dev_args "$@"

  export STORYBOOK_PKG="${pkg}"
  start-storybook --config-dir="${WEB_DIR}"/conf/storybook
}

main () {
  local cmd="$1"
  shift

  case "${cmd}" in
    build) build "$@" ;;
    serve) webpack_dev_server "$@" ;;
    storybook) storybook "$@" ;;
    *) error "unknown command: ${cmd}" ;;
  esac
}

main "$@"