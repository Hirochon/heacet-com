FROM node:12.17.0

RUN mkdir heacet-com
WORKDIR /heacet-com
COPY .config /root/.config/

RUN yarn global add gatsby-cli