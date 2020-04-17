BOLD="\033[1m"
NORMAL="\033[0m"
RED="\033[0;31m"

error() {
  local message="$1"
  echo "${RED}${BOLD}[Error]: ${message}${NORMAL}"
  exit 1
}

log_info() {
  local message="$1"
  echo "[Info]: ${message}"
}
