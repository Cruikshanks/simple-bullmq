# Simple BullMQ

[![Licence](https://img.shields.io/badge/Licence-MIT-blue.svg)](https://opensource.org/licenses/MIT)

This is a very basic example of using [BullMQ](https://docs.bullmq.io/), a [Node.js](https://nodejs.org/) library that implements a fast and robust queue system built on top of [Redis](https://redis.io/).

Starting with its [Quick Start](https://docs.bullmq.io/readme-1) as a base, this version contains corrections, refactorings and additional exploration of the feature set.

## Prerequisites

Make sure you already have:

- [Node.js v14.*](https://nodejs.org/en/)
- [Redis](https://redis.io/)

## Installation

First clone the repository and then drop into your new local repo:

```bash
git clone https://github.com/Cruikshanks/simple-bullmq.git && cd simple-bullmq
```

Then install the dependencies

```bash
npm ci
```

My preference is to run Redis using Docker, so [install Docker](https://docs.docker.com/get-docker/) if you don't already have it. You can then call `make up` to start a Redis server using Docker.

## Configuration

The project will connect to Redis using `localhost` and `6379` by default. If you need to change this check out [.env.example](.env.example) for how.

## Contributing

Bug reports and pull requests are welcome on GitHub at <https://github.com/cruikshanks/simple-bullmq>.

## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

> If you don't add a license it's neither free or open!
