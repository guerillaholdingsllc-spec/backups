variable "name" {}
variable "jwt_secret" { sensitive = true }
variable "db_password" { sensitive = true }

resource "aws_secretsmanager_secret" "app" {
  name = "${var.name}/app"
}

resource "aws_secretsmanager_secret_version" "app" {
  secret_id = aws_secretsmanager_secret.app.id
  secret_string = jsonencode({
    JWT_SECRET  = var.jwt_secret,
    DB_PASSWORD = var.db_password
  })
}

output "secret_arn" { value = aws_secretsmanager_secret.app.arn }

