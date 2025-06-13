
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

Install dependencies with npm

```bash
  npm install
```

Build your docker image

```bash
  docker build -t {your_docker_username}/movies .
```

Connect to API

```bash
  docker run -p 8000:8000 webbylabhub/movies
```

Run your personal Docker container

```bash
  docker run --rm -p 3000:3000 -e VITE_API_URL={url} -e VITE_API_USER={email} -e VITE_API_PASS={password} -e VITE_API_NAME={name} {your_docker_username}/movies
```

Visit the link: localhost/3000
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

