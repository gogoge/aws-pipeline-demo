NODE_BUNDLER = yarn
AWS_ECR = 399485935277.dkr.ecr.us-east-1.amazonaws.com
CODE_PIPELINE_NAME = webb-kill-me
all: 
	$(NODE_BUNDLER) build
	docker build -no-cache -f docker/Dockerfile -t $(AWS_ECR)/$(CODE_PIPELINE_NAME) .
