lint-frontend:
	make -C frontend lint

install:
	npm ci

start-frontend:
	make -C frontend_slack start

start-backend:
	npx start-server

start:
	make start-backend & make start-frontend

build:
	npm ci --prefix frontend_slack && run build --prefix frontend_slack