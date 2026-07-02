variable "name" {}
variable "vpc_id" {}
variable "subnets" { type = list(string) }
variable "db_name" {}
variable "username" {}
variable "db_password" { sensitive = true }

resource "aws_db_subnet_group" "this" {
  name       = var.name
  subnet_ids = var.subnets
}

resource "aws_db_instance" "postgres" {
  identifier              = var.name
  engine                  = "postgres"
  engine_version          = "16"
  instance_class          = "db.t4g.micro"
  allocated_storage       = 50
  db_name                 = var.db_name
  username                = var.username
  password                = var.db_password
  db_subnet_group_name    = aws_db_subnet_group.this.name
  backup_retention_period = 7
  storage_encrypted       = true
  skip_final_snapshot     = true
}

output "endpoint" { value = aws_db_instance.postgres.endpoint }

