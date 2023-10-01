lint-frontend:
	make -C frontend lint

install:
	npm ci

start-frontend:
	make -C frontend_slack start

start-backend:
	npx start-serve

start:
	make start-backend & make start-frontend