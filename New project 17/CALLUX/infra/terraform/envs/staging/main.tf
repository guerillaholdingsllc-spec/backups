provider "aws" {
  region = var.region
}

module "vpc" {
  source     = "../../modules/vpc"
  name       = "callux-staging"
  cidr_block = "10.20.0.0/16"
}

module "eks" {
  source          = "../../modules/eks"
  name            = "callux-staging"
  vpc_id          = module.vpc.vpc_id
  private_subnets = module.vpc.private_subnets
  public_subnets  = module.vpc.public_subnets
}

module "rds" {
  source      = "../../modules/rds"
  name        = "callux-staging"
  vpc_id      = module.vpc.vpc_id
  subnets     = module.vpc.private_subnets
  db_name     = "callux"
  username    = "callux"
  db_password = var.db_password
}

module "s3_pod" {
  source = "../../modules/s3"
  name   = "callux-pod-staging"
}

module "iam" {
  source       = "../../modules/iam"
  name         = "callux-staging"
  jwt_secret   = var.jwt_secret
  db_password  = var.db_password
}

