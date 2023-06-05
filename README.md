
# Paresport.com

A school project for [3W Academy](https://3wa.fr/) for RNCP-5 validation

⚠️This project is still under development, the backend will not work now as the client part is currently fetching the production backend for easier development and more realistic conditions


## Prerequisites

To correctly run this project you'll need some stuff like 

* A mysql server supporting [Prisma.io](https://www.prisma.io/)
* Email account with smtp
* [Pandascore](https://pandascore.co/) API account
## Installation

Install paresport with npm

```bash
  git clone git@github.com:DamienFoulon/devausor.us.git
  cd paresport
  npm install
```
    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

### Server's env
`DATABASE_URL`
`JWT_SECRET`
`MAIL_PASSWORD`
`PANDASCORE_TOKEN`

### Client's env
`PORT`
## Run

To run this project run

```bash
  npm run start
```


## Authors

- [@DamienFoulon](https://www.github.com/DamienFoulon)

