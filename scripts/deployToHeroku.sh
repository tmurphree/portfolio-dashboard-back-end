#!/bin/bash

# Assumes you have the Heroku CLI installed.
# Deploys, releases, and opens the app in Heroku.

APP_NAME='tm-portfolio-dashboard'
# Docker image name
DOCKER_IMAGE_REPOSITORY='tmurphree/portfolio-dashboard-back-end'

# check for heroku
# https://stackoverflow.com/questions/592620/how-to-check-if-a-program-exists-from-a-bash-script
hash heroku 2>/dev/null || { echo >&2 "I require heroku but it's not installed.  Aborting."; exit 1; }

echo "About to deploy $DOCKER_IMAGE_REPOSITORY to $APP_NAME."

# echo

read -p "Continue (y or [n])?" -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
  heroku container:login;
  # tag the appropriate local repo to what Heroku wants
  # https://devcenter.heroku.com/articles/container-registry-and-runtime#building-and-pushing-image-s
  docker tag $DOCKER_IMAGE_REPOSITORY registry.heroku.com/$APP_NAME/web;
  docker push registry.heroku.com/$APP_NAME/web;
  heroku container:release web -a $APP_NAME --verbose;
  heroku open -a $APP_NAME;
  docker rmi registry.heroku.com/$APP_NAME/web:latest
  docker system prune --force;
  heroku logs --tail -a $APP_NAME;
fi
