
# Movie App

Web application for finding movies and managing them.

# Overview

The app is a modern webapp for finding movies by title or author, creating and deleting them, diving deeper into each one of them.



## Tech Stack

React, Redux, Docker


## Installation

### Prerequisites

- Node.js
- React
- Docker desktop

### Setup

Clone git repository

```bash
  git clone https://link-to-the-app
```

Go to main folder

```bash
  cd movies-app
```

Install dependencies with npm

```bash
  npm install
```

Connect to API. If you don't have the image, pull it from Dockerhub webbylabhub/movies

```bash
  docker run -p 8000:8000 webbylabhub/movies
```

Pull my Docker image from DockerHub

```bash
  docker pull honcharovaad/movies
```

Run my Docker container

```bash
  docker run --rm -p 3000:3000 \
  -e VITE_API_URL={url} \
  -e VITE_API_USER={email} \
  -e VITE_API_PASS={password} \
  -e VITE_API_NAME={name} \
  honcharovaad/movies
```

Visit the link: localhost/3000

### If something is wrong, try:

 Reload the page

 Rebuild Docker image locally clearing cache:

```bash
  docker build --no-cache -t honcharovaad/movies .
```



## Usage

After deploying, site will be accessed via website link.



## Contributing

Contributions are welcome! Please open an issue or pull request.

Fork the repo

Create your branch (git checkout -b feat/feature-name)

Commit your changes

Push to the branch

Open a pull request


## License

[MIT](https://choosealicense.com/licenses/mit/)

