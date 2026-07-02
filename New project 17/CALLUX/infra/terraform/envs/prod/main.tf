provider "aws" {
  region = var.region
}

module "vpc" {
  source     = "../../modules/vpc"
  name       = "callux-prod"
  cidr_block = "10.30.0.0/16"
}

module "eks" {
  source          = "../../modules/eks"
  name            = "callux-prod"
  vpc_id          = module.vpc.vpc_id
  private_subnets = module.vpc.private_subnets
  public_subnets  = module.vpc.public_subnets
}

module "rds" {
  source      = "../../modules/rds"
  name        = "callux-prod"
  vpc_id      = module.vpc.vpc_id
  subnets     = module.vpc.private_subnets
  db_name     = "callux"
  username    = "callux"
  db_password = var.db_password
}

module "s3_pod" {
  source = "../../modules/s3"
  name   = "callux-pod-prod"
}

module "iam" {
  source       = "../../modules/iam"
  name         = "callux-prod"
  jwt_secret   = var.jwt_secret
  db_password  = var.db_password
}

