FROM ubuntu:22.04
WORKDIR /app

RUN apt-get update && \
    apt-get install -y docker.io


# Install nginx 
RUN apt-get update && apt-get install -y unzip && apt-get clean

# Install curl
RUN apt-get update && apt-get install -y curl && apt-get clean

# Set environment variables using ENV
ENV BUN_INSTALL "$HOME/.bun"
ENV PATH "$BUN_INSTALL/bin:$PATH"

# Activate the environment variables
RUN echo 'source $HOME/.bun/bun.env' >> $HOME/.bashrc
RUN curl -fsSL https://bun.sh/install | bash

COPY . .

RUN bun install
CMD ["bun", "run", "src/index.ts"]