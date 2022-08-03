# Usage:
# make          # same as up
# make up       # pull the images (if not done so already) and start the containers
# make down     # will stop (if not already stopped) all running containers and remove them
# make clean    # same as clean but will also remove any custom images and the volumes we've created
# make open     # open a shell on the running container

.DEFAULT_GOAL := up

up:
	docker-compose up

down:
	docker-compose down

clean:
	docker-compose down --rmi local -v

open:
	docker-compose exec redis /bin/sh
