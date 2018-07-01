create_folder() {
  ssh -i $3 $1@$2 "mkdir -p tmp"
}

clone_dist() {
  scp -i $3 -r dist $1@$2:tmp
}

setup() {
  forever stop $1
  cd github/$1
  git pull
}

replace_dist() {
  rm -rf dist
  mv ~/tmp/dist ./dist
  rm -rf ~/tmp/dist
}

update_server() {
  forever --id $1 -a -l /dev/null start tools/startServer.js
}

create_folder $1 $2 $3
clone_dist $1 $2 $3
ssh -i $3 $1@$2 "$(typeset -f setup replace_dist update_server); setup $4; replace_dist; update_server $4"