set -eu

WEB_DIR="$(dirname $( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P ))"
STORYBOOK_TARGET="dist/storybook"

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

storybook() {
  export HASH_OUTPUT="false"
  export SOURCE_MAP="true"
  export WEBPACK_MODE="development"

  local pkg="${1:-}"
  if [[ -z "${pkg}" ]]; then
    pkg="src"
  else
    shift
  fi
  _parse_webpack_dev_args "$@"

  export STORYBOOK_PKG="${pkg}"
  DEBUG=storybook_config* start-storybook --config-dir="${WEB_DIR}"/conf/storybook
}

build_storybook() {
  export HASH_OUTPUT="true"
  export SOURCE_MAP="false"
  export WEBPACK_MODE="production"
  export STORYBOOK_PKG="src"

  local target="dist/storybook"
  build-storybook \
    --config-dir="${WEB_DIR}"/conf/storybook \
    -o "${STORYBOOK_TARGET}"
}

percy_storybook() {
  percy-storybook \
    --widths=640,1280 \
    --build_dir="${STORYBOOK_TARGET}"
}

main () {
  local cmd="$1"
  shift

  case "${cmd}" in
    storybook) storybook "$@" ;;
    build-storybook) build_storybook "$@" ;;
    percy-storybook) percy_storybook "$@" ;;
    *) error "unknown command: ${cmd}" ;;
  esac
}

main "$@"