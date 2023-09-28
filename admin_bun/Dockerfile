FROM ubuntu:22.04
WORKDIR /admin_service

# Install nginx 
RUN apt-get update && apt-get install -y unzip && apt-get clean

# Install curl
RUN apt-get update && apt-get install -y curl && apt-get clean



# Install bun
# RUN curl -fsSL https://bun.sh/install | bash

# Set environment variables using ENV
ENV BUN_INSTALL "$HOME/.bun"
ENV PATH "$BUN_INSTALL/bin:$PATH"

# Activate the environment variables
RUN echo 'source $HOME/.bun/bun.env' >> $HOME/.bashrc
RUN curl -fsSL https://bun.sh/install | bash

COPY . .

RUN bun install
# RUN bun run src/index.ts
#RUN bun run start

# EXPOSE 80

# CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
#CMD ["./scripts/startup.sh"]
CMD ["bun", "run", "src/index.ts"]