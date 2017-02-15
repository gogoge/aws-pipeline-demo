NODE_BUNDLER = yarn
AWS_ECR = 399485935277.dkr.ecr.us-east-1.amazonaws.com

all: 
	$(NODE_BUNDLER) build
	docker build -f docker/Dockerfile -t $(AWS_ECR)/webb-test-img .
