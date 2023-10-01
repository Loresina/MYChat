lint-frontend:
	make -C frontend lint

install:
	npm ci

start-frontend:
	make -C frontend_slack start

start-backend:
	npm start

start:
	make start-backend & make start-frontend