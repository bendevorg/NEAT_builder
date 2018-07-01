create_folder() {
  echo "Creating temp folder to hold our dist"
  ssh $1@$2 "mkdir -p tmp"
}

clone_dist() {
  echo "Cloning our dist to the remote server"
  scp -r dist $1@$2:tmp
}

setup() {
  echo "Setting up our server to new dist"
  forever stop $1
  cd github/$1
  git pull
}

replace_dist() {
  echo "Updating dist"
  rm -rf dist
  mv ~/tmp/dist ./dist
  rm -rf ~/tmp/dist
}

update_server() {
  echo "Restart server"
  forever --id $1 -a -l /dev/null start tools/startServer.js
}

create_folder $1 $2
clone_dist $1 $2
ssh $1@$2 "$(typeset -f setup replace_dist update_server); setup $3; replace_dist; update_server $3"