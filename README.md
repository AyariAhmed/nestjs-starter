# FoodiMap - REST API
### Postgres database creation : 
```shell
psql postgres postgres (password postgres)
CREATE DATABASE foodimap;
CREATE ROLE foodimap_admin WITH LOGIN PASSWORD 'foodimap_admin' CREATEDB;
GRANT ALL PRIVILEGES ON DATABASE foodimap TO foodimap_admin;
```

### Routes guarding based on roles
* import AuthModule in the module where routes guarding is being used
* Exemples:
```ts
  @hasRoles(UserRole.CLIENT,UserRole.ADMIN)
  @UseGuards(JwtAuthGuard,RolesGuard)
```
only client or admin can access the protected resource
```ts
  @hasRoles(UserRole.OWNER)
  @UseGuards(JwtAuthGuard,RolesGuard)
```
only owner can access the protected resource

