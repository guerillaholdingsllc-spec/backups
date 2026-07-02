terraform {
  backend "s3" {
    bucket         = "callux-terraform-state-staging"
    key            = "staging/terraform.tfstate"
    region         = "us-west-1"
    dynamodb_table = "callux-terraform-locks"
    encrypt        = true
  }
}

